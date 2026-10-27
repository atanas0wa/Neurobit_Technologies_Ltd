import { expect, test, type Page } from "@playwright/test";
import { isolateNetwork } from "./helpers";

// F03: the open mobile menu must keep keyboard focus out of the page it covers.
test.use({ viewport: { width: 390, height: 844 } });
test.beforeEach(async ({ page }) => {
  await isolateNetwork(page);
  await page.goto("/");
});

const toggle = 'header button[aria-controls="mobile-menu"]';

/** Where focus is: "menu", "header" (bar above the menu), "covered" (page behind) or "none". */
async function focusZone(page: Page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body || el === document.documentElement) return "none";
    if (el.closest("#mobile-menu")) return "menu";
    if (el.closest("header")) return "header";
    return "covered";
  });
}

async function openWithKeyboard(page: Page) {
  await page.locator(toggle).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#mobile-menu")).toBeVisible();
}

test("opening moves focus into the menu", async ({ page }) => {
  await openWithKeyboard(page);
  expect(await focusZone(page)).toBe("menu");
  await expect(page.locator(toggle)).toHaveAttribute("aria-expanded", "true");
});

for (const key of ["Tab", "Shift+Tab"]) {
  test(`${key} never reaches the covered page`, async ({ page }) => {
    await openWithKeyboard(page);
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press(key);
      const zone = await focusZone(page);
      expect(zone, `after ${i + 1} × ${key}`).not.toBe("covered");
    }
  });
}

test("Escape closes the menu and returns focus to the toggle", async ({ page }) => {
  await openWithKeyboard(page);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expect(page.locator(toggle)).toBeFocused();
  await expect(page.locator(toggle)).toHaveAttribute("aria-expanded", "false");
  await expectPageRestored(page);
});

test("choosing a link closes the menu and leaves the page usable", async ({ page }) => {
  await openWithKeyboard(page);
  await page.locator('#mobile-menu a[href$="#contact"]').first().click();
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expectPageRestored(page);
});

test("growing to the desktop layout closes the menu and leaves the page usable", async ({ page }) => {
  await openWithKeyboard(page);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expectPageRestored(page);
});

async function expectPageRestored(page: Page) {
  const state = await page.evaluate(() => ({
    inert: [...document.querySelectorAll("[inert]")].map((el) => el.tagName),
    overflow: getComputedStyle(document.documentElement).overflow,
  }));
  expect(state.inert).toEqual([]);
  expect(state.overflow).not.toBe("hidden");
  // The page behind must be reachable by keyboard again.
  await page.locator("#contact-name").focus();
  await expect(page.locator("#contact-name")).toBeFocused();
}
