import assert from "node:assert/strict";

import { chromium } from "@playwright/test";

// An actual network/CPU throttle rather than Lighthouse's simulated estimate:
// 400 ms latency, 400 kbit/s down/up, 4x CPU, mobile viewport, empty cache.
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });
try {
  for (const locale of ["en", "fr", "ar"]) {
    const context = await browser.newContext({
      viewport: { width: 360, height: 800 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      storageState: {
        cookies: [],
        origins: [{ origin: new URL(baseUrl).origin, localStorage: [{ name: "eduformation-landing-locale", value: locale }] }],
      },
    });
    await context.addInitScript(() => {
      window.__landingMetrics = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__landingMetrics.lcp = entry.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) window.__landingMetrics.cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 400,
      downloadThroughput: 50_000,
      uploadThroughput: 50_000,
      connectionType: "cellular4g",
    });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.goto(baseUrl, { waitUntil: "load", timeout: 60_000 });
    await page.evaluate(async () => { await document.fonts.ready; });
    // Allow the paint following the final font swap to be observed.
    await page.waitForTimeout(600);
    const metrics = await page.evaluate(() => window.__landingMetrics);
    console.log(`${locale}: LCP ${Math.round(metrics.lcp)} ms, CLS ${metrics.cls.toFixed(4)}`);
    assert(metrics.lcp > 0 && metrics.lcp <= 2000, `${locale}: LCP must be ≤ 2 seconds on Slow 4G`);
    assert(metrics.cls < 0.02, `${locale}: CLS must stay below 0.02`);
    await context.close();
  }
} finally {
  await browser.close();
}
