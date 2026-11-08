import type { Copy } from "./en";

export type { Copy };

export const LOCALES = ["en", "fr", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export type Direction = "ltr" | "rtl";

/** Endonyms: each language is always listed in its own script (§9). */
export const LOCALE_ENDONYM: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
};

export const LOCALE_DIRECTION: Record<Locale, Direction> = {
  en: "ltr",
  fr: "ltr",
  ar: "rtl",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value !== undefined && value !== null && (LOCALES as readonly string[]).includes(value);
}

/** The FAQ is keyed q1…q8 / a1…a8 (Appendix B); this keeps the pairing typed. */
export type FaqIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const FAQ_INDICES: readonly FaqIndex[] = [1, 2, 3, 4, 5, 6, 7, 8];

export function faqItems(copy: Copy): { id: number; question: string; answer: string }[] {
  return FAQ_INDICES.map((index) => ({
    id: index,
    question: copy.faq[`q${index}`],
    answer: copy.faq[`a${index}`],
  }));
}
