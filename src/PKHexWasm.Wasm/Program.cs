using System;
using System.Threading;
using System.Threading.Tasks;
using PKHexWasm;

Console.WriteLine("pkhex-wasm ready");

// Keep the Binding assembly alive through wasm trimming: JS reaches
// PKHexWasm.PKHexApi dynamically, so nothing here references it statically.
_ = typeof(PKHexApi);

await Task.Delay(Timeout.Infinite);
