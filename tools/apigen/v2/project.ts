/**
 * The projected v2 model — runtime-meta-v2.json transformed into neutral,
 * renderer-agnostic structures (ADR 0001). Every artifact surface (ambient
 * declarations, the importable entity module, the spec chapter) renders from
 * this one projection, so they cannot drift apart.
 */

import { projectMemberName, projectType, shortEnumLookup } from "./transform.ts";
import { MEMBER_NAME_OVERRIDES } from "./overrides.ts";
import type { ClassLike, CoreMetaLike, MemberLike } from "./meta-types.ts";

export interface ProjectedParam {
  name: string;
  tsType: string;
}

export interface ProjectedMember {
  tsName: string;
  kind: "property" | "method";
  /**
   * False for methods and get/computed members; true means the renderer also
   * emits the mechanical `setX(value): void` companion.
   */
  setter: boolean;
  /** Raw reflector fact — distinguishes computed members from plain get-only. */
  computed: boolean;
  /** Mapped field type, or the method's return type. */
  tsType: string;
  params: ProjectedParam[];
  docs?: string | null;
  isStatic: boolean;
  /** Suppressed from output because a projected ancestor declares it too. */
  shadowed: boolean;
}

/** Rendered parameter list shared by every renderer. */
export function paramsText(m: ProjectedMember): string {
  return m.params.map((p) => `${p.name}: ${p.tsType}`).join(", ");
}

export interface ProjectedClass {
  fqn: string;
  /** Rendered interface/namespace name (arity applied). */
  name: string;
  kind: string;
  /** Rendered direct base, only when that base is itself projected. */
  extends?: string;
  entityContext?: string | null;
  members: ProjectedMember[];
  /** Concrete format class eligible for an `is<Name>` narrowing guard. */
  guard: boolean;
}

export interface ProjectedEnum {
  fqn: string;
  name: string;
  union: string;
}

export interface ProjectedCoreModel {
  enums: ProjectedEnum[];
  classes: ProjectedClass[];
  /** Sorted identifiers referenced but never declared; renderers emit stubs. */
  unresolved: string[];
  stats: {
    classes: number;
    /** Non-static classes; each renders exactly one interface. */
    interfaces: number;
    members: number;
    guards: number;
    shadowed: number;
  };
}

/** TS keywords/builtins that always resolve; never stubbed. */
const TS_TYPE_WORDS = new Set([
  "string", "number", "boolean", "bigint", "void", "unknown", "never",
  "object", "any", "true", "false", "null", "undefined", "readonly",
  "keyof", "Uint8Array",
]);

const IDENTIFIER = /[A-Za-z_][A-Za-z0-9_]*/g;
const DELEGATE_ARG = /^arg\d+$/;

/** Identifiers that cannot appear bare in an ambient namespace body. */
const RESERVED = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger",
  "default", "delete", "do", "else", "enum", "export", "extends", "false",
  "finally", "for", "function", "if", "import", "in", "instanceof", "new",
  "null", "return", "super", "switch", "this", "throw", "true", "try",
  "typeof", "var", "void", "while", "with", "yield", "let", "static",
]);

/** Records identifiers a projected type references but projection never declares. */
function scanReferences(tsType: string, known: Set<string>, into: Set<string>): void {
  // String-literal union members are values, not type references.
  for (const m of tsType.replace(/"[^"]*"/g, "").matchAll(IDENTIFIER)) {
    if (!known.has(m[0]) && !DELEGATE_ARG.test(m[0])) into.add(m[0]);
  }
}

/** Namespace members named after reserved words escape with a trailing underscore. */
export function nsName(tsName: string): string {
  return RESERVED.has(tsName) ? `${tsName}_` : tsName;
}

export function shortOf(fqn: string): string {
  return fqn.split(".").pop() ?? fqn;
}

/** Drops the CLR generic-arity suffix ("ZukanBase`1" -> "ZukanBase"). */
export function stripArity(name: string): string {
  const tick = name.indexOf("`");
  return tick < 0 ? name : name.slice(0, tick);
}

/** `ZukanBase\`1` -> `ZukanBase<T>`; arity beyond two continues T2, T3. */
export function withArity(name: string): string {
  const tick = name.indexOf("`");
  if (tick < 0) return name;
  const arity = Number(name.slice(tick + 1));
  const params = Array.from({ length: arity }, (_, i) => (i === 0 ? "T" : `T${i + 1}`));
  return `${stripArity(name)}<${params.join(", ")}>`;
}

export const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Stable per-member identity used for ancestor-shadowing checks. */
function memberKey(m: MemberLike): string {
  const n = projectMemberName(m.csName, MEMBER_NAME_OVERRIDES);
  return `${m.isStatic ? "s" : "i"}|${m.kind}|${n}`;
}

/** Union of declared member keys across the class's projected ancestors. */
function inheritedKeys(
  cls: ClassLike,
  declaredKeys: Map<string, Set<string>>,
): Set<string> {
  const keys = new Set<string>();
  for (const base of cls.baseChain) {
    const set = declaredKeys.get(base);
    if (set) for (const k of set) keys.add(k);
  }
  return keys;
}

/** Projects the reflector's raw facts into the shared renderer input. Pure. */
export function projectCoreMeta(meta: CoreMetaLike): ProjectedCoreModel {
  const enumsShort = shortEnumLookup(meta.enums);
  const known = new Set<string>(TS_TYPE_WORDS);
  for (const short of Object.keys(enumsShort)) known.add(short);
  for (const fqn of Object.keys(meta.classes)) known.add(stripArity(shortOf(fqn)));
  const unresolvedSet = new Set<string>();
  const note = (t: string) => scanReferences(t, known, unresolvedSet);

  // Declared-member keys per class, used to skip child declarations that
  // merely hide an ancestor member (C# `new` hiding) — TS interfaces cannot
  // express incompatible redeclarations across `extends`.
  const declaredKeys = new Map<string, Set<string>>();
  for (const [fqn, cls] of Object.entries(meta.classes)) {
    declaredKeys.set(fqn, new Set(cls.members.map(memberKey)));
  }

  const enums = Object.entries(meta.enums).map(([fqn, info]) => ({
    fqn,
    name: info.name,
    union: info.values.map((v) => `"${v.name}"`).join(" | "),
  }));

  let guards = 0;
  let shadowed = 0;
  let members = 0;
  const classes: ProjectedClass[] = [];
  for (const fqn of Object.keys(meta.classes).sort()) {
    const cls = meta.classes[fqn];
    // Only the direct C# base extends: TS forbids extending two types that
    // already share a chain, and deeper ancestors arrive transitively anyway.
    const direct = cls.baseChain[0];
    const extendsName = direct && meta.classes[direct] ? withArity(shortOf(direct)) : undefined;
    if (extendsName) note(extendsName);

    const inherited = inheritedKeys(cls, declaredKeys);
    const projectedMembers: ProjectedMember[] = [];
    for (const member of cls.members) {
      const tsName = projectMemberName(member.csName, MEMBER_NAME_OVERRIDES);
      const tsType = projectType(member.csType, enumsShort);
      note(tsType);
      const isMethod = member.kind === "method";
      const params = isMethod
        ? (member.params ?? []).map((p) => {
            const t = projectType(p.csType, enumsShort);
            note(t);
            return { name: p.name, tsType: t };
          })
        : [];
      const isShadowed = inherited.has(memberKey(member));
      members++;
      if (isShadowed) shadowed++;
      projectedMembers.push({
        tsName,
        kind: isMethod ? "method" : "property",
        setter: !isMethod && !member.computed && member.access !== "get",
        computed: member.computed,
        tsType,
        params,
        docs: member.docs ?? null,
        isStatic: member.isStatic,
        shadowed: isShadowed,
      });
    }

    const guard = Boolean(
      cls.entityContext && cls.kind === "class" &&
        cls.baseChain.some((b) => shortOf(b) === "PKM"),
    );
    if (guard) guards++;

    classes.push({
      fqn,
      name: withArity(shortOf(fqn)),
      kind: cls.kind,
      extends: extendsName,
      entityContext: cls.entityContext ?? null,
      members: projectedMembers,
      guard,
    });
  }

  return {
    enums,
    classes,
    unresolved: [...unresolvedSet].sort(),
    stats: {
      classes: Object.keys(meta.classes).length,
      interfaces: classes.filter((c) => c.kind !== "static").length,
      members,
      guards,
      shadowed,
    },
  };
}
