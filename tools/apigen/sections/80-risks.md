## Risk register

Known landmines, discovered during research and the empirical probe — every implementation session should re-read this list:

| Risk | Consequence | Mitigation |
| --- | --- | --- |
| Upstream `SetUnshiny` on GB formats can loop forever (`SetPIDGender` reroll against a no-op PID setter) | Hang in consumer code via `setShiny(false)` on Gen 1–2 | All mutators throw on read-only tiers per [#10](https://github.com/EthanThatOneKid/pkhex-wasm/issues/10) — Gen 1–2 never reach Core; hazard recorded as part of why their editing stays deferred |
| `CommonEdits.SetNature` silently no-ops on Gen 8+ formats (mint-derived natures) | Edits that look applied but aren't | Mint-aware write path (Facade `Natures.ChangeAll` semantics) is a hard requirement |
| Blank `SAV3` constructs with an empty data buffer; `Write()` fails until seeded | Fixture-factory round-trips break for Gen 3 only | Factory seeds Gen 3 blanks before any Write; probe code documents the exact quirk |
| IL trim warnings around `EntityConverter` / `EvolutionTree` under NativeAOT-style trimming | Runtime breaks surface late | Trim warnings tracked per upstream bump; spike's trim profile is the baseline |
| .NET 10 wasmbrowser template churn between SDK bumps | Host bootstrap drifts | Spike pins behavior in tests; bump ritual includes full E2E run |
| Four duplicate `PKHeX.Core.wasm` variants observed in intermediate output (only one loads) | Silent bundle-size bloat | Packaging step audits emitted assets against the size gate |

## Documentation pipeline

Live site: <https://ethanthatonekid.github.io/pkhex-wasm/> — regenerated on every push to `main` by the docs workflow from [`tools/apigen/fixtures/pkhex-wasm.d.ts`](../../tools/apigen/fixtures/pkhex-wasm.d.ts), the generated canonical declaration file; the packaging pipeline ships the same bytes as the package's `index.d.ts`, so the site always documents the shipped surface. The original hand-authored seed retired into generator fixtures when generated types replaced it.
