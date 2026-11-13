import { useId, useSyncExternalStore } from "react";

import { contact } from "../lib/config";
import { cn } from "../lib/cn";
import { fillTemplate, formatYear } from "../lib/format";
import { useLocale } from "../lib/locale";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";

const linkClass =
  "text-body-sm text-muted transition-colors duration-150 hover:text-fg rounded-control w-fit";

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
    { label: t.nav.live, href: "#live" },
    { label: t.nav.certificates, href: "#certificates" },
    { label: t.nav.admin, href: "#admin" },
  ];

  const resourceLinks = [
    { label: t.footer.security, href: "#protection" },
    { label: t.nav.faq, href: "#faq" },
  ];

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto w-full max-w-page px-5 py-16 md:px-6 md:py-20 xl:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Wordmark />
            <p className="max-w-prose text-body-sm text-muted">{t.footer.tagline}</p>
            <div className="flex items-center gap-2">
              <LocaleSwitcher />
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

          <nav aria-labelledby={`${ids}-contact`}>
            <p id={`${ids}-contact`} className="text-label text-fg">
              {t.footer.contact}
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <a href={`mailto:${contact.email}`} className={cn(linkClass, "break-all font-mono text-label")}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a href="#contact-form" className={linkClass}>
                  {t.nav.contact}
                </a>
              </li>
            </ul>
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
