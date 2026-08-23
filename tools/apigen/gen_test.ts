import assert from "node:assert";
import { computeOutputs, isPerpetual } from "./gen.ts";
import { buildApiReference, stitch } from "./emit-spec.ts";
import { ERROR_NAMES, MUTATOR_NAMES } from "./model.ts";

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
  const dts = outputs.get("docs/api/pkhex-wasm.d.ts")!;
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
  const dts = outputs.get("docs/api/pkhex-wasm.d.ts")!;
  assert.ok(
    dts.includes("@throws {UnsupportedOperationError} on Gen 1–2 (natures do not exist)"),
    "setNature Gen1–2 throw missing",
  );
  const tierThrows = dts.split("@throws {UnsupportedTierError}").length - 1;
  assert.ok(tierThrows >= 6, `expected ≥6 UnsupportedTierError tags, got ${tierThrows}`);
});

Deno.test("skeleton implements every member as a seam", () => {
  for (
    const [file, expectedMembers] of [
      ["src/ts/pokemon.ts", 18], // 11 reads + 7 mutators
      ["src/ts/game.ts", 6], // 4 reads + box + party
      ["src/ts/pkhex.ts", 6], // load + saveBytes + 3 lookup tables + initPKHex
    ] as const
  ) {
    const text = outputs.get(file)!;
    assert.ok(text.includes("notImplemented("), `${file}: no seams`);
    const seamCount = text.split("throw notImplemented(").length - 1;
    assert.strictEqual(seamCount, expectedMembers, `${file}: seam count`);
  }
  // init function appended to the root module
  assert.ok(outputs.get("src/ts/pkhex.ts")!.includes("export async function initPKHex"));
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
  assert.ok(isPerpetual("docs/api/pkhex-wasm.d.ts"));
  assert.ok(isPerpetual("docs/spec/v1-api.md"));
  assert.ok(isPerpetual("src/ts/gen/types.ts"));
  assert.ok(!isPerpetual("src/ts/index.ts"));
  assert.ok(!isPerpetual("src/ts/pokemon.ts"));
});

Deno.test("MoveInfo carries only Core-tracked fields — no power/accuracy (owner adjudication on #19)", () => {
  const moveInfo = outputs.get("docs/api/pkhex-wasm.d.ts")!;
  const iface = moveInfo.slice(
    moveInfo.indexOf("export interface MoveInfo"),
    moveInfo.indexOf("}", moveInfo.indexOf("export interface MoveInfo")),
  );
  assert.ok(iface.includes("type: string"), "MoveInfo.type missing");
  assert.ok(iface.includes("pp: number"), "MoveInfo.pp missing");
  assert.ok(!/\breadonly power\b/.test(iface), "MoveInfo must not carry power (absent from PKHeX.Core; see #27)");
  assert.ok(!/\breadonly accuracy\b/.test(iface), "MoveInfo must not carry accuracy (absent from PKHeX.Core; see #27)");
});

Deno.test("api reference renders throws clauses verbatim", () => {
  const chapter = buildApiReference();
  assert.ok(chapter.includes("`UnsupportedTierError` — on read-only-tier saves"));
});
