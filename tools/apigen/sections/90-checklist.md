## Implementation checklist

Ordered handoff list — each step is one session-sized unit of work:

1. **Repo layout**: promote `src/ts/` (binding package source, bootstrapped by this generator) and a real wasm host library evolving `spike/SpikeLib` beyond demo scope.
2. **Binding layer**: implement the Handle classes against `[JSExport]` services over Core directly (AutoMod excluded from the bundle), honoring [Data contracts](#data-contracts).
3. **Managed crypto**: vendor MIT-lineage MD5/AES-128-ECB/CBC-NoPadding; register at init; land RFC/NIST vector tests + Node cross-checks.
4. **Tier enforcement**: edit/read-only guards ahead of every mutator call; descriptive errors per the matrix.
5. **Lookup-table generator**: build-time table JSON (species/natures/moves universal; items per game family) hydrated at init.
6. **Test factory + E2E**: blank-fixture factory per `EntityContext`; generalize the spike QA scripts into the playwright suite with shared crypto-vector constants.
7. **Packaging pipeline**: docxodus-shaped tarball build, brotli precompression, 8 MB gz budget gate, compliance-kit script (`complete-source.tar.gz`, notices, modifications log, `upstream.json`).
8. **Publish workflow + ritual doc**: tag-triggered OIDC publishing; CONTRIBUTING section for the upstream-sync ritual.
9. **Docs entrypoint swap**: when generated types replace the skeleton, point the docs workflow at the new entry and retire the interim declaration file into generator fixtures.

Each generation-support addition beyond v1 repeats: capability probe → tier assignment → fixture coverage → table generation → docs matrix update.
