using System.Reflection;
using System.Text.Json.Serialization;
using System.Xml.Linq;

namespace PKHexWasm.Reflector;

// v2 Core scanner (ADR 0001): reflects over the compiled vendored PKHeX.Core
// assembly through a MetadataLoadContext and emits RAW C# facts — untransformed
// names/types/access/docs plus declaring-class chains — into the shape the API
// generator projects downstream. No casing, no TS types, no availability logic
// lives here; naming iteration never requires rescanning C#.

public sealed record CoreMeta(
    [property: JsonPropertyName("schemaVersion")] int SchemaVersion,
    [property: JsonPropertyName("sourceCommit")] string SourceCommit,
    [property: JsonPropertyName("enums")] IReadOnlyDictionary<string, EnumInfo> Enums,
    [property: JsonPropertyName("classes")] IReadOnlyDictionary<string, ClassInfo> Classes);

public sealed record EnumInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("values")] EnumValueInfo[] Values);

public sealed record EnumValueInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("value")] long Value);

public sealed record ClassInfo(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("kind")] string Kind,
    [property: JsonPropertyName("baseChain")] string[] BaseChain,
    [property: JsonPropertyName("entityContext")] string? EntityContext,
    [property: JsonPropertyName("members")] MemberInfo[] Members);

public sealed record MemberInfo(
    [property: JsonPropertyName("csName")] string CsName,
    [property: JsonPropertyName("kind")] string Kind,
    [property: JsonPropertyName("csType")] string CsType,
    [property: JsonPropertyName("access")] string Access,
    [property: JsonPropertyName("computed")] bool Computed,
    [property: JsonPropertyName("isStatic")] bool IsStatic,
    [property: JsonPropertyName("declaredBy")] string DeclaredBy,
    [property: JsonPropertyName("docs")] string? Docs);

public static class CoreScan
{
    /// <summary>Root types of the projected subsystems (ticket #34 scope).</summary>
    private static readonly string[] RootTypeNames =
    [
        "PKHeX.Core.PKM",
        "PKHeX.Core.SaveFile",
        "PKHeX.Core.PlayerBag",
        "PKHeX.Core.InventoryPouch",
        "PKHeX.Core.ZukanBase`1",
        "PKHeX.Core.Zukan`1",
        "PKHeX.Core.Records",
        "PKHeX.Core.IDaycareMulti",
        "PKHeX.Core.IDaycareStorage",
        "PKHeX.Core.IDaycareEggState",
        "PKHeX.Core.IDaycareExperience",
        "PKHeX.Core.IDaycareRandomState`1",
    ];

    /// <summary>
    /// Curated derived/computed members per the projection contract (ADR 0001)
    /// and the surface inventory §4.1: getters that recompute or aggregate, so
    /// emission must treat them read-only even where reflection alone cannot tell.
    /// Name-keyed within any scanned class; extend only with inventory evidence.
    /// </summary>
    private static readonly HashSet<string> ComputedMembers =
    [
        // identity / derivation
        "Generation", "Format", "IsShiny", "TSV", "PSV", "ShinyXor", "Characteristic",
        "Japanese", "Korean", "SpriteItem", "PIDAbility",
        // derived-but-settable: the getter recomputes and the setter re-derives
        // its storage (CurrentLevel writes EXP) — ADR 0001 names it computed so
        // emission routes mutation through designated mutators only.
        "CurrentLevel",
        // format-computed views
        "TeraType",
        // aggregations
        "MoveCount", "IVTotal", "EVTotal", "MaximumIV", "FlawlessIVCount",
        "PotentialRating", "PartyStatsPresent", "RibbonCount", "MarkingCount",
        // file naming helpers
        "FileName", "FileNameWithoutExtension", "IsOriginValid",
        // met-data derivations
        "WasEgg", "WasTradedEgg", "IsTradedEgg", "IsUntraded", "HasOriginalMetLocation",
        // save-level aggregations
        "SlotCount", "PlayTimeString", "SeenCount", "CaughtCount", "PercentSeen", "PercentCaught",
        // NOTE: Nature is deliberately NOT here — pre-Gen6 it is PID-derived but
        // Gen6+ stores it, so the flag cannot be a per-member scan fact. The
        // concept-aware mutator semantics (map #15's setNature decision) own it.
    ];

    private static readonly HashSet<string> ExcludedMethodNames =
    [
        "Equals", "GetHashCode", "ToString", "GetType", "MemberwiseClone", "Finalize", "CompareTo",
    ];

    private static readonly Dictionary<string, string> FormatEntityContexts = new()
    {
        ["PKHeX.Core.PK1"] = "Gen1",
        ["PKHeX.Core.PK2"] = "Gen2",
        ["PKHeX.Core.SK2"] = "Gen2",
        ["PKHeX.Core.PK3"] = "Gen3",
        ["PKHeX.Core.CK3"] = "Gen3",
        ["PKHeX.Core.XK3"] = "Gen3",
        ["PKHeX.Core.PK4"] = "Gen4",
        ["PKHeX.Core.BK4"] = "Gen4",
        ["PKHeX.Core.RK4"] = "Gen4",
        ["PKHeX.Core.PK5"] = "Gen5",
        ["PKHeX.Core.PK6"] = "Gen6",
        ["PKHeX.Core.PK7"] = "Gen7",
        ["PKHeX.Core.PB7"] = "Gen7b",
        ["PKHeX.Core.PK8"] = "Gen8",
        ["PKHeX.Core.PB8"] = "Gen8b",
        ["PKHeX.Core.PA8"] = "Gen8a",
        ["PKHeX.Core.PK9"] = "Gen9",
        ["PKHeX.Core.PA9"] = "Gen9a",
    };

    public static CoreMeta Scan(IEnumerable<string> assemblyPaths, string? docsXmlPath, string sourceCommit)
    {
        using var loader = new MetadataLoadContext(
            new PathAssemblyResolver(BuildResolverPaths(assemblyPaths)),
            coreAssemblyName: "System.Private.CoreLib");

        var assembly = loader.LoadFromAssemblyPath(ResolveMainCore(assemblyPaths));
        var docs = new DocsLookup(docsXmlPath);
        var enums = new Dictionary<string, EnumInfo>();

        var roots = ResolveRootTypes(assembly);
        var pkmsRoot = roots["PKHeX.Core.PKM"];

        var classes = new SortedDictionary<string, ClassInfo>();
        AddClass(classes, pkmsRoot, docs, enums);
        foreach (var derived in CollectSubclasses(pkmsRoot))
        {
            AddClass(classes, derived, docs, enums);
        }

        // remaining roots, plus the subtrees that carry per-format surface:
        // pouch + dex impls and the concrete save classes (SAV1…SAV9), whose
        // distinct members (coins/BP blocks etc.) the save-subsystem work needs.
        foreach (var type in roots.Values)
        {
            if (type != pkmsRoot)
            {
                AddClass(classes, type, docs, enums);
            }
            var closureRoot = type;
            foreach (var derived in CollectSubclasses(closureRoot))
            {
                AddClass(classes, derived, docs, enums);
            }
        }

        return new CoreMeta(
            SchemaVersion: 2,
            SourceCommit: sourceCommit,
            Enums: enums,
            Classes: classes);
    }

    private static List<string> BuildResolverPaths(IEnumerable<string> assemblyPaths)
    {
        var paths = new List<string>();
        void AddDir(string? dir)
        {
            if (dir is null || !Directory.Exists(dir))
            {
                return;
            }
            paths.AddRange(Directory.EnumerateFiles(dir, "*.dll"));
        }
        foreach (var p in assemblyPaths)
        {
            paths.Add(Path.GetFullPath(p));
            AddDir(Path.GetDirectoryName(Path.GetFullPath(p)));
        }
        AddDir(Path.GetDirectoryName(typeof(object).Assembly.Location));
        AddDir(AppContext.BaseDirectory);
        return paths.Distinct(StringComparer.OrdinalIgnoreCase).ToList();
    }

    private static string ResolveMainCore(IEnumerable<string> assemblyPaths)
    {
        foreach (var p in assemblyPaths)
        {
            if (Path.GetFileName(p) == "PKHeX.Core.dll")
            {
                return Path.GetFullPath(p);
            }
        }
        throw new FileNotFoundException("expected PKHeX.Core.dll among assembly paths");
    }

    private static Dictionary<string, Type> ResolveRootTypes(Assembly assembly)
    {
        var byFqn = new Dictionary<string, Type>();
        var queue = new Queue<Type>(assembly.GetTypes());
        while (queue.Count > 0)
        {
            var t = queue.Dequeue();
            var fqn = Fqn(t);
            if (RootTypeNames.Contains(fqn))
            {
                byFqn[fqn] = t;
            }
        }
        var missing = RootTypeNames.Where(n => !byFqn.ContainsKey(n)).ToArray();
        if (missing.Length > 0)
        {
            throw new InvalidOperationException($"root types not found in PKHeX.Core: {string.Join(", ", missing)}");
        }
        return byFqn;
    }

    /// <summary>Ancestors of <paramref name="type"/> up to (excluding) Object, furthest first.</summary>
    private static List<Type> AncestorChain(Type type)
    {
        var chain = new List<Type>();
        var b = type.BaseType;
        while (b is not null && b.FullName != "System.Object")
        {
            chain.Insert(0, b);
            b = b.BaseType;
        }
        return chain;
    }

    private static IEnumerable<Type> CollectSubclasses(Type root)
    {
        var assembly = root.Assembly;
        foreach (var t in assembly.GetTypes())
        {
            if (AncestorChain(t).Contains(root))
            {
                yield return t;
            }
        }
    }

    private static void AddClass(
        SortedDictionary<string, ClassInfo> classes,
        Type type,
        DocsLookup docs,
        Dictionary<string, EnumInfo> enums)
    {
        var fqn = Fqn(type);
        if (classes.ContainsKey(fqn))
        {
            return;
        }

        var members = new List<MemberInfo>();
        foreach (var p in type.GetProperties(BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static | BindingFlags.DeclaredOnly))
        {
            if (p.IsSpecialName || p.GetIndexParameters().Length > 0)
            {
                continue;
            }
            CaptureEnum(enums, p.PropertyType);
            members.Add(new MemberInfo(
                CsName: p.Name,
                Kind: "property",
                CsType: Format(p.PropertyType),
                Access: p.CanRead && p.CanWrite ? "getSet" : p.CanRead ? "get" : "set",
                Computed: p.CanRead && ComputedMembers.Contains(p.Name),
                IsStatic: p.GetMethod?.IsStatic ?? p.SetMethod?.IsStatic ?? false,
                DeclaredBy: fqn,
                Docs: docs.Lookup("P", $"{fqn}.{p.Name}")));
        }

        foreach (var f in type.GetFields(BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static | BindingFlags.DeclaredOnly))
        {
            CaptureEnum(enums, f.FieldType);
            members.Add(new MemberInfo(
                CsName: f.Name,
                Kind: "field",
                CsType: Format(f.FieldType),
                Access: "readWrite",
                Computed: false,
                IsStatic: f.IsStatic,
                DeclaredBy: fqn,
                Docs: docs.Lookup("F", $"{fqn}.{f.Name}")));
        }

        foreach (var m in type.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.Static | BindingFlags.DeclaredOnly))
        {
            if (m.IsSpecialName || ExcludedMethodNames.Contains(m.Name) || m.Name.StartsWith("op_"))
            {
                continue;
            }
            CaptureEnum(enums, m.ReturnType);
            foreach (var prm in m.GetParameters())
            {
                CaptureEnum(enums, prm.ParameterType);
            }
            members.Add(new MemberInfo(
                CsName: m.Name,
                Kind: "method",
                CsType: Format(m.ReturnType),
                Access: "method",
                Computed: false,
                IsStatic: m.IsStatic,
                DeclaredBy: fqn,
                Docs: docs.Lookup("M", $"{fqn}.{m.Name}", withOverloads: true)));
        }

        members.Sort((a, b) =>
        {
            var cmp = string.CompareOrdinal(a.CsName, b.CsName);
            return cmp != 0 ? cmp : string.CompareOrdinal(a.Kind, b.Kind);
        });

        classes[fqn] = new ClassInfo(
            Name: fqn,
            Kind: type.IsInterface ? "interface"
                : type.IsAbstract && type.IsSealed ? "static"
                : type.IsAbstract ? "abstract"
                : "class",
            BaseChain: BaseChainOf(type),
            EntityContext: FormatEntityContexts.TryGetValue(fqn, out var ctx) ? ctx : null,
            Members: [.. members]);
    }

    private static string[] BaseChainOf(Type type) =>
        [.. AncestorChain(type).Select(Fqn)];

    private static void CaptureEnum(Dictionary<string, EnumInfo> enums, Type? type)
    {
        if (type is null || type.IsGenericParameter)
        {
            return;
        }
        // MetadataLoadContext cannot answer Nullable.GetUnderlyingType —
        // detect Nullable<T> structurally instead.
        if (type.IsGenericType && type.GetGenericTypeDefinition().FullName == "System.Nullable`1")
        {
            CaptureEnum(enums, type.GetGenericArguments()[0]);
            return;
        }
        if (type.IsArray)
        {
            CaptureEnum(enums, type.GetElementType());
            return;
        }
        if (type.IsGenericType)
        {
            foreach (var arg in type.GetGenericArguments())
            {
                CaptureEnum(enums, arg);
            }
            CaptureEnum(enums, type.GetGenericTypeDefinition().BaseType);
            return;
        }
        if (!type.IsEnum || enums.ContainsKey(Fqn(type)))
        {
            return;
        }
        // MetadataLoadContext cannot answer Enum.GetValues — read the literal
        // fields directly, which is fully metadata-driven and deterministic.
        var values = type.GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.DeclaredOnly)
            .Where(f => f.IsLiteral)
            .Select(f => new EnumValueInfo(
                Name: f.Name,
                Value: Convert.ToInt64(f.GetRawConstantValue(), System.Globalization.CultureInfo.InvariantCulture)))
            .OrderBy(v => v.Value)
            .ThenBy(v => v.Name, StringComparer.Ordinal)
            .ToArray();
        enums[Fqn(type)] = new EnumInfo(Name: type.Name, Values: values);
    }

    private static string Fqn(Type t)
    {
        if (t.IsNested && t.DeclaringType is not null)
        {
            return $"{Fqn(t.DeclaringType)}.{t.Name}";
        }
        return t.FullName?.Replace("+", ".") ?? t.Name;
    }

    private static readonly TypeNameFormatter Formatter = new();

    private static string Format(Type t) => Formatter.Format(t);

    /// <summary>
    /// Walks up from the current directory to the repo root (marker: the
    /// solution file). Shared by the CLI entry point and the seam tests so the
    /// vendored-path layout lives in exactly one place.
    /// </summary>
    public static string FindRepoRoot()
    {
        var dir = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (dir is not null && !File.Exists(Path.Combine(dir.FullName, "pkhex-wasm.slnx")))
        {
            dir = dir.Parent;
        }
        return dir?.FullName ?? throw new InvalidOperationException("repo root not found");
    }

    /// <summary>The vendored PKHeX.Core project directory (bin composes from here).</summary>
    public static string CoreProjectDirectory(string root) => Path.Combine(
        root, "external", "PKHeX.Everywhere", "external", "PKHeX", "PKHeX.Core");

    /// <summary>
    /// Stable home for the generated XML documentation — outside the vendored
    /// bin/ so IncrementalClean cannot sweep it between builds. Committed
    /// alongside runtime-meta-v2.json, pinned to the same submodule commit.
    /// </summary>
    public static string DocsXmlPath(string root) => Path.Combine(
        root, "tools", "apigen", "pkhex-core-docs.xml");

    /// <summary>C#-flavored type rendering: keywords for primitives, `DateOnly?`, generics without arity suffixes.</summary>
    private sealed class TypeNameFormatter
    {
        private static readonly Dictionary<string, string> Keywords = new()
        {
            ["System.Byte"] = "byte", ["System.SByte"] = "sbyte",
            ["System.Int16"] = "short", ["System.UInt16"] = "ushort",
            ["System.Int32"] = "int", ["System.UInt32"] = "uint",
            ["System.Int64"] = "long", ["System.UInt64"] = "ulong",
            ["System.Single"] = "float", ["System.Double"] = "double",
            ["System.Boolean"] = "bool", ["System.Char"] = "char",
            ["System.String"] = "string", ["System.Object"] = "object",
            ["System.Void"] = "void",
        };

        public string Format(Type t)
        {
            if (t.IsByRef)
            {
                return Format(t.GetElementType()!);
            }
            if (t.IsArray)
            {
                return Format(t.GetElementType()!) + new string('[', t.GetArrayRank()) + "]";
            }
            if (t.IsGenericParameter)
            {
                return t.Name;
            }
            if (t.IsGenericType && t.GetGenericTypeDefinition().FullName == "System.Nullable`1")
            {
                return Format(t.GetGenericArguments()[0]) + "?";
            }
            if (t.IsGenericType)
            {
                var def = t.GetGenericTypeDefinition();
                var args = t.GetGenericArguments().Select(Format);
                return StripArity(ShortName(def)) + "<" + string.Join(", ", args) + ">";
            }
            return Keywords.TryGetValue(t.FullName ?? t.Name, out var kw) ? kw : ShortName(t);
        }

        private static string ShortName(Type t) => t.IsNested ? $"{t.DeclaringType!.Name}.{t.Name}" : t.Name;

        private static string StripArity(string name) => name.Contains('`') ? name[..name.IndexOf('`')] : name;
    }

    /// <summary>Index over the generated XML documentation file, keyed like Roslyn doc-comment ids.</summary>
    private sealed class DocsLookup
    {
        private readonly Dictionary<string, string> summaries = new();

        public DocsLookup(string? xmlPath)
        {
            if (xmlPath is null || !File.Exists(xmlPath))
            {
                return;
            }
            var doc = XDocument.Load(xmlPath);
            foreach (var member in doc.Descendants("member"))
            {
                var id = member.Attribute("name")?.Value;
                if (id is null)
                {
                    continue;
                }
                var summary = member.Element("summary");
                if (summary is null)
                {
                    continue;
                }
                var text = string.Join(' ', summary.Value.Split('\n', StringSplitOptions.RemoveEmptyEntries)
                    .Select(l => l.Trim()).Where(l => l.Length > 0));
                if (text.Length > 0)
                {
                    summaries[id] = text;
                }
            }
        }

        /// <summary>Prefixed lookup ("P"/"F"/"M"); method lookups fall back to the bare-name key for overloads.</summary>
        public string? Lookup(string prefix, string key, bool withOverloads = false)
        {
            if (summaries.TryGetValue($"{prefix}:{key}", out var exact))
            {
                return exact;
            }
            if (!withOverloads)
            {
                return null;
            }
            var paren = key.IndexOf('(');
            return paren > 0 && summaries.TryGetValue($"{prefix}:{key[..paren]}", out var bare) ? bare : null;
        }
    }
}
