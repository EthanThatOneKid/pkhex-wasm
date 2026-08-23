/**
 * The explicit per-member binding map (owner decision on #14): every
 * `[JSExport]` member of the wasm facade claims exactly one TS surface
 * target here. `gen:check` fails when a runtime export is missing from this
 * table (unsurfaced capability) or when an entry references something that
 * no longer exists on either side.
 *
 * Target paths are `<Interface>.<member>` pairs from the model surface;
 * `(internal)` marks exports that are deliberate plumbing with no place in
 * the public JS API (lifecycle/dev helpers).
 */

export interface BindingMapping {
  /** Method name on the PkHexExports facade. */
  export: string;
  /** Dotted TS surface path claimed by this export, or `(internal)`. */
  target: string;
  note?: string;
}

export const BINDING_MAPPINGS: BindingMapping[] = [
  { export: "Load", target: "PKHex.load", note: "defensive copy-in happens wasm-side" },
  { export: "SaveBytes", target: "PKHex.saveBytes" },
  { export: "GetApiVersion", target: "(internal)", note: "runtime version stamp" },
  { export: "Close", target: "(internal)", note: "optional explicit release; GC-reliant contract unchanged" },
  { export: "GenerateDemoSave", target: "(internal)", note: "dev/demo helper" },

  { export: "GameTrainerName", target: "TrainerInfo.name" },
  { export: "GameTrainerId", target: "TrainerInfo.id.tid" },
  { export: "GameTrainerSecretId", target: "TrainerInfo.id.sid" },
  { export: "GameTrainerGender", target: "TrainerInfo.gender" },
  { export: "GameMoney", target: "TrainerInfo.money" },
  { export: "GameBoxCount", target: "Game.boxCount" },
  { export: "GameGeneration", target: "Game.generation" },
  { export: "GameBoxMonHandles", target: "Game.box", note: "materializes entity handles per non-empty slot" },
  { export: "GamePartyMonHandles", target: "Game.party", note: "materializes entity handles per non-empty slot" },

  { export: "MonSpecies", target: "Pokemon.species" },
  { export: "MonNickname", target: "Pokemon.nickname" },
  { export: "MonLevel", target: "Pokemon.level" },
  { export: "MonIsShiny", target: "Pokemon.isShiny" },
  { export: "MonGender", target: "Pokemon.gender" },
  { export: "MonNatureId", target: "Pokemon.nature", note: "-1 sentinel maps to null pre-Gen3" },
  { export: "MonOwnerName", target: "Pokemon.owner.name" },
  { export: "MonOwnerId", target: "Pokemon.owner.id.tid" },
  { export: "MonOwnerSecretId", target: "Pokemon.owner.id.sid" },
  { export: "MonOwnerGender", target: "Pokemon.owner.gender" },
  { export: "MonIVs", target: "Pokemon.ivs", note: "wire order translated to StatBlock display order" },
  { export: "MonEVs", target: "Pokemon.evs", note: "wire order translated to StatBlock display order" },
  { export: "MonStats", target: "Pokemon.stats" },
  { export: "MonMoveSlots", target: "Pokemon.moves", note: "flat [id, pp] x4 reshaped into MoveSlot[]" },

  { export: "MonSetNickname", target: "Pokemon.setNickname" },
  { export: "MonSetLevel", target: "Pokemon.setLevel", note: "client clamps 1..100 before the call" },
  { export: "MonSetMoves", target: "Pokemon.setMoves" },
  { export: "MonSetNature", target: "Pokemon.setNature", note: "throws until mint-aware writes land (#22)" },
  { export: "MonSetShiny", target: "Pokemon.setShiny" },
  { export: "MonSetIVs", target: "Pokemon.setIVs", note: "partial merge resolved client-side" },
  { export: "MonSetEVs", target: "Pokemon.setEVs", note: "partial merge resolved client-side" },
];
