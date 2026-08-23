## Bootstrap lifecycle

Exactly one asynchronous step exists in the entire API: `initPKHex()`.

1. Fetch and instantiate the `_framework` runtime assets (`options.wasmBaseUrl` overrides the location; default is the package's own bundled runtime directory).
2. Register Managed crypto providers onto `RuntimeCryptographyProvider.Aes` / `.Md5` — strictly **before** any save can be parsed, so BDSP/Gen 7/HOME seams work transparently the first time they are reached.
3. Hydrate the global Lookup tables (species, natures, moves) and prepare per-game table loading.
4. Return the synchronous root.

Every operation on the returned root is synchronous. There is deliberately no second async boundary, no lazy per-generation loading, no worker requirement.
