// npm lifecycle hook for git-based installs of this repository
// (`npm install github:EthanThatOneKid/pkhex-wasm#<ref>`).
//
// Distribution decision (map #15): artifacts ship via GitHub Releases; the
// repo itself stays source-only. This script bridges the two — it downloads
// the packaged tarball for package.json's version, extracts it into dist/,
// and verifies the layout npm's `files` whitelist promises.
//
// Version resolution: an exact `v<version>` release is preferred; installing
// a ref between releases falls back to the latest published release with a
// warning (so living on main keeps working).

import { createWriteStream, existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { get } from "node:https";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { tmpdir } from "node:os";

const REPO = "EthanThatOneKid/pkhex-wasm";
const VERSION = process.env.npm_package_version ?? "0.0.0-dev";
const DIST = fileURLToPath(new URL("../dist/", import.meta.url));

const REQUIRED = [
  "index.js",
  "index.d.ts",
  "wasm/_framework/dotnet.js",
  "THIRD-PARTY-NOTICES.md",
  "LICENSE",
];

const fail = (message) => {
  console.error(`[pkhex-wasm] ${message}`);
  process.exit(1);
};

/** GET with redirect-following; resolves the final 200 response. */
function getFollow(url) {
  return new Promise((resolve, reject) => {
    const attempt = (target) => {
      get(target, { headers: { "User-Agent": "pkhex-wasm-prepare" } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          res.resume();
          attempt(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`GET ${target} → ${res.statusCode}`));
          return;
        }
        resolve(res);
      }).on("error", reject);
    };
    attempt(url);
  });
}

async function fetchJson(url) {
  const res = await getFollow(url);
  let body = "";
  for await (const chunk of res) {
    body += chunk;
  }
  return JSON.parse(body);
}

async function downloadTo(url, filePath) {
  const res = await getFollow(url);
  const file = createWriteStream(filePath);
  await new Promise((resolve, reject) => {
    res.on("error", reject);
    file.on("error", reject);
    file.on("finish", () => resolve());
    res.pipe(file);
  });
}

async function resolveTarballUrl() {
  try {
    const release = await fetchJson(
      `https://api.github.com/repos/${REPO}/releases/tags/v${VERSION}`,
    );
    const asset = release.assets?.find((a) => /^pkhex-wasm-.+\.tgz$/.test(a.name));
    if (asset) return asset.browser_download_url;
  } catch {
    // exact version missing → latest-release fallback below
  }
  console.warn(
    `[pkhex-wasm] no release for v${VERSION}; falling back to the latest published release`,
  );
  const latest = await fetchJson(`https://api.github.com/repos/${REPO}/releases/latest`);
  const asset = latest.assets?.find((a) => /^pkhex-wasm-.+\.tgz$/.test(a.name));
  if (!asset) fail("no packaged tarball found on any release — is a release cut yet?");
  return asset.browser_download_url;
}

function extract(tgz, destination) {
  // bsdtar ships with Windows 10+, macOS, and every Linux image we target.
  mkdirSync(destination, { recursive: true });
  const res = spawnSync("tar", ["-xzf", tgz, "-C", destination, "--strip-components=1"], {
    stdio: "inherit",
  });
  if (res.status !== 0 || res.error) fail(`tar extraction failed (${res.status ?? res.error})`);
}

const work = mkdtempSync(join(tmpdir(), "pkhex-wasm-prepare-"));
try {
  const tarballUrl = await resolveTarballUrl();
  const tgz = join(work, "pkg.tgz");
  await downloadTo(tarballUrl, tgz);

  if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
  extract(tgz, DIST);

  const missing = REQUIRED.filter((rel) => !existsSync(join(DIST, rel)));
  if (missing.length > 0) {
    fail(`extracted package is missing expected files: ${missing.join(", ")}`);
  }
  console.log(`[pkhex-wasm] dist/ populated from ${tarballUrl}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
