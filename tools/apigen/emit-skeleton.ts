/**
 * Emitter B — compilable TypeScript binding skeleton.
 *
 * Two classes of output:
 * - `src/ts/gen/` (types + errors): perpetually generated, always safe to
 *   regenerate, never hand-edited.
 * - `src/ts/*.ts` root modules (handle classes + initPKHex): emitted once as
 *   a bootstrap skeleton; afterwards they belong to implementation sessions.
 *   Every member body is a structured seam naming the wasm-side call that
 *   will realize it, throwing until wired.
 */

import { Project, StructureKind } from "npm:ts-morph";
import {
  ERRORS,
  INIT,
  TYPES,
  type InterfaceModel,
  type MemberModel,
} from "./model.ts";
import { jsdocBlock, memberJsdoc } from "./render.ts";

const GEN_DIR = "src/ts/gen";

function docOf(m: MemberModel): [string] | undefined {
  const lines = memberJsdoc(m);
  return lines.length ? [lines.join("\n")] : undefined;
}

function addInterface(
  sf: ReturnType<Project["createSourceFile"]>,
  i: InterfaceModel,
): void {
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
      isReadonly: true,
      docs: docOf(m),
    })),
    methods: methods.map((m) => ({
      name: m.name,
      parameters: m.params.map((p) => ({ name: p.name, type: p.type })),
      returnType: m.returns,
      docs: docOf(m),
    })),
  });
}

interface HandlePlan {
  file: string;
  className: string;
  interfaceName: string;
  doc: string[];
}

export const HANDLE_PLANS: HandlePlan[] = [
  {
    file: "src/ts/pokemon.ts",
    className: "PokemonHandle",
    interfaceName: "Pokemon",
    doc: [
      "Write-through Handle over one Pokémon entity inside a loaded save.",
      "",
      "Reads resolve through the wasm Binding immediately; mutators apply only",
      "within the edit tier and are guarded before reaching Core.",
    ],
  },
  {
    file: "src/ts/game.ts",
    className: "GameHandle",
    interfaceName: "Game",
    doc: [
      "Write-through Handle over one parsed save file.",
      "",
      "Snapshot accessors (`box`, `party`) materialize entity Handles on demand.",
    ],
  },
  {
    file: "src/ts/pkhex.ts",
    className: "PKHexImpl",
    interfaceName: "PKHex",
    doc: [
      "Synchronous API root created by {@link initPKHex}.",
      "",
      "Owns the wasm runtime instance; every operation here is synchronous",
      "after the one-time async init.",
    ],
  },
];

/** Surface-type names referenced anywhere in an interface's signatures. */
function referencedTypes(model: InterfaceModel): string[] {
  const known = new Set(TYPES.map((t) => t.name));
  const found = new Set<string>();
  const scan = (text?: string) => {
    if (!text) return;
    for (const t of known) {
      if (new RegExp(`\\b${t}\\b`).test(text)) found.add(t);
    }
  };
  for (const m of model.members) {
    if (m.kind === "prop") {
      scan(m.type);
    } else {
      m.params.forEach((p) => scan(p.type));
      scan(m.returns);
    }
  }
  return [...found].sort();
}

function buildHandle(project: Project, plan: HandlePlan): [string, string] {
  const sf = project.createSourceFile(plan.file);
  const model = TYPES.find((t) => t.name === plan.interfaceName)!;

  const imported = new Set([plan.interfaceName, ...referencedTypes(model)]);
  // the root module also hosts the appended initPKHex function
  if (plan.interfaceName === "PKHex") imported.add("InitOptions");
  sf.addImportDeclaration({
    moduleSpecifier: "./gen/types.ts",
    namedImports: [...imported].sort(),
  });
  sf.addImportDeclaration({
    moduleSpecifier: "./gen/errors.ts",
    namedImports: ["notImplemented"],
  });

  sf.addClass({
    name: plan.className,
    isExported: true,
    implements: [plan.interfaceName],
    docs: [[
      ...plan.doc,
      "",
      "@generated-skeleton — bodies are seams; implementation sessions replace them.",
    ].join("\n")],
    getAccessors: model.members
      .filter((m): m is Extract<MemberModel, { kind: "prop" }> => m.kind === "prop")
      .map((m) => ({
        kind: StructureKind.GetAccessor,
        name: m.name,
        returnType: m.type,
        docs: docOf(m),
        statements: [`throw notImplemented(${JSON.stringify(m.seam ?? m.name)});`],
      })),
    methods: model.members
      .filter((m): m is Extract<MemberModel, { kind: "method" }> => m.kind === "method")
      .map((m) => ({
        kind: StructureKind.Method,
        name: m.name,
        parameters: m.params.map((p) => ({ name: p.name, type: p.type })),
        returnType: m.returns,
        docs: docOf(m),
        statements: [`throw notImplemented(${JSON.stringify(m.seam)});`],
      })),
  });
  return [plan.file, sf.getFullText()];
}

function buildGenFiles(out: Map<string, string>): void {
  const project = new Project({ useInMemoryFileSystem: true });

  const typesSf = project.createSourceFile(`${GEN_DIR}/types.ts`);
  typesSf.addStatements(
    jsdocBlock([
      "Public v1 surface types.",
      "",
      "@generated by tools/apigen — regenerate with `deno task gen`; do not edit.",
    ]),
  );
  typesSf.addStatements("");
  for (const i of TYPES) addInterface(typesSf, i);

  const errorsSf = project.createSourceFile(`${GEN_DIR}/errors.ts`);
  errorsSf.addStatements(
    jsdocBlock([
      "Concrete error taxonomy of the v1 surface.",
      "",
      "@generated by tools/apigen — regenerate with `deno task gen`; do not edit.",
    ]),
  );
  errorsSf.addStatements("");
  for (const e of ERRORS) {
    errorsSf.addClass({
      name: e.name,
      extends: "Error",
      isExported: true,
      docs: [e.doc],
      ctors: [{
        parameters: [{ name: "message", initializer: JSON.stringify(e.defaultMessage) }],
        statements: (writer) => {
          writer.writeLine("super(message);");
          writer.writeLine(`this.name = "${e.name}";`);
        },
      }],
    });
  }
  errorsSf.addStatements("");
  errorsSf.addFunction({
    name: "notImplemented",
    isExported: true,
    returnType: "never",
    parameters: [{ name: "seam", type: "string" }],
    docs: ["Placeholder body for binding seams not yet wired to the wasm host."],
    statements: ['throw new Error(`pkhex-wasm: not implemented — ${seam}`);'],
  });

  for (const sf of project.getSourceFiles()) {
    out.set(sf.getFilePath().replace(/^\//, ""), sf.getFullText());
  }
}

function buildIndex(): string {
  const project = new Project({ useInMemoryFileSystem: true });
  const sf = project.createSourceFile("src/ts/index.ts");
  sf.addStatements(
    jsdocBlock([
      "pkhex-wasm public entry point.",
      "",
      "@example",
      "```ts",
      ...INIT.example,
      "```",
    ]),
  );
  sf.addStatements("");
  sf.addExportDeclaration({ moduleSpecifier: "./gen/types.ts" });
  sf.addExportDeclaration({
    moduleSpecifier: "./gen/errors.ts",
    namedExports: ERRORS.map((e) => e.name),
  });
  sf.addStatements('export { initPKHex, PKHexImpl } from "./pkhex.ts";');
  return sf.getFullText();
}

function appendInit(pkhexText: string): string {
  const block = `
${jsdocBlock([
  INIT.summary,
  "",
  "Wires the wasm runtime, registers Managed crypto providers, and hydrates",
  "the Lookup tables before returning the synchronous root.",
  "",
  "@param options runtime bootstrap options",
  "@generated-skeleton — bodies are seams; implementation sessions replace them.",
])}
export async function ${INIT.name}(options?: InitOptions): Promise<PKHex> {
  void options;
  throw notImplemented(
    "initPKHex: fetch _framework assets, boot runtime, register RuntimeCryptographyProvider.Aes/.Md5, hydrate Lookup tables",
  );
}
`;
  return `${pkhexText.trimEnd()}\n${block}`;
}

/**
 * Pure emitter — path → content for every skeleton artifact.
 *
 * `gen/` paths regenerate forever; root-module paths are bootstrap output
 * (the orchestrator writes them only when absent).
 */
export function emitSkeletonAll(): Map<string, string> {
  const out = new Map<string, string>();
  buildGenFiles(out);

  const handleProject = new Project({ useInMemoryFileSystem: true });
  for (const plan of HANDLE_PLANS) {
    out.set(...buildHandle(handleProject, plan));
  }

  const pkhexPath = HANDLE_PLANS[2].file;
  out.set(pkhexPath, appendInit(out.get(pkhexPath)!));
  out.set("src/ts/index.ts", buildIndex());
  return out;
}
