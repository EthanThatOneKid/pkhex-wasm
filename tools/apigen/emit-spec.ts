/**
 * Emitter C — generated API-reference chapter + spec stitcher.
 *
 * `buildApiReference` renders the model as markdown; `stitch` splices that
 * chapter into the normative section carrying the
 * `<!-- apigen:api-reference -->` marker, producing `docs/spec/v1-api.md`.
 */

import {
  ERRORS,
  INIT,
  TYPES,
  type InterfaceModel,
  type MemberModel,
} from "./model.ts";
import { throwsLines } from "./render.ts";

export const API_REFERENCE_MARKER = "<!-- apigen:api-reference -->";

function esc(s: string): string {
  return s.replace(/\|/g, "\\|");
}

function memberSignature(m: MemberModel): string {
  if (m.kind === "prop") {
    return `${m.name}${m.optional ? "?" : ""}: ${m.type}`;
  }
  const params = m.params.map((p) => `${p.name}: ${p.type}`).join(", ");
  return `${m.name}(${params}): ${m.returns}`;
}

function renderMember(m: MemberModel): string[] {
  const lines: string[] = [];
  if (m.kind === "method") {
    lines.push(`#### \`${memberSignature(m)}\``, "");
  } else {
    lines.push(
      `#### \`readonly ${m.name}\``,
      "",
      `\`${esc(memberSignature(m))}\` — ${m.summary}`,
      "",
    );
    if (m.remarks?.length) lines.push(...m.remarks.map((r) => r), "");
    return lines;
  }

  lines.push(m.summary, "");
  if (m.remarks?.length) lines.push(...m.remarks.map((r) => r), "");
  const params = m.params.filter((p) => p.desc);
  if (params.length) {
    lines.push(...params.map((p) => `- **\`${p.name}\`** — ${p.desc}`), "");
  }
  const throws = m.throws ?? [];
  if (throws.length) {
    lines.push(
      "Throws:",
      "",
      ...throws.map((t) => `- \`${t.error}\` — ${t.clause}`),
      "",
    );
  }
  return lines;
}

function renderInterface(i: InterfaceModel): string[] {
  const lines: string[] = [];
  lines.push(`### \`${i.name}\`${i.typeParams ? `<${i.typeParams[0]}>` : ""}`, "");
  if (i.extends?.length) lines.push(`Extends: ${i.extends.map((e) => `\`${e}\``).join(", ")}`, "");
  if (i.doc?.length) lines.push(i.doc.join(" "), "");

  const props = i.members.filter((m) => m.kind === "prop");
  if (props.length) {
    lines.push("| Member | Type | Description |", "| --- | --- | --- |");
    for (const p of props) {
      lines.push(
        `| \`${p.name}${p.optional ? "?" : ""}\` | \`${esc(p.type)}\` | ${p.summary} |`,
      );
    }
    lines.push("");
  }

  const methods = i.members.filter((m) => m.kind === "method");
  for (const m of methods) lines.push(...renderMember(m));

  return lines;
}

/** One row of the generated runtime binding map. */
export interface BindingRow {
  export: string;
  target: string;
  note?: string;
}

/** The generated chapter injected at the API-reference marker. */
export function buildApiReference(bindingRows?: readonly BindingRow[]): string {
  const lines: string[] = [];
  lines.push("## Public surface", "");
  lines.push(
    "> Generated from `tools/apigen/model.ts` — run `deno task gen`; never edit by hand.",
    "> The same model emits [`tools/apigen/fixtures/pkhex-wasm.d.ts`](../../tools/apigen/fixtures/pkhex-wasm.d.ts),",
    "> which the packaging pipeline ships as the package's `index.d.ts` and the",
    "> live docs site documents.",
    "> the declaration file the live docs site builds from.",
    "",
  );
  for (const t of TYPES) lines.push(...renderInterface(t));

  lines.push("### Error classes", "");
  for (const e of ERRORS) lines.push(`- \`${e.name}\` — ${e.doc}`, "");

  lines.push("### `initPKHex`", "");
  lines.push("```ts", "function initPKHex(options?: InitOptions): Promise<PKHex>;", "```", "");
  lines.push(INIT.summary, "");
  if (INIT.remarks.length) lines.push(...INIT.remarks, "");
  const initParams = INIT.params.filter((p) => p.desc);
  if (initParams.length) {
    lines.push(...initParams.map((p) => `- **\`${p.name}\`** — ${p.desc}`), "");
  }
  lines.push("Example:", "", "```ts", ...INIT.example, "```", "");

  if (bindingRows?.length) {
    lines.push("### Runtime binding map", "");
    lines.push(
      "Every `[JSExport]` member of the wasm facade and the surface member it powers.",
      "Generated from `runtime-meta.json` + `mappings.ts`; the drift gate fails",
      "when either side changes without the other.",
      "",
    );
    lines.push("| Wasm export | Surface | Note |", "| --- | --- | --- |");
    for (const row of bindingRows) {
      lines.push(`| \`${row.export}\` | \`${esc(row.target)}\` | ${row.note ?? ""} |`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

/** Splice the generated chapter into whichever section carries the marker. */
export function stitch(sections: readonly string[], chapter: string): string {
  return stitchWith(API_REFERENCE_MARKER, sections, chapter);
}

/** `stitch` against an explicit marker — one per generated chapter. */
export function stitchWith(
  marker: string,
  sections: readonly string[],
  chapter: string,
): string {
  let replaced = false;
  const out = sections.map((s) => {
    if (!s.includes(marker)) return s;
    replaced = true;
    return s.replace(marker, chapter.trimEnd());
  });
  if (!replaced) {
    throw new Error(
      `no section carries ${marker} — cannot place generated API reference`,
    );
  }
  return out.join("\n");
}
