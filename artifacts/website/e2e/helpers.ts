import { expect, type Page, type Route } from "@playwright/test";

/** Synthetic visitor data; never real personal data. */
export const VISITOR = {
  name: "Test Visitor",
  email: "visitor@example.test",
  company: "Example Test Ltd",
  message: "Synthetic enquiry for automated testing.",
};

export const FORMSPREE_PATTERN = "https://formspree.io/**";

/**
 * Blocks every request that leaves the local test server. Requests to
 * formspree.io go to `onFormspree` (default: abort), so the real endpoint is
 * never contacted.
 */
export async function isolateNetwork(page: Page, onFormspree?: (route: Route) => Promise<void> | void) {
  await page.route(
    (url) => !["127.0.0.1", "localhost"].includes(url.hostname),
    (route) => {
      if (route.request().url().startsWith("https://formspree.io/") && onFormspree) return onFormspree(route);
      return route.abort();
    },
  );
}

export async function fillContactForm(page: Page) {
  await page.locator("#contact-name").fill(VISITOR.name);
  await page.locator("#contact-email").fill(VISITOR.email);
  await page.locator("#contact-company").fill(VISITOR.company);
  await page.locator("#contact-message").fill(VISITOR.message);
}

/** Asserts that none of the visitor's details ever appear in the page URL. */
export function expectNoPersonalDataInUrl(url: string) {
  const decoded = decodeURIComponent(url).replace(/\+/g, " ");
  for (const value of Object.values(VISITOR)) {
    expect(decoded, `page URL contains "${value}"`).not.toContain(value);
  }
  expect(url).not.toMatch(/[?&](name|email|company|message)=/);
}
