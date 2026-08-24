// Minimal static file server for the playwright E2E suite (no dependencies).
//
// Serves the published wasm host site (docroot) plus the test harness files
// from ./static. One alias rule: requests for an unfingerprinted runtime
// asset (`dotnet.js`) resolve to its fingerprinted sibling, because the
// wasmbrowser SDK emits `dotnet.<hash>.js` while src/ts imports `dotnet.js`.
//
//   node serve.mjs --root ../../artifacts/e2e-site/wwwroot --port 4173

import { createServer } from "node:http";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const root = resolve(arg("root") ?? ".");
const staticDir = fileURLToPath(new URL("./static/", import.meta.url));
const port = Number(arg("port") ?? 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".json": "application/json",
  ".wasm": "application/wasm", // required for WebAssembly.compileStreaming
  ".dat": "application/octet-stream",
};

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const path = decodeURIComponent(url.pathname);
  if (path === "/") return respond(res, join(staticDir, "index.html"));

  const candidates = path.startsWith("/wasm/")
    ? [resolveFingerprint(join(root, path.slice("/wasm".length)))]
    : [join(staticDir, path.slice(1)), join(root, path)];

  for (const candidate of candidates) {
    if (!insideRoot(candidate, staticDir) && !insideRoot(candidate, root)) continue;
    if (!existsSync(candidate) || !statSync(candidate).isFile()) continue;
    return respond(res, candidate);
  }

  res.writeHead(404);
  res.end(`not found: ${path}`);
});

function respond(res, file) {
  res.writeHead(200, { "Content-Type": MIME[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}

/** Maps `<dir>/<stem>.<ext>` onto the single `<dir>/<stem>.<hash>.<ext>` sibling when the plain name is absent. */
function resolveFingerprint(file) {
  if (existsSync(file)) return file;
  const dot = file.lastIndexOf(".");
  if (dot <= file.lastIndexOf(sep)) return file;
  const parent = file.slice(0, Math.max(file.lastIndexOf(sep), 0)) || sep;
  const stem = file.slice(file.lastIndexOf(sep) + 1, dot);
  const ext = file.slice(dot);
  try {
    const match = readdirSync(parent).find((f) => f.startsWith(`${stem}.`) && f.endsWith(ext));
    return match ? join(parent, match) : file;
  } catch {
    return file;
  }
}

function insideRoot(candidate, rootDir) {
  const a = resolve(candidate);
  const b = resolve(rootDir);
  return a === b || a.startsWith(b.endsWith(sep) ? b : b + sep);
}

server.listen(port, "127.0.0.1", () => {
  console.log(`e2e server: http://127.0.0.1:${port}/ (docroot ${root})`);
});
