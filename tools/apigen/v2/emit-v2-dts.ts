/**
 * Emitter A (v2) — canonical ambient declarations for the projected surface.
 *
 * Renders `projectCoreMeta`'s model into:
 *
 *   tools/apigen/fixtures/pkhex-wasm-v2.d.ts
 *
 * v1 artifacts stay untouched until the hard-replace cut (#39). Emission is
 * a pure function of metadata: byte-deterministic, so the existing
 * gen/gen:check drift machinery covers this file like any other.
 */

import {
  capFirst,
  nsName,
  projectCoreMeta,
  type ProjectedClass,
  type ProjectedCoreModel,
  type ProjectedMember,
} from "./project.ts";
import type { CoreMetaLike } from "./meta-types.ts";

export const V2_DTS_PATH = "tools/apigen/fixtures/pkhex-wasm-v2.d.ts";

export interface EmitStats {
  classes: number;
  members: number;
  guards: number;
  /** Consumed facts suppressed because an ancestor declares the same member. */
  shadowed: number;
}

export function emitV2Dts(meta: CoreMetaLike): {
  path: typeof V2_DTS_PATH;
  content: string;
  stats: EmitStats;
} {
  const model = projectCoreMeta(meta);
  return {
    path: V2_DTS_PATH,
    content: renderDts(model, meta),
    stats: {
      classes: model.stats.interfaces,
      members: model.stats.members,
      guards: model.stats.guards,
      shadowed: model.stats.shadowed,
    },
  };
}

function renderDts(
  model: ProjectedCoreModel,
  meta: Pick<CoreMetaLike, "sourceCommit" | "schemaVersion">,
): string {
  const lines: string[] = [];

  lines.push("/// < GENERATED FILE — do not edit by hand.");
  lines.push(`/// Source: runtime-meta-v2.json @ sourceCommit ${meta.sourceCommit} (schema v${meta.schemaVersion}).`);
  lines.push(`/// Covers ${model.stats.classes} classes / ${model.stats.members} members / ${model.enums.length} enums.`);
  lines.push("/// Regenerate via `deno task gen`; drift gate fails when this file lags.");
  lines.push("");

  for (const e of model.enums) {
    lines.push(`/** Raw C# enum \`${e.fqn}\`. */`);
    lines.push(`export type ${e.name} = ${e.union};`);
    lines.push("");
  }

  const guards: string[] = [];
  for (const cls of model.classes) {
    const doc = [
      `Projected from \`${cls.fqn}\`${cls.entityContext ? ` (${cls.entityContext})` : ""}.`,
      `Kind: ${cls.kind}.`,
    ];
    lines.push("/**");
    for (const d of doc) lines.push(` * ${d}`);
    lines.push(" */");

    if (cls.kind !== "static") {
      lines.push(`export interface ${cls.name}${cls.extends ? ` extends ${cls.extends}` : ""} {`);
      for (const member of cls.members) {
        if (!member.isStatic && !member.shadowed) renderMember(lines, member, false);
      }
      lines.push("}");
      lines.push("");
    }

    const statics = cls.members.filter((m) => m.isStatic && !m.shadowed);
    if (statics.length > 0) {
      lines.push(`export declare namespace ${cls.name} {`);
      for (const member of statics) renderMember(lines, member, true);
      lines.push("}");
      lines.push("");
    }

    if (cls.guard) {
      guards.push(
        `export declare function is${cls.name}(entity: PKM): entity is ${cls.name};`,
      );
    }
  }

  if (guards.length > 0) {
    lines.push("// ---- narrowing guards (concrete formats) ----");
    lines.push(...guards);
    lines.push("");
  }

  if (model.unresolved.length > 0) {
    lines.push("// ---- unresolved reference stubs: named types outside the scanned ----");
    lines.push("// ---- class set (and generic parameters) resolve as unknown until ----");
    lines.push("// ---- the reflector's projection scope widens to cover them.        ----");
    for (const name of model.unresolved) {
      lines.push(`export type ${name} = unknown;`);
    }
    lines.push("");
  }

  lines.push(
    `/// Consumed ${model.stats.members} members; suppressed ${model.stats.shadowed} as ancestor-shadowed.`,
  );

  return lines.join("\n") + "\n";
}

function renderMember(lines: string[], member: ProjectedMember, ns: boolean): void {
  const name = ns ? nsName(member.tsName) : member.tsName;

  if (member.docs) {
    lines.push(`/** ${member.docs} */`);
  }
  if (member.kind === "method") {
    const params = member.params.map((p) => `${p.name}: ${p.tsType}`).join(", ");
    // Ambient namespaces require explicit declaration keywords.
    lines.push(`${ns ? "function " : ""}${name}(${params}): ${member.tsType};`);
  } else if (!member.setter) {
    lines.push(`${ns ? "const" : "readonly"} ${name}: ${member.tsType};`);
  } else {
    // Snapshot reads stay readonly; writes go through the mechanical setter.
    if (ns) {
      lines.push(`const ${name}: ${member.tsType};`);
      lines.push(`function set${capFirst(name)}(value: ${member.tsType}): void;`);
    } else {
      lines.push(`readonly ${name}: ${member.tsType};`);
      lines.push(`set${capFirst(name)}(value: ${member.tsType}): void;`);
    }
  }
}
