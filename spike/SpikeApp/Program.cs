using System;
using System.Runtime.InteropServices.JavaScript;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using SpikeLib;

Console.WriteLine("pkhex-wasm spike ready");
await Task.Delay(Timeout.Infinite);

[JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(DemoPokemon))]
internal sealed partial class SpikeJsonContext : JsonSerializerContext;

partial class SpikeApi
{
    private static readonly SpikeSaveService Service = new();

    [JSExport]
    internal static string GetApiVersion() => "v0-spike";

    [JSExport]
    internal static byte[] GenerateDemoSave() => Service.CreateDemoSave(SpikeSaveService.DefaultTrainerName);

    [JSExport]
    internal static string DescribeFirstPokemon(byte[] saveBytes)
    {
        var mon = Service.ReadFirstPokemon(saveBytes);
        return JsonSerializer.Serialize(mon, SpikeJsonContext.Default.DemoPokemon);
    }

    [JSExport]
    internal static byte[] RenameFirstPokemon(byte[] saveBytes, string nickname) =>
        Service.RenameFirstPokemon(saveBytes, nickname);
}
