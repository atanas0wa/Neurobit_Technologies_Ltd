import { expect, test, type Page } from "@playwright/test";
import { isolateNetwork } from "./helpers";

// F08: the service illustrations must stay still unless motion is allowed.
test.beforeEach(async ({ page }) => {
  await isolateNetwork(page);
});

/** Motion state of the first illustration (web) and the AI one (SMIL packets). */
function artState(page: Page) {
  return page.evaluate(() => {
    const arts = [...document.querySelectorAll<HTMLElement>(".art")];
    const ai = document.querySelector<HTMLElement>(".art-ai");
    const svg = ai?.querySelector("svg") as SVGSVGElement | null;
    const runningCss = arts.flatMap((a) =>
      [...a.querySelectorAll("*")].filter((el) => {
        const cs = getComputedStyle(el);
        return cs.animationName !== "none" && cs.animationPlayState === "running";
      }),
    ).length;
    return {
      play: arts.map((a) => a.dataset.play ?? null),
      smilElements: ai ? ai.querySelectorAll("animate, animateMotion").length : -1,
      smilRunning: svg && svg.querySelectorAll("animate, animateMotion").length > 0 ? !svg.animationsPaused() : false,
      runningCss,
    };
  });
}

async function scrollToAi(page: Page) {
  await page.locator(".art-ai").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
}

test("reduced motion before load: everything is still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await scrollToAi(page);
  const s = await artState(page);
  expect(s.smilRunning).toBe(false);
  expect(s.runningCss).toBe(0);
  expect(s.play.every((p) => p === null || p === "false")).toBe(true);
});

test("reduced motion switched on while the page is open stops the motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await scrollToAi(page);
  expect((await artState(page)).smilRunning).toBe(true);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(300);
  const s = await artState(page);
  expect(s.smilRunning).toBe(false);
  expect(s.runningCss).toBe(0);
});

test("normal motion still plays on screen and pauses off screen", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await scrollToAi(page);
  let s = await artState(page);
  expect(s.smilRunning).toBe(true);
  expect(s.runningCss).toBeGreaterThan(0);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  s = await artState(page);
  expect(s.smilRunning).toBe(false);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("with reduced motion, the static markup carries no animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const smil = await page.locator(".art-ai animate, .art-ai animateMotion").count();
    expect(smil).toBe(0);
    const running = await page.locator(".art [class*='a-']").evaluateAll(
      (els) => els.filter((el) => getComputedStyle(el).animationName !== "none").length,
    );
    expect(running).toBe(0);
  });
});
