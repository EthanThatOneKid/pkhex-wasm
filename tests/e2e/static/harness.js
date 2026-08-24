// Boots the real public API (src/ts bundle) against the published wasm host.
// Tests drive everything through window.pkhex — no DOM automation anywhere.
import { initPKHex } from "/pkhex-wasm.mjs";

try {
  window.pkhex = await initPKHex({ wasmBaseUrl: "/wasm/_framework/" });
  document.getElementById("state").textContent = "ready";
} catch (err) {
  document.getElementById("state").textContent = `failed: ${err?.message ?? err}`;
  throw err;
}
