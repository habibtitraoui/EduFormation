import assert from "node:assert/strict";

import { chromium } from "@playwright/test";

// Run against a build with an empty VITE_CONTACT_ENDPOINT and a configured
// VITE_CONTACT_EMAIL. The form opens a prefilled message in the visitor's app.
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4175";
const contactEmail = process.env.VITE_CONTACT_EMAIL || "titraoui.habibe@gmail.com";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 360, height: 900 } });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert.equal(await page.locator("html").getAttribute("lang"), "ar");
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(await page.locator("#contact-form form").count(), 1, "The contact form exists without a POST endpoint");
  const emailLink = page.locator("#contact").getByRole("link", { name: contactEmail });
  assert.equal(await emailLink.getAttribute("href"), `mailto:${contactEmail}`);

  await page.locator("footer").getByRole("button", { name: "اللغة: العربية" }).click();
  await page.locator("footer").getByRole("button", { name: "English" }).click();
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  assert.equal(await page.locator("#contact-form form").getByLabel("What would you like to see in your demo?").count(), 1);
  assert.equal(await page.locator("#hero").getByRole("link", { name: "Request a demo" }).getAttribute("href"), "#contact-form");
  assert.deepEqual(errors, [], "No runtime or hydration errors");
  console.log("Contact fallback checks passed: Arabic default, form availability, and direct email destination.");
} finally {
  await browser.close();
}
