# Research: Headless Blazor WASM host around `PKHeX.Facade` — pattern & cost

**Issue:** #3 · **Branch:** `research/headless-blazor-host` · **Date:** 2026-08-21
**Method:** upstream source review (arleypadua/PKHeX.Everywhere), live payload measurement of the deployed site (pkhex-web.github.io, .NET 10 GA publish on GitHub Pages/Fastly, measured 2026-08-21 via HTTP HEAD with/without `Accept-Encoding: gzip` against the boot manifest's 108 fingerprinted assets), plus published baselines.

---

## TL;DR verdict

A headless host — a `Microsoft.NET.Sdk.BlazorWebAssembly` project with **no root components**, exposing a handful of `[JSInvokable]` statics — is ~100 lines of C# plus one HTML shell, and it is the *supported* shape (upstream already is 90% of the way there). Cost: dropping the UI stack saves **~6.4 MiB raw / ~1.75 MiB gzip** of measured payload; what remains is dominated by `PKHeX.Core` (**3.94 MiB of its 4.14 MiB gzip is PKHeX.Core alone**). Realistic first-load: **~8.7–9 MB gzip** for a headless clone of today's dependency set (~26–28 MB raw), with a theoretical lean floor near **~5.5 MB gzip** if the BCL surface stays minimal and globalization is invariant. The crypto bridge survives headless **unchanged** — it never touches rendering.

---

## 1. The pattern: what is mandatory, what can be deleted

### What upstream proves (arleypadua/PKHeX.Everywhere)

The web app calls into .NET from plain JS via static `[JSInvokable]` entry points, with no component instance involved:

| Upstream artifact | Mechanism |
|---|---|
| [`Services/BrowserWindowService.cs`](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/Services/BrowserWindowService.cs) | `public static event ... LoadRequested`; `[JSInvokable] public static Task OnLoadRequested(SaveLoadedRequested)` / `OnWindowResized(int)` raise the events |
| [`_js/lib/window.ts`](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/_js/lib/window.ts) | `window.addEventListener("resize", () => DotNet.invokeMethodAsync("PKHeX.Web", "OnWindowResized", window.innerWidth))` |
| [`Services/Auth/AuthService.cs`](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/Services/Auth/AuthService.cs) | `[JSInvokable] public static Task OnTokenChanged(string? token)` → static `TokenChanged` event |
| [`_js/lib/firebase.ts`](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/_js/lib/firebase.ts) | `await DotNet.invokeMethodAsync("PKHeX.Web", "OnTokenChanged", await user.getIdToken())`, guarded by `if (!window.DotNet || !window.DotNet.invokeMethodAsync) return` |

This is exactly the headless calling convention — it just happens to live inside a UI app.

### Mandatory in a headless host

1. **HTML shell + bootstrap script**: an `index.html` that loads `_framework/blazor.webassembly.js`. Use `autostart="false"` + `await Blazor.start()` when JS must control timing ([startup control](https://www.thinktecture.com/en/blazor/understanding-and-controlling-the-blazor-webassembly-startup-process/)).
2. **A `Program.Main` that builds and runs the host — with zero root components.** `WebAssemblyHostBuilder.CreateDefault(args)` → register services → `Build()` → `RunAsync()`. Nothing renders; DI is built; `Main` completes startup. This no-UI variant is long-established ([SO 69743254](https://stackoverflow.com/questions/69743254/how-to-use-c-sharp-webassemly-from-javascript-without-blazor-web-components) demonstrates precisely this: no `RootComponents.Add`, then `DotNet.invokeMethodAsync(...)` from JS).
3. **Public static methods marked `[JSInvokable]`** in the host assembly (identifier defaults to method name; parameters/returns must be JSON-serializable — `byte[]` works, which covers save files). JS calls `DotNet.invokeMethodAsync("<AssemblyName>", "MethodName", args)` ([docs](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript?view=aspnetcore-10.0#invoke-a-static-net-method)).

### Deletable relative to upstream PKHeX.Web

- `App.razor`, `Router`, every `.razor` page/component/layout, `_Imports.razor` razor bits, all CSS/scoped styles.
- `builder.RootComponents.Add<App>("#app")` and `builder.RootComponents.Add<HeadOutlet>("head::after")` — the only two lines that render anything.
- All UI packages: AntDesign 1.6.2, AntDesign.Charts, Sentry, Blazored.LocalStorage, TG.Blazor.IndexedDB, BytexDigital.CookieConsent, Blazor-Analytics ([csproj](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/PKHeX.Web.csproj)), plus their `_content/*` scripts (`g2plot.min.js` alone is 292 KB gz).
- Nearly all DI registrations — keep only services the facade API needs (they can also be `new`-ed directly; the MS.DI container comes along regardless but can stay almost empty).

### Minimal concrete shape

```xml
<Project Sdk="Microsoft.NET.Sdk.BlazorWebAssembly">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <InvariantGlobalization>true</InvariantGlobalization> <!-- drops ICU data file -->
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Components.WebAssembly" Version="10.0.*" />
  </ItemGroup>
  <ItemGroup>
    <ProjectReference Include="..\PkHex.Facade\PkHex.Facade.csproj" />
  </ItemGroup>
</Project>
```

```csharp
// Program.cs
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using PKHeX.Core;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.Services.AddScoped<GameApi>();          // whatever the facade surface needs
var app = builder.Build();
RuntimeCryptographyProvider.Aes  = app.Services.GetRequiredService<BlazorAesProvider>();
RuntimeCryptographyProvider.Md5  = app.Services.GetRequiredService<BlazorMd5Provider>();
await app.RunAsync();                           // NO RootComponents.Add anywhere

public static class Bridge
{
    [JSInvokable] public static Task<byte[]> LoadSave(byte[] bytes, string fileName) { /* ... */ }
}
```

```html
<!-- index.html -->
<script src="_framework/blazor.webassembly.js" autostart="false"></script>
<script type="module">
  await Blazor.start();
  const result = await DotNet.invokeMethodAsync("PkHexHost", "LoadSave", bytesArray, "pkmn.sav");
</script>
```

### Even smaller alternative (no Blazor hosting at all)

`Microsoft.NET.Sdk.WebAssembly` "**WebAssembly Browser App**" runs the .NET runtime directly with `[JSImport]`/`[JSExport]` interop and no Components framework ([official docs](https://learn.microsoft.com/en-us/aspnet/core/client-side/dotnet-interop/wasm-browser-app?view=aspnetcore-10.0), [Andrew Lock walkthrough](https://andrewlock.net/running-dotnet-in-the-browser-without-blazor/)). Trade-offs: you lose `DotNet.invokeMethodAsync`/event conveniences and reimplement glue; sync interop is actually *better* here (matters for the crypto bridge, see §4). Caveat: .NET 10 removed `blazor.boot.json` (inlined into `dotnet.js`), which made loading Blazor-WASM as a library inside non-Blazor JS apps noticeably harder ([Microsoft Q&A thread](https://learn.microsoft.com/en-us/answers/questions/5763020/net-10-blazor-webassembly-calling-c-from-javascrip)) — the Blazor-hosted route keeps official tooling support.

## 2. Concrete payload numbers

### Measured today: upstream PKHeX.Web deployed to GitHub Pages (.NET 10 GA, plain `dotnet publish -c Release`, no AOT, default trimming, Webcil `.wasm` packaging)

| Payload slice | Raw | Gzip |
|---|---:|---:|
| **Entire `_framework` (108 fingerprinted assets)** | **34,678,592 B (33.07 MiB)** | **10,944,996 B (10.44 MiB)** |
| `PKHeX.Core.wasm` (webcil) | 15,332,633 | 4,135,520 |
| Runtime core (`dotnet.native.wasm` 2,977,245/1,189,203 + `dotnet.native.js` 145,424/35,086 + `dotnet.runtime.js` 194,766/56,053 + `blazor.webassembly.js` 60,576/18,921 + `System.Private.CoreLib` 2,271,001/834,446 + interop asm 42,773/19,099) | ≈ 5.69 MiB | ≈ 2.15 MiB |
| ICU data (3 `.dat`; runtime fetches only the culture-matching one: EFIGS 550,832/196,996 · no_CJK 1,107,168/320,429 · CJK 956,416/337,483) | 2.50 MiB total | 0.82 MiB total |
| UI packages in `_framework` (AntDesign 4,117,785/1,072,905 · AntDesign.Charts 304,405/104,624 · Sentry ×3 ≈ 525,631/212,896 · Blazored.LocalStorage 32,021/13,516 · BytexDigital CC 91,925/31,214 · Blazor-Analytics 18,197/7,514 · TG.Blazor.IndexedDB 27,925/11,775) | 5,117,889 | 1,454,444 |
| `PKHeX.Web` app assembly | 521,493 | 190,058 |
| `PKHeX.Facade` | 78,101 | 34,736 |
| `PKHeX.Core.AutoMod` (+`Plugins` 23,829/10,143) | 154,389 | 72,433 |
| Content JS outside `_framework` (`g2plot.min.js` 1,049,910/291,924 · vite bundle incl. firebase+crypto-js 228,404/59,943 · misc ≈ 24 KB) | ≈ 1.30 MiB | ≈ 0.35 MiB |

Notes:
- GitHub Pages serves these with transparent **gzip only** — verified empirically (e.g., Facade: 78,101 raw → 34,736 gz over the wire); precompressed `.br`/`.gz` companions are not present and brotli is never negotiated. No brotli on Pages.
- Assemblies are **Webcil** containers (IL wrapped with `\0asm` magic, `.wasm` extension) — verified by inspecting downloaded bytes (`BSJB` IL metadata present); these are interpreter-mode sizes, not AOT.
- Default trimming granularity is `partial`: only the BCL and assemblies that opted in get trimmed ([trimmer docs](https://learn.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/configure-trimmer?view=aspnetcore-10.0)). `PKHeX.Core` ships at full size (15.3 MB) because it doesn't opt in — and it's mostly data tables anyway.
- A boot manifest (`blazor.boot.json`) is still served by the live deployment listing all 108 assets; in .NET 10 it is otherwise inlined into `dotnet.js`.

### Published baselines for minimal apps (proxy)

- Clean `blazorwasm` template, Release publish: **≈1.42 MB gzip transferred**, TTI ≈2.3 s LAN ([2026 benchmark, .NET 11 preview](https://startdebugging.net/2026/05/blazor-server-vs-webassembly-vs-united-in-dotnet-11/)); earlier reports put the floor at ≈1.1 MB (.NET 7) → ≈1.3 MB (.NET 8) compressed ([dotnet/runtime #86601](https://github.com/dotnet/runtime/issues/86601)).
- With AOT, even hello-world balloons: `dotnet.native.wasm` = 9.4 MB raw / 3.3 MB gz / 2.2 MB br ([SO 79183829](https://stackoverflow.com/questions/79183829/whats-the-minimum-size-when-a-simple-blazor-wasm-project-aot-compiled-and-trim)).
- Real-world Blazor WASM first visits are commonly quoted at **8–12 s**, cached revisits 2–3 s ([2025 roundup](https://medium.com/c-sharp-programming/blazor-webassembly-vs-server-in-2025-the-ultimate-guide-to-choosing-your-perfect-hosting-model-d5af612fb87c)); one documented optimization case went 6.1 MB → 1.4 MB startup payload and 8–12 s → <2 s for the landing view ([case study](https://medium.com/careerbytecode/why-my-blazor-wasm-app-was-fast-on-localhost-and-sluggish-in-production-8e1e190e646c)).

### Headless estimate (derived from the measurements above)

| Scenario | Raw `_framework`+content | First-load transfer (gzip) |
|---|---:|---:|
| Today's upstream (full UI) | ≈ 35.98 MB | ≈ 11.0 MB |
| Headless, same remaining dependency set (drop UI pkgs −1.39 gz, drop content JS −0.35 gz, swap `PKHeX.Web`→thin host −~0.15 gz) | ≈ 28 MB | **≈ 9.0–9.1 MB** |
| + `InvariantGlobalization` (never fetch ICU) | ≈ 26.7–27.3 MB | **≈ 8.7 MB** |
| Lean-BCL floor (hello-world baseline + Core + Facade, minimal deps) | — | **≈ 5.5 MB** |

Transfer-time arithmetic for ~9 MB gz: ≈7–8 s at 10 Mbps, ≈45 s at Fast-3G throttle; the ~5.5 MB floor halves that. Repeat loads are cheap either way thanks to .NET 10 built-in asset fingerprinting/integrity (immutable caching) — just keep SDK ≥ 10.0.2 to avoid the early-.NET-10 revalidation storm regression ([dotnet/aspnetcore #64009](https://github.com/dotnet/aspnetcore/issues/64009), fixed in servicing).

**Either way, `PKHeX.Core` alone is ~3.94 MB gz — roughly 44–70% of any headless payload. Dropping UI is worthwhile but bounded; the Core library is the cost center.**

## 3. Startup sequence from plain JS (no rendering)

1. Browser loads `index.html` → `<script src="_framework/blazor.webassembly.js">` sets up `window.Blazor`; with `autostart="false"` nothing else happens until `Blazor.start()` (a Promise you can `await`/`catch`).
2. Boot config (inlined into `dotnet.native.js` in .NET 10, integrity-hashed, fully fingerprinted) lists every asset; loader fetches `dotnet.runtime.js`, `dotnet.native.wasm`, `System.Private.CoreLib`, assemblies (Webcil), optional ICU — parallel HTTP/2 requests.
3. Mono VM initializes, your `Program.Main` runs: DI container builds, crypto providers attach, any service warm-up executes. **No component tree exists at any point.**
4. `RunAsync()` idles keeping the runtime alive. From now on — and only now — `DotNet.invokeMethodAsync("AssemblyName", "Id", args)` resolves `[JSInvokable]` statics. Before start completes the global `DotNet` may be absent/partially initialized, so guard call sites as upstream does (`if (!window.DotNet?.invokeMethodAsync) return`) or simply sequence calls after `await Blazor.start()`.
5. Optional hooks: JS initializers (`{AssemblyName}.lib.module.js`, `beforeStart`/`afterStarted`) still work headlessly ([startup internals](https://www.thinktecture.com/en/blazor/understanding-and-controlling-the-blazor-webassembly-startup-process/)); `WebAssemblyHost.Services.GetService<IJSRuntime>()` is usable inside `Main` before "UI" would ever render.

## 4. Crypto bridge reuse — survives headless cleanly

Upstream wiring ([Program.cs](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/Program.cs)):

```csharp
var app = builder.Build();
RuntimeCryptographyProvider.Aes = app.Services.GetRequiredService<BlazorAesProvider>();
RuntimeCryptographyProvider.Md5 = app.Services.GetRequiredService<BlazorMd5Provider>();
```

- These are **static fields on PKHeX.Core's `RuntimeCryptographyProvider`**; assignment happens once during `Main`, before any save is parsed. Nothing about it references components, routing, or rendering → **headless requires zero changes**.
- Implementations ([`BlazorAesProvider`](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/Services/BlazorAesProvider.cs) : `IAesCryptographyProvider`, [`BlazorMd5Provider`](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/Services/BlazorMd5Provider.cs) : `IMd5Provider`) delegate through `JsService` using **synchronous** `IJSInProcessRuntime.Invoke<string>("encryptAes"|"md5Hash", hex...)` into `window.encryptAes/md5Hash`, backed by **crypto-js** ([aes.ts](https://github.com/arleypadua/PKHeX.Everywhere/blob/main/src/PKHeX.Web/_js/lib/crypto/aes.ts), md5.ts; ECB/CBC, NoPadding).
- Why the bridge exists at all: Blazor WASM disables native `System.Security.Cryptography` — MD5 has no browser implementation at all, and AES syncs over SubtleCrypto only where `SharedArrayBuffer` is available ([design doc](https://github.com/dotnet/designs/blob/main/accepted/2021/blazor-wasm-crypto.md)). `SharedArrayBuffer` needs COOP/COEP response headers, which **GitHub Pages cannot send** — so the SubtleCrypto path is off the table on Pages regardless of UI/headless, and a JS-lib or managed implementation is mandatory. crypto-js rides inside the existing 228 KB/60 KB-gz vite bundle.
- Only ordering requirement: install `window.encryptAes/md5Hash` before first use (upstream's `main()` does it before Blazor starts; any point before the first save parse is fine).

See sibling research: `research/crypto-inventory.md` on branch [`research/crypto-inventory`](https://github.com/EthanThatOneKid/pkhex-wasm/tree/research/crypto-inventory).

## 5. Options to cut the initial download (documented/measured impact)

1. **Drop the UI stack** (measured): −4.88 MiB raw / **−1.39 MiB gz** of assemblies + −~0.35 MiB gz of `_content` JS vs upstream.
2. **`InvariantGlobalization=true`** (+`InvariantTimezone`): eliminates the ICU datum fetch (−0.20–0.34 MiB gz per load) ([app-download-size docs](https://learn.microsoft.com/en-us/aspnet/core/blazor/performance/app-download-size?view=aspnetcore-10.0)). Safe if the API surface doesn't format culture-specific strings.
3. **Trimming**: already on by default (`partial`). Real gains require marking app libs `<IsTrimmable>true</IsTrimmable>` — expect little from `PKHeX.Core` (data-heavy); measure rather than assume.
4. **Lazy assembly loading**: `<BlazorWebAssemblyLazyLoad Include="..." />` + `LazyAssemblyLoader.LoadAssembliesAsync([...])` — the loader itself doesn't need the Router (Router integration is merely the usual trigger), so a headless host can defer e.g. `PKHeX.Core.AutoLegality/AutoMod` (~72 KB gz) and backend/cloud assemblies until first relevant call ([lazy-load docs](https://learn.microsoft.com/en-us/aspnet/core/blazor/webassembly-lazy-load-assemblies?view=aspnetcore-10.0)). Don't lazy-load core runtime assemblies.
5. **Avoid AOT** for startup-bound scenarios: multiplies native payload (hello-world `dotnet.native.wasm` 9.4 MB raw / 2.2 MB br AOT'd vs 2.98 MB raw interpreter runtime here). If hot loops ever need it later, prefer selective AOT + `WasmStripILAfterAOT`.
6. **Compression**: Pages gives gzip only (measured). Hosting behind a brotli-capable CDN (Cloudflare Pages, Netlify) typically shaves another ~15–25% off the transfer with zero code change.
7. **Repeat visits**: .NET 10 fingerprints every asset → immutable caching, near-zero repeat transfer; pin SDK ≥ 10.0.2 (see #64009 above).

## Bottom line

A headless `PKHeX.Facade` host is small in code (~100 LOC C#, one HTML shell, a JS shim calling `DotNet.invokeMethodAsync` after `Blazor.start()`) and moderate in bytes: **budget ~9 MB gzip / ~28 MB raw first load for a like-for-like dependency set (~8.7 MB with invariant globalization), with a realistic lean floor around ~5.5 MB gzip** — versus ~11 MB gz for the current full-UI deployment. The pattern is proven end-to-end by upstream (its `BrowserWindowService.OnLoadRequested` / `AuthService.OnTokenChanged` are already headless-style seams), the crypto bridge ports verbatim, and the dominant remaining cost is `PKHeX.Core` itself (3.94 MiB gz), not the host. If those numbers are acceptable for an API-first v1, build the headless host; revisit a non-Blazor `Microsoft.NET.Sdk.WebAssembly` browser-app shell only if the extra ~2–3 MB of Blazor/framework overhead ever matters.
