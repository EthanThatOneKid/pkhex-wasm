/**
 * Emitter for the v2 projected surface — slice 2 of ticket #35.
 *
 * Consumes `runtime-meta-v2.json` (raw C# facts, ADR 0001) plus the shared
 * transforms and emits the canonical v2 declaration artifact:
 *
 *   tools/apigen/fixtures/pkhex-wasm-v2.d.ts
 *
 * v1 artifacts stay untouched until the hard-replace cut (#39). Emission is
 * a pure function of (metadata, overrides): byte-deterministic, so the
 * existing gen/gen:check drift machinery covers this file like any other.
 */

import { projectMemberName, projectType, shortEnumLookup } from "./transform.ts";
import { MEMBER_NAME_OVERRIDES } from "./overrides.ts";
import type { ClassLike, CoreMetaLike, MemberLike } from "./meta-types.ts";

export const V2_DTS_PATH = "tools/apigen/fixtures/pkhex-wasm-v2.d.ts";

export interface EmitStats {
  classes: number;
  members: number;
  guards: number;
}

/** TS keywords/builtins that always resolve; never stubbed. */
const TS_TYPE_WORDS = new Set([
  "string", "number", "boolean", "bigint", "void", "unknown", "never",
  "object", "any", "true", "false", "null", "undefined", "readonly",
  "keyof", "Uint8Array",
]);

const IDENTIFIER = /[A-Za-z_][A-Za-z0-9_]*/g;
const DELEGATE_ARG = /^arg\d+$/;

/** Records identifiers a projected type references but emission never declares. */
function scanReferences(tsType: string, known: Set<string>, into: Set<string>): void {
  // String-literal union members are values, not type references.
  for (const m of tsType.replace(/"[^"]*"/g, "").matchAll(IDENTIFIER)) {
    if (!known.has(m[0]) && !DELEGATE_ARG.test(m[0])) into.add(m[0]);
  }
}

export function emitV2Dts(meta: CoreMetaLike): {
  path: typeof V2_DTS_PATH;
  content: string;
  stats: EmitStats;
} {
  const enumsShort = shortEnumLookup(meta.enums);
  const known = new Set<string>(TS_TYPE_WORDS);
  for (const short of Object.keys(enumsShort)) known.add(short);
  for (const fqn of Object.keys(meta.classes)) {
    const s = shortOf(fqn);
    known.add(s.includes("`") ? s.slice(0, s.indexOf("`")) : s);
  }
  const unresolved = new Set<string>();
  const ctx = { enums: enumsShort, note: (t: string) => scanReferences(t, known, unresolved) };
  // Declared-member keys per class, used to skip child declarations that
  // merely hide an ancestor member (C# `new` hiding) — TS interfaces cannot
  // express incompatible redeclarations across `extends`.
  const declaredKeys = new Map<string, Set<string>>();
  for (const [fqn, cls] of Object.entries(meta.classes)) {
    declaredKeys.set(fqn, new Set(cls.members.map(memberKey)));
  }
  const lines: string[] = [];
  const stats: EmitStats = { classes: 0, members: 0, guards: 0 };

  const totalMembers = Object.values(meta.classes)
    .reduce((sum, c) => sum + c.members.length, 0);

  lines.push("/// < GENERATED FILE — do not edit by hand.");
  lines.push(`/// Source: runtime-meta-v2.json @ sourceCommit ${meta.sourceCommit} (schema v${meta.schemaVersion}).`);
  lines.push(`/// Covers ${Object.keys(meta.classes).length} classes / ${totalMembers} members / ${Object.keys(meta.enums).length} enums.`);
  lines.push("/// Regenerate via `deno task gen`; drift gate fails when this file lags.");
  lines.push("");

  // ---- enum unions ----------------------------------------------------------
  for (const [fqn, info] of Object.entries(meta.enums)) {
    const union = info.values.map((v) => `"${v.name}"`).join(" | ");
    lines.push(`/** Raw C# enum \`${fqn}\`. */`);
    lines.push(`export type ${info.name} = ${union};`);
    lines.push("");
  }

  // ---- class interfaces + static namespaces ----------------------------------
  const guards: string[] = [];
  for (const fqn of Object.keys(meta.classes).sort()) {
    const cls = meta.classes[fqn];

    const tsName = interfaceName(fqn);
    const doc = [
      `Projected from \`${fqn}\`${cls.entityContext ? ` (${cls.entityContext})` : ""}.`,
      `Kind: ${cls.kind}.`,
    ];
    lines.push("/**");
    for (const d of doc) lines.push(` * ${d}`);
    lines.push(" */");

    const instanceMembers = cls.members.filter((m) => !m.isStatic);
    const staticMembers = cls.members.filter((m) => m.isStatic);

    if (cls.kind !== "static") {
      const extendsPart = renderExtends(cls, meta.classes, ctx.note);
      lines.push(`export interface ${tsName}${extendsPart} {`);
      const inherited = inheritedKeys(cls, meta.classes, declaredKeys);
      for (const member of instanceMembers) {
        emitMember(lines, member, ctx, stats, false, inherited.has(memberKey(member)));
      }
      lines.push("}");
      lines.push("");
      stats.classes++;
    }

    if (staticMembers.length > 0) {
      lines.push(`export declare namespace ${tsName} {`);
      const inherited = inheritedKeys(cls, meta.classes, declaredKeys);
      for (const member of staticMembers) {
        emitMember(lines, member, ctx, stats, true, inherited.has(memberKey(member)));
      }
      lines.push("}");
      lines.push("");
    }

    if (
      cls.entityContext && cls.kind === "class" &&
      cls.baseChain.some((b) => shortOf(b) === "PKM")
    ) {
      guards.push(
        `export declare function is${tsName}(entity: PKM): entity is ${tsName};`,
      );
      stats.guards++;
    }
  }

  if (guards.length > 0) {
    lines.push("// ---- narrowing guards (concrete formats) ----");
    lines.push(...guards);
    lines.push("");
  }

  if (unresolved.size > 0) {
    lines.push("// ---- unresolved reference stubs: named types outside the scanned ----");
    lines.push("// ---- class set (and generic parameters) resolve as unknown until ----");
    lines.push("// ---- the reflector's projection scope widens to cover them.        ----");
    for (const name of [...unresolved].sort()) {
      lines.push(`export type ${name} = unknown;`);
    }
    lines.push("");
  }

  if (stats.members !== totalMembers) {
    throw new Error(
      `completeness violation: emitted ${stats.members} of ${totalMembers} metadata members`,
    );
  }

  return { path: V2_DTS_PATH, content: lines.join("\n") + "\n", stats };
}

// ----------------------------------------------------------------------------

/** Identifiers that cannot appear bare in an ambient namespace body. */
const RESERVED = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger",
  "default", "delete", "do", "else", "enum", "export", "extends", "false",
  "finally", "for", "function", "if", "import", "in", "instanceof", "new",
  "null", "return", "super", "switch", "this", "throw", "true", "try",
  "typeof", "var", "void", "while", "with", "yield", "let", "static",
]);

/** Namespace members named after reserved words escape with a trailing underscore. */
function nsName(tsName: string): string {
  return RESERVED.has(tsName) ? `${tsName}_` : tsName;
}

function emitMember(
  lines: string[],
  member: MemberLike,
  ctx: { enums: Record<string, readonly string[]>; note(tsType: string): void },
  stats: EmitStats,
  ns = false,
  shadowed = false,
): void {
  const tsNameRaw = projectMemberName(member.csName, MEMBER_NAME_OVERRIDES);
  const tsName = ns ? nsName(tsNameRaw) : tsNameRaw;
  const tsType = projectType(member.csType, ctx.enums);
  ctx.note(tsType);

  // Completeness counts every consumed fact even when a shadowed member is
  // suppressed from output (the ancestor's declaration stands in for it).
  stats.members++;
  if (shadowed) return;

  if (member.docs) {
    lines.push(`/** ${member.docs} */`);
  }
  if (member.kind === "method") {
    const params = (member.params ?? [])
      .map((p) => {
        const t = projectType(p.csType, ctx.enums);
        ctx.note(t);
        return `${p.name}: ${t}`;
      })
      .join(", ");
    const ret = projectType(member.csType, ctx.enums);
    // Ambient namespaces require explicit declaration keywords.
    lines.push(`${ns ? "function " : ""}${tsName}(${params}): ${ret};`);
  } else if (member.computed || member.access === "get") {
    lines.push(`${ns ? "const" : "readonly"} ${tsName}: ${tsType};`);
  } else {
    // Snapshot reads stay readonly; writes go through the mechanical setter.
    if (ns) {
      lines.push(`const ${tsName}: ${tsType};`);
      lines.push(`function set${capFirst(tsName)}(value: ${tsType}): void;`);
    } else {
      lines.push(`readonly ${tsName}: ${tsType};`);
      lines.push(`set${capFirst(tsName)}(value: ${tsType}): void;`);
    }
  }
}

/** Stable per-member identity used for ancestor-shadowing checks. */
function memberKey(m: MemberLike): string {
  const n = projectMemberName(m.csName, MEMBER_NAME_OVERRIDES);
  return `${m.isStatic ? "s" : "i"}|${m.kind}|${n}`;
}

/** Union of declared member keys across the class's projected ancestors. */
function inheritedKeys(
  cls: ClassLike,
  classes: Record<string, ClassLike>,
  declaredKeys: Map<string, Set<string>>,
): Set<string> {
  const keys = new Set<string>();
  for (const base of cls.baseChain) {
    const set = declaredKeys.get(base);
    if (set) for (const k of set) keys.add(k);
  }
  return keys;
}

function renderExtends(
  cls: ClassLike,
  classes: Record<string, ClassLike>,
  note: (t: string) => void,
): string {
  // Only the direct C# base extends: TS forbids extending two types that
  // already share a chain ("extends SaveFile, SAV5"), and deeper ancestors
  // arrive transitively anyway.
  const direct = cls.baseChain[0];
  if (!direct || !classes[direct]) return "";
  const rendered = withArity(shortOf(direct));
  note(rendered);
  return ` extends ${rendered}`;
}

function interfaceName(fqn: string): string {
  return withArity(shortOf(fqn));
}

function shortOf(fqn: string): string {
  return fqn.split(".").pop() ?? fqn;
}

/** `ZukanBase\`1` -> `ZukanBase<T>`; arity beyond two continues T2, T3. */
function withArity(name: string): string {
  const tick = name.indexOf("`");
  if (tick < 0) return name;
  const arity = Number(name.slice(tick + 1));
  const base = name.slice(0, tick);
  const params = Array.from({ length: arity }, (_, i) => (i === 0 ? "T" : `T${i + 1}`));
  return `${base}<${params.join(", ")}>`;
}

const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
