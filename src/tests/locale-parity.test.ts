import { describe, expect, it } from "vitest";

import { ar } from "../content/ar";
import { en } from "../content/en";
import { fr } from "../content/fr";

function flatten(value: unknown, path = ""): Record<string, string | number> {
  if (typeof value === "string" || typeof value === "number") return { [path]: value };
  if (value === null || typeof value !== "object") throw new Error(`Unexpected dictionary value at ${path}`);
  return Object.fromEntries(
    Object.entries(value).flatMap(([key, child]) => Object.entries(flatten(child, path ? `${path}.${key}` : key))),
  );
}

const dictionaries = { en: flatten(en), fr: flatten(fr), ar: flatten(ar) };

describe("landing-page translations", () => {
  it("have identical keys and array entries", () => {
    const keys = Object.keys(dictionaries.en).sort();
    expect(Object.keys(dictionaries.fr).sort()).toEqual(keys);
    expect(Object.keys(dictionaries.ar).sort()).toEqual(keys);
  });

  it("contain no empty strings", () => {
    for (const dictionary of Object.values(dictionaries)) {
      for (const [key, value] of Object.entries(dictionary)) {
        if (typeof value === "string") expect(value.trim(), key).not.toBe("");
      }
    }
  });

  it("keeps English and French free of Arabic script", () => {
    for (const locale of ["en", "fr"] as const) {
      for (const [key, value] of Object.entries(dictionaries[locale])) {
        if (typeof value === "string") expect(value, key).not.toMatch(/\p{Script=Arabic}/u);
      }
    }
  });

  it("keeps Arabic free of long untranslated Latin runs", () => {
    for (const [key, value] of Object.entries(dictionaries.ar)) {
      if (typeof value === "string") expect(value, key).not.toMatch(/[A-Za-z]{20,}/);
    }
  });

  it("preserves the stipulated English SEO and honest protection copy", () => {
    expect(en.meta.description.length).toBeLessThanOrEqual(155);
    expect(en.protection.drm).toBe(
      "DRM is the only mechanism that makes captures come out black; EduFormation supports it when your stream is packaged for it.",
    );
  });
});
