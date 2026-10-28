import { defineConfig, devices } from "@playwright/test";

/*
 * End-to-end tests against the static export (see scripts/build-e2e.sh).
 * Two builds are served side by side: one with a fake Formspree ID and one
 * without, so both form modes are covered. Tests intercept formspree.io and
 * block every other external request.
 *
 * Locally, set CHROMIUM_PATH to use an installed Chromium instead of
 * `npx playwright install chromium`.
 */
const executablePath = process.env.CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    ...devices["Desktop Chrome"],
    launchOptions: executablePath ? { executablePath } : {},
    trace: "retain-on-failure",
  },
  projects: [
    { name: "formspree", use: { baseURL: "http://127.0.0.1:4510" } },
    { name: "mailto", use: { baseURL: "http://127.0.0.1:4511" } },
  ],
  webServer: [
    { command: "serve .e2e/formspree -l 4510 --no-port-switching -c ../../serve.json", url: "http://127.0.0.1:4510/", reuseExistingServer: false },
    { command: "serve .e2e/mailto -l 4511 --no-port-switching -c ../../serve.json", url: "http://127.0.0.1:4511/", reuseExistingServer: false },
  ],
});
