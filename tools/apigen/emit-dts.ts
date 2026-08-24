/**
 * Emitter A — canonical declaration file.
 *
 * Emits `tools/apigen/fixtures/pkhex-wasm.d.ts` from the model. This is the
 * generated surface the Pages docs workflow (`deno doc --html`) documents and
 * the packaging pipeline ships as the package's index.d.ts — one source, two
 * consumers. The original hand-written seed retired here when generated types
 * replaced it (docs-entrypoint swap).
 */

import { Project } from "npm:ts-morph";
import {
  ERRORS,
  INIT,
  MODULE,
  TYPES,
  type InterfaceModel,
  type MemberModel,
} from "./model.ts";
import { jsdocBlock, memberJsdoc, throwsLines } from "./render.ts";

export const DTS_PATH = "tools/apigen/fixtures/pkhex-wasm.d.ts";

function moduleDoc(): string {
  const lines: string[] = [...MODULE.overview, ""];
  lines.push("### Supported generations (v1)", "");
  lines.push("| Tier | Behavior | Generations |");
  lines.push("| --- | --- | --- |");
  for (const t of MODULE.tiers) {
    lines.push(`| ${t.tier} | ${t.behavior} | ${t.generations} |`);
  }
  lines.push("");
  for (const n of MODULE.notes) lines.push(n);
  lines.push("", "@module");
  return jsdocBlock(lines);
}

function addInterface(sf: ReturnType<Project["createSourceFile"]>, i: InterfaceModel): void {
  const props = i.members.filter((m): m is Extract<MemberModel, { kind: "prop" }> => m.kind === "prop");
  const methods = i.members.filter((m): m is Extract<MemberModel, { kind: "method" }> => m.kind === "method");

  sf.addInterface({
    name: i.name,
    isExported: true,
    typeParameters: i.typeParams?.map((name) => ({ name })),
    extends: i.extends,
    docs: i.doc?.length ? [i.doc.join(" ")] : undefined,
    properties: props.map((m) => ({
      name: m.name,
      type: m.type,
      hasQuestionToken: m.optional === true,
      isReadonly: m.writable !== true,
      docs: docsOf(memberJsdoc(m)),
    })),
    methods: methods.map((m) => ({
      name: m.name,
      parameters: m.params.map((p) => ({ name: p.name, type: p.type })),
      returnType: m.returns,
      docs: docsOf(memberJsdoc(m)),
    })),
  });
}

function docsOf(lines: string[]): [string] | undefined {
  return lines.length ? [lines.join("\n")] : undefined;
}

/** Pure emitter — returns path → content with no filesystem access. */
export function emitDts(): Map<string, string> {
  const project = new Project({ useInMemoryFileSystem: true });
  const sf = project.createSourceFile(DTS_PATH);

  sf.addStatements(moduleDoc());
  sf.addStatements("");

  for (const i of TYPES) addInterface(sf, i);
  sf.addStatements("");

  for (const e of ERRORS) {
    sf.addClass({
      name: e.name,
      extends: "Error",
      isExported: true,
      docs: [e.doc],
    });
  }
  sf.addStatements("");

  const initJsdoc = [
    INIT.summary,
    ...INIT.remarks,
    "",
    ...INIT.params
      .filter((p) => p.desc)
      .map((p) => `@param ${p.name} ${p.desc}`),
    ...throwsLines(INIT.throws),
    "@example",
    "```ts",
    ...INIT.example,
    "```",
  ];
  const initParams = INIT.params
    .map((p) => `${p.name}${p.optional ? "?" : ""}: ${p.type}`)
    .join(", ");
  sf.addStatements((writer) => {
    writer.writeLine(jsdocBlock(initJsdoc));
    writer.write(
      `export declare function ${INIT.name}(${initParams}): Promise<PKHex>;`,
    );
  });

  return new Map([[DTS_PATH, sf.getFullText()]]);
}
