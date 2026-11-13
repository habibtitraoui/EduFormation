# EduFormation landing page

A static brand landing page for H2D.dev and the EduFormation training platform. It describes the platform's capabilities and their limits; it does not implement the application, authentication, billing, or a dashboard.

## Stack and local development

- React 19, TypeScript 5 (strict), Vite, and Tailwind CSS v4 via the Vite plugin.
- Lucide icons, `clsx`/`tailwind-merge`, ESLint 9, Vitest, Playwright, axe-core and Lighthouse.
- Node.js **22.19 or later** and npm are required.

```sh
npm ci
cp .env.example .env        # edit as described below
npm run dev                  # http://localhost:5173
npm run build                # type-check, locale tests, build and pre-render dist/
npm run preview              # serve the actual production build on port 4173
```

`npm run verify` runs lint, convention checks, type-checking, Vitest and the production build, then checks the built CSS and size budgets. Set `SITE_PREVIEW=1` when using a reverse-proxied development or preview server; this permits the proxy host and binds it to `0.0.0.0`.

## Configuration

All variables are read at **build time**. `.env.example` contains examples, not production settings. Set these in your host's build environment:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Canonical origin of this site, without a path. Required for production; used for canonical, Open Graph, JSON-LD, robots and sitemap URLs. |
| `VITE_CONTACT_EMAIL` | Contact address used by the form's email fallback and direct email links. Defaults to `titraoui.habibe@gmail.com`. |
| `VITE_CONTACT_ENDPOINT` | Optional URL accepting a JSON `POST` containing `name`, `email`, and `message`. When set, the contact form submits there; configure CORS if the endpoint is on another origin. |

Without a contact endpoint, the form validates the visitor's details and opens a prefilled message in their email app. The visitor must send the message from that app; the website does not claim delivery. When an endpoint is configured, failures are reported as failures and the endpoint is responsible for delivering the inquiry. No Instagram profile was provided, so the page does not link to an unverified account.

Arabic is the default language and the page sets `lang="ar"` and `dir="rtl"` before paint. English and French remain available through the language switcher. The switcher persists the choice; the charcoal-and-blue dark theme is the default and is applied in the document head before paint. Visitors can switch to light mode or follow their system preference. Both choices are stored locally and are not sent to a server.

## Static output and deployment

Deploy `dist/` after setting the canonical site origin. A small build plugin pre-renders this **one route** in Arabic, with inert English and French templates selected before paint. React hydrates the matching markup; with JavaScript disabled the Arabic page and its real links remain readable. This avoids waiting for the JavaScript bundle before displaying the page. The build also generates `robots.txt` and the single-URL `sitemap.xml` from `VITE_SITE_URL`; the files in `public/` are source templates, not deployment output. Serve HTML, CSS and JS with gzip or Brotli enabled.

`vercel.json` supplies the SPA fallback, immutable asset caching, short HTML caching, and the requested security headers. Other static hosts need equivalent settings. The Open Graph image is generated from `scripts/og-card.html`; run `npm run og:generate` after installing Playwright's Chromium to regenerate it.

## Verification

```sh
npx playwright install --with-deps chromium
npm run preview              # in another terminal, after npm run build
npm run test:browser         # viewport/locale/theme matrix, axe, keyboard, no-JS
npm run test:performance     # actual 400 ms / 400 kbit/s / 4x CPU mobile throttle
npm run audit:lighthouse     # mobile and desktop budgets
```

The optional form and email-only configurations are also built and exercised against the preview in `.github/workflows/ci.yml`; their POST requests are intercepted, never sent to a real inbox. `BASE_URL` selects another preview origin, and `CHROMIUM_PATH` may point to an existing Chromium executable. Performance scores depend on device, server and network; remeasure on the deployed origin.

At verification time `npm audit --omit=dev` reports no production vulnerabilities. The full development dependency tree reports a moderate `minimatch` advisory through the TypeScript ESLint tooling; the required ESLint 9 major is also marked unsupported by the registry. Neither is included in the browser bundle. Recheck these advisories when upgrading the prescribed tooling.

## Source assets and attribution

The supplied checkout contained only an initial README, not the application files named in the hand-off. **No files could be copied verbatim from the app repository**, and no `next/link` replacement was made. The token values were transcribed from the provided specification; `cn` and the used UI primitives were reconstructed from that specification. `cn` additionally teaches `tailwind-merge` the named type scale so size utilities do not remove text colours. The unused application `Skeleton`/`Textarea` could not be ported from unavailable source and are not rendered here. To verify byte-for-byte parity, the owner must supply the original app files.

The self-hosted Inter, Geist Mono and Noto Sans Arabic variable WOFF2 files were obtained from `@fontsource-variable` 5.3.0 rather than the unavailable application tree; their OFL licences are in `src/fonts/`. They are not claimed to be byte-identical to the app's copies. No font CDN, stock photography, analytics, or invented customer proof is used.
