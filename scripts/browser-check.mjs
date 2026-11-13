import assert from "node:assert/strict";

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";
const origin = new URL(baseUrl).origin;
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });
const errors = [];

function storage(locale, theme) {
  return {
    cookies: [],
    origins: [{ origin, localStorage: [
      { name: "eduformation-landing-locale", value: locale },
      { name: "eduformation-landing-theme", value: theme },
    ] }],
  };
}

async function contextFor(locale, theme, width) {
  return browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: "reduce",
    storageState: storage(locale, theme),
  });
}

try {
  // Exercise every requested breakpoint in every locale and theme. Axe is run
  // for all six locale/theme pairs at a mix of mobile and desktop widths.
  for (const locale of ["en", "fr", "ar"]) {
    for (const theme of ["light", "dark"]) {
      const context = await contextFor(locale, theme, 360);
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.goto(baseUrl, { waitUntil: "networkidle" });
      for (const width of [360, 768, 1024, 1280, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        const result = await page.evaluate(async () => {
          await document.fonts.ready;
          const root = document.documentElement;
          const headings = [...document.querySelectorAll("h1, h2, h3")];
          const header = document.querySelector("header");
          const nav = header?.querySelector("nav");
          const controls = header?.querySelector("nav + div");
          const nr = nav?.getBoundingClientRect();
          const cr = controls?.getBoundingClientRect();
          return {
            width: root.clientWidth,
            scrollWidth: root.scrollWidth,
            lang: root.lang,
            dir: root.dir,
            dark: root.classList.contains("dark"),
            headingSpacing: headings.map((heading) => getComputedStyle(heading).letterSpacing),
            headerOverlap: nr && cr && nr.width && cr.width
              ? Math.min(nr.right, cr.right) - Math.max(nr.left, cr.left) > 1
              : false,
          };
        });
        assert.equal(result.scrollWidth, result.width, `${locale}/${theme}/${width}: horizontal overflow`);
        assert.equal(result.lang, locale);
        assert.equal(result.dir, locale === "ar" ? "rtl" : "ltr");
        assert.equal(result.dark, theme === "dark");
        assert.equal(result.headerOverlap, false, `${locale}/${theme}/${width}: header controls overlap`);
        if (locale === "ar") {
          assert(result.headingSpacing.every((spacing) => spacing === "normal" || spacing === "0px"), "Arabic headings have tracking");
        }
      }
      await page.setViewportSize({ width: locale === "fr" ? 1280 : 360, height: 900 });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();
      assert.deepEqual(results.violations.map(({ id, nodes }) => ({ id, nodes: nodes.map(({ html }) => html) })), [], `${locale}/${theme}: axe violations`);
      await context.close();
    }
  }

  const context = await contextFor("en", "light", 360);
  const page = await context.newPage();
  const fontRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("NotoSansArabicVariable")) fontRequests.push(request.url());
  });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  assert.equal(await page.locator("#contact-form").count(), 1, "The contact form is present without an endpoint");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("href")), "#main", "Skip link must be first");
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "main", "Skip link must focus main");

  const menu = page.locator("header button").filter({ has: page.locator("svg.lucide-menu") });
  await menu.click();
  assert.equal(await menu.getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Shift+Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("href")), "#contact-form", "Menu should trap reverse Tab");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute("aria-expanded")), "true", "Menu should trap forward Tab");

  const panelId = await menu.getAttribute("aria-controls");
  const panel = page.locator(`[id="${panelId}"]`);
  const language = panel.getByRole("button", { name: "Language: English" });
  await language.click();
  assert.equal(await language.getAttribute("aria-expanded"), "true");
  assert.equal(fontRequests.length, 0, "Opening the language list must not fetch the Arabic font on English pages");
  await page.keyboard.press("Escape");
  assert.equal(await language.getAttribute("aria-expanded"), "false", "Escape closes the nested language list");
  assert.equal(await menu.getAttribute("aria-expanded"), "true", "Escape must not also close its parent menu");
  const menuScan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  assert.deepEqual(menuScan.violations.map(({ id }) => id), [], "Open navigation must remain accessible");
  await page.keyboard.press("Escape");
  assert.equal(await menu.getAttribute("aria-expanded"), "false", "Escape closes the parent menu");
  assert.equal(await menu.evaluate((element) => document.activeElement === element), true, "Focus returns to the trigger");
  await menu.click();
  await language.click();
  await panel.getByRole("button", { name: "العربية" }).click();
  await page.waitForFunction(() => document.documentElement.lang === "ar" && document.documentElement.dir === "rtl");
  await page.evaluate(async () => { await document.fonts.ready; });
  assert(fontRequests.length > 0, "Arabic font should load once Arabic is selected");
  assert.equal(await page.evaluate(() => localStorage.getItem("eduformation-landing-locale")), "ar");
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.locator("html").getAttribute("lang"), "ar", "Locale persists after reload");
  await menu.click();
  await panel.locator('a[href="#features"]').click();
  assert.equal(await menu.getAttribute("aria-expanded"), "false", "Navigation closes the menu");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "features", "Navigation focuses the destination");
  await context.close();

  const themeContext = await contextFor("en", "system", 1280);
  const themePage = await themeContext.newPage();
  await themePage.emulateMedia({ colorScheme: "dark" });
  await themePage.goto(baseUrl, { waitUntil: "networkidle" });
  assert.equal(await themePage.evaluate(() => document.documentElement.classList.contains("dark")), true, "System theme follows the OS");
  await themePage.emulateMedia({ colorScheme: "light" });
  await themePage.waitForFunction(() => !document.documentElement.classList.contains("dark"));
  await themePage.emulateMedia({ colorScheme: "dark" });
  await themePage.waitForFunction(() => document.documentElement.classList.contains("dark"));
  const header = themePage.locator("header");
  await header.getByRole("button", { name: "Theme: System" }).click();
  assert.equal(await themePage.evaluate(() => document.documentElement.classList.contains("dark")), false, "First click selects light");
  await header.getByRole("button", { name: "Theme: Light" }).click();
  const darkToggle = header.getByRole("button", { name: "Theme: Dark" });
  assert.equal(await darkToggle.getAttribute("aria-pressed"), "true");
  await themePage.reload({ waitUntil: "networkidle" });
  assert.equal(await themePage.evaluate(() => document.documentElement.classList.contains("dark")), true, "Theme persists after reload");
  const details = themePage.locator("#faq details");
  assert.equal(await details.nth(0).evaluate((el) => el.open), true);
  await details.nth(1).locator("summary").click();
  assert.equal(await details.nth(0).evaluate((el) => el.open), false, "Opening a question closes the first");
  assert.equal(await details.nth(1).evaluate((el) => el.open), true);
  await themeContext.close();

  // With the main bundle held back, locale and theme must already be correct,
  // and hydration must retain the actual pre-rendered heading node.
  const earlyContext = await contextFor("ar", "dark", 360);
  const earlyPage = await earlyContext.newPage();
  let releaseBundle;
  const bundleGate = new Promise((resolve) => { releaseBundle = resolve; });
  await earlyPage.route("**/assets/index-*.js", async (route) => { await bundleGate; await route.continue(); });
  await earlyPage.goto(baseUrl, { waitUntil: "commit" });
  await earlyPage.locator("#hero-title").waitFor({ state: "visible" });
  const beforeBundle = await earlyPage.evaluate(() => {
    window.__earlyHeading = document.querySelector("#hero-title");
    return { lang: document.documentElement.lang, dir: document.documentElement.dir,
      dark: document.documentElement.classList.contains("dark"), heading: window.__earlyHeading?.textContent };
  });
  assert.equal(beforeBundle.lang, "ar");
  assert.equal(beforeBundle.dir, "rtl");
  assert.equal(beforeBundle.dark, true, "Saved theme is applied before the bundle loads");
  assert.match(beforeBundle.heading, /تدريب يلائم فريقك/);
  releaseBundle();
  await earlyPage.waitForLoadState("networkidle");
  assert.equal(await earlyPage.evaluate(() => document.querySelector("#hero-title") === window.__earlyHeading), true,
    "React should hydrate the existing localized markup, not replace it");
  await earlyContext.close();

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 900 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(baseUrl, { waitUntil: "load" });
  assert.equal(await noJsPage.locator("html").getAttribute("lang"), "ar");
  assert.equal(await noJsPage.locator("html").getAttribute("dir"), "rtl");
  assert.equal(await noJsPage.locator("main h1").count(), 1);
  assert.match(await noJsPage.locator("main").innerText(), /دورات منظّمة/);
  assert.equal(await noJsPage.locator("main section").count(), 11, "The static build should remain readable without JavaScript");
  assert.equal(await noJsPage.locator(".js-only:visible").count(), 0, "Inert JavaScript controls are hidden without JavaScript");
  await noJsContext.close();
  assert.deepEqual(errors, [], "No runtime or hydration errors");
  console.log("Browser checks passed: 30 viewport/locale/theme combinations, six axe scans, keyboard, locale, fonts, theme, FAQ and no-JS content.");
} finally {
  await browser.close();
}
