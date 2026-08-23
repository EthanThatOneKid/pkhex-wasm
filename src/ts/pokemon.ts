import { LookupRef, MoveSlot, Pokemon, StatBlock, TrainerRef } from "./gen/types.ts";
import { notImplemented } from "./gen/errors.ts";

/**
 * Write-through Handle over one Pokémon entity inside a loaded save.
 *
 * Reads resolve through the wasm Binding immediately; mutators apply only
 * within the edit tier and are guarded before reaching Core.
 *
 * @generated-skeleton — bodies are seams; implementation sessions replace them.
 */
export class PokemonHandle implements Pokemon {
    /** Species reference (national dex id + display name). Read-only in v1. */
    get species(): LookupRef {
        throw notImplemented("PKM.Species resolved through the species Lookup table");
    }

    /** Current nickname. */
    get nickname(): string {
        throw notImplemented("PKM.Nickname");
    }

    /** Current level. */
    get level(): number {
        throw notImplemented("PKM.CurrentLevel");
    }

    /** Shiny state. */
    get isShiny(): boolean {
        throw notImplemented("PKM.IsShiny");
    }

    /** Gender. */
    get gender(): 'male' | 'female' | 'genderless' {
        throw notImplemented("PKM.Gender");
    }

    /** Individual values. Gen 1–2 caps at 15 with special-defense aliasing special. */
    get ivs(): Readonly<StatBlock> {
        throw notImplemented("PKM.GetIVs(span)");
    }

    /** Effort values (legacy scales on Gen 1–2; absent systems on LGPE/PLA reads). */
    get evs(): Readonly<StatBlock> {
        throw notImplemented("PKM.GetEVs(span)");
    }

    /** Computed battle stats derived from species/level/IVs/EVs/nature. */
    get stats(): Readonly<StatBlock> {
        throw notImplemented("PKM.Stats");
    }

    /** Four move slots; empty slots carry move id `0`. */
    get moves(): readonly MoveSlot[] {
        throw notImplemented("PKM.Move1..Move4 + per-slot PP");
    }

    /** Current nature. `null` on Gen 1–2 entities, where the concept does not exist. */
    get nature(): LookupRef | null {
        throw notImplemented("PKM.Nature (null when EntityContext ≤ Gen2)");
    }

    /** Original-trainer attribution. */
    get owner(): TrainerRef {
        throw notImplemented("OT block on the PKM");
    }

    /**
     * Rename this entity.
     *
     * @throws {UnsupportedTierError} on read-only-tier saves
     * @throws {RangeError} when exceeding the generation's nickname length or charset limits
     */
    setNickname(nickname: string): void {
        throw notImplemented("CommonEdits.SetNickname after per-generation charset/length validation (GB caps: 5 JP / 10 EN)");
    }

    /**
     * Set the level; experience is adjusted accordingly.
     *
     * Values outside `1..100` clamp, mirroring the game's own behavior.
     *
     * @throws {UnsupportedTierError} on read-only-tier saves
     */
    setLevel(level: number): void {
        throw notImplemented("PKM.CurrentLevel setter (experience re-derived)");
    }

    /**
     * Overwrite all four move slots (ids in the global move table; `0` clears).
     *
     * @throws {UnsupportedTierError} on read-only-tier saves
     * @throws {RangeError} when an id is unknown to this generation's movepool
     */
    setMoves(moveIds: readonly [number, number, number, number]): void {
        throw notImplemented("four MoveSlot writes through PKM move-slot setters");
    }

    /**
     * Set the nature (mint-aware on Gen 8+ formats).
     *
     * @throws {UnsupportedOperationError} on Gen 1–2 (natures do not exist)
     * @throws {UnsupportedTierError} on other read-only-tier saves
     */
    setNature(natureId: number): void {
        throw notImplemented("MINT-AWARE write via the Facade Natures.ChangeAll path — never the naïve setter (it silently no-ops on Gen 8+)");
    }

    /**
     * Force shiny on or off (PID manipulation on Gen 3+).
     *
     * Read-only tiers — including Gen 1–2, where shiny is DV-derived and the upstream unset path is hazardous — reject before reaching Core.
     *
     * @throws {UnsupportedTierError} on read-only-tier saves
     */
    setShiny(shiny: boolean): void {
        throw notImplemented("PKM.SetShiny (PID reroll Gen 3+); tier guard rejects read-only formats first");
    }

    /**
     * Merge individual values; omitted stats keep their current value.
     *
     * Values clamp per generation (31 standard, 15 on Gen 1–2).
     *
     * @throws {UnsupportedTierError} on read-only-tier saves
     */
    setIVs(partial: Partial<StatBlock>): void {
        throw notImplemented("merge then PKM.SetIVs(ReadOnlySpan<int>), clamped to MaxIV");
    }

    /**
     * Merge effort values; omitted stats keep their current value.
     *
     * Caps follow the generation (252/510 standard; legacy scale on Gen 1–2).
     *
     * @throws {UnsupportedTierError} on read-only-tier saves
     */
    setEVs(partial: Partial<StatBlock>): void {
        throw notImplemented("merge then PKM.SetEVs(ReadOnlySpan<int>), capped per generation");
    }
}
