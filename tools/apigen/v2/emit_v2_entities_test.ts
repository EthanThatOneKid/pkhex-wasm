import assert from "node:assert";
import { emitV2Entities, V2_ENTITIES_PATH } from "./emit-v2-entities.ts";
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
      ],
    },
    "NS.PK9": {
      name: "NS.PK9",
      kind: "class",
      baseChain: ["NS.PKM"],
      entityContext: "Gen9",
      members: [
        {
          csName: "SetIVs",
          kind: "method",
          csType: "void",
          access: "method",
          computed: false,
          isStatic: false,
          declaredBy: "NS.PK9",
          docs: null,
          params: [{ name: "value", csType: "ReadOnlySpan<int>" }],
        },
        {
          csName: "GetMax",
          kind: "method",
          csType: "int",
          access: "method",
          computed: false,
          isStatic: true,
          declaredBy: "NS.PK9",
          docs: null,
          params: [],
        },
      ],
    },
    "NS.Records": {
      name: "NS.Records",
      kind: "static",
      baseChain: [],
      entityContext: null,
      members: [],
    },
  },
};

Deno.test("entity module lands at the perpetual gen path", () => {
  const out = emitV2Entities(synthetic);
  assert.equal(out.path, V2_ENTITIES_PATH);
  assert.equal(V2_ENTITIES_PATH, "src/ts/gen/v2/entities.ts");
});

Deno.test("module exports interfaces, enum unions, setters, and method signatures", () => {
  const { content } = emitV2Entities(synthetic);
  assert.ok(content.includes("export type Color = \"Red\" | \"Blue\";"), content);
  assert.ok(content.includes("export interface PKM {"), content);
  assert.ok(content.includes("readonly nickname: string;"), content);
  assert.ok(content.includes("setNickname(value: string): void;"), content);
  assert.ok(content.includes("export interface PK9 extends PKM {"), content);
  assert.ok(content.includes("setIvs(value: readonly number[]): void;"), content);
});

Deno.test("statics and static classes stay out of the type module", () => {
  const { content } = emitV2Entities(synthetic);
  assert.ok(!content.includes("getMax"), "static members land with their runtime impl");
  assert.ok(!content.includes("Records"), "static-kind classes render nothing here");
});
