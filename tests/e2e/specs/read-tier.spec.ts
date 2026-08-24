import { expect } from "@playwright/test";
import { callApi, loadFixtureBytes, test } from "../helpers.ts";

test.describe("read-only tier", () => {
  const gen1 = Array.from(loadFixtureBytes("blank-Gen1.bin"));

  test("every mutator throws UnsupportedTierError on Gen1", async ({ api }) => {
    const result = await callApi(api, `(PKHex, bytes) => {
      const game = PKHex.load(new Uint8Array(bytes));
      const mon = game.box(0)[0];
      const attempts = [
        ["setNickname", () => mon.setNickname("Sparky")],
        ["setLevel", () => mon.setLevel(42)],
        ["setMoves", () => mon.setMoves([1, 2, 3, 44])],
        ["setNature", () => mon.setNature(3)],
        ["setShiny", () => mon.setShiny(true)],
        ["setIVs", () => mon.setIVs({ attack: 31 })],
        ["setEVs", () => mon.setEVs({ attack: 252 })],
      ];
      return attempts.map(([op, run]) => {
        try {
          run();
          return { op, threw: false };
        } catch (err) {
          // Spec matrix: setNature is concept-aware first — Gen 1-2 reject as
          // UnsupportedOperationError (natures do not exist); every other
          // mutator rejects as UnsupportedTierError.
          const expected = op === "setNature" ? "UnsupportedOperationError" : "UnsupportedTierError";
          return { op, threw: true, name: err.name, expected };
        }
      });
    }`, gen1);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    for (const attempt of result.value as Array<{ op: string; threw: boolean; name?: string; expected?: string }>) {
      expect(attempt.threw, `${attempt.op} must throw`).toBe(true);
      expect(attempt.name, attempt.op).toBe(attempt.expected);
    }
  });

  test("Gen1 nature reads as null and reads stay available", async ({ api }) => {
    const result = await callApi(api, `(PKHex, bytes) => {
      const game = PKHex.load(new Uint8Array(bytes));
      const mon = game.box(0)[0];
      return {
        speciesId: mon.species.id,
        speciesName: mon.species.name,
        level: mon.level,
        nature: mon.nature,
      };
    }`, gen1);
    expect(result).toMatchObject({
      ok: true,
      value: {
        speciesId: 25,
        speciesName: "Pikachu",
        level: 5,
        nature: null, // concept absent before Gen 3
      },
    });
  });

  test("LGPE (Gen7b) rejects mutators as read-only tier", async ({ api }) => {
    const bytes = Array.from(loadFixtureBytes("blank-Gen7b.bin"));
    const result = await callApi(api, `(PKHex, bytes) => {
      const game = PKHex.load(new Uint8Array(bytes));
      const err = (() => {
        try {
          game.box(0)[0].setNickname("Sparky");
          return null;
        } catch (e) {
          return { name: e.name, message: e.message };
        }
      })();
      return { generation: game.generation, err };
    }`, bytes);

    expect(result).toMatchObject({
      ok: true,
      value: {
        generation: "Gen7b",
        err: { name: "UnsupportedTierError" },
      },
    });
  });
});

test.describe("data contracts", () => {
  test("load rejects unrecognized buffers with SaveParseError", async ({ api }) => {
    const result = await callApi(api, `(PKHex) => {
      try {
        PKHex.load(new Uint8Array([1, 2, 3, 4]));
        return null;
      } catch (err) {
        return { name: err.name };
      }
    }`);
    expect(result).toMatchObject({ ok: true, value: { name: "SaveParseError" } });
  });

  test("copy-in: mutating the caller buffer never affects the loaded game", async ({ api }) => {
    const result = await callApi(api, `(PKHex, bytes) => {
      const save = new Uint8Array(bytes);
      const game = PKHex.load(save);
      const nicknameBefore = game.party()[0].nickname;
      for (let i = 0; i < 64; i++) save[i] ^= 0xFF;
      return { stable: game.party()[0].nickname === nicknameBefore };
    }`, gen1Bytes());
    expect(result).toMatchObject({ ok: true, value: { stable: true } });
  });

  test("copy-out: every export is a fresh array", async ({ api }) => {
    const result = await callApi(api, `(PKHex, bytes) => {
      const game = PKHex.load(new Uint8Array(bytes));
      const a = PKHex.saveBytes(game);
      const b = PKHex.saveBytes(game);
      return {
        distinct: a !== b,
        sameContent: a.length === b.length && a.every((v, i) => v === b[i]),
        size: a.length,
      };
    }`, gen1Bytes());
    expect(result).toMatchObject({
      ok: true,
      value: { distinct: true, sameContent: true, size: 32768 },
    });
  });

  test("box access outside bounds throws RangeError", async ({ api }) => {
    const result = await callApi(api, `(PKHex, bytes) => {
      const game = PKHex.load(new Uint8Array(bytes));
      try {
        game.box(game.boxCount);
        return null;
      } catch (err) {
        return { name: err.name };
      }
    }`, gen1Bytes());
    expect(result).toMatchObject({ ok: true, value: { name: "RangeError" } });
  });

  function gen1Bytes(): number[] {
    return Array.from(loadFixtureBytes("blank-Gen1.bin"));
  }
});
