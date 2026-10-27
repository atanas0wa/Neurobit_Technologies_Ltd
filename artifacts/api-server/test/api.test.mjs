// Behavioural tests for the built API server (run `pnpm run build` first).
// Each run starts dist/index.mjs as a local child process on a random port;
// nothing here talks to a deployed server. Request bodies are synthetic.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import http from "node:http";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, deflateSync, gzipSync } from "node:zlib";

const entry = fileURLToPath(new URL("../dist/index.mjs", import.meta.url));
const port = 18000 + Math.floor(Math.random() * 1000);
const base = `http://127.0.0.1:${port}`;
let server;
let exited = null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Sends a raw request; `chunks` are written in order with `gap` ms between them. */
function raw({ path = "/api/echo-none", headers = {}, chunks = [], gap = 0, method = "POST" }) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port, path, method, headers }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (d) => (body += d));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", reject);
    (async () => {
      for (const [i, chunk] of chunks.entries()) {
        if (i > 0 && gap) await sleep(gap);
        req.write(chunk);
      }
      req.end();
    })();
  });
}

before(async () => {
  server = spawn(process.execPath, [entry], {
    env: { PATH: process.env.PATH, PORT: String(port), NODE_ENV: "production" },
    stdio: ["ignore", "ignore", "pipe"],
  });
  server.on("exit", (code, signal) => (exited = { code, signal }));
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(`${base}/api/healthz`)).ok) return;
    } catch {}
    await sleep(100);
  }
  throw new Error("API server did not start");
});

after(() => server?.kill());

test("health endpoint reports ok", async () => {
  const res = await fetch(`${base}/api/healthz`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("well-formed JSON and form bodies are parsed (unknown route answers 404, not 400)", async () => {
  const json = await raw({ headers: { "content-type": "application/json" }, chunks: ['{"synthetic":true}'] });
  assert.equal(json.status, 404);
  const form = await raw({ headers: { "content-type": "application/x-www-form-urlencoded" }, chunks: ["a=1&b=two"] });
  assert.equal(form.status, 404);
});

test("malformed JSON is rejected with 400", async () => {
  const res = await raw({ headers: { "content-type": "application/json" }, chunks: ['{"synthetic":'] });
  assert.equal(res.status, 400);
});

test("compressed request bodies are refused with 415 (inflate disabled)", async () => {
  const body = Buffer.from('{"synthetic":true}');
  for (const [encoding, data] of [
    ["gzip", gzipSync(body)],
    ["deflate", deflateSync(body)],
    ["br", brotliCompressSync(body)],
  ]) {
    const res = await raw({ headers: { "content-type": "application/json", "content-encoding": encoding }, chunks: [data] });
    assert.equal(res.status, 415, `${encoding} should be refused`);
  }
});

test("GHSA-27r3-jxmh-p828: trailing bytes after a compressed frame do not take the process down", async () => {
  const body = Buffer.from('{"synthetic":true}');
  for (const [encoding, data] of [
    ["gzip", gzipSync(body)],
    ["deflate", deflateSync(body)],
    ["br", brotliCompressSync(body)],
  ]) {
    await raw({
      headers: { "content-type": "application/json", "content-encoding": encoding },
      chunks: [data, Buffer.from("trailing-bytes")],
      gap: 300,
    }).catch(() => {});
  }
  await sleep(500);
  assert.equal(exited, null, `server exited: ${JSON.stringify(exited)}`);
  const res = await fetch(`${base}/api/healthz`);
  assert.equal(res.status, 200);
});
