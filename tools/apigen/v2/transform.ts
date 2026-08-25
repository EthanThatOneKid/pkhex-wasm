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
 * Hostile stragglers (e.g. `IVs` → mechanically `iVs`) go through the
 * explicit override table passed by the caller — never edited here.
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
  bool: "boolean",
  string: "string",
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
    return `readonly ${projectType(array[1], enums)}[]`;
  }

  const span = /^(ReadOnly)?Span<(.+)>$/.exec(csType);
  if (span) {
    return `readonly ${projectType(span[2], enums)}[]`;
  }

  const collection = /^(IList|IReadOnlyList|List|IEnumerable|ICollection)<(.+)>$/.exec(csType);
  if (collection) {
    return `readonly ${projectType(collection[2], enums)}[]`;
  }

  const enumValues = enums?.[csType];
  if (enumValues) {
    return enumValues.map((name) => `"${name}"`).join(" | ");
  }

  // Named references (classes, interfaces, structs like PersonalInfo) pass
  // through verbatim; their declarations are projected alongside.
  return csType;
}
