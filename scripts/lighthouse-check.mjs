import assert from "node:assert/strict";

import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/lr-desktop-config.js";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROMIUM_PATH || chromium.executablePath(),
  chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  for (const [label, config, maxLcp] of [["mobile", undefined, 2000], ["desktop", desktopConfig, 1200]]) {
    const result = await lighthouse(baseUrl, {
      port: chrome.port,
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    }, config);
    assert(result, `${label}: Lighthouse did not return a report`);
    const { lhr } = result;
    const minimums = { performance: 0.95, accessibility: 1, "best-practices": 0.95, seo: 0.95 };
    const scores = Object.fromEntries(Object.entries(minimums).map(([category, minimum]) => {
      const score = lhr.categories[category].score;
      assert(score !== null && score >= minimum, `${label}: ${category} must be ≥ ${minimum * 100}`);
      return [category, Math.round(score * 100)];
    }));
    const lcp = lhr.audits["largest-contentful-paint"].numericValue;
    const cls = lhr.audits["cumulative-layout-shift"].numericValue;
    assert(typeof lcp === "number" && lcp <= maxLcp, `${label}: LCP exceeds ${maxLcp} ms`);
    assert(typeof cls === "number" && cls < 0.02, `${label}: CLS must stay below 0.02`);
    console.log(`${label}:`, scores, `LCP ${Math.round(lcp)} ms, CLS ${cls.toFixed(4)}`);
  }
} finally {
  await chrome.kill();
}
