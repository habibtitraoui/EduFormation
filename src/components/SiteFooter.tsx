import { useId, useSyncExternalStore } from "react";

import { fillTemplate, formatYear } from "../lib/format";
import { useLocale } from "../lib/locale";

import { FooterSocialLinks } from "./FooterSocialLinks";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

const linkClass =
  "w-fit rounded-control text-body-sm text-muted transition-colors duration-150 hover:text-accent hover:underline";

function currentYear(): number {
  return new Date().getFullYear();
}

function buildYear(): number {
  if (typeof document === "undefined") return currentYear();
  const value = document.getElementById("root")?.dataset.buildYear;
  const parsed = Number(value);
  return value && Number.isInteger(parsed) ? parsed : currentYear();
}

function subscribeYear(listener: () => void): () => void {
  const timer = window.setInterval(listener, 60 * 60 * 1000);
  return () => window.clearInterval(timer);
}

/**
 * Four columns at ≥ 768px, stacked below (§7.12). Privacy and Terms are omitted
 * rather than pointed at `#`: the owner has not supplied those pages.
 */
export function SiteFooter() {
  const { t, locale } = useLocale();
  const ids = useId();
  const year = useSyncExternalStore(subscribeYear, currentYear, buildYear);
  const productLinks = [
    { label: t.footer.courses, href: "#features" },
    { label: t.nav.structure, href: "#structure" },
    { label: t.nav.live, href: "#live" },
    { label: t.nav.certificates, href: "#certificates" },
    { label: t.nav.admin, href: "#admin" },
  ];

  const resourceLinks = [
    { label: t.how.title, href: "#how" },
    { label: t.footer.security, href: "#protection" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto w-full max-w-page px-5 py-11 md:px-10 md:py-14 xl:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <a href="#hero" className="w-fit rounded-control"><Wordmark /></a>
            <p className="max-w-prose text-body-sm text-muted">{t.footer.tagline}</p>
            <div className="flex flex-wrap items-start gap-2">
              <LocaleSwitcher placement="footer" className="max-w-40 flex-1 basis-32" />
              <ThemeToggle />
            </div>
          </div>

          <nav aria-labelledby={`${ids}-product`}>
            <p id={`${ids}-product`} className="text-label text-fg">
              {t.footer.product}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {productLinks.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby={`${ids}-resources`}>
            <p id={`${ids}-resources`} className="text-label text-fg">
              {t.footer.resources}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav id="footer-contact" tabIndex={-1} aria-labelledby={`${ids}-contact`} className="scroll-mt-20">
            <p id={`${ids}-contact`} className="text-label text-fg">
              {t.footer.contact}
            </p>
            <a href="#contact-form" className={`mt-3 inline-block ${linkClass}`}>
              {t.hero.ctaPrimary}
            </a>
            <FooterSocialLinks />
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-meta text-muted">
            {fillTemplate(t.footer.legal, { year: formatYear(year, locale) })}
          </p>
        </div>
      </div>
    </footer>
  );
}
