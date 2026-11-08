import { appRoutes } from "../lib/config";
import { useLocale } from "../lib/locale";
import { sectionNav } from "../lib/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { Wordmark } from "./Wordmark";
import { ButtonLink } from "./ui";

/**
 * Sticky hairline bar (§6): no shadow and no blur when scrolled, `bg-canvas/95`
 * at most. The in-page navigation needs 1280px before it fits next to the
 * wordmark and the controls, so below that the disclosure menu carries it.
 */
export function SiteHeader() {
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95">
      <div className="mx-auto flex h-14 w-full max-w-page items-center gap-3 px-5 md:px-6 lg:h-16 xl:px-8">
        <Wordmark />

        <nav aria-label={t.nav.sectionLabel} className="hidden items-center gap-1 xl:flex">
          {sectionNav(t).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-control px-2.5 py-2 text-body-sm text-muted transition-colors duration-150 hover:bg-inset hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <LocaleSwitcher className="hidden md:block" />
          <ThemeToggle />
          <ButtonLink href={appRoutes.login} variant="secondary" size="sm" className="hidden xl:inline-flex">
            {t.nav.signIn}
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
