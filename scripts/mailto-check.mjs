import assert from "node:assert/strict";

import { chromium } from "@playwright/test";

// Run against a build with VITE_CONTACT_EMAIL=contact@training.example and an
// empty VITE_CONTACT_ENDPOINT. No request to a mail server is made.
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4175";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 360, height: 900 },
    storageState: {
      cookies: [],
      origins: [{ origin: new URL(baseUrl).origin, localStorage: [{ name: "eduformation-landing-locale", value: "en" }] }],
    },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const hero = page.locator("#hero").getByRole("link", { name: "Request a demo" });
  const final = page.locator("#get-started").getByRole("link", { name: "Request a demo" });
  const href = await hero.getAttribute("href");
  assert(href?.startsWith("mailto:contact@training.example?"));
  assert.equal(await final.getAttribute("href"), href, "Both CTAs use the same destination");
  const mailto = new URL(href);
  assert.equal(mailto.searchParams.get("subject"), "EduFormation demo request");
  assert(mailto.searchParams.get("body")?.includes("EduFormation"));
  assert.equal(await page.locator("#demo").count(), 0, "No form is rendered without an endpoint");
  assert.equal(await page.locator('footer a[href="mailto:contact@training.example"]').count(), 1);
  await page.locator("footer").getByRole("button", { name: "Language: English" }).click();
  await page.locator("footer").getByRole("button", { name: "Français" }).click();
  const frenchHref = await page.locator("#hero").getByRole("link", { name: "Demander une démonstration" }).getAttribute("href");
  assert.equal(new URL(frenchHref).searchParams.get("subject"), "Demande de démonstration EduFormation");
  assert.deepEqual(errors, [], "No runtime or hydration errors");
  await context.close();
  console.log("Mailto fallback checks passed: consistent targets, localized subject, no form.");
} finally {
  await browser.close();
}
