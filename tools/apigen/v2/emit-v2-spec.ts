/**
 * Emitter C (v2) — the generated API-reference chapter for the v2 surface.
 *
 * `buildV2ApiReference` renders the shared projection as markdown; splice it
 * into whichever spec section carries `V2_API_MARKER`, producing
 * `docs/spec/v2-api.md`. Same model as the declarations and entity module —
 * docs stay generated, never hand-edited.
 */

import { projectCoreMeta, nsName, type ProjectedClass, type ProjectedCoreModel, type ProjectedMember } from "./project.ts";
import type { CoreMetaLike } from "./meta-types.ts";

export const V2_API_MARKER = "<!-- apigen:v2-api-reference -->";
export const V2_SPEC_PATH = "docs/spec/v2-api.md";

function esc(s: string): string {
  return s.replace(/\|/g, "\\|");
}

function memberRow(m: ProjectedMember, ns: boolean): string {
  const name = ns ? nsName(m.tsName) : m.tsName;
  if (m.kind === "method") {
    const params = m.params.map((p) => `${p.name}: ${p.tsType}`).join(", ");
    return `| \`${name}(${params})\` | \`${esc(m.tsType)}\` | ${m.docs ?? ""} |`;
  }
  const setter = m.setter ? " get/set via `set" + caps(m.tsName) + "()`" : " readonly (computed)";
  return `| \`${name}\` | \`${esc(m.tsType)}\` |${setter}${m.docs ? " — " + m.docs : ""} |`;
}

const caps = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function renderClass(cls: ProjectedClass): string[] {
  const lines: string[] = [];
  const meta: string[] = [`kind: ${cls.kind}`];
  if (cls.entityContext) meta.push(`context: ${cls.entityContext}`);
  if (cls.extends) meta.push(`extends \`${cls.extends}\``);
  lines.push(`### \`${cls.name}\``, "", `*${meta.join(" · ")}.*`, "");

  const instance = cls.members.filter((m) => !m.isStatic && !m.shadowed);
  const statics = cls.members.filter((m) => m.isStatic && !m.shadowed);

  if (instance.length > 0) {
    lines.push("| Member | Type | Description |", "| --- | --- | --- |");
    for (const m of instance) lines.push(memberRow(m, false));
    lines.push("");
  }
  if (statics.length > 0) {
    lines.push("Static members:", "");
    lines.push("| Member | Type | Description |", "| --- | --- | --- |");
    for (const m of statics) lines.push(memberRow(m, true));
    lines.push("");
  }
  return lines;
}

/** The generated chapter injected at the v2 marker. */
export function buildV2ApiReference(meta: CoreMetaLike): string {
  const model = projectCoreMeta(meta);
  const lines: string[] = [];
  lines.push("## v2 projected surface", "");
  lines.push(
    "> Generated from `runtime-meta-v2.json` — run `deno task gen`; never edit by hand.",
    "> Mirrors [`tools/apigen/fixtures/pkhex-wasm-v2.d.ts`](../../tools/apigen/fixtures/pkhex-wasm-v2.d.ts)",
    "> and `src/ts/gen/v2/entities.ts`; all three render from one projection.",
    "",
  );
  lines.push(
    `\`${model.stats.classes}\` classes · \`${model.stats.members}\` members (\`${model.stats.shadowed}\` ancestor-shadowed, suppressed) · \`${model.enums.length}\` enums.`,
    "",
  );

  lines.push("### Enum unions", "");
  for (const e of model.enums) {
    lines.push(`#### \`${e.name}\``, "", `\`${esc(e.union)}\``, "");
  }

  lines.push("### Entities", "");
  for (const cls of model.classes) lines.push(...renderClass(cls));

  if (model.unresolved.length > 0) {
    lines.push(
      "### Unresolved references",
      "",
      "Named types outside the scanned class set resolve as `unknown` until",
      "the reflector's scope widens:",
      "",
    );
    lines.push(model.unresolved.map((n) => `\`${n}\``).join(", "), "");
  }

  lines.push(
    "### Narrowing guards",
    "",
    ...model.classes.filter((c) => c.guard).map((c) => `- \`is${c.name}(entity: PKM)\``),
    "",
  );
  return lines.join("\n");
}
