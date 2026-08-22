# Research: NativeAOT-to-wasm feasibility for PKHeX.Core

Resolves EthanThatOneKid/pkhex-wasm#2 · Researched August 2026 against .NET 9/10-era sources.

**Question:** Can .NET NativeAOT (`browser-wasm`, `wasm-experimental` workload / `[JSExport]`) compile `PKHeX.Core` + `PKHeX.Facade` into a lean JS-callable wasm library — and what does it realistically cost?

---

## Bottom line

**Literal NativeAOT-to-browser-wasm is not viable today**: official NativeAOT does not list `browser-wasm` as a supported target through .NET 10 LTS, and the only true-NativeAOT-on-wasm option (community `NativeAOT-LLVM` in dotnet/runtimelab) remains explicitly experimental and unsupported. **However, the practical goal — a lean, Blazor-free, JS-callable wasm build of PKHeX.Core — is achievable now** using the *supported* path: the Mono-based WebAssembly SDK (`wasmbrowser` template, `[JSImport]`/`[JSExport]` source-generated interop) with IL trimming. Expected cost: ~1–2 day spike, and a final artifact of roughly **6–10 MB compressed — comparable to the Blazor path**, because PKHeX.Core embeds ~12.4 MB of uncompressed resources (string dictionaries + encounter/personal tables) that dominate payload regardless of runtime choice. The realistic win vs Blazor is architectural (no component model, plain JS API), not megabytes.

---

## 1. Toolchain status: NativeAOT → browser wasm in .NET 9/10 (as of Aug 2026)

**Verdict: Not production-viable under the name "NativeAOT". Supported-API alternative exists and works well.**

Facts:

- **Official NativeAOT does not support browser-wasm.** The supported-platform table in the [Native AOT deployment overview](https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot) covers Windows/Linux/macOS (x64, Arm64) plus *experimental* iOS/tvOS/MacCatalyst/Android. There is no `browser-wasm` row, still, in .NET 10 (LTS, released 2025-11-11; [.NET download page](https://dotnet.microsoft.com/en-us/download/dotnet)).
- **What people actually use for "C# → wasm without Blazor" is the Mono wasm runtime**, shipped in-box since .NET 7:
  - SDK: `<Project Sdk="Microsoft.NET.Sdk.WebAssembly">` (or plain Sdk + `RuntimeIdentifier=browser-wasm`)
  - Templates: `dotnet new wasmbrowser` from the `wasm-experimental` workload or the [`Microsoft.NET.Runtime.WebAssembly.Templates`](https://www.nuget.org/packages/Microsoft.NET.Runtime.WebAssembly.Templates)`(.net9/.net10)` NuGet package
  - Docs' own framing ([wasm-browser-app doc](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop/wasm-browser-app?view=aspnetcore-10.0)): the *templates/workflow* are labeled experimental, but *"the .NET and JS APIs used in the templates are supported"* — a reasonable production posture: stable APIs, evolving scaffolding.
- **`[JSImport]`/`[JSExport]` interop is mature** ([concept doc](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop/?view=aspnetcore-10.0)):
  - Source-generated marshalling (`JSImportGenerator`/`JSExportGenerator`), requires `<AllowUnsafeBlocks>true</AllowUnsafeBlocks>` and `[SupportedOSPlatform("browser")]`
  - Rich type mapping incl. `Task`↔`Promise`, `Action`/`Func` callbacks, `JSObject` proxies, and crucially `Span<Byte>`/`ArraySegment<Byte>` → `MemoryView` (**zero-copy** shared memory; `byte[]` marshalling copies)
  - Documented perf: interop ≈ an order of magnitude slower than in-.NET calls but microsecond-scale (≈0.00025 ms/op proxy call vs ≈0.00002 ms/op direct)
  - JS side boots via `import { dotnet } from './_framework/dotnet.js'` → `getAssemblyExports(config.mainAssemblyName)` → call exported statics directly
- **True NativeAOT on wasm exists only as [NativeAOT-LLVM](https://github.com/dotnet/runtimelab/tree/feature/NativeAOT-LLVM)** (dotnet/runtimelab feature branch): community-driven CoreCLR-AOT-over-LLVM. Still receiving commits (latest July 2026) but explicitly experimental, unsupported, self-hosted toolchain (Emscripten/WASI SDK). [Bootsharp](https://bootsharp.com/guide/llvm) offers it as an optional backend with favorable benchmarks vs Mono — interesting to watch, not something to pin a project's foundation to in 2026.
- Context reading: ["State of WASM support in Net 9"](https://github.com/dotnet/runtime/issues/113858) (maintainer answer points everyone back to the `wasmbrowser` template); `wasi-experimental` workload was dropped in .NET 9 and returned later ([#114236](https://github.com/dotnet/runtime/issues/114236)); [.NET 10 State-of-Wasm recap](https://platform.uno/blog/the-state-of-webassembly-2025-2026).

## 2. Does PKHeX.Core survive AOT/trimming?

**Verdict: Yes — with modest, well-understood caveats. Reflection footprint is tiny and upstream already annotates it.**

Audited `PKHeX.Core` from the actual submodule source (arleypadua/PKHeX-Plugins, `cherrytree` branch; `TargetFramework=net10.0`; 1,815 `.cs` files):

| Hazard pattern | Hits | Assessment |
| --- | --- | --- |
| `Activator.CreateInstance` | **0** | none |
| `Type.GetType(string)` | **0** | none |
| `Assembly.Load*` | **0** | none |
| `MakeGenericType`, `Reflection.Emit`, `DynamicMethod`, `Expression.Compile` | **0** | none |
| `GetManifestResourceStream` | 3 | All inside `Util/EmbeddedResourceCache.cs` — embedded resources are trim-safe and AOT-safe |
| Property enumeration (`GetProperties`/`GetProperty`) | ~6 | Localized in `Util/ReflectUtil.cs`; see below |

- **The one real risk:** `ReflectUtil.GetPropertiesCanWritePublicDeclared` / `GetPropertiesStartWithPrefix` power property-copy/clone paths (`PKM.cs:1063-1065`, `Ribbons/RibbonInfo.cs:57`, `Saves/Substructures/Gen12/G1OverworldSpawner.cs:89`). Under `TrimMode=full`, unused properties could be trimmed out of those enumerations. Upstream already flags these methods with `[RequiresUnreferencedCode("Uses reflection to access properties by name on runtime types.")]` — they know. Mitigations, cheapest first: (1) `<TrimmerRootAssembly Include="PKHeX.Core" />` in the wasm host; (2) `[DynamicallyAccessedMembers]` annotations on ReflectUtil; (3) leave trimming at default aggressiveness.
- **JSON is already source-gen shaped:** localization uses `LocalizationStorage<T>(JsonTypeInfo<T>)` + `JsonSerializer.Deserialize(text, Info)` with `[JsonSerializable]` contexts across all localization records (`Util/Localization/LocalizationStorage.cs`) — the AOT-recommended System.Text.Json pattern.
- **Resources dominate size, not code.** `<EmbeddedResource Include="Resources\**" />` pulls in:

| Type | Files | Size (uncompressed) | Content |
| --- | --- | --- | --- |
| `.txt` | 1,516 | ~5.38 MB | localization + legality-check strings |
| `.pkl` | 132 | ~5.38 MB | encounter/personal tables |
| binary | 124 | ~1.29 MB | game data arrays |
| `.json` | 60 | ~0.35 MB | localization |
| **total** | **~1,832** | **~12.4 MB** | |

  These all survive trimming; they're just heavy. Brotli compresses the text-heavy share ~3–4×; shipping a language subset would cut further.
- **Facade note:** upstream `PKHeX.Facade` references `PKHeX.Core.AutoMod` (not bare `PKHeX.Core`), which drags AutoLegality machinery + its resources into any wasm build — worth deciding whether the web build keeps that dependency.

## 3. Realistic artifact size + startup vs the Blazor path (~5–8 MB)

**Verdict: A non-Blazor wasm build starts smaller than Blazor (~2 MB brotli hello-world), but PKHeX's own data erases most of the gap; expect parity-ish totals of ~6–10 MB compressed.**

Reference numbers:

| Build | Raw | gzip | brotli | Source |
| --- | --- | --- | --- | --- |
| `wasmbrowser` hello-world, .NET 10, trimmed+compressed | 6.8 MB | 2.5 MB | **2.0 MB** | [Andrew Lock, Aug 2025](https://andrewlock.net/running-dotnet-in-the-browser-without-blazor/) |
| same + `<InvariantGlobalization>true` | 4.3 MB | 1.7 MB | **1.4 MB** | ibid. (30–37% smaller) |
| `dotnet.native.wasm` interpreter runtime alone | 2.8 MB | — | — | [dotnet/runtime#87617](https://github.com/dotnet/runtime/issues/87617) |
| WASI single-file hello-world, fully optimized | ~5.4–6.8 MB | — | — | [strathweb](https://www.strathweb.com/2023/09/dotnet-wasi-applications-in-net-8-0/) |
| Blazor WASM + **Mono AOT** (`RunAOTCompilation`), medium app | `dotnet.native.wasm` alone ~50 MB | — | — | [r/Blazor report](https://www.reddit.com/r/Blazor/comments/1ct8tqz/blazor_nativeaot_huge_binary_size/) |

- .NET 10 reduced Blazor WASM runtime download ~30% vs prior versions, so the "~5–8 MB Blazor baseline" is now closer to the low end for a trimmed app.
- **Interpreter mode (default)** = small download, slower first-execution, mitigated by the JITerpreter. **Mono AOT** = up to ~50% faster CPU-bound code but multiplies native size several-fold — wrong trade for a save editor whose hot paths are byte twiddling, unless legality checks prove slow.
- **NativeAOT-LLVM** would be the smallest/fastest option in principle (see Bootsharp benchmarks), but requires the unsupported experimental toolchain.
- PKHeX-specific projection: ~2–3 MB compressed runtime + trimmed IL for Core/Facade/AutoMod + ~12.4 MB resources at ~3–4× brotli ⇒ **~6–10 MB compressed total**, i.e., no decisive size advantage over the existing Blazor app. Startup will be download-bound plus lazy per-language dictionary parsing (already lazy in `LanguageStorage`). If size truly matters, the lever is **resource dieting** (language subsets, splitting tables as fetchable assets), not the runtime.

## 4. What a minimal spike requires

**Effort: ~1–2 days.** Shape:

```bash
dotnet new install Microsoft.NET.Runtime.WebAssembly.Templates.net10   # or: dotnet workload install wasm-experimental
dotnet new wasmbrowser -o src/PKHex.Wasm                                # Sdk="Microsoft.NET.Sdk.WebAssembly"
```

- **csproj:** `net10.0`, `<AllowUnsafeBlocks>true</AllowUnsafeBlocks>`, `<WasmMainJSPath>main.js</WasmMainJSPath>`, `ProjectReference` to `external/PKHeX-Plugins/PKHeX.Core` + `src/PKHeX.Facade`. Optional: `<TrimmerRootAssembly Include="PKHeX.Core" />`, `<InvariantGlobalization>true` if locale-independent. Publish with `dotnet publish -c Release` (trims + gz/brotli automatically). Add `wasm-tools` workload only if experimenting with Mono AOT.
- **Interop surface** — static partial class, `[SupportedOSPlatform("browser")]`, `[JSExport]` methods:
  - `LoadSave(byte[] data)` / `ExportSave() → byte[]` — array marshalling **copies** both ways (simplest, correct; saves are ≤ ~1 MB so copy cost is negligible)
  - Zero-copy variant when needed: `Span<byte>`/`ArraySegment<byte>` ↔ JS `MemoryView` (span valid only during the call; ArraySegment-backed view persists until `dispose()`)
  - Domain API returns primitives/strings (JSON via the existing source-gen contexts) rather than exposing .NET objects; use `JSObject` handles sparingly (GC-pin overhead)
- **Threading constraints:** single-threaded by default. `<WasmEnableThreads>true</WasmEnableThreads>` is experimental, requires COOP/COEP cross-origin-isolation headers server-side, and — critically — **`[JSImport]`/`[JSExport]` calls are limited to the main thread even when threading is enabled** ([features.md](https://github.com/dotnet/runtime/blob/main/src/mono/wasm/features.md)). Design the API as synchronous main-thread entry points; avoid blocking (`Task.Wait`, `Monitor.Enter`) on the main thread.
- **Acceptance test for the spike:** load a real `.sav`/`.pb7` fixture → mutate a Pokémon via Facade → export bytes → verify hash-equality round-trip vs desktop behavior; record AppBundle size breakdown (`_framework/*`).

---

## Decision-relevant summary

| Question | Answer |
| --- | --- |
| Is literal NativeAOT→wasm available? | **No.** Unsupported target officially; only experimental NativeAOT-LLVM |
| Is a supported, lean, Blazor-free wasm path available? | **Yes** — `Microsoft.NET.Sdk.WebAssembly` + `[JSExport]`, APIs supported since .NET 8, workflow "experimental" |
| Will PKHeX.Core trim/AOT cleanly? | **Mostly** — zero dynamic-loading hazards; one annotated reflection pocket (ReflectUtil) + 12.4 MB embedded resources that need deliberate handling |
| Will it beat Blazor on download size? | **Not meaningfully** — ~2 MB brotli runtime vs Blazor's larger stack, but resources dominate: expect ~6–10 MB either way |
| Spike cost | **1–2 days** for a byte[]-in/out save-edit round-trip on the supported path |

## Sources

- https://learn.microsoft.com/en-us/dotnet/core/deploying/native-aot (platform table — no browser-wasm)
- https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop/?view=aspnetcore-10.0 (type mappings, MemoryView, perf)
- https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop/wasm-browser-app?view=aspnetcore-10.0 (template status, setup)
- https://andrewlock.net/running-dotnet-in-the-browser-without-blazor/ (.NET 10 published sizes)
- https://github.com/dotnet/runtime/blob/main/src/mono/wasm/features.md (AOT, threads, interop main-thread limit, sizes)
- https://github.com/dotnet/runtimelab/tree/feature/NativeAOT-LLVM + https://bootsharp.com/guide/llvm (experimental true-NativeAOT path)
- https://github.com/dotnet/runtime/issues/113858 , #114236 , #87617 (toolchain status threads)
- https://www.strathweb.com/2023/09/dotnet-wasi-applications-in-net-8-0/ (minimal wasm size ladder)
- https://platform.uno/blog/the-state-of-webassembly-2025-2026 (.NET-on-wasm 2025/2026 state)
- Local audit: arleypadua/PKHeX-Plugins `cherrytree` (PKHeX.Core, 1,815 files), arleypadua/PKHeX.Everywhere `src/PKHeX.Web` (`Microsoft.NET.Sdk.BlazorWebAssembly`, net10.0)
