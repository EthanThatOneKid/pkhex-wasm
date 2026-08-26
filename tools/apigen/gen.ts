/**
 * Generator orchestrator.
 *
 *   deno task gen          regenerate outputs (writes perpetually-generated
 *                          files; bootstraps skeleton roots only when absent)
 *   deno task gen:check    drift gate — exit 1 when any generated artifact
 *                          differs from what the model produces now
 */

import { TYPES } from "./model.ts";
import { emitDts, DTS_PATH } from "./emit-dts.ts";
import { emitSkeletonAll } from "./emit-skeleton.ts";
import { buildApiReference, stitch, type BindingRow } from "./emit-spec.ts";
import { BINDING_MAPPINGS } from "./mappings.ts";
import { surfacePaths, validateBinding } from "./validate.ts";
import type { RuntimeMetaLike } from "./model-types.ts";
import { emitV2Dts, V2_DTS_PATH } from "./v2/emit-v2-dts.ts";
import { emitV2Entities, V2_ENTITIES_PATH } from "./v2/emit-v2-entities.ts";
import { buildV2ApiReference, V2_API_MARKER, V2_SECTION_PATH, V2_SPEC_PATH } from "./v2/emit-v2-spec.ts";
import { stitchWith } from "./emit-spec.ts";
import type { CoreMetaLike } from "./v2/meta-types.ts";

const ROOT_URL = new URL("../../", import.meta.url);
const ROOT = fromFileUrl(ROOT_URL);
const SECTIONS_DIR = new URL("./sections/", import.meta.url);

function fromFileUrl(url: URL): string {
  const p = decodeURIComponent(url.pathname);
  return Deno.build.os === "windows" && p.startsWith("/") ? p.slice(1) : p;
}

function loadSections(): string[] {
  const v2Section = V2_SECTION_PATH.split("/").pop()!;
  const files = [...Deno.readDirSync(fromFileUrl(SECTIONS_DIR))]
    .filter((f) => f.isFile && f.name.endsWith(".md") && f.name !== v2Section)
    .map((f) => f.name)
    .sort();
  if (!files.length) throw new Error(`no sections found in ${SECTIONS_DIR}`);
  return files.map((name) =>
    Deno.readTextFileSync(fromFileUrl(new URL(name, SECTIONS_DIR)))
  );
}

const META_PATH = "tools/apigen/runtime-meta.json";
const V2_META_PATH = "tools/apigen/runtime-meta-v2.json";

/** Inverted drift gate: the runtime export set and the mapping table must agree. */
export function loadAndValidateBinding(): BindingRow[] {
  const meta = JSON.parse(Deno.readTextFileSync(fromFileUrl(new URL(META_PATH, ROOT_URL)))) as RuntimeMetaLike;
  const problems = validateBinding(meta, BINDING_MAPPINGS, surfacePaths(TYPES));
  if (problems.length) {
    throw new Error(
      `binding drift (${problems.length}):\n` +
        problems.map((p) => `  [${p.kind}] ${p.detail}`).join("\n"),
    );
  }
  return meta.methods
    .map((m) => {
      const mapping = BINDING_MAPPINGS.find((b) => b.export === m.name)!;
      return { export: m.name, target: mapping.target, note: mapping.note };
    })
    .sort((a, b) => (a.target < b.target ? -1 : a.target > b.target ? 1 : 0));
}

/** Every artifact the generator owns. */
export function computeOutputs(): Map<string, string> {
  const out = new Map<string, string>();
  for (const [k, v] of emitDts()) out.set(k, v);
  for (const [k, v] of emitSkeletonAll()) out.set(k, v);
  const spec = stitch(
    loadSections(),
    `${buildApiReference(loadAndValidateBinding())}
`,
  );
  out.set("docs/spec/v1-api.md", spec);
  const v2Meta = JSON.parse(
    Deno.readTextFileSync(fromFileUrl(new URL(V2_META_PATH, ROOT_URL))),
  ) as CoreMetaLike;
  const dts = emitV2Dts(v2Meta);
  out.set(dts.path, dts.content);
  const entities = emitV2Entities(v2Meta);
  out.set(entities.path, entities.content);
  out.set(
    V2_SPEC_PATH,
    stitchWith(
      V2_API_MARKER,
      [Deno.readTextFileSync(fromFileUrl(new URL(V2_SECTION_PATH, ROOT_URL)))],
      buildV2ApiReference(v2Meta),
    ),
  );
  return out;
}

/** Files regenerated on every run — safe to overwrite unconditionally. */
export function isPerpetual(path: string): boolean {
  return path === V2_DTS_PATH ||
    path === V2_ENTITIES_PATH ||
    path === V2_SPEC_PATH ||
    path === DTS_PATH ||
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
