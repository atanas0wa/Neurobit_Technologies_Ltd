import { expect, test, type Route } from "@playwright/test";
import { fillContactForm, isolateNetwork, VISITOR } from "./helpers";

// F04 + F05: submission states with a mocked Formspree endpoint.
test.beforeEach(({}, info) => test.skip(info.project.name !== "formspree", "needs a configured endpoint"));

const submit = '#contact button[type="submit"]';
const status = "#contact [role=status]";

function fieldsOf(body: string) {
  return [...body.matchAll(/name="([^"]+)"\r\n\r\n([^\r]*)/g)].reduce<Record<string, string>>(
    (acc, [, k, v]) => ({ ...acc, [k]: v }),
    {},
  );
}

test("F04: fields are locked while sending, the payload is the submitted snapshot, nothing typed is silently lost", async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>((r) => (release = r));
  const bodies: string[] = [];
  await isolateNetwork(page, async (route: Route) => {
    bodies.push(route.request().postData() ?? "");
    await gate;
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/");
  await fillContactForm(page);
  await page.locator(submit).click();
  await expect(page.locator(submit)).toBeDisabled();

  // Try to edit while the request is in flight.
  for (const id of ["#contact-name", "#contact-email", "#contact-company", "#contact-message"]) {
    await expect(page.locator(id)).toBeDisabled();
  }
  await page.locator("#contact-message").press("End").catch(() => {});
  await page.keyboard.type(" EXTRA-EDIT");

  release();
  await expect(page.locator(status)).toContainText(/received your inquiry|Получихме/);
  expect(bodies).toHaveLength(1);
  const fields = fieldsOf(bodies[0]);
  expect(fields).toMatchObject({ name: VISITOR.name, email: VISITOR.email, company: VISITOR.company, message: VISITOR.message });
  expect(Object.keys(fields)).toEqual(expect.arrayContaining(["_subject", "_gotcha"]));
  expect(bodies[0]).not.toContain("EXTRA-EDIT");
  // Nothing was typed into the form during sending, so clearing it loses nothing.
  await expect(page.locator("#contact-message")).toHaveValue("");
});

for (const [label, respond, expected] of [
  ["HTTP error", (r: Route) => r.fulfill({ status: 500, body: "error" }), /Something went wrong|Нещо се обърка/],
  ["network failure", (r: Route) => r.abort("failed"), /Something went wrong|Нещо се обърка/],
] as const) {
  test(`F05: ${label} restores the form with the data kept and a localized error`, async ({ page }) => {
    await isolateNetwork(page, respond);
    await page.goto("/");
    await fillContactForm(page);
    await page.locator(submit).click();
    await expect(page.locator(status)).toContainText(expected);
    await expect(page.locator(submit)).toBeEnabled();
    await expect(page.locator("#contact-message")).toBeEnabled();
    await expect(page.locator("#contact-message")).toHaveValue(VISITOR.message);
    await expect(page.locator("#contact-email")).toHaveValue(VISITOR.email);
  });
}

test("F05: a stalled request times out, keeps the data, does not resend, and says delivery is uncertain", async ({ page }) => {
  let requests = 0;
  await page.clock.install();
  await isolateNetwork(page, async () => {
    requests++;
    // Never answer.
  });
  await page.goto("/");
  await fillContactForm(page);
  await page.locator(submit).click();
  await expect(page.locator(submit)).toBeDisabled();

  await page.clock.fastForward(25_000);
  await expect(page.locator(status)).toContainText(/may or may not|може да е стигнало/);
  await expect(page.locator(submit)).toBeEnabled();
  await expect(page.locator("#contact-message")).toHaveValue(VISITOR.message);
  await page.clock.fastForward(60_000);
  expect(requests).toBe(1);
});

test("F05: double submission sends one request", async ({ page }) => {
  let requests = 0;
  let release!: () => void;
  const gate = new Promise<void>((r) => (release = r));
  await isolateNetwork(page, async (route) => {
    requests++;
    await gate;
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
  await page.goto("/");
  await fillContactForm(page);
  await page.locator("#contact form").evaluate((form: HTMLFormElement) => {
    form.requestSubmit();
    form.requestSubmit();
  });
  release();
  await expect(page.locator(status)).toContainText(/received your inquiry|Получихме/);
  expect(requests).toBe(1);
});

test("F05: leaving the page while sending aborts cleanly without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await isolateNetwork(page, async () => {
    // Never answer; navigation should abort it.
  });
  await page.goto("/");
  await fillContactForm(page);
  await page.locator(submit).click();
  await expect(page.locator(submit)).toBeDisabled();
  await page.locator('footer a[href$="/privacy/"]').first().click();
  await expect(page).toHaveURL(/\/privacy\/$/);
  await page.waitForTimeout(500);
  expect(errors).toEqual([]);
});
