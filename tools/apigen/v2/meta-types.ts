/**
 * Structural view of `runtime-meta-v2.json` — the raw C# facts emitted by
 * tools/reflector (ADR 0001). Kept decoupled from the emitter so tests can
 * synthesize metadata without the real artifact.
 */

export interface ParamLike {
  name: string;
  csType: string;
}

export interface MemberLike {
  csName: string;
  kind: "property" | "field" | "method" | string;
  csType: string;
  access: "get" | "getSet" | "set" | "readWrite" | "method" | string;
  computed: boolean;
  isStatic: boolean;
  declaredBy: string;
  docs?: string | null;
  params?: ParamLike[];
}

export interface ClassLike {
  name: string;
  kind: "class" | "abstract" | "static" | "interface" | string;
  baseChain: string[];
  entityContext?: string | null;
  members: MemberLike[];
}

export interface EnumInfoLike {
  name: string;
  values: { name: string; value?: number }[];
}

export interface CoreMetaLike {
  schemaVersion: number;
  sourceCommit: string;
  enums: Record<string, EnumInfoLike>;
  classes: Record<string, ClassLike>;
}
