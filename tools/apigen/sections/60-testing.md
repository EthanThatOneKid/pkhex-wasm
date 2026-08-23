## Testing requirements

Locked by [Define testing strategy and packaging/CI gates](https://github.com/EthanThatOneKid/pkhex-wasm/issues/11):

- **Fixture saves**: blank-generated primary strategy — a shared test factory builds blank saves per `EntityContext` (the spike/probe pattern). **No real save binaries are ever committed** (legal/privacy gray zone; real-file parsing robustness is upstream Core's own test burden). A gitignored local fixtures directory stays available for development against personal dumps.
- **Assertion layers**: C# xUnit remains the logic seam and hosts the RFC 1321 / NIST SP 800-38A crypto vectors; expected digests ship as constants shared by both layers so the JS suite asserts identical results.
- **Bootstrap assertion**: a dedicated test asserts `initPKHex()` registers the Managed crypto providers *before any parse path can run* (mandated by [#8](https://github.com/EthanThatOneKid/pkhex-wasm/issues/8)).
- **JS-side harness**: playwright-driven E2E against the built static site on ubuntu CI (headless Chromium). Node-loading of `wasmbrowser` output is explicitly avoided; no `wasmconsole` double-build.
- **Generator drift gate**: `deno task gen:check` fails CI when any generated artifact lags its model input.
- **CI matrix**: PR = recursive-submodule checkout → .NET 10 setup → Release build → full `dotnet test` → JS E2E → publish artifact + size-budget check. `main` additionally triggers the docs workflow.
