/**
 * Numbers, dates and durations go through `Intl` with the active locale (§9).
 *
 * Digits stay Latin (`numberingSystem: "latn"`) wherever they are rendered in
 * the mono face with tabular figures — durations, record codes, the copyright
 * year — because that is the product's format ("12 min") and because Geist Mono
 * has no Arabic-Indic glyphs to fall back to.
 */

const TABULAR_OPTIONS: Intl.NumberFormatOptions = { numberingSystem: "latn", useGrouping: false };

export function formatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, TABULAR_OPTIONS).format(value);
}

/** "12 min" — number through Intl, unit supplied by the dictionary. */
export function formatDuration(minutes: number, locale: string, unit: string): string {
  return `${formatNumber(minutes, locale)} ${unit}`;
}

export function formatYear(year: number, locale: string): string {
  return new Intl.NumberFormat(locale, TABULAR_OPTIONS).format(year);
}

/** Replaces `{name}` placeholders in a dictionary string. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const replacement = values[key];
    return replacement === undefined ? match : String(replacement);
  });
}
