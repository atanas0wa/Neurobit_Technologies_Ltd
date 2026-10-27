import { expect, test } from "@playwright/test";
import { expectNoPersonalDataInUrl, fillContactForm, isolateNetwork, VISITOR } from "./helpers";

// F02: the contact form must never put personal details in the page URL,
// with or without JavaScript, and must post to the intended destination.

test.describe("contact form without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("submits by POST to the configured endpoint, never by GET to the page", async ({ page }, info) => {
    test.skip(info.project.name !== "formspree", "needs a configured endpoint");
    const posted: { method: string; url: string; body: string }[] = [];
    await isolateNetwork(page, async (route) => {
      const req = route.request();
      posted.push({ method: req.method(), url: req.url(), body: req.postData() ?? "" });
      await route.fulfill({ status: 200, contentType: "text/html", body: "<p>Synthetic Formspree page</p>" });
    });
    await page.goto("/");
    const form = page.locator("#contact form");
    await expect(form).toHaveAttribute("method", /post/i);
    await expect(form).toHaveAttribute("action", "https://formspree.io/f/e2e-test-form");

    await fillContactForm(page);
    await Promise.all([page.waitForRequest("https://formspree.io/**"), page.locator('#contact button[type="submit"]').click()]);

    expect(posted).toHaveLength(1);
    expect(posted[0].method).toBe("POST");
    expect(posted[0].url).toBe("https://formspree.io/f/e2e-test-form");
    // Native POST body (application/x-www-form-urlencoded) carries every field.
    const fields = Object.fromEntries(new URLSearchParams(posted[0].body));
    expect(fields).toMatchObject({ name: VISITOR.name, email: VISITOR.email, company: VISITOR.company, message: VISITOR.message, _gotcha: "" });
    expectNoPersonalDataInUrl(posted[0].url);
    expectNoPersonalDataInUrl(page.url());
  });

  test("without an endpoint, hands off to email instead of submitting to the page", async ({ page }, info) => {
    test.skip(info.project.name !== "mailto", "needs the unconfigured build");
    await isolateNetwork(page);
    const pageRequests: string[] = [];
    page.on("request", (r) => {
      if (new URL(r.url()).hostname === "127.0.0.1") pageRequests.push(`${r.method()} ${r.url()}`);
    });
    await page.goto("/");
    const form = page.locator("#contact form");
    await expect(form).toHaveAttribute("method", /post/i);
    await expect(form).toHaveAttribute("action", /^mailto:/);
    const before = pageRequests.length;

    await fillContactForm(page);
    await page.locator('#contact button[type="submit"]').click();
    await page.waitForTimeout(500);

    expectNoPersonalDataInUrl(page.url());
    for (const r of pageRequests.slice(before)) expectNoPersonalDataInUrl(r);
    // The button says what will happen; nothing claims the enquiry was sent.
    await expect(page.locator('#contact button[type="submit"]')).toHaveText(/email app|имейл програмата/i);
  });
});

test.describe("contact form with JavaScript", () => {
  test("personal details never reach the page URL", async ({ page }, info) => {
    await isolateNetwork(page, (route) => route.fulfill({ status: 200, contentType: "application/json", body: "{}" }));
    await page.goto("/");
    await fillContactForm(page);
    await page.locator('#contact button[type="submit"]').click();
    await expect(page.locator("#contact [role=status]")).not.toBeEmpty();
    expectNoPersonalDataInUrl(page.url());
    if (info.project.name === "mailto") {
      await expect(page.locator("#contact [role=status]")).not.toContainText(/received your inquiry|Получихме/);
    }
  });
});
