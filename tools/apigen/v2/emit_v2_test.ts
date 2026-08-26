import assert from "node:assert";
import { emitV2Dts, V2_DTS_PATH } from "./emit-v2-dts.ts";
import type { CoreMetaLike } from "./meta-types.ts";

const synthetic: CoreMetaLike = {
  schemaVersion: 2,
  sourceCommit: "abc123",
  enums: {
    "NS.Color": { name: "Color", values: [{ name: "Red" }, { name: "Blue" }] },
  },
  classes: {
    "NS.PKM": {
      name: "NS.PKM",
      kind: "abstract",
      baseChain: [],
      entityContext: null,
      members: [
        {
          csName: "Nickname",
          kind: "property",
          csType: "string",
          access: "getSet",
          computed: false,
          isStatic: false,
          declaredBy: "NS.PKM",
          docs: "Current nickname.",
          params: [],
        },
        {
          csName: "IsShiny",
          kind: "property",
          csType: "bool",
          access: "get",
          computed: true,
          isStatic: false,
          declaredBy: "NS.PKM",
          docs: null,
          params: [],
        },
        {
          csName: "SetIVs",
          kind: "method",
          csType: "void",
          access: "method",
          computed: false,
          isStatic: false,
          declaredBy: "NS.PKM",
          docs: null,
          params: [{ name: "value", csType: "ReadOnlySpan<int>" }],
        },
      ],
    },
    "NS.PK9": {
      name: "NS.PK9",
      kind: "class",
      baseChain: ["NS.PKM"],
      entityContext: "Gen9",
      members: [
        {
          csName: "TeraTypeOverride",
          kind: "property",
          csType: "MoveType",
          access: "getSet",
          computed: false,
          isStatic: false,
          declaredBy: "NS.PK9",
          docs: null,
          params: [],
        },
        {
          csName: "GetRibbon",
          kind: "method",
          csType: "bool",
          access: "method",
          computed: false,
          isStatic: false,
          declaredBy: "NS.PK9",
          docs: null,
          params: [{ name: "index", csType: "int" }],
        },
      ],
    },
    "NS.Records": {
      name: "NS.Records",
      kind: "static",
      baseChain: [],
      entityContext: null,
      members: [
        {
          csName: "GetMax",
          kind: "method",
          csType: "int",
          access: "method",
          computed: false,
          isStatic: true,
          declaredBy: "NS.Records",
          docs: null,
          params: [{ name: "id", csType: "int" }],
        },
      ],
    },
  },
};

Deno.test("emits the canonical artifact at the locked path", () => {
  const out = emitV2Dts(synthetic);
  assert.equal(out.path, V2_DTS_PATH);
  assert.equal(
    V2_DTS_PATH,
    "tools/apigen/fixtures/pkhex-wasm-v2.d.ts",
  );
});

Deno.test("header carries generation provenance", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(content.startsWith("/// < GENERATED"), "missing GENERATED banner");
  assert.ok(content.includes("sourceCommit abc123"), "missing commit stamp");
});

Deno.test("enum unions export once by short name", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(content.includes('export type Color = "Red" | "Blue";'), content);
});

Deno.test("getSet members pair a readonly snapshot with a mechanical setter", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(content.includes("readonly nickname: string;"));
  assert.ok(content.includes("setNickname(value: string): void;"));
  assert.ok(content.includes("/** Current nickname. */"), "doc carry-over");
});

Deno.test("computed members are readonly with no setter", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(content.includes("readonly isShiny: boolean;"));
  assert.ok(!content.includes("setIsShiny"), "computed members must not grow setters");
});

Deno.test("methods project with transformed names and mapped parameters", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(content.includes("setIvs(value: readonly number[]): void;"));
  assert.ok(content.includes("getRibbon(index: number): boolean;"));
  assert.ok(!content.includes("readonly setIvs:"), "methods must not become fields");
  assert.ok(!content.includes("readonly getRibbon:"), "methods must not become fields");
});

Deno.test("inheritance chains map to projected bases", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(content.includes("export interface PK9 extends PKM {"), content);
});

Deno.test("concrete formats gain narrowing guards", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(
    content.includes("export declare function isPK9(entity: PKM): entity is PK9;"),
    content,
  );
  assert.ok(!content.includes("isPKM("), "abstract bases get no guard");
});

Deno.test("static members land in a namespace, not the interface", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(content.includes("declare namespace Records"), content);
  assert.ok(content.includes("function getMax(id: number): number;"), "ambient namespaces need declaration keywords");
  assert.ok(content.includes("getMax(id: number): int;") === false);
});

Deno.test("unresolved references gain deterministic unknown stubs", () => {
  const { content } = emitV2Dts(synthetic);
  assert.ok(content.includes("export type MoveType = unknown;"), content);
  assert.ok(!content.includes("export type PKM = unknown;"), "projected classes are known");
  assert.ok(!content.includes("export type PK9 = unknown;"), "projected classes are known");
});

// --- real-metadata smoke -----------------------------------------------------

Deno.test("full runtime metadata emits completely and deterministically", async () => {
  const meta = JSON.parse(
    await Deno.readTextFile(
      new URL("../../apigen/runtime-meta-v2.json", import.meta.url),
    ),
  ) as CoreMetaLike;
  const first = emitV2Dts(meta);
  const second = emitV2Dts(meta);

  assert.equal(first.content, second.content, "emission must be deterministic");

  // Completeness invariant: the emitter consumes every metadata member.
  const totalMembers = Object.values(meta.classes)
    .reduce((sum, c) => sum + c.members.length, 0);
  assert.equal(first.stats.members, totalMembers);
  // Static-kind classes emit namespaces only; every other class emits one interface.
  const interfaces = Object.values(meta.classes).filter((c) => c.kind !== "static").length;
  assert.equal(first.stats.classes, interfaces);
});
