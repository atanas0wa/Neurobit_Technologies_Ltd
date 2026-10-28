import { expect, test, type Page } from "@playwright/test";
import { isolateNetwork } from "./helpers";

// Every "Discuss your project" lands on the form, including a second one once the URL already ends in #contact-form.
test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(async ({ page }) => {
  await isolateNetwork(page);
  await page.goto("/");
});

const form = "#contact form";

async function formTop(page: Page) {
  return page.locator(form).evaluate((el) => Math.round(el.getBoundingClientRect().top));
}

/** Waits for the smooth scroll to settle, then checks the form sits just under the nav. */
async function expectOnForm(page: Page) {
  await expect(page).toHaveURL(/#contact-form$/);
  let previous = NaN;
  await expect
    .poll(async () => {
      const top = await formTop(page);
      const settled = top === previous;
      previous = top;
      return settled ? top : -1;
    }, { intervals: [150] })
    .toBeGreaterThanOrEqual(72);
  expect(await formTop(page)).toBeLessThan(200);
}

async function scrollToTop(page: Page) {
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(50);
}

test("options CTA, then the hero CTA after scrolling back up, both land on the form", async ({ page }) => {
  await page.locator("#options a", { hasText: "Discuss your project" }).click();
  await expectOnForm(page);

  await scrollToTop(page);
  await page.locator("section[aria-labelledby=hero-title] a", { hasText: "Discuss your project" }).click();
  await expectOnForm(page);
});

test("the mobile menu CTA works on the same hash and closes the menu", async ({ page }) => {
  await page.locator("#options a", { hasText: "Discuss your project" }).click();
  await expectOnForm(page);

  await scrollToTop(page);
  await page.locator('header button[aria-controls="mobile-menu"]').click();
  await page.locator("#mobile-menu a", { hasText: "Discuss your project" }).click();
  await expect(page.locator("#mobile-menu")).toBeHidden();
  await expectOnForm(page);
});
