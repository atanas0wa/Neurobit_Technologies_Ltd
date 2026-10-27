// Behavioural tests for automatic bearer-token attachment in customFetch.
// fetch is mocked and the token is synthetic; nothing leaves the process.
// Run: node --test test/   (Node >= 23.6 strips the TypeScript types)
import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, test } from "node:test";
import { customFetch, setAuthTokenGetter, setBaseUrl } from "../src/custom-fetch.ts";

const TOKEN = "synthetic-test-token";
const API = "https://api.example.test";

type Seen = { url: string; authorization: string | null };
let seen: Seen[] = [];

function lastAuth(): string | null {
  return seen.at(-1)?.authorization ?? null;
}

async function call(input: RequestInfo | URL, init?: RequestInit) {
  await customFetch(input, { responseType: "text", ...init });
}

beforeEach(() => {
  seen = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    seen.push({ url, authorization: new Headers(init?.headers).get("authorization") });
    return new Response("ok", { status: 200, headers: { "content-type": "text/plain" } });
  }) as typeof fetch;
  setAuthTokenGetter(() => TOKEN);
});

afterEach(() => {
  setAuthTokenGetter(null);
  setBaseUrl(null);
  delete (globalThis as { location?: unknown }).location;
});

describe("with a configured API base URL", () => {
  beforeEach(() => setBaseUrl(API));

  test("relative paths are sent to the API with the token", async () => {
    await call("/api/healthz");
    assert.equal(seen[0].url, `${API}/api/healthz`);
    assert.equal(lastAuth(), `Bearer ${TOKEN}`);
  });

  test("absolute URLs on the trusted origin get the token (string, URL and Request inputs)", async () => {
    await call(`${API}/api/healthz`);
    assert.equal(lastAuth(), `Bearer ${TOKEN}`);
    await call(new URL(`${API}/api/healthz`));
    assert.equal(lastAuth(), `Bearer ${TOKEN}`);
    await call(new Request(`${API}/api/healthz`));
    assert.equal(lastAuth(), `Bearer ${TOKEN}`);
  });

  for (const [label, url] of [
    ["a different origin", "https://other.example.test/collect"],
    ["a lookalike hostname", "https://api.example.test.evil.test/collect"],
    ["userinfo pointing elsewhere", "https://api.example.test@evil.test/collect"],
    ["a different scheme", "http://api.example.test/api/healthz"],
    ["a different port", "https://api.example.test:8443/api/healthz"],
  ] as const) {
    test(`no token for ${label} (string, URL and Request inputs)`, async () => {
      await call(url);
      assert.equal(lastAuth(), null, `string input leaked to ${url}`);
      await call(new URL(url));
      assert.equal(lastAuth(), null, `URL input leaked to ${url}`);
      if (new URL(url).username) {
        // The fetch standard refuses Request objects for URLs with credentials.
        assert.throws(() => new Request(url), TypeError);
      } else {
        await call(new Request(url));
        assert.equal(lastAuth(), null, `Request input leaked to ${url}`);
      }
    });
  }

  test("protocol-relative paths stay on the API host and keep the token", async () => {
    await call("//evil.test/collect");
    assert.equal(new URL(seen[0].url).origin, API);
    assert.equal(lastAuth(), `Bearer ${TOKEN}`);
  });

  test("an explicitly supplied Authorization header is passed through unchanged", async () => {
    await call("https://other.example.test/x", { headers: { authorization: "Bearer caller-chosen" } });
    assert.equal(lastAuth(), "Bearer caller-chosen");
  });
});

describe("in a browser without a base URL (same-origin API)", () => {
  beforeEach(() => {
    (globalThis as { location?: unknown }).location = { origin: "https://www.example.test" };
  });

  test("same-origin relative and absolute URLs get the token", async () => {
    await call("/api/healthz");
    assert.equal(lastAuth(), `Bearer ${TOKEN}`);
    await call("https://www.example.test/api/healthz");
    assert.equal(lastAuth(), `Bearer ${TOKEN}`);
  });

  test("protocol-relative URLs to another host get no token", async () => {
    await call("//evil.test/collect");
    assert.equal(lastAuth(), null);
  });

  test("absolute URLs to another origin get no token", async () => {
    await call("https://cdn.example.test/file.json");
    assert.equal(lastAuth(), null);
  });
});

describe("without a base URL or page origin (e.g. React Native)", () => {
  test("plain relative paths keep the token; absolute and protocol-relative URLs do not", async () => {
    await call("/api/healthz");
    assert.equal(lastAuth(), `Bearer ${TOKEN}`);
    await call("https://api.example.test/api/healthz");
    assert.equal(lastAuth(), null);
    await call("//api.example.test/api/healthz");
    assert.equal(lastAuth(), null);
  });
});

describe("without a token getter", () => {
  test("no Authorization header is added anywhere", async () => {
    setAuthTokenGetter(null);
    setBaseUrl(API);
    await call("/api/healthz");
    assert.equal(lastAuth(), null);
    await call("https://other.example.test/x");
    assert.equal(lastAuth(), null);
  });
});
