/**
 * ADR 0001 projection transforms: raw C# facts in, TypeScript names and
 * types out. Pure functions only — determinism is what makes the inverted
 * drift gate sound.
 *
 * Naming: segmented rule over underscores/digits/acronyms; every segment is
 * lowercased, then segments after the first get an initial capital.
 *
 *   Move1_PP        -> move1Pp
 *   Stat_HPCurrent  -> statHpCurrent
 *   OT_Name         -> otName
 *   TID16           -> tid16
 *
 * Hostile stragglers route through the explicit override table passed by
 * the caller (`overrides.ts`) — never edited here. The scanner's merge pass
 * already renders `SetIVs -> setIvs`, so today's table starts empty.
 */

const LOWER_UPPER = /([a-z])([A-Z])/g;
const ACRONYM_LOWER = /([A-Z]+)([A-Z][a-z])/g;
const LETTER_DIGIT = /([A-Za-z])(\d)/g;
const DIGIT_LETTER = /(\d)([A-Za-z])/g;

export function projectMemberName(csName: string, overrides?: Record<string, string>): string {
  const overridden = overrides?.[csName];
  if (overridden !== undefined) return overridden;

  // Underscores are word-group boundaries; mark them before case-splitting
  // so group membership survives tokenization ("\u0000" sentinel).
  const segmented = csName
    .replace(LOWER_UPPER, "$1 $2")
    .replace(ACRONYM_LOWER, "$1 $2")
    .replace(LETTER_DIGIT, "$1 $2")
    .replace(DIGIT_LETTER, "$1 $2");
  const tokens = segmented.replace(/_/g, " \u0000 ").split(/\s+/).filter(Boolean);

  const parts: string[] = [];
  const startsGroup: boolean[] = [];
  let nextIsGroupStart = false;
  for (const token of tokens) {
    if (token === "\u0000") {
      nextIsGroupStart = true;
      continue;
    }
    parts.push(token);
    startsGroup.push(parts.length === 1 ? false : nextIsGroupStart);
    nextIsGroupStart = false;
  }

  // Merge acronym fragments the splitter tore apart ("I"+"Vs" -> "IVs"),
  // remembering to re-capitalize the merged word at render time.
  const forceCapFirst = new Array<boolean>(parts.length).fill(false);
  for (let i = parts.length - 2; i >= 0; i--) {
    if (parts[i].length === 1 && /^[A-Z]$/.test(parts[i]) && /^[A-Z]/.test(parts[i + 1])) {
      parts[i] += parts[i + 1];
      startsGroup[i] = startsGroup[i] || startsGroup[i + 1];
      forceCapFirst[i] = true;
      parts.splice(i + 1, 1);
      startsGroup.splice(i + 1, 1);
      forceCapFirst.splice(i + 1, 1);
    }
  }

  return parts
    .map((part, i) => {
      if (i === 0) return part.toLowerCase();
      if (startsGroup[i] || forceCapFirst[i]) return capFirst(foldAcronym(part));
      // Mid-group: mixed-case words keep their casing; all-caps runs are
      // acronyms and fold ("Move1_PPUps" -> move1 + pp + Ups).
      return /^[A-Z][a-z]/.test(part) ? part : foldAcronym(part);
    })
    .join("");
}

/** Lowercases the leading uppercase run, preserving the rest ("HPx"->"hpx"). */
function foldAcronym(part: string): string {
  const m = /^([A-Z]+)(.*)$/.exec(part);
  if (!m) return part; // digits or already-lowercase tokens
  return m[1].toLowerCase() + m[2];
}

const capFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// Type mapping
// ---------------------------------------------------------------------------

const PRIMITIVES: Record<string, string> = {
  byte: "number",
  sbyte: "number",
  short: "number",
  ushort: "number",
  int: "number",
  uint: "number",
  long: "bigint",
  ulong: "bigint",
  float: "number",
  double: "number",
  decimal: "number",
  bool: "boolean",
  string: "string",
  char: "string",
  // The formatter occasionally surfaces CLR spellings inside generics
  // ("List<Decimal>"); map those spellings too.
  Decimal: "number",
  Char: "string",
  Boolean: "boolean",
  Int32: "number",
  Int64: "bigint",
  // System date-only/time-only values project as ISO strings (ADR 0001).
  DateOnly: "string",
  TimeOnly: "string",
};

/**
 * Maps one C# type string to its projected TypeScript type. Enum tables are
 * keyed by short C# name ("Nature"), as rendered by the reflector's
 * `TypeNameFormatter`.
 */
export function projectType(
  csType: string,
  enums?: Record<string, readonly string[]>,
): string {
  if (csType.endsWith("?")) {
    return `${projectType(csType.slice(0, -1), enums)} | null`;
  }

  const primitive = PRIMITIVES[csType];
  if (primitive) return primitive;

  const byteBuffer = /^((ReadOnly)?Span|Memory)<byte>$/.exec(csType);
  if (byteBuffer) return "Uint8Array";

  if (csType === "byte[]") return "Uint8Array";

  const array = /^([\w.]+)\[\]$/.exec(csType);
  if (array) {
    return `readonly ${wrapIfUnion(projectType(array[1], enums))}[]`;
  }

  const span = /^(ReadOnly)?Span<(.+)>$/.exec(csType);
  if (span) {
    return `readonly ${wrapIfUnion(projectType(span[2], enums))}[]`;
  }

  const collection = /^(IList|IReadOnlyList|List|IEnumerable|ICollection)<(.+)>$/.exec(csType);
  if (collection) {
    return `readonly ${wrapIfUnion(projectType(collection[2], enums))}[]`;
  }

  // Delegates become their call signatures; Func's last argument is the
  // result ("Func<InventoryItem, int, bool>" -> "(arg0: InventoryItem,
  // arg1: number) => boolean").
  const delegate = /^(Func|Action|Predicate)<(.+)>$/.exec(csType);
  if (delegate) {
    const args = splitTopLevel(delegate[2]).map((a) => projectType(a, enums));
    const kind = delegate[1];
    if (kind === "Predicate") return `(${argList(args)}) => boolean`;
    if (kind === "Action") return `(${argList(args)}) => void`;
    const params = args.slice(0, -1);
    return `(${argList(params)}) => ${args[args.length - 1]}`;
  }

  const nullableGeneric = /^Nullable<(.+)>$/.exec(csType);
  if (nullableGeneric) {
    return `${projectType(nullableGeneric[1], enums)} | null`;
  }

  // C# tuples project as TS tuples ("ValueTuple<byte, byte>" ->
  // "readonly [number, number]").
  const valueTuple = /^ValueTuple<(.+)>$/.exec(csType);
  if (valueTuple) {
    return `readonly [${splitTopLevel(valueTuple[1]).map((a) => projectType(a, enums)).join(", ")}]`;
  }

  const enumValues = enums?.[csType];
  if (enumValues) {
    return enumValues.map((name) => `"${name}"`).join(" | ");
  }

  // Unknown generic shapes keep their outer name but recurse-map their
  // arguments, so primitives inside them project instead of leaking raw
  // C# spellings ("IEquatable<byte>" -> "IEquatable<number>").
  const generic = /^([A-Za-z_][\w.]*)<(.+)>$/.exec(csType);
  if (generic) {
    return `${generic[1]}<${splitTopLevel(generic[2]).map((a) => projectType(a, enums)).join(", ")}>`;
  }

  // Named references (classes, interfaces, structs like PersonalInfo) pass
  // through verbatim; their declarations are projected alongside.
  return csType;
}

/** Splits a generic argument list on top-level commas only. */
function splitTopLevel(list: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of list) {
    if (ch === "<") depth++;
    else if (ch === ">") depth--;
    if (ch === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function argList(types: string[]): string {
  return types.map((t, i) => `arg${i}: ${t}`).join(", ");
}

/** Unions need parens when they become an array's element type. */
function wrapIfUnion(tsType: string): string {
  return tsType.includes(" | ") ? `(${tsType})` : tsType;
}

/**
 * Adapts the reflector's FQN-keyed enum tables (`PKHeX.Core.Nature`) to the
 * short-name keys member type strings use ("Nature"). Callers building a
 * transform context from runtime-meta-v2.json run this once.
 */
export function shortEnumLookup(
  enumsByFqn: Record<string, { name: string; values: { name: string }[] }>,
): Record<string, readonly string[]> {
  const lookup: Record<string, readonly string[]> = {};
  for (const [fqn, info] of Object.entries(enumsByFqn)) {
    const short = fqn.split(".").pop() ?? fqn;
    if (!(short in lookup)) {
      lookup[short] = info.values.map((v) => v.name);
    }
  }
  return lookup;
}
