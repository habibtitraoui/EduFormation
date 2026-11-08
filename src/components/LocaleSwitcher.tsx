import { Check, ChevronDown, Globe } from "lucide-react";
import { useId } from "react";

import { LOCALES, LOCALE_DIRECTION, LOCALE_ENDONYM } from "../content/types";
import { cn } from "../lib/cn";
import { useDisclosure } from "../lib/disclosure";
import { useLocale } from "../lib/locale";

/**
 * A simple disclosure, not a `role="menu"` (§10): three buttons, `aria-expanded`
 * on the trigger, Escape and outside clicks close it. Each language is listed in
 * its own script in every locale.
 */
export function LocaleSwitcher({ className }: { className?: string | undefined }) {
  const { locale, setLocale, t } = useLocale();
  const { isOpen, toggle, hide, containerRef, triggerRef } = useDisclosure();
  const panelId = useId();

  return (
    <div ref={containerRef} className={cn("js-only relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${t.footer.locale}: ${LOCALE_ENDONYM[locale]}`}
        className={cn(
          "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-control border border-line bg-panel px-2.5",
          "transition-colors duration-150 hover:bg-inset",
        )}
      >
        <Globe className="h-5 w-5 text-muted" aria-hidden="true" />
        <span lang={locale} dir={LOCALE_DIRECTION[locale]} className="text-label text-fg">{LOCALE_ENDONYM[locale]}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-muted transition-transform duration-200", isOpen ? "rotate-180" : undefined)}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          className="absolute top-full end-0 z-50 mt-1 w-44 rounded-overlay border border-line bg-panel p-1 shadow-overlay"
        >
          {LOCALES.map((option) => {
            const isCurrent = option === locale;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setLocale(option);
                  hide(true);
                }}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "flex w-full items-center justify-between gap-2 rounded-control px-3 py-2 text-start text-body-sm",
                  "transition-colors duration-150 hover:bg-inset",
                  isCurrent ? "font-medium text-fg" : "text-muted",
                )}
              >
                <span lang={option} dir={LOCALE_DIRECTION[option]}>{LOCALE_ENDONYM[option]}</span>
                {isCurrent ? <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
