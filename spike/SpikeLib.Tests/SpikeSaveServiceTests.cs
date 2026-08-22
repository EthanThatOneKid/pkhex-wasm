using SpikeLib;
using PKHeX.Core;

namespace SpikeLib.Tests;

public class SpikeSaveServiceTests
{
    private readonly SpikeSaveService _svc = new();

    [Fact]
    public void CreateDemoSave_produces_parseable_save()
    {
        var bytes = _svc.CreateDemoSave("SPIKE");

        var sav = SaveUtil.GetSaveFile(bytes);
        Assert.NotNull(sav);
        Assert.Equal("SPIKE", sav.OT);
    }

    [Fact]
    public void DemoSave_contains_level5_pikachu_in_box1_slot1()
    {
        var bytes = _svc.CreateDemoSave("SPIKE");

        var mon = _svc.ReadFirstPokemon(bytes);

        Assert.Equal(25, mon.Species);
        Assert.Equal(5, mon.Level);
        Assert.Equal("Pikachu", mon.Nickname);
    }

    [Fact]
    public void RenameFirstPokemon_persists_through_roundtrip()
    {
        var bytes = _svc.CreateDemoSave("SPIKE");

        var renamed = _svc.RenameFirstPokemon(bytes, "Sparky");

        Assert.NotNull(SaveUtil.GetSaveFile(renamed));
        Assert.Equal("Sparky", _svc.ReadFirstPokemon(renamed).Nickname);
    }

    [Fact]
    public void Repeated_roundtrips_stay_valid()
    {
        var bytes = _svc.CreateDemoSave("SPIKE");
        for (var i = 0; i < 3; i++)
        {
            bytes = _svc.RenameFirstPokemon(bytes, $"Spike{i}");
            var mon = _svc.ReadFirstPokemon(bytes);
            Assert.Equal($"Spike{i}", mon.Nickname);
            Assert.Equal(25, mon.Species);
        }
    }
}
