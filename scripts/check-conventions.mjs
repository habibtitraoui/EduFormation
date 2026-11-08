import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { gzipSync } from "node:zlib";

import ts from "typescript";

const violations = [];
const componentRoots = ["src/components", "src/sections"];
const copyRoot = "src/content";

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  }));
  return paths.flat();
}

const bannedClasses = /(?:^|[\s:])(?:(?:pl|pr|ml|mr|left|right|text-left|text-right|space-x|divide-x)-|(?:blur-3xl|rounded-2xl|rounded-3xl|rounded-full|bg-gradient|bg-clip-text|from-indigo|to-violet|animate-pulse)\b)/;
const rawHex = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/;
const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const voice = /\b(?:seamless|revolutionary|elevate|unleash|supercharge|cutting-edge|empower)\b/i;
const visibleAttributes = new Set(["aria-label", "alt", "title", "placeholder"]);

function issue(file, source, node, message) {
  const { line } = source.getLineAndCharacterOfPosition(node.getStart(source));
  violations.push(`${file}:${line + 1}: ${message}`);
}

for (const root of [...componentRoots, copyRoot]) {
  for (const file of (await filesIn(root)).filter((path) => [".ts", ".tsx"].includes(extname(path)))) {
    const source = ts.createSourceFile(file, await readFile(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const isComponent = root !== copyRoot;
    const visit = (node) => {
      if (isComponent && ts.isJsxText(node) && node.getText(source).trim()) {
        issue(file, source, node, "Literal JSX text belongs in a dictionary.");
      }
      if (isComponent && ts.isJsxAttribute(node) && visibleAttributes.has(node.name.getText(source)) && node.initializer && ts.isStringLiteral(node.initializer)) {
        issue(file, source, node, "Literal accessible text belongs in a dictionary.");
      }
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        const value = node.text;
        if (isComponent && rawHex.test(value)) issue(file, source, node, "Raw hex colour in a component.");
        if (isComponent && bannedClasses.test(value)) issue(file, source, node, "Physical-direction or banned Tailwind utility.");
        if (emoji.test(value)) issue(file, source, node, "Emoji in page content.");
        if (root === copyRoot && (voice.test(value) || value.includes("!"))) issue(file, source, node, "Banned marketing voice in copy.");
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
}

try {
  const assets = await filesIn("dist/assets");
  for (const file of assets.filter((path) => path.endsWith(".css"))) {
    const css = await readFile(file, "utf8");
    if (/blur-3xl|rounded-3xl|rounded-2xl|bg-gradient|from-indigo|to-violet/.test(css)) {
      violations.push(`${file}: banned utility in built CSS.`);
    }
    if (gzipSync(css).length > 25_000) violations.push(`${file}: CSS exceeds 25 KB gzipped.`);
  }
  const scripts = await Promise.all(assets.filter((path) => path.endsWith(".js")).map((path) => readFile(path)));
  if (scripts.reduce((sum, data) => sum + gzipSync(data).length, 0) > 130_000) {
    violations.push("dist/assets: initial JavaScript exceeds 130 KB gzipped.");
  }
  // Bound the worst-case transferred size, including all three fonts and the OG
  // asset even though an ordinary visit will not request the latter. Text files
  // are gzip-compressed on Vercel; WOFF2 and PNG are already compressed.
  const outputFiles = await filesIn("dist");
  const sizes = await Promise.all(outputFiles.map(async (path) => {
    const data = await readFile(path);
    return /\.(?:html|css|js|svg|xml|txt)$/.test(path) ? gzipSync(data).length : data.length;
  }));
  const total = sizes.reduce((sum, size) => sum + size, 0);
  if (total > 700_000) violations.push(`dist: compressed output exceeds 700 KB (${total} bytes).`);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

if (violations.length > 0) {
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Conventions and available build budgets pass.");
}
