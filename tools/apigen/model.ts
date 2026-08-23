/**
 * Single source of truth for the pkhex-wasm v1 public JavaScript surface.
 *
 * Everything derived — `docs/api/pkhex-wasm.d.ts`, the `src/ts/` binding
 * skeleton, and the generated API-reference chapter of
 * `docs/spec/v1-api.md` — is emitted from this model. Edit here, run
 * `deno task gen`, commit the outputs.
 *
 * Vocabulary follows CONTEXT.md: Handle, Binding, Lookup table,
 * Edit tier, Read-only tier, Managed crypto.
 */

export interface ParamModel {
  name: string;
  type: string;
  desc?: string;
  optional?: boolean;
}

/** Full clause rendered after `@throws {Error}` (e.g. "on read-only-tier saves"). */
export interface ThrowsModel {
  error: string;
  clause: string;
}

interface MemberCommon {
  name: string;
  summary: string;
  remarks?: string[];
  throws?: ThrowsModel[];
}

export interface PropModel extends MemberCommon {
  kind: "prop";
  type: string;
  optional?: boolean;
  /** Absent => readonly. Only informational reads are readonly in v1. */
  writable?: boolean;
  /** Where the value comes from on the wasm side of the Binding. */
  seam?: string;
}

export interface MethodModel extends MemberCommon {
  kind: "method";
  params: ParamModel[];
  returns: string;
  returnsDesc?: string;
  example?: string[];
  /** Which wasm-side call realizes the operation. */
  seam: string;
}

export type MemberModel = PropModel | MethodModel;

export interface InterfaceModel {
  name: string;
  typeParams?: string[];
  extends?: string[];
  doc?: string[];
  members: MemberModel[];
}

export interface ErrorClassModel {
  name: string;
  doc: string;
  defaultMessage: string;
}

export interface TierRow {
  tier: string;
  behavior: string;
  generations: string;
}

export const MODULE = {
  overview: [
    "pkhex-wasm — PKHeX.Core Pokémon save editing, compiled to WebAssembly.",
    "",
    "Load a real save file in the browser, inspect and edit box/party Pokémon,",
    "and export valid save bytes back out. Synchronous operations after a",
    "one-time async init; no Blazor anywhere.",
  ],
  tiers: [
    {
      tier: "Edit",
      behavior: "all mutators apply",
      generations: "Gen 3, 4, 5, 6, 7, SwSh, BDSP, SV, Legends Z-A",
    },
    {
      tier: "Read-only",
      behavior: "mutators throw",
      generations: "Gen 1, 2, LGPE, PLA",
    },
  ] as TierRow[],
  notes: [
    "Natures do not exist before Gen 3 and are written mint-aware on modern formats.",
    "See each mutator's `@throws` for tier behavior.",
  ],
};

export const INIT = {
  name: "initPKHex",
  summary:
    "Initialize the wasm runtime exactly once; every subsequent operation on the returned root is synchronous.",
  remarks: [] as string[],
  params: [
    { name: "options", type: "InitOptions", optional: true, desc: "runtime bootstrap options" },
  ] as ParamModel[],
  returns: "Promise<PKHex>",
  returnsDesc: undefined as string | undefined,
  throws: [] as ThrowsModel[],
  example: [
    "import { initPKHex } from 'pkhex-wasm';",
    "",
    "const PKHex = await initPKHex();",
    "const game = PKHex.load(saveBytes);",
    "game.box(0)[0].setNickname('Sparky');",
    "const out = PKHex.saveBytes(game);",
  ],
};

export const ERRORS: ErrorClassModel[] = [
  {
    name: "SaveParseError",
    doc: "Thrown by {@link PKHex.load} for unrecognized or corrupt buffers.",
    defaultMessage: "Unrecognized save file format.",
  },
  {
    name: "UnsupportedTierError",
    doc:
      "Thrown when a mutator is called on a read-only-tier generation (Gen 1–2, LGPE, PLA). The message names the unsupported operation.",
    defaultMessage: "Operation is not supported on this save's support tier.",
  },
  {
    name: "UnsupportedOperationError",
    doc:
      "Thrown when an operation has no meaning for the entity's generation (e.g. setting natures before Gen 3).",
    defaultMessage: "Operation has no meaning for this entity's generation.",
  },
];

const statProps: PropModel[] = [
  { kind: "prop", name: "health", type: "number", summary: "HP stat / individual value / effort value." },
  { kind: "prop", name: "attack", type: "number", summary: "Attack." },
  { kind: "prop", name: "defense", type: "number", summary: "Defense." },
  { kind: "prop", name: "specialAttack", type: "number", summary: "Special attack." },
  { kind: "prop", name: "specialDefense", type: "number", summary: "Special defense." },
  { kind: "prop", name: "speed", type: "number", summary: "Speed." },
];

const lookupRefMembers: MemberModel[] = [
  { kind: "prop", name: "id", type: "number", summary: "Numeric id used by every mutator and table lookup." },
  { kind: "prop", name: "name", type: "string", summary: "Display name." },
];

export const TYPES: InterfaceModel[] = [
  {
    name: "StatBlock",
    doc: ["Six-stat block shared by IVs, EVs, and computed stats."],
    members: statProps,
  },
  {
    name: "LookupRef",
    doc: ["A reference into a global lookup table: numeric id plus display name."],
    members: lookupRefMembers,
  },
  {
    name: "MoveSlot",
    doc: ["One of an entity's four move slots."],
    members: [
      { kind: "prop", name: "move", type: "LookupRef", summary: "The move in this slot." },
      { kind: "prop", name: "pp", type: "number", summary: "Current power points remaining for this slot." },
    ],
  },
  {
    name: "TrainerRef",
    doc: ["Original-trainer attribution carried on every entity."],
    members: [
      { kind: "prop", name: "name", type: "string", summary: "Trainer name." },
      {
        kind: "prop",
        name: "id",
        type: "{ tid: number; sid: number }",
        summary: "Trainer ID pair (`tid` visible in game; `sid` hidden secret id).",
      },
      {
        kind: "prop",
        name: "gender",
        type: "'male' | 'female' | 'unspecified'",
        summary: "Trainer gender.",
      },
    ],
  },
  {
    name: "TrainerInfo",
    extends: ["TrainerRef"],
    doc: ["Read-only trainer information exposed by a save."],
    members: [
      { kind: "prop", name: "money", type: "number", optional: true, summary: "Money held, when the format tracks it." },
    ],
  },
  {
    name: "LookupTable",
    typeParams: ["T"],
    doc: [
      "Immutable build-time-generated lookup table over universal reference data",
      "(species, natures, moves).",
    ],
    members: [
      { kind: "prop", name: "size", type: "number", summary: "Number of entries." },
      {
        kind: "method",
        name: "get",
        summary: "Look up one entry by id.",
        params: [{ name: "id", type: "number" }],
        returns: "T | undefined",
        seam: "in-memory map hydrated from build-time table JSON at init",
      },
      {
        kind: "method",
        name: "all",
        summary: "Every entry, ordered by id.",
        params: [],
        returns: "readonly T[]",
        seam: "in-memory map hydrated from build-time table JSON at init",
      },
    ],
  },
  {
    name: "SpeciesInfo",
    extends: ["LookupRef"],
    doc: ["Species entry in the global species table."],
    members: [
      {
        kind: "prop",
        name: "nationalDex",
        type: "number",
        summary: "National Pokédex number; identical to the inherited id.",
      },
      { kind: "prop", name: "types", type: "readonly string[]", summary: "Type lineup." },
      { kind: "prop", name: "baseStats", type: "StatBlock", summary: "Base stat spread." },
    ],
  },
  {
    name: "NatureInfo",
    extends: ["LookupRef"],
    doc: ["Nature entry in the global nature table."],
    members: [
      {
        kind: "prop",
        name: "statMultipliers",
        type: "{ attack: number; defense: number; speed: number; specialAttack: number; specialDefense: number }",
        summary: "Stat multipliers this nature applies (1.0 neutral).",
      },
    ],
  },
  {
    name: "MoveInfo",
    extends: ["LookupRef"],
    doc: [
      "Move entry in the global move table.",
      "",
      "Carries only what Core itself tracks (type, PP). Base power and accuracy",
      "are absent from PKHeX.Core; sourcing them externally is tracked as a",
      "post-v1 enhancement.",
    ],
    members: [
      { kind: "prop", name: "type", type: "string", summary: "Move type." },
      { kind: "prop", name: "pp", type: "number", summary: "Base power points." },
    ],
  },
  {
    name: "ItemInfo",
    extends: ["LookupRef"],
    doc: ["Item entry in a per-game item table."],
    members: [
      { kind: "prop", name: "description", type: "string", optional: true, summary: "Flavor text, when available." },
    ],
  },
  {
    name: "InitOptions",
    doc: ["Options for the one-time asynchronous initialization of the wasm runtime."],
    members: [
      {
        kind: "prop",
        name: "wasmBaseUrl",
        type: "string",
        optional: true,
        summary: "Base URL the runtime fetches its `_framework` assets from.",
        remarks: ["Defaults to the package's own bundled runtime directory."],
      },
    ],
  },
  {
    name: "Game",
    doc: [
      "A loaded save file. All accessors return snapshots; entity Handles write",
      "through to the underlying save, and changes are reflected on the next",
      "{@link PKHex.saveBytes} call.",
    ],
    members: [
      {
        kind: "prop",
        name: "trainer",
        type: "TrainerInfo",
        summary: "Read-only trainer data (name and ID are readable in v1; not editable).",
        seam: "SaveFile trainer block (TrainerName / TID / SID / Gender)",
      },
      {
        kind: "prop",
        name: "boxCount",
        type: "number",
        summary: "Number of storage boxes this save format provides (e.g. 14 in Gen 3).",
        seam: "SaveFile box layout",
      },
      {
        kind: "method",
        name: "box",
        summary: "Snapshot of one storage box. Slot order matches the game's own ordering; empty slots are absent from the array.",
        params: [{ name: "index", type: "number", desc: "zero-based box index, `< boxCount`" }],
        returns: "Pokemon[]",
        throws: [{ error: "RangeError", clause: "when `index` is outside `[0, boxCount)`" }],
        seam: "SaveFile.GetBoxSlotAtIndex across BoxSlotCount slots",
      },
      {
        kind: "method",
        name: "party",
        summary: "Snapshot of the party (up to six entities).",
        params: [],
        returns: "Pokemon[]",
        seam: "SaveFile.GetPartySlotAtIndex × PartyCount",
      },
      {
        kind: "prop",
        name: "items",
        type: "LookupTable<ItemInfo>",
        summary: "Per-game item lookup table (game-dependent data stays version-scoped).",
        seam: "build-time item table for the parsed game family",
      },
      {
        kind: "prop",
        name: "generation",
        type: "string",
        summary: "Generation context of the loaded save, e.g. `\"Gen1\"`, `\"Gen8b\"`.",
        seam: "EntityContext of the parsed SaveFile",
      },
    ],
  },
  {
    name: "Pokemon",
    doc: [
      "A single Pokémon entity. Reads are always available; mutators apply only",
      "within the edit tier (Gen 3–7, SwSh, BDSP, SV, Legends Z-A) and throw",
      "descriptive errors elsewhere.",
    ],
    members: [
      {
        kind: "prop",
        name: "species",
        type: "LookupRef",
        summary: "Species reference (national dex id + display name). Read-only in v1.",
        seam: "PKM.Species resolved through the species Lookup table",
      },
      { kind: "prop", name: "nickname", type: "string", summary: "Current nickname.", seam: "PKM.Nickname" },
      { kind: "prop", name: "level", type: "number", summary: "Current level.", seam: "PKM.CurrentLevel" },
      { kind: "prop", name: "isShiny", type: "boolean", summary: "Shiny state.", seam: "PKM.IsShiny" },
      {
        kind: "prop",
        name: "gender",
        type: "'male' | 'female' | 'genderless'",
        summary: "Gender.",
        seam: "PKM.Gender",
      },
      {
        kind: "prop",
        name: "ivs",
        type: "Readonly<StatBlock>",
        summary: "Individual values. Gen 1–2 caps at 15 with special-defense aliasing special.",
        seam: "PKM.GetIVs(span)",
      },
      {
        kind: "prop",
        name: "evs",
        type: "Readonly<StatBlock>",
        summary: "Effort values (legacy scales on Gen 1–2; absent systems on LGPE/PLA reads).",
        seam: "PKM.GetEVs(span)",
      },
      {
        kind: "prop",
        name: "stats",
        type: "Readonly<StatBlock>",
        summary: "Computed battle stats derived from species/level/IVs/EVs/nature.",
        seam: "PKM.Stats",
      },
      {
        kind: "prop",
        name: "moves",
        type: "readonly MoveSlot[]",
        summary: "Four move slots; empty slots carry move id `0`.",
        seam: "PKM.Move1..Move4 + per-slot PP",
      },
      {
        kind: "prop",
        name: "nature",
        type: "LookupRef | null",
        summary: "Current nature. `null` on Gen 1–2 entities, where the concept does not exist.",
        seam: "PKM.Nature (null when EntityContext ≤ Gen2)",
      },
      {
        kind: "prop",
        name: "owner",
        type: "TrainerRef",
        summary: "Original-trainer attribution.",
        seam: "OT block on the PKM",
      },

      {
        kind: "method",
        name: "setNickname",
        summary: "Rename this entity.",
        params: [{ name: "nickname", type: "string" }],
        returns: "void",
        throws: [
          { error: "UnsupportedTierError", clause: "on read-only-tier saves" },
          { error: "RangeError", clause: "when exceeding the generation's nickname length or charset limits" },
        ],
        seam: "CommonEdits.SetNickname after per-generation charset/length validation (GB caps: 5 JP / 10 EN)",
      },
      {
        kind: "method",
        name: "setLevel",
        summary: "Set the level; experience is adjusted accordingly.",
        remarks: ["Values outside `1..100` clamp, mirroring the game's own behavior."],
        params: [{ name: "level", type: "number" }],
        returns: "void",
        throws: [{ error: "UnsupportedTierError", clause: "on read-only-tier saves" }],
        seam: "PKM.CurrentLevel setter (experience re-derived)",
      },
      {
        kind: "method",
        name: "setMoves",
        summary: "Overwrite all four move slots (ids in the global move table; `0` clears).",
        params: [{ name: "moveIds", type: "readonly [number, number, number, number]" }],
        returns: "void",
        throws: [
          { error: "UnsupportedTierError", clause: "on read-only-tier saves" },
          { error: "RangeError", clause: "when an id is unknown to this generation's movepool" },
        ],
        seam: "four MoveSlot writes through PKM move-slot setters",
      },
      {
        kind: "method",
        name: "setNature",
        summary: "Set the nature (mint-aware on Gen 8+ formats).",
        params: [{ name: "natureId", type: "number" }],
        returns: "void",
        throws: [
          { error: "UnsupportedOperationError", clause: "on Gen 1–2 (natures do not exist)" },
          { error: "UnsupportedTierError", clause: "on other read-only-tier saves" },
        ],
        seam:
          "MINT-AWARE write via the Facade Natures.ChangeAll path — never the naïve setter (it silently no-ops on Gen 8+)",
      },
      {
        kind: "method",
        name: "setShiny",
        summary: "Force shiny on or off (PID manipulation on Gen 3+).",
        remarks: [
          "Read-only tiers — including Gen 1–2, where shiny is DV-derived and the upstream unset path is hazardous — reject before reaching Core.",
        ],
        params: [{ name: "shiny", type: "boolean" }],
        returns: "void",
        throws: [{ error: "UnsupportedTierError", clause: "on read-only-tier saves" }],
        seam: "PKM.SetShiny (PID reroll Gen 3+); tier guard rejects read-only formats first",
      },
      {
        kind: "method",
        name: "setIVs",
        summary: "Merge individual values; omitted stats keep their current value.",
        remarks: ["Values clamp per generation (31 standard, 15 on Gen 1–2)."],
        params: [{ name: "partial", type: "Partial<StatBlock>" }],
        returns: "void",
        throws: [{ error: "UnsupportedTierError", clause: "on read-only-tier saves" }],
        seam: "merge then PKM.SetIVs(ReadOnlySpan<int>), clamped to MaxIV",
      },
      {
        kind: "method",
        name: "setEVs",
        summary: "Merge effort values; omitted stats keep their current value.",
        remarks: ["Caps follow the generation (252/510 standard; legacy scale on Gen 1–2)."],
        params: [{ name: "partial", type: "Partial<StatBlock>" }],
        returns: "void",
        throws: [{ error: "UnsupportedTierError", clause: "on read-only-tier saves" }],
        seam: "merge then PKM.SetEVs(ReadOnlySpan<int>), capped per generation",
      },
    ],
  },
  {
    name: "PKHex",
    doc: ["The initialized API root. Every operation here is synchronous."],
    members: [
      {
        kind: "method",
        name: "load",
        summary: "Parse a complete save-file buffer into an editable {@link Game}.",
        remarks: [
          "The input is defensively copied; callers retain ownership of `saveBytes`.",
        ],
        params: [
          {
            name: "saveBytes",
            type: "Uint8Array",
            desc:
              "one complete logical save buffer (up to ~4.4 MB; Switch-era main/backup/poke_trade files must be assembled by the caller)",
          },
        ],
        returns: "Game",
        throws: [{ error: "SaveParseError", clause: "when the bytes match no supported format" }],
        seam: "copy-in buffer → SaveUtil.GetSaveFile",
      },
      {
        kind: "method",
        name: "saveBytes",
        summary: "Serialize a game back to a fresh save-file byte array. Every call returns a new `Uint8Array`; nothing aliases prior exports.",
        params: [{ name: "game", type: "Game" }],
        returns: "Uint8Array",
        seam: "SaveFile.Write() → fresh byte[] marshaled out",
      },
      {
        kind: "prop",
        name: "species",
        type: "LookupTable<SpeciesInfo>",
        summary: "Global species table (national dex).",
        seam: "build-time JSON hydrated at init",
      },
      {
        kind: "prop",
        name: "natures",
        type: "LookupTable<NatureInfo>",
        summary: "Global nature table.",
        seam: "build-time JSON hydrated at init",
      },
      {
        kind: "prop",
        name: "moves",
        type: "LookupTable<MoveInfo>",
        summary: "Global move table.",
        seam: "build-time JSON hydrated at init",
      },
    ],
  },
];

/** Mutator names, asserted by tests so the count can never silently drift. */
export const MUTATOR_NAMES = TYPES
  .find((t) => t.name === "Pokemon")!
  .members.filter((m) => m.kind === "method")
  .map((m) => m.name);

export const ERROR_NAMES = ERRORS.map((e) => e.name);
