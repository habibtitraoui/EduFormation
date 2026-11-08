import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { chromium } from "@playwright/test";

// Run after `npx playwright install chromium`; CHROMIUM_PATH can select an
// existing local browser. The source card is kept in HTML so its text is editable.
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  headless: true,
});
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(resolve("scripts/og-card.html")).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/og.png" });
} finally {
  await browser.close();
}
