/**
 * Generator orchestrator.
 *
 *   deno task gen          regenerate outputs (writes perpetually-generated
 *                          files; bootstraps skeleton roots only when absent)
 *   deno task gen:check    drift gate — exit 1 when any generated artifact
 *                          differs from what the model produces now
 */

import { emitDts } from "./emit-dts.ts";
import { emitSkeletonAll } from "./emit-skeleton.ts";
import { buildApiReference, stitch } from "./emit-spec.ts";

const ROOT = fromFileUrl(new URL("../../", import.meta.url));
const SECTIONS_DIR = new URL("./sections/", import.meta.url);

function fromFileUrl(url: URL): string {
  const p = decodeURIComponent(url.pathname);
  return Deno.build.os === "windows" && p.startsWith("/") ? p.slice(1) : p;
}

function loadSections(): string[] {
  const files = [...Deno.readDirSync(fromFileUrl(SECTIONS_DIR))]
    .filter((f) => f.isFile && f.name.endsWith(".md"))
    .map((f) => f.name)
    .sort();
  if (!files.length) throw new Error(`no sections found in ${SECTIONS_DIR}`);
  return files.map((name) =>
    Deno.readTextFileSync(fromFileUrl(new URL(name, SECTIONS_DIR)))
  );
}

/** Every artifact the generator owns. */
export function computeOutputs(): Map<string, string> {
  const out = new Map<string, string>();
  for (const [k, v] of emitDts()) out.set(k, v);
  for (const [k, v] of emitSkeletonAll()) out.set(k, v);
  const spec = stitch(
    loadSections(),
    `${buildApiReference()}\n`,
  );
  out.set("docs/spec/v1-api.md", spec);
  return out;
}

/** Files regenerated on every run — safe to overwrite unconditionally. */
export function isPerpetual(path: string): boolean {
  return path === "docs/api/pkhex-wasm.d.ts" ||
    path === "docs/spec/v1-api.md" ||
    path.startsWith("src/ts/gen/");
}

function checkMode(outputs: Map<string, string>): number {
  const stale: string[] = [];
  for (const [path, expected] of outputs) {
    if (!isPerpetual(path)) continue;
    let actual: string;
    try {
      actual = Deno.readTextFileSync(ROOT + path);
    } catch {
      stale.push(path); // missing generated artifact counts as drift
      continue;
    }
    if (actual !== expected) stale.push(path);
  }
  if (stale.length) {
    console.error(
      `drift detected — ${stale.length} generated artifact(s) lag the model:\n` +
        stale.map((p) => `  ${p}`).join("\n") +
        "\nrun `deno task gen` and commit",
    );
    return 1;
  }
  console.log("generated artifacts up to date");
  return 0;
}

function writeMode(outputs: Map<string, string>): number {
  let written = 0;
  let bootstrapped = 0;
  for (const [path, content] of outputs) {
    const full = ROOT + path;
    const exists = existsSync(full);
    if (exists && !isPerpetual(path)) continue; // skeleton roots: write once
    Deno.mkdirSync(dirname(full), { recursive: true });
    Deno.writeTextFileSync(full, content);
    written++;
    if (!exists) bootstrapped += isPerpetual(path) ? 0 : 1;
  }
  console.log(
    `gen: wrote ${written} file(s) (${bootstrapped} newly bootstrapped)`,
  );
  for (const path of outputs.keys()) console.log(`  ${path}`);
  return 0;
}

function dirname(p: string): string {
  const i = p.replace(/\\/g, "/").lastIndexOf("/");
  return i < 0 ? "." : p.slice(0, Math.max(i, 1));
}

function existsSync(path: string): boolean {
  try {
    Deno.statSync(path);
    return true;
  } catch {
    return false;
  }
}

if (import.meta.main) {
  const outputs = computeOutputs();
  Deno.exit(Deno.args.includes("--check") ? checkMode(outputs) : writeMode(outputs));
}
