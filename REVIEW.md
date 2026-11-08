# Review

## Built
- One responsive, statically pre-rendered React landing page in English, French and RTL Arabic, with light/dark/system themes.
- Eleven requested sections, token-based product illustrations, honest protection limits, accessible navigation, FAQ and configurable demo flow.
- SEO metadata, single-URL sitemap/robots, designed OG card, Vercel configuration, automated checks and preview-based CI.
- Local Lighthouse: 100/100/100/100 mobile and desktop; actual Slow 4G/4× CPU: LCP 1.62–1.76 s, CLS ≤0.0019 across locales.

## Three decisions
1. Pre-render all three language variants on the single route, select the stored/browser locale before paint, and hydrate the existing markup for a fast first render.
2. Use `text-muted` instead of low-contrast light-theme `text-subtle` for small text: the supplied subtle token fails AA on the supplied surfaces.
3. Treat an empty contact or the example address as absent; use a form only with an endpoint, otherwise a real email becomes a mailto link.

## Deliberate omissions and limitations
- No demo/contact column or CTA is shown until an owner supplies an endpoint or real address; no customer proof assets were supplied.
- No privacy/terms or design-system link without real destinations; no pricing, signup, billing, invented usage metrics, logos or testimonials.
- The app source files requested for verbatim copying were absent from this checkout. Tokens came from the brief; fonts and used primitives were reconstructed as documented in README. Unused Skeleton/Textarea were not ported.
- Browser/axe and Lighthouse checks are reproducible via the README; production network and device performance still need monitoring after deployment.
- No production audit vulnerabilities; a moderate transitive development-tool advisory and ESLint 9 support status are noted in the README.
