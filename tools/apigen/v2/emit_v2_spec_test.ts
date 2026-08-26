import assert from "node:assert";
import { buildV2ApiReference, V2_API_MARKER } from "./emit-v2-spec.ts";
import { stitchWith } from "../emit-spec.ts";
import { projectCoreMeta } from "./project.ts";
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
      ],
    },
    "NS.PK9": {
      name: "NS.PK9",
      kind: "class",
      baseChain: ["NS.PKM"],
      entityContext: "Gen9",
      members: [
        {
          csName: "Nickname",
          kind: "property",
          csType: "string",
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
  },
};

Deno.test("chapter renders member tables with setters, docs, and computed notes", () => {
  const chapter = buildV2ApiReference(synthetic);
  assert.ok(chapter.includes("### `PKM`"), chapter);
  assert.ok(chapter.includes("`nickname`"), chapter);
  assert.ok(chapter.includes("get/set via `setNickname()`"), chapter);
  assert.ok(chapter.includes("Current nickname."), chapter);
  assert.ok(chapter.includes("readonly (computed)"), chapter);
});

Deno.test("get-only non-computed members are labeled get-only, not computed", () => {
  // Bank-style metadata: access "get" with computed false must not claim
  // the ADR's narrow computed definition ("recomputes or never stored").
  const getOnly: CoreMetaLike = {
    ...synthetic,
    enums: {},
    classes: {
      "NS.Bank3": {
        name: "NS.Bank3",
        kind: "class",
        baseChain: [],
        entityContext: null,
        members: [
          {
            csName: "BoxCount",
            kind: "property",
            csType: "int",
            access: "get",
            computed: false,
            isStatic: false,
            declaredBy: "NS.Bank3",
            docs: null,
            params: [],
          },
        ],
      },
    },
  };
  const chapter = buildV2ApiReference(getOnly);
  assert.ok(chapter.includes("get-only"), chapter);
  assert.ok(!chapter.includes("readonly (computed)"), chapter);
});

Deno.test("shadowed redeclarations appear once and are counted", () => {
  const model = projectCoreMeta(synthetic);
  assert.equal(model.stats.shadowed, 1);
  const chapter = buildV2ApiReference(synthetic);
  assert.equal((chapter.match(/`nickname`/g) ?? []).length, 1);
  assert.ok(chapter.includes("`1` ancestor-shadowed"), chapter);
});

Deno.test("methods render signatures; unions escape table pipes", () => {
  const chapter = buildV2ApiReference(synthetic);
  assert.ok(chapter.includes("`getRibbon(index: number)`"), chapter);
  assert.ok(chapter.includes('`"Red" \\| "Blue"`'), chapter);
});

Deno.test("stitch splices at the v2 marker only", () => {
  const sections = ["prose\n<!-- apigen:v2-api-reference -->\ntrailing"];
  const stitched = stitchWith(V2_API_MARKER, sections, "CHAPTER");
  assert.ok(stitched.includes("prose\nCHAPTER\ntrailing"));
  assert.throws(() => stitchWith(V2_API_MARKER, ["no marker"], "CHAPTER"), /no section carries/);
});
