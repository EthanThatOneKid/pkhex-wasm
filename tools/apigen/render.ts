/**
 * Shared JSDoc composition used by every emitter so prose lives in exactly
 * one place per fact (the model) and renders identically everywhere.
 */

import type { MemberModel, ParamModel, ThrowsModel } from "./model.ts";

export function throwsLines(throws: ThrowsModel[] | undefined): string[] {
  return (throws ?? []).map((t) => `@throws {${t.error}} ${t.clause}`);
}

function paramLines(params: ParamModel[]): string[] {
  return params
    .filter((p) => p.desc)
    .map((p) => `@param ${p.name} ${p.desc}`);
}

/** Compose a full JSDoc body for a member; empty array when nothing to say. */
export function memberJsdoc(m: MemberModel): string[] {
  const lines: string[] = [];
  if (m.summary) lines.push(m.summary);
  if (m.remarks?.length) {
    if (lines.length) lines.push("");
    lines.push(...m.remarks);
  }
  const extra = [
    ...(m.kind === "method" ? paramLines(m.params) : []),
    ...(m.kind === "method" && m.returnsDesc ? [`@returns ${m.returnsDesc}`] : []),
    ...throwsLines(m.throws),
  ];
  if (extra.length) {
    if (lines.length) lines.push("");
    lines.push(...extra);
  }
  return lines;
}

/** Render a JSDoc block (`/** ... *`+`/`) from raw lines, or "" when empty. */
export function jsdocBlock(lines: string[]): string {
  if (!lines.length) return "";
  return ["/**", ...lines.map((l) => ` * ${l}`.trimEnd()), " */"].join("\n");
}
