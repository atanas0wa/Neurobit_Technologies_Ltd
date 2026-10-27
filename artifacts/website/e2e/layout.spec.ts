import { expect, test } from "@playwright/test";
import { isolateNetwork } from "./helpers";

// F09: no route may be wider than the viewport, at any tested width, in
// either theme, including with enlarged text.
const ROUTES = ["/", "/en/", "/privacy/", "/cookies/", "/en/privacy/", "/en/cookies/"];
const WIDTHS = [320, 390, 768, 1280, 1440];

test.beforeEach(({}, info) => test.skip(info.project.name !== "mailto", "layout is the same in both builds"));

for (const theme of ["dark", "light"] as const) {
  for (const width of WIDTHS) {
    test(`no horizontal overflow at ${width}px (${theme})`, async ({ page }) => {
      await isolateNetwork(page);
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
      await page.setViewportSize({ width, height: 900 });
      const overflowing: string[] = [];
      for (const route of ROUTES) {
        await page.goto(route);
        const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        if (docWidth > width) overflowing.push(`${route}: ${docWidth}px`);
      }
      expect(overflowing).toEqual([]);
    });
  }
}

test("enlarged text (200%) at 320px: the privacy heading wraps instead of overflowing", async ({ page }) => {
  await isolateNetwork(page);
  await page.setViewportSize({ width: 320, height: 900 });
  for (const route of ["/privacy/", "/en/privacy/", "/cookies/", "/en/cookies/"]) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docWidth, route).toBeLessThanOrEqual(320);
    const h1 = await page.locator("h1").evaluate((el) => ({ scroll: el.scrollWidth, client: el.clientWidth }));
    expect(h1.scroll, `${route} heading`).toBeLessThanOrEqual(h1.client);
  }
});
