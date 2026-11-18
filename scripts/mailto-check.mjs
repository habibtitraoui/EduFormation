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
  page.on("console", (message) => {
    // Headless Chromium doesn't have a registered email app.
    if (message.type() === "error" && !/^Failed to launch ['"]mailto:/.test(message.text())) errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert.equal(await page.locator("html").getAttribute("lang"), "ar");
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(await page.locator("#contact-form form").count(), 1, "The contact form exists without a POST endpoint");
  assert.equal(await page.locator('a[href^="mailto:"]').count(), 0, "No direct email link is rendered");
  assert(!(await page.locator("body").innerText()).includes(contactEmail), "The page does not display the owner's address");

  await page.locator("footer").getByRole("button", { name: "اللغة: العربية" }).click();
  await page.locator("footer").getByRole("button", { name: "English" }).click();
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  const form = page.locator("#contact-form form");
  await form.getByLabel("Name", { exact: true }).fill("Jane Example");
  await form.getByLabel("Email address").fill("jane@example.org");
  await form.getByLabel("What would you like to see in your demo?").fill("A training platform for my team.");
  await form.getByRole("button", { name: "Send demo request" }).click();
  const confirmation = await page.locator("#contact-form [role=status]").innerText();
  assert.match(confirmation, /Send the message from your email app/);
  assert(!confirmation.includes(contactEmail), "The fallback notice does not display the owner's address");
  assert.deepEqual(errors, [], "No runtime or hydration errors");
  console.log("Contact fallback checks passed: Arabic default, form submission and no visible recipient address.");
} finally {
  await browser.close();
}
