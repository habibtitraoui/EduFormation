/// <reference types="vitest/config" />
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { gzipSync } from "node:zlib";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { createElement, StrictMode, type ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { createServer, defineConfig, loadEnv, type Plugin, type ResolvedConfig } from "vite";

/**
 * Environment variables that must exist for a production build.
 * A marketing page that quietly links to http://localhost:3000 is worse than
 * no page at all, so the build fails instead (§16).
 */
const REQUIRED_FOR_PRODUCTION = ["VITE_APP_URL", "VITE_SITE_URL"] as const;

const DEV_DEFAULT_SITE_URL = "http://localhost:4173";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

/** Fails the production build when a required variable is missing. */
function environment(mode: string, isBuild: boolean): Record<string, string> {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  if (isBuild) {
    const missing = REQUIRED_FOR_PRODUCTION.filter((key) => !env[key]?.trim());
    if (missing.length > 0) {
      throw new Error(
        `[eduformation-landing] Missing required environment variable(s): ${missing.join(", ")}. ` +
          "Set them in your host's environment (see .env.example). Refusing to build a page " +
          "whose call to action points at a development URL.",
      );
    }
    for (const key of REQUIRED_FOR_PRODUCTION) {
      let url: URL;
      try {
        url = new URL(env[key]?.trim() ?? "");
      } catch {
        throw new Error(`[eduformation-landing] ${key} must be an absolute HTTP(S) URL.`);
      }
      if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
        throw new Error(`[eduformation-landing] ${key} must be an HTTP(S) URL without credentials, a query, or a fragment.`);
      }
      if (key === "VITE_SITE_URL" && url.pathname !== "/") {
        throw new Error("[eduformation-landing] VITE_SITE_URL must be the site's origin, without a path.");
      }
    }
  }

  return env;
}

/**
 * Emits robots.txt and sitemap.xml from VITE_SITE_URL, and resolves any
 * `%VITE_SITE_URL%` placeholder left in index.html (dev, or a build where the
 * variable is only known to this plugin).
 */
function siteMetadata(siteUrl: string): Plugin {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
`;

  return {
    name: "eduformation-site-metadata",

    transformIndexHtml: {
      order: "pre",
      handler(html) {
        return html.replaceAll("%VITE_SITE_URL%", siteUrl);
      },
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(robots);
          return;
        }
        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(sitemap);
          return;
        }
        next();
      });
    },

    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap });
    },
  };
}

/**
 * Pre-render this one route in all supported languages. English remains the
 * crawler/no-JS default; the head's locale script selects an inert localized
 * template before paint. React hydrates that same markup when its bundle loads.
 * This keeps the content visible while JavaScript is still in transit.
 */
function prerenderSinglePage(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "eduformation-prerender",
    apply: "build",
    configResolved(resolved) {
      config = resolved;
    },
    async closeBundle() {
      const server = await createServer({
        configFile: config.configFile,
        mode: config.mode,
        server: { middlewareMode: true },
        appType: "custom",
        logLevel: "silent",
      });
      try {
        const loaded: unknown = await server.ssrLoadModule("/src/App.tsx");
        const { default: App } = loaded as { default: ComponentType<{ initialLocale: "en" | "fr" | "ar" }> };
        const render = (initialLocale: "en" | "fr" | "ar") =>
          renderToString(createElement(StrictMode, null, createElement(App, { initialLocale })));
        const [english, french, arabic] = [render("en"), render("fr"), render("ar")];
        const localized = `
    <template id="prerender-fr">${french}</template>
    <template id="prerender-ar">${arabic}</template>
    <script>
      (function () {
        var root = document.getElementById("root");
        var lang = document.documentElement.lang;
        var template = document.getElementById("prerender-" + lang);
        if (root && template && template.content) root.replaceChildren(template.content.cloneNode(true));
        document.documentElement.dataset.localeReady = "true";
      })();
    </script>`;
        const root = `<div id="root" data-prerendered="true" data-build-year="${new Date().getFullYear()}">${english}</div>${localized}`;
        const htmlPath = resolve(config.root, config.build.outDir, "index.html");
        const html = await readFile(htmlPath, "utf8");
        const fallback = /<div id="root">[\s\S]*?<\/div>/;
        if (!fallback.test(html)) throw new Error("Could not find the static root to pre-render.");
        const output = html.replace(fallback, () => root);
        await writeFile(htmlPath, output);
        const raw = (Buffer.byteLength(output) / 1000).toFixed(2);
        const gzip = (gzipSync(output).length / 1000).toFixed(2);
        config.logger.info(`Pre-rendered index.html: ${raw} kB | gzip: ${gzip} kB`);
      } finally {
        await server.close();
      }
    },
  };
}

export default defineConfig(({ mode, command }) => {
  const env = environment(mode, command === "build");
  const siteUrl = trimTrailingSlash((env.VITE_SITE_URL?.trim() || DEV_DEFAULT_SITE_URL));

  /**
   * `npm run dev` / `npm run preview` bind to localhost by default. Set
   * SITE_PREVIEW=1 when serving through a reverse proxy (tunnels, sandboxed
   * previews) so the host header check does not reject the proxied origin.
   */
  const proxied = process.env.SITE_PREVIEW === "1";
  const served = {
    host: proxied ? "0.0.0.0" : "127.0.0.1",
    allowedHosts: proxied ? (true as const) : undefined,
  };

  return {
    plugins: [react(), tailwindcss(), siteMetadata(siteUrl), prerenderSinglePage()],
    server: { ...served, port: 5173 },
    preview: { ...served, port: 4173 },
    build: { target: "es2022", cssCodeSplit: false },
    test: {
      environment: "node",
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      restoreMocks: true,
    },
  };
});
