import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared behaviour for the two disclosures on this page (mobile navigation and
 * the locale switcher): Escape closes, an outside click closes, focus
 * returns to the trigger, and — optionally — Tab is trapped inside the panel.
 */

const FOCUSABLE =
  "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

export type DisclosureOptions = {
  /** Keep Tab inside the panel while it is open (the mobile menu needs this). */
  trapFocus?: boolean;
  /** Move focus into the panel as soon as it opens. */
  focusOnOpen?: boolean;
};

export function useDisclosure({ trapFocus = false, focusOnOpen = false }: DisclosureOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const restoreTarget = useRef<HTMLElement | null>(null);
  const shouldRestore = useRef(false);

  const show = useCallback(() => {
    const active = document.activeElement;
    restoreTarget.current = active instanceof HTMLElement ? active : triggerRef.current;
    setIsOpen(true);
  }, []);

  /** `restoreFocus` is false for outside clicks: focus belongs to what was clicked. */
  const hide = useCallback((restoreFocus: boolean) => {
    shouldRestore.current = restoreFocus;
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      hide(true);
    } else {
      show();
    }
  }, [isOpen, hide, show]);

  useEffect(() => {
    if (isOpen) {
      if (!focusOnOpen) return;
      const first = containerRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
      return;
    }

    if (!shouldRestore.current) return;
    shouldRestore.current = false;
    const target = restoreTarget.current;
    restoreTarget.current = null;
    if (target !== null && document.contains(target)) {
      target.focus({ preventScroll: true });
      // Honor scroll margins (e.g. the footer toggle below the sticky header).
      target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
    }
  }, [isOpen, focusOnOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        // A locale disclosure nested in the mobile menu handles Escape first.
        event.stopPropagation();
        hide(true);
        return;
      }
      if (!trapFocus || event.key !== "Tab") return;

      const container = containerRef.current;
      if (container === null) return;

      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.tabIndex !== -1,
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const container = containerRef.current;
    container?.addEventListener("keydown", onKeyDown);
    return () => {
      container?.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, trapFocus, hide]);

  useEffect(() => {
    if (!isOpen) return;

    // Wait for activation before collapsing inline content. A pointerdown
    // would move links below the disclosure before the click reaches them.
    const onOutsideClick = (event: MouseEvent) => {
      const container = containerRef.current;
      // A selection can already have unmounted its button by the time the
      // event reaches the document. The original event path is still intact.
      if (!container || event.composedPath().includes(container)) return;
      hide(false);
    };

    document.addEventListener("click", onOutsideClick);
    return () => {
      document.removeEventListener("click", onOutsideClick);
    };
  }, [isOpen, hide]);

  return { isOpen, show, hide, toggle, containerRef, triggerRef } as const;
}
