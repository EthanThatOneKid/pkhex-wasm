import assert from "node:assert";
import { DTS_PATH } from "./emit-dts.ts";
import { computeOutputs, isPerpetual, loadAndValidateBinding } from "./gen.ts";
import { V2_DTS_PATH } from "./v2/emit-v2-dts.ts";
import { V2_ENTITIES_PATH } from "./v2/emit-v2-entities.ts";
import { V2_API_MARKER, V2_SPEC_PATH } from "./v2/emit-v2-spec.ts";
import { buildApiReference, stitch } from "./emit-spec.ts";
import { BINDING_MAPPINGS } from "./mappings.ts";
import { surfacePaths, validateBinding } from "./validate.ts";
import { ERROR_NAMES, MUTATOR_NAMES, TYPES } from "./model.ts";

const outputs = computeOutputs();

Deno.test("model integrity — exactly seven mutators with locked names", () => {
  assert.deepStrictEqual(MUTATOR_NAMES, [
    "setNickname",
    "setLevel",
    "setMoves",
    "setNature",
    "setShiny",
    "setIVs",
    "setEVs",
  ]);
});

Deno.test("model integrity — exactly three error classes", () => {
  assert.deepStrictEqual([...ERROR_NAMES].sort(), [
    "SaveParseError",
    "UnsupportedOperationError",
    "UnsupportedTierError",
  ]);
});

Deno.test("emitted d.ts carries the full locked surface", () => {
  const dts = outputs.get(DTS_PATH)!;
  assert.ok(dts.length > 0);
  assert.ok(
    dts.includes("export declare function initPKHex(options?: InitOptions): Promise<PKHex>;"),
    "initPKHex declaration missing",
  );
  for (const name of [...MUTATOR_NAMES, ...ERROR_NAMES]) {
    assert.ok(dts.includes(name), `${name} missing from d.ts`);
  }
  // tier matrix survives into the module doc
  assert.ok(dts.includes("| Edit | all mutators apply |"), "edit tier row missing");
  assert.ok(dts.includes("| Read-only | mutators throw |"), "read-only tier row missing");
});

Deno.test("emitted d.ts preserves tier throw semantics on mutators", () => {
  const dts = outputs.get(DTS_PATH)!;
  assert.ok(
    dts.includes("@throws {UnsupportedOperationError} on Gen 1–2 (natures do not exist)"),
    "setNature Gen1–2 throw missing",
  );
  const tierThrows = dts.split("@throws {UnsupportedTierError}").length - 1;
  assert.ok(tierThrows >= 6, `expected ≥6 UnsupportedTierError tags, got ${tierThrows}`);
});

Deno.test("bootstrap emitter still produces complete skeleton seams", () => {
  // Root modules under src/ts are implementation-OWNED now (write-if-missing),
  // but the generator's bootstrap output must stay complete for fresh clones
  // that prune them.
  const pkhex = outputs.get("src/ts/pkhex.ts")!;
  assert.ok(pkhex.includes("export async function initPKHex"));
  assert.ok(pkhex.includes("throw notImplemented("));
  for (const name of MUTATOR_NAMES) {
    assert.ok(outputs.get("src/ts/pokemon.ts")!.includes(name));
  }
});

Deno.test("spec chapter is stitched at the marker and carries normative sections", () => {
  const spec = outputs.get("docs/spec/v1-api.md")!;
  assert.ok(!spec.includes("<!-- apigen:api-reference -->"), "marker not replaced");
  for (const heading of [
    "# pkhex-wasm v1 JavaScript API Specification",
    "## Architecture",
    "## Data contracts",
    "## Generation support",
    "### `Pokemon`",
    "### `PKHex`",
    "| `nickname` | `string` | Current nickname. |",
    "`setNature(natureId: number): void`",
    "## Crypto requirements",
    "## Testing requirements",
    "## Packaging & release",
    "## Risk register",
    "## Implementation checklist",
  ]) {
    assert.ok(spec.includes(heading), `missing: ${heading}`);
  }
  // mint-aware requirement stated normatively
  assert.ok(spec.toLowerCase().includes("mint-aware"), "mint-aware requirement missing");
});

Deno.test("stitcher fails loudly when the marker section is absent", () => {
  assert.throws(() => stitch(["no marker here"], "chapter"));
});

Deno.test("emission is deterministic across runs", () => {
  const again = computeOutputs();
  assert.strictEqual(again.size, outputs.size);
  for (const [path, content] of again) {
    assert.strictEqual(content, outputs.get(path), `nondeterministic: ${path}`);
  }
});

Deno.test("perpetual vs bootstrap classification", () => {
  assert.ok(isPerpetual(DTS_PATH));
  assert.ok(isPerpetual("docs/spec/v1-api.md"));
  assert.ok(isPerpetual("src/ts/gen/types.ts"));
  assert.ok(isPerpetual(V2_DTS_PATH));
  assert.ok(isPerpetual(V2_ENTITIES_PATH));
  assert.ok(isPerpetual(V2_SPEC_PATH));
  assert.ok(!isPerpetual("src/ts/index.ts"));
  assert.ok(!isPerpetual("src/ts/pokemon.ts"));
});

Deno.test("v2 artifacts carry the projected surface (slice 3)", () => {
  const entities = outputs.get(V2_ENTITIES_PATH)!;
  assert.ok(entities.includes("export interface PK9 extends PKM"), "format entity missing");
  const spec = outputs.get(V2_SPEC_PATH)!;
  assert.ok(spec.includes("## v2 projected surface"), "chapter header missing");
  assert.ok(!spec.includes(V2_API_MARKER), "marker must be replaced by the chapter");
});

Deno.test("MoveInfo carries only Core-tracked fields — no power/accuracy (owner adjudication on #19)", () => {
  const moveInfo = outputs.get(DTS_PATH)!;
  const iface = moveInfo.slice(
    moveInfo.indexOf("export interface MoveInfo"),
    moveInfo.indexOf("}", moveInfo.indexOf("export interface MoveInfo")),
  );
  assert.ok(iface.includes("type: string"), "MoveInfo.type missing");
  assert.ok(iface.includes("pp: number"), "MoveInfo.pp missing");
  assert.ok(!/\breadonly power\b/.test(iface), "MoveInfo must not carry power (absent from PKHeX.Core; see #27)");
  assert.ok(!/\breadonly accuracy\b/.test(iface), "MoveInfo must not carry accuracy (absent from PKHeX.Core; see #27)");
});

Deno.test("binding map — real meta and mappings validate clean", () => {
  const rows = loadAndValidateBinding(); // throws on any drift
  assert.ok(rows.length >= 35, `expected the full facade mapped, got ${rows.length}`);
});

Deno.test("binding map — unmapped export fails the gate", () => {
  const fakeMeta = {
    source: "fixture",
    generatedAt: "test",
    methodCount: 1,
    methods: [{ name: "TotallyNewExport", returns: "void", params: [], throws: [], file: "fixture.cs" }],
  };
  const problems = validateBinding(fakeMeta, BINDING_MAPPINGS, surfacePaths(TYPES));
  assert.ok(problems.some((p) => p.kind === "unmapped-export" && p.detail.includes("TotallyNewExport")));
});

Deno.test("binding map — stale mapping fails the gate", () => {
  const fakeMeta = {
    source: "fixture",
    generatedAt: "test",
    methodCount: 0,
    methods: [],
  };
  const problems = validateBinding(fakeMeta, BINDING_MAPPINGS, surfacePaths(TYPES));
  assert.ok(problems.length >= BINDING_MAPPINGS.length);
  assert.ok(problems.every((p) => p.kind === "stale-mapping"));
});

Deno.test("spec carries the runtime binding map appendix", () => {
  const spec = outputs.get("docs/spec/v1-api.md")!;
  assert.ok(spec.includes("### Runtime binding map"));
  assert.ok(spec.includes("| `Load` | `PKHex.load` |"));
  assert.ok(spec.includes("| `GameMoney` | `TrainerInfo.money` |"));
});

Deno.test("api reference renders throws clauses verbatim", () => {
  const chapter = buildApiReference();
  assert.ok(chapter.includes("`UnsupportedTierError` — on read-only-tier saves"));
});
