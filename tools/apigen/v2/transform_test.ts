import { strict as assert } from "node:assert";
import { projectMemberName, projectType } from "./transform.ts";

// ---------------------------------------------------------------------------
// ADR 0001 naming transform: segmented rule over underscores/digits/acronyms,
// first segment lowercased including acronym runs.
// ---------------------------------------------------------------------------

Deno.test("member names follow the segmented mechanical transform", () => {
  const cases: readonly [string, string][] = [
    // ADR examples
    ["Move1_PP", "move1Pp"],
    ["Stat_HPCurrent", "statHpCurrent"],
    ["OT_Name", "otName"],
    ["IV_HP", "ivHp"],
    ["TID16", "tid16"],
    ["GetRibbon", "getRibbon"],
    // further real Core members
    ["EXP", "exp"],
    ["PID", "pid"],
    ["ID32", "id32"],
    ["SID16", "sid16"],
    ["HP", "hp"],
    ["HT_HP", "htHp"],
    ["Stat_Level", "statLevel"],
    ["WasEgg", "wasEgg"],
    ["AffixedRibbon", "affixedRibbon"],
    ["RibbonMarkLunchtime", "ribbonMarkLunchtime"],
    ["Move1_PPUps", "move1PpUps"],
    ["SetIVs", "setIvs"],
    ["IVs", "ivs"], // mechanical result; the override table maps this one
    ["NicknameTrash", "nicknameTrash"],
  ];
  for (const [input, expected] of cases) {
    assert.equal(projectMemberName(input), expected, `name: ${input}`);
  }
});

Deno.test("override table wins over the mechanical transform", () => {
  const overrides: Record<string, string> = { IVs: "ivs", EVs: "evs" };
  assert.equal(projectMemberName("IVs", overrides), "ivs");
  assert.equal(projectMemberName("EVs", overrides), "evs");
});

// ---------------------------------------------------------------------------
// ADR 0001 type mapping
// ---------------------------------------------------------------------------

const ENUMS: Record<string, readonly string[]> = {
  // keyed by short C# name, as the reflector renders member type strings
  Nature: ["Hardy", "Lonely", "Adamant"],
  EntityContext: ["Gen1", "Gen2", "Gen3"],
};

Deno.test("primitive widths map per contract", () => {
  assert.equal(projectType("byte"), "number");
  assert.equal(projectType("sbyte"), "number");
  assert.equal(projectType("short"), "number");
  assert.equal(projectType("ushort"), "number");
  assert.equal(projectType("int"), "number");
  assert.equal(projectType("uint"), "number");
  assert.equal(projectType("long"), "bigint");
  assert.equal(projectType("ulong"), "bigint");
  assert.equal(projectType("float"), "number");
  assert.equal(projectType("double"), "number");
  assert.equal(projectType("bool"), "boolean");
  assert.equal(projectType("string"), "string");
});

Deno.test("byte buffers collapse to Uint8Array in every spelling", () => {
  assert.equal(projectType("byte[]"), "Uint8Array");
  assert.equal(projectType("Span<byte>"), "Uint8Array");
  assert.equal(projectType("ReadOnlySpan<byte>"), "Uint8Array");
  assert.equal(projectType("Memory<byte>"), "Uint8Array");
});

Deno.test("non-byte spans and arrays become readonly number arrays", () => {
  assert.equal(projectType("ushort[]"), "readonly number[]");
  assert.equal(projectType("int[]"), "readonly number[]");
  assert.equal(projectType("ReadOnlySpan<int>"), "readonly number[]");
  assert.equal(projectType("Span<ushort>"), "readonly number[]");
});

Deno.test("reference collections of named types stay readonly arrays", () => {
  assert.equal(projectType("IList<PKM>"), "readonly PKM[]");
  assert.equal(projectType("IReadOnlyList<InventoryPouch>"), "readonly InventoryPouch[]");
});

Deno.test("nullable values gain an explicit null union", () => {
  assert.equal(projectType("DateOnly?"), "string | null");
  assert.equal(projectType("TimeOnly?"), "string | null");
  assert.equal(projectType("Nature?", ENUMS), '"Hardy" | "Lonely" | "Adamant" | null');
});

Deno.test("enums render as generated string-literal unions from the metadata tables", () => {
  assert.equal(projectType("Nature", ENUMS), '"Hardy" | "Lonely" | "Adamant"');
  assert.equal(
    projectType("EntityContext", ENUMS),
    '"Gen1" | "Gen2" | "Gen3"',
  );
});

Deno.test("unknown named types pass through verbatim for later resolution", () => {
  assert.equal(projectType("PersonalInfo"), "PersonalInfo");
});
