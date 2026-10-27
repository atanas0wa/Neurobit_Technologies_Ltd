import { expect, test } from "@playwright/test";
import { isolateNetwork } from "./helpers";

// F07 (technical part): the privacy and cookie policies say the site loads no
// analytics, ads or third-party fonts, sets no cookies, and keeps only the
// theme choice in local storage. These checks keep those statements true.
const ROUTES = ["/", "/en/", "/privacy/", "/cookies/", "/en/privacy/", "/en/cookies/"];

test.beforeEach(({}, info) => test.skip(info.project.name !== "mailto", "same in both builds"));

test("pages make no requests to other hosts while loading and browsing", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (r) => {
    const host = new URL(r.url()).hostname;
    if (!["127.0.0.1", "localhost"].includes(host) && !r.url().startsWith("data:")) external.push(r.url());
  });
  await isolateNetwork(page);
  for (const route of ROUTES) {
    await page.goto(route);
    await page.mouse.wheel(0, 6000);
    await page.waitForTimeout(300);
  }
  expect(external).toEqual([]);
});

test("no cookies are set and local storage only ever holds the theme choice", async ({ page, context }) => {
  await isolateNetwork(page);
  await page.goto("/");
  // The theme toggle is the header button that does not control the mobile menu.
  await page.locator("header button[aria-label]:not([aria-controls])").click();
  expect(await page.evaluate(() => localStorage.getItem("theme"))).not.toBeNull();
  for (const route of ROUTES) {
    await page.goto(route);
    await page.mouse.wheel(0, 6000);
  }
  expect(await context.cookies()).toEqual([]);
  const keys = await page.evaluate(() => Object.keys(localStorage));
  expect(keys.filter((k) => k !== "theme")).toEqual([]);
});
