import { expect } from "@playwright/test";
import { callApi, loadFixtureBytes, loadFixtures, test, type FixtureInfo } from "../helpers.ts";

const fixtures = loadFixtures().filter((f) => f.tier === "edit");

test.describe("edit tier", () => {
  for (const fixture of fixtures) {
    editTierRoundTrip(fixture);
  }
});

function editTierRoundTrip(fixture: FixtureInfo) {
  test(`load/read/edit/export round-trips on ${fixture.generation}`, async ({ api }) => {
    const bytes = Array.from(loadFixtureBytes(fixture.file));
    const result = await callApi(
      api,
      `(PKHex, bytes) => {
        const save = new Uint8Array(bytes);
        const game = PKHex.load(save);
        const mon = game.box(0)[0];

        // reads off the blank fixture
        const before = {
          speciesId: mon.species.id,
          level: mon.level,
          nickname: mon.nickname,
          natureNull: mon.nature === null,
          ownerName: mon.owner.name.length > 0,
        };

        // edits write through instantly
        mon.setNickname("Sparky");
        mon.setLevel(42);
        mon.setMoves([1, 2, 3, 44]);
        if (before.natureNull === false) mon.setNature(3); // Adamant
        mon.setIVs({ attack: 31, speed: 31 });
        mon.setShiny(true);

        const afterEdits = {
          nickname: mon.nickname,
          level: mon.level,
          shiny: mon.isShiny,
          moves: mon.moves.map((slot) => slot.move.id),
          ivsAttack: mon.ivs.attack,
          natureId: mon.nature?.id ?? null,
        };

        // export → reload → verify persistence
        const exported = PKHex.saveBytes(game);
        const reloadedGame = PKHex.load(exported);
        const reloadedMon = reloadedGame.box(0)[0];
        const persisted = {
          nickname: reloadedMon.nickname,
          level: reloadedMon.level,
          shiny: reloadedMon.isShiny,
          moves: reloadedMon.moves.map((slot) => slot.move.id),
          ivsAttack: reloadedMon.ivs.attack,
          natureId: reloadedMon.nature?.id ?? null,
        };

        return { before, afterEdits, persisted };
      }`,
      bytes,
    );

    expect(result.ok, result.ok ? "" : JSON.stringify(result)).toBe(true);
    if (!result.ok) return;

    const { before, afterEdits, persisted } = result.value as never as {
      before: {
        speciesId: number;
        level: number;
        nickname: string;
        natureNull: boolean;
        ownerName: boolean;
      };
      afterEdits: Record<string, unknown>;
      persisted: Record<string, unknown>;
    };

    expect(before.speciesId).toBe(25);
    expect(before.level).toBe(5);
    expect(before.ownerName).toBe(true);

    expect(afterEdits.nickname).toBe("Sparky");
    expect(afterEdits.level).toBe(42);
    expect(afterEdits.shiny).toBe(true);
    expect(afterEdits.moves).toEqual([1, 2, 3, 44]);
    expect(afterEdits.ivsAttack).toBe(31);

    // every written field survives an export/reload cycle
    expect(persisted).toEqual(afterEdits);
  });
}
