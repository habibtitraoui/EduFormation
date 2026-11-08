import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { ar } from "../content/ar";
import { en } from "../content/en";
import { fr } from "../content/fr";
import {
  isLocale,
  LOCALE_DIRECTION,
  type Copy,
  type Direction,
  type Locale,
} from "../content/types";

const STORAGE_KEY = "eduformation-landing-locale";

const DICTIONARIES: Record<Locale, Copy> = { en, fr, ar };

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const candidates = navigator.languages ?? [navigator.language];
  for (const candidate of candidates) {
    const [primary] = candidate.toLowerCase().split("-");
    if (isLocale(primary)) return primary;
  }
  return "en";
}

function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    /* Storage blocked: fall through to the browser language. */
    return null;
  }
}

type LocaleContextValue = {
  locale: Locale;
  direction: Direction;
  isRtl: boolean;
  /** The active dictionary. No component holds a literal user-facing string. */
  t: Copy;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(() => initialLocale ?? readStoredLocale() ?? detectLocale());

  const direction = LOCALE_DIRECTION[locale];
  const t = DICTIONARIES[locale];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = direction;
    document.title = t.meta.title;

    const description = document.querySelector("meta[name='description']");
    if (description !== null) {
      description.setAttribute("content", t.meta.description);
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* Not fatal: the choice simply will not survive a reload. */
    }
  }, [locale, direction, t]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, direction, isRtl: direction === "rtl", t, setLocale }),
    [locale, direction, t, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (context === null) {
    throw new Error("useLocale must be used inside <LocaleProvider>.");
  }
  return context;
}
