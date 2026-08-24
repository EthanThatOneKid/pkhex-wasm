import { createCipheriv, createDecipheriv, createHash } from "node:crypto";
import { expect, test } from "@playwright/test";
import vectors from "../../crypto-vectors.json" with { type: "json" };

/**
 * Node-side cross-check of the shared crypto-vector constants (spec: "Node
 * crypto cross-checks via shared constants"). The C# suite asserts the same
 * file's vectors against the vendored managed implementations; this side
 * asserts them against the platform oracle — so a transcription drift or an
 * upstream vector change breaks exactly one layer and is obvious.
 */

interface Md5Vector {
  input: string;
  digestHex: string;
}

interface AesVectors {
  keyHex: string;
  cbcIvHex: string;
  plaintextBlocksHex: string[];
  ecbCiphertextBlocksHex: string[];
  cbcCiphertextBlocksHex: string[];
}

const md5 = (vectors as { md5Rfc1321: Md5Vector[] }).md5Rfc1321;
const aes = (vectors as { aes128NistSp80038a: AesVectors }).aes128NistSp80038a;

test.describe("shared crypto vectors vs node:crypto", () => {
  for (const { input, digestHex } of md5) {
    test(`md5("${input.length > 32 ? `${input.slice(0, 29)}…` : input}") → ${digestHex}`, () => {
      const digest = createHash("md5").update(input, "ascii").digest("hex");
      expect(digest).toBe(digestHex);
    });
  }

  test("aes-128-ecb no-padding matches NIST SP 800-38A F.1", () => {
    const key = Buffer.from(aes.keyHex, "hex");
    const plaintext = Buffer.concat(aes.plaintextBlocksHex.map((h) => Buffer.from(h, "hex")));
    const expected = aes.ecbCiphertextBlocksHex.map((h) => h);

    const cipher = createCipheriv("aes-128-ecb", key, null);
    cipher.setAutoPadding(false);
    expect(cipher.update(plaintext).toString("hex").match(/.{32}/g)).toEqual(expected);

    const decipher = createDecipheriv("aes-128-ecb", key, null);
    decipher.setAutoPadding(false);
    const roundTripped = Buffer.concat([
      decipher.update(Buffer.from(expected.join(""), "hex")),
      decipher.final(),
    ]);
    expect(roundTripped.toString("hex")).toBe(plaintext.toString("hex"));
  });

  test("aes-128-cbc no-padding matches NIST SP 800-38A F.2.1", () => {
    const key = Buffer.from(aes.keyHex, "hex");
    const iv = Buffer.from(aes.cbcIvHex, "hex");
    const plaintext = Buffer.concat(aes.plaintextBlocksHex.map((h) => Buffer.from(h, "hex")));
    const expected = aes.cbcCiphertextBlocksHex.map((h) => h);

    const cipher = createCipheriv("aes-128-cbc", key, iv);
    cipher.setAutoPadding(false);
    expect(cipher.update(plaintext).toString("hex").match(/.{32}/g)).toEqual(expected);

    const decipher = createDecipheriv("aes-128-cbc", key, iv);
    decipher.setAutoPadding(false);
    const roundTripped = Buffer.concat([
      decipher.update(Buffer.from(expected.join(""), "hex")),
      decipher.final(),
    ]);
    expect(roundTripped.toString("hex")).toBe(plaintext.toString("hex"));
  });
});
