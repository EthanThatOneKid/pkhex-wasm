using System.Collections.Concurrent;
using PKHeX.Core;

namespace PKHexWasm;

/// <summary>
/// Generic property accessor over int handles, projecting the v2 binding
/// contract (ticket #36). Every property read/write routes through a
/// class+member registry — no per-member C# exports.
///
/// Wire contract:
///   GetMember(int handle, string memberId) → object?
///   SetMember(int handle, string memberId, object value) → void
///
/// The memberId is the short projected name (e.g. "Species", "OT", "EV_HP").
/// The handle registry resolves the class (SaveFile vs PKM) automatically.
/// </summary>
public static partial class GenericAccessor
{
    private static int _nextHandle;
    private static readonly ConcurrentDictionary<int, HandleEntry> Handles = new();
    private static readonly Dictionary<(string ClassId, string MemberId), PropertyAccessor> Properties = new();

    /// <summary>Triggers the PropertyRegistry static constructor.</summary>
    static GenericAccessor()
    {
        _ = PropertyRegistry.Registered; // force static ctor
    }

    // ---- handle management ------------------------------------------------

    public static int CreateHandle(string classId, object value)
    {
        var handle = NextHandle();
        Handles[handle] = new HandleEntry(classId, value);
        return handle;
    }

    public static void RemoveHandle(int handle)
    {
        Handles.TryRemove(handle, out _);
    }

    public static HandleEntry GetHandle(int handle) =>
        Handles.TryGetValue(handle, out var entry)
            ? entry
            : throw new ArgumentOutOfRangeException(nameof(handle), handle,
                ErrorTags.Compose(ErrorTags.Range, "unknown handle"));

    // ---- property registration --------------------------------------------

    public static void Register(string classId, string memberId,
        Func<object, object?> getter, Action<object, object?>? setter = null)
    {
        Properties[(classId, memberId)] = new PropertyAccessor(getter, setter);
    }

    // ---- generic accessors ------------------------------------------------

    /// <summary>
    /// Read a projected member by name. The handle registry resolves
    /// whether the backing object is a SaveFile or a PKM.
    /// </summary>
    public static object? GetMember(int handle, string memberId)
    {
        var entry = GetHandle(handle);

        if (Properties.TryGetValue((entry.ClassId, memberId), out var prop))
            return prop.Getter(entry.Value);

        throw new ArgumentOutOfRangeException(nameof(memberId), memberId,
            ErrorTags.Compose(ErrorTags.Range, $"unknown member {memberId} on {entry.ClassId}"));
    }

    /// <summary>
    /// Write a projected member by name. Tier enforcement applies to
    /// PKM handles (read-only tiers reject every mutator).
    /// </summary>
    public static void SetMember(int handle, string memberId, object value)
    {
        var entry = GetHandle(handle);

        if (Properties.TryGetValue((entry.ClassId, memberId), out var prop))
        {
            if (prop.Setter is null)
                throw new InvalidOperationException(
                    ErrorTags.Compose(ErrorTags.Range, $"member {memberId} is read-only"));

            RequireEditable(entry, memberId);
            prop.Setter(entry.Value, value);
            Flush(entry);
            return;
        }

        throw new ArgumentOutOfRangeException(nameof(memberId), memberId,
            ErrorTags.Compose(ErrorTags.Range, $"unknown member {memberId} on {entry.ClassId}"));
    }

    // ---- plumbing ---------------------------------------------------------

    private static void RequireEditable(HandleEntry entry, string operation)
    {
        if (entry.ClassId != "PKM") return;
        var pk = (PKM)entry.Value;
        if (pk.Context.Tier() == SupportTier.ReadOnly)
            throw new UnsupportedTierException(operation, pk.Context.ToString());
    }

    private static void Flush(HandleEntry entry)
    {
        if (entry.ClassId != "PKM") return;
        var pk = (PKM)entry.Value;
        // The PKM is mutated in place — no slot flush needed for the generic
        // accessor because Core's own setters write through to the backing
        // save immediately. This is a deliberate simplification: the generic
        // accessor does not track box/party slot positions.
    }

    private static int NextHandle() => Interlocked.Increment(ref _nextHandle);

    public sealed record HandleEntry(string ClassId, object Value);
    public sealed record PropertyAccessor(Func<object, object?> Getter, Action<object, object?>? Setter);
}
