import assert from "node:assert/strict";

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

// Run against a build with VITE_CONTACT_ENDPOINT=/test-demo and
// VITE_CONTACT_EMAIL=contact@training.example. Requests are intercepted locally.
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4174";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });

try {
  const context = await browser.newContext({
    viewport: { width: 360, height: 900 },
    reducedMotion: "reduce",
    storageState: {
      cookies: [],
      origins: [{ origin: new URL(baseUrl).origin, localStorage: [{ name: "eduformation-landing-locale", value: "en" }] }],
    },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("status of 503")) errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const form = page.locator("#contact-form form");
  const submit = form.locator('button[type="submit"]');
  await submit.click();
  assert.equal(await form.getByRole("alert").count(), 3, "Required fields should have error messages");
  const inputs = await form.locator("input, textarea").evaluateAll((elements) => elements.map((element) => ({
    id: element.id,
    invalid: element.getAttribute("aria-invalid"),
    describedBy: element.getAttribute("aria-describedby"),
  })));
  assert(inputs.every((input) => input.invalid === "true" && input.describedBy === `${input.id}-error`));
  await page.waitForFunction((id) => document.activeElement?.id === id, inputs[0].id);
  const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  assert.deepEqual(axe.violations.map(({ id }) => id), [], "Form errors should remain accessible");

  // Errors must translate immediately, not remain in the language used on submit.
  const footer = page.locator("footer");
  await footer.getByRole("button", { name: "Language: English" }).click();
  await footer.getByRole("button", { name: "Français" }).click();
  assert.match((await form.getByRole("alert").allTextContents())[0], /Indiquez le nom/);
  await footer.getByRole("button", { name: "Langue: Français" }).click();
  await footer.getByRole("button", { name: "English" }).click();

  await form.getByLabel("Name", { exact: true }).fill(" Jane ");
  await form.getByLabel("Email address").fill("not-an-email");
  await form.getByLabel("How can I help?").fill("I would like to discuss a training platform.");
  await submit.click();
  assert.equal(await form.getByRole("alert").count(), 1, "Invalid email should be rejected");
  await form.getByLabel("Email address").fill("jane@example.org");

  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  let body;
  await page.route("**/test-demo", async (route) => {
    body = route.request().postDataJSON();
    await gate;
    await route.fulfill({ status: 503, body: "Unavailable" });
  });
  const widthBefore = (await submit.boundingBox()).width;
  await submit.click();
  assert.equal(await submit.isDisabled(), true, "Submit is disabled during the request");
  assert.equal((await submit.boundingBox()).width, widthBefore, "Submit width is stable during the request");
  release();
  const error = form.getByRole("alert");
  await error.waitFor();
  const errorText = await error.innerText();
  assert.match(errorText, /That did not send/);
  assert.match(errorText, /contact@training\.example/);
  assert.deepEqual(body, {
    name: "Jane",
    email: "jane@example.org",
    message: "I would like to discuss a training platform.",
  });
  assert.equal(await page.locator("#contact-form [role=status]").count(), 0, "A failed request must not report success");
  await page.unroute("**/test-demo");
  await page.route("**/test-demo", (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
  await submit.click();
  const success = page.locator("#contact-form [role=status]");
  await success.waitFor();
  assert.match(await success.innerText(), /reply to jane@example\.org/i);
  assert.equal(await form.count(), 0);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 360);
  assert.deepEqual(errors, [], "No unexpected runtime or hydration errors");
  await context.close();
  console.log("Demo form checks passed: validation, localization, accessibility, pending, failure and success.");
} finally {
  await browser.close();
}
