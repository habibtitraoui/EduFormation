import { ArrowUpRight } from "lucide-react";

import { useLocale } from "../lib/locale";
import { sectionNav } from "../lib/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "./ui";

export function SiteHeader() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-panel">
      <div className="mx-auto grid min-h-18 w-full max-w-page grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:px-10 xl:grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] xl:gap-5 xl:px-8">
        <a href="#hero" className="w-fit rounded-control"><Wordmark /></a>

        <nav aria-label={t.nav.sectionLabel} className="hidden items-center gap-3 xl:flex">
          {sectionNav(t).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-control px-3 py-2 text-body-sm font-medium text-fg transition-colors duration-150 hover:bg-accent-soft hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2">
          <LocaleSwitcher className="hidden md:block" />
          <ThemeToggle />
          <ButtonLink href="#contact-form" size="sm" className="hidden whitespace-nowrap sm:inline-flex">
            {t.hero.ctaPrimary}<ArrowUpRight className="size-3.5 shrink-0 rtl:-scale-x-100" aria-hidden="true" />
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
