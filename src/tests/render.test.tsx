import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import App from "../App";
import { cn } from "../lib/cn";
import { fillTemplate, formatDuration, formatNumber } from "../lib/format";

describe("static rendering", () => {
  const html = renderToStaticMarkup(<App />);

  it("renders one heading, landmarks and sections in the specified order", () => {
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    expect(html).toContain('<a href="#main"');
    expect(html).toContain('<main id="main"');
    expect(html).toContain("<header");
    expect(html).toContain("<footer");
    const ids = ["hero", "capabilities", "structure", "features", "certificates", "live", "admin", "protection", "how", "faq", "get-started"];
    const positions = ids.map((id) => html.indexOf(`<section id="${id}"`));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
  });

  it("renders formatted certificate specifications rather than template placeholders", () => {
    expect(html).toContain("3508 px PNG (300 DPI)");
    expect(html).toContain("297 × 210 mm");
    expect(html).not.toContain("{pixels}");
    expect(html).not.toContain("{dpi}");
  });

  it("renders eight native, mutually exclusive FAQ disclosures", () => {
    expect(html.match(/<details\b/g)).toHaveLength(8);
    expect(html.match(/<details[^>]* name="faq"/g)).toHaveLength(8);
    expect(html.match(/<details[^>]* open=""/g)).toHaveLength(1);
    expect(html).not.toContain('role="menu"');
  });
});

describe("design helpers", () => {
  it("preserves custom type and colour utilities when merging", () => {
    expect(cn("bg-ink text-ink-fg", "text-body-sm")).toContain("text-ink-fg");
    expect(cn("text-card text-fg")).toBe("text-card text-fg");
    expect(cn("text-muted", "text-fg")).toBe("text-fg");
  });

  it("formats illustrative values through Intl and interpolates copy", () => {
    expect(formatNumber(12, "ar")).toBe("12");
    expect(formatDuration(12, "en", "min")).toBe("12 min");
    expect(fillTemplate("Reply to {email}", { email: "name@example.org" })).toBe("Reply to name@example.org");
  });
});
