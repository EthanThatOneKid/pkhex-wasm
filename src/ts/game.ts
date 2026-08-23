import { Game, ItemInfo, LookupTable, Pokemon, TrainerInfo } from "./gen/types.ts";
import { notImplemented } from "./gen/errors.ts";

/**
 * Write-through Handle over one parsed save file.
 *
 * Snapshot accessors (`box`, `party`) materialize entity Handles on demand.
 *
 * @generated-skeleton — bodies are seams; implementation sessions replace them.
 */
export class GameHandle implements Game {
    /** Read-only trainer data (name and ID are readable in v1; not editable). */
    get trainer(): TrainerInfo {
        throw notImplemented("SaveFile trainer block (TrainerName / TID / SID / Gender)");
    }

    /** Number of storage boxes this save format provides (e.g. 14 in Gen 3). */
    get boxCount(): number {
        throw notImplemented("SaveFile box layout");
    }

    /** Per-game item lookup table (game-dependent data stays version-scoped). */
    get items(): LookupTable<ItemInfo> {
        throw notImplemented("build-time item table for the parsed game family");
    }

    /** Generation context of the loaded save, e.g. `"Gen1"`, `"Gen8b"`. */
    get generation(): string {
        throw notImplemented("EntityContext of the parsed SaveFile");
    }

    /**
     * Snapshot of one storage box. Slot order matches the game's own ordering; empty slots are absent from the array.
     *
     * @param index zero-based box index, `< boxCount`
     * @throws {RangeError} when `index` is outside `[0, boxCount)`
     */
    box(index: number): Pokemon[] {
        throw notImplemented("SaveFile.GetBoxSlotAtIndex across BoxSlotCount slots");
    }

    /** Snapshot of the party (up to six entities). */
    party(): Pokemon[] {
        throw notImplemented("SaveFile.GetPartySlotAtIndex × PartyCount");
    }
}
