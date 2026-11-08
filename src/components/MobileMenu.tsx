import { Menu, X } from "lucide-react";
import { useId, type MouseEvent } from "react";

import { appRoutes } from "../lib/config";
import { cn } from "../lib/cn";
import { useDisclosure } from "../lib/disclosure";
import { useLocale } from "../lib/locale";
import { demoTarget, sectionNav } from "../lib/navigation";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { ButtonLink } from "./ui";

/**
 * Disclosure panel (§6): closes on Escape and on navigation, traps Tab, and
 * returns focus to the trigger. The only animation is a 150ms opacity fade
 * between the two icons.
 */
export function MobileMenu({ className }: { className?: string | undefined }) {
  const { t } = useLocale();
  const { isOpen, toggle, hide, containerRef, triggerRef } = useDisclosure({ trapFocus: true, focusOnOpen: true });
  const panelId = useId();
  const demo = demoTarget(t);

  /** Focus the section itself so keyboard context survives the closed panel. */
  function onNavigate(event: MouseEvent<HTMLAnchorElement>) {
    hide(false);
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    target?.focus({ preventScroll: true });
  }

  return (
    <div ref={containerRef} className={cn("js-only relative xl:hidden", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? t.nav.close : t.nav.menu}
        className={cn(
          "grid h-8 w-8 place-items-center rounded-control border border-line bg-panel text-muted",
          "transition-colors duration-150 hover:bg-inset hover:text-fg",
        )}
      >
        <span className="relative grid h-5 w-5 place-items-center">
          <Menu
            className={cn("absolute h-5 w-5 transition-opacity duration-150", isOpen ? "opacity-0" : "opacity-100")}
            aria-hidden="true"
          />
          <X
            className={cn("absolute h-5 w-5 transition-opacity duration-150", isOpen ? "opacity-100" : "opacity-0")}
            aria-hidden="true"
          />
        </span>
      </button>

      {isOpen ? (
        <div
          id={panelId}
          className={cn(
            "absolute top-full end-0 z-50 mt-2 max-h-[calc(100dvh-72px)] w-72 max-w-[calc(100vw-40px)] overflow-y-auto rounded-overlay border border-line",
            "bg-panel p-3 shadow-overlay",
          )}
        >
          <nav aria-label={t.nav.sectionLabel}>
            <ul className="flex flex-col">
              {sectionNav(t).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onNavigate}
                    className="block rounded-control px-3 py-2 text-body-sm text-muted transition-colors duration-150 hover:bg-inset hover:text-fg"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-3 flex items-center gap-2 border-t border-line pt-3">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <ButtonLink href={appRoutes.login} size="sm" onClick={() => hide(false)}>
              {t.nav.openPlatform}
            </ButtonLink>
            {demo !== null ? (
              <ButtonLink href={demo} variant="secondary" size="sm" onClick={() => hide(false)}>
                {t.nav.requestDemo}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
