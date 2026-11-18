import { Check, ChevronDown, Globe } from "lucide-react";
import { useEffect, useId, useRef } from "react";

import { LOCALES, LOCALE_DIRECTION, LOCALE_ENDONYM } from "../content/types";
import { cn } from "../lib/cn";
import { useDisclosure } from "../lib/disclosure";
import { useLocale } from "../lib/locale";

type LocaleSwitcherProps = {
  className?: string | undefined;
  placement?: "header" | "mobile-menu" | "footer";
};

/** Inline options stay inside the scrollable mobile menu or the footer column. */
export function LocaleSwitcher({ className, placement = "header" }: LocaleSwitcherProps) {
  const { locale, setLocale, t } = useLocale();
  const { isOpen, toggle, hide, containerRef, triggerRef } = useDisclosure();
  const panelId = useId();
  const optionsRef = useRef<HTMLDivElement>(null);
  const inline = placement !== "header";
  const inFooter = placement === "footer";

  useEffect(() => {
    if (!inline || !isOpen) return;
    optionsRef.current?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
  }, [inline, isOpen]);

  return (
    <div ref={containerRef} className={cn("js-only relative min-w-0", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={(event) => {
          // Some touch browsers do not focus buttons on tap. Keep nested Escape
          // handling and returning focus to this trigger consistent.
          event.currentTarget.focus({ preventScroll: true });
          toggle();
        }}
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={`${t.footer.locale}: ${LOCALE_ENDONYM[locale]}`}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-control border border-line bg-panel px-2.5",
          "transition-colors duration-150 hover:bg-inset",
          inline && "w-full",
          inFooter && "scroll-mt-20",
        )}
      >
        <Globe className="size-4 shrink-0 text-muted" aria-hidden="true" />
        <span lang={locale} dir={LOCALE_DIRECTION[locale]} className="min-w-0 text-label text-fg">{LOCALE_ENDONYM[locale]}</span>
        <ChevronDown
          className={cn("ms-auto size-4 shrink-0 text-muted transition-transform duration-200", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          id={panelId}
          ref={optionsRef}
          className={cn(
            "border border-line bg-panel p-1",
            inline
              ? "mt-2 w-full scroll-mb-2 rounded-card"
              : "absolute top-full end-0 z-50 mt-1 max-h-[calc(100dvh-4.25rem)] w-44 overflow-y-auto overscroll-contain rounded-overlay shadow-overlay",
            // The footer lacks a scrollable parent. Leave space for the sticky
            // header and scroll the list itself on very short screens.
            inFooter && "max-h-[calc(100dvh-5.75rem)] scroll-mt-20 overflow-y-auto",
          )}
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
                  "flex min-h-11 w-full items-center justify-between gap-2 rounded-control px-3 py-2 text-start text-body-sm",
                  "transition-colors duration-150 hover:bg-inset",
                  isCurrent ? "bg-accent-soft font-medium text-accent" : "text-fg",
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
