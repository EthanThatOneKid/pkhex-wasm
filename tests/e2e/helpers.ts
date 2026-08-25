import type { Page } from "@playwright/test";
import { test as base, expect } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Worker-scoped page fixture: the mono-wasm runtime boots exactly once per
 * worker (workers: 1), and every spec drives it through the real public API
 * surface exposed on window.pkhex by static/harness.js.
 */
export const test = base.extend<{ api: Page }>({
  api: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      const page = await context.newPage();

      // Flake insurance: intermittent reds have surfaced only as an opaque
      // "reading 'create'" state message. Buffer browser-side chatter so a
      // failing boot names its real cause in the Playwright failure itself.
      const diagnostics: string[] = [];
      const note = (line: string) => {
        if (diagnostics.length < 20) diagnostics.push(line);
      };
      page.on("console", (m) => note(`console.${m.type()}: ${m.text()}`));
      page.on("pageerror", (e) => note(`pageerror: ${e.message}`));

      await page.goto("/");
      try {
        await expect
          .poll(() => page.locator("#state").textContent(), { timeout: 90_000 })
          .toBe("ready");
      } catch (err) {
        let probe: string;
        try {
          const res = await page.request.get("wasm/_framework/dotnet.js");
          const body = await res.text();
          probe =
            `dotnet.js status=${res.status()} type=${res.headers()["content-type"] ?? "?"} ` +
            `bytes=${body.length} head=${JSON.stringify(body.slice(0, 160))}`;
        } catch (probeErr) {
          probe = `dotnet.js probe failed: ${probeErr instanceof Error ? probeErr.message : probeErr}`;
        }
        throw new Error(
          [
            "bootstrap did not reach ready",
            ...diagnostics,
            probe,
            `(original error: ${err instanceof Error ? err.message : err})`,
          ].join("\n"),
        );
      }
      await use(page);
      await context.close();
    },
    { scope: "worker" },
  ],
});

const baseURL = fileURLToPath(new URL(".", import.meta.url));

/**
 * Fixture directory resolution: explicit override env var, then a populated
 * gitignored `.local-fixtures/` directory (development against personal
 * dumps — spec: "gitignored local dir honored"), then the blank-fixture
 * generator output. A directory counts when its manifest exists.
 */
export const fixtureDir = resolveFixtureDir();

function resolveFixtureDir(): string {
  if (process.env.PKHEX_E2E_FIXTURES) return process.env.PKHEX_E2E_FIXTURES;
  const local = join(baseURL, "..", ".local-fixtures");
  if (existsSync(join(local, "manifest.json"))) return local;
  return join(baseURL, "..", "..", "artifacts", "test-fixtures");
}

export interface FixtureInfo {
  file: string;
  generation: string;
  tier: "edit" | "read-only";
  size: number;
}

export function loadFixtures(): FixtureInfo[] {
  const manifest = JSON.parse(readFileSync(join(fixtureDir, "manifest.json"), "utf-8"));
  return manifest.fixtures as FixtureInfo[];
}

export function loadFixtureBytes(name: string): Uint8Array {
  return new Uint8Array(readFileSync(join(fixtureDir, name)));
}

export interface ApiResult<T = unknown> {
  ok: true;
  value: T;
}

export interface ApiFailure {
  ok: false;
  name: string;
  message: string;
}

/**
 * Runs one snippet against the live API root inside the page. The snippet is
 * a `(PKHex, payload) => value` arrow expression whose result must be
 * structured-cloneable; thrown errors are captured with their JS error name.
 */
export async function callApi<T = unknown>(
  page: Page,
  source: string,
  payload?: unknown,
): Promise<ApiResult<T> | ApiFailure> {
  return page.evaluate<[string, unknown], ApiResult<T> | ApiFailure>(
    async ({ source, payload }) => {
      const PKHex = (window as unknown as { pkhex: unknown }).pkhex;
      try {
        const fn = new Function(
          "PKHex",
          "payload",
          `"use strict"; return (${source})(PKHex, payload);`,
        ) as (p: unknown, q: unknown) => Promise<T> | T;
        return { ok: true, value: await fn(PKHex, payload) };
      } catch (cause) {
        const err = cause instanceof Error ? cause : new Error(String(cause));
        return { ok: false, name: err.name, message: err.message };
      }
    },
    { source, payload },
  );
}
