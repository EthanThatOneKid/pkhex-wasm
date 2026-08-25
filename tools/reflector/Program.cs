using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

// Reflects over the [JSExport] facade sources and emits runtime-meta.json —
// the machine-readable truth the API generator validates against.
//
//   dotnet run --project tools/reflector -c Release

var root = PKHexWasm.Reflector.CoreScan.FindRepoRoot();
var hostDir = Path.Combine(root, "src", "PKHexWasm.Wasm");

var methods = new List<ExportMethod>();
foreach (var file in Directory.EnumerateFiles(hostDir, "*.cs", SearchOption.TopDirectoryOnly))
{
    var tree = CSharpSyntaxTree.ParseText(File.ReadAllText(file));
    foreach (var method in tree.GetRoot().DescendantNodes().OfType<MethodDeclarationSyntax>())
    {
        var hasJsExport = method.AttributeLists
            .SelectMany(a => a.Attributes)
            .Any(a => a.Name.ToString() is "JSExport" or "JSExportAttribute");
        if (!hasJsExport)
        {
            continue;
        }

        var doc = ExtractDocSummary(method);
        var throws = ExtractThrows(method);

        methods.Add(new ExportMethod(
            Name: method.Identifier.Text,
            ReturnType: method.ReturnType.ToString().Trim(),
            Params: method.ParameterList.Parameters
                .Select(p => new ExportParam(
                    Name: p.Identifier.Text,
                    Type: p.Type?.ToString().Trim() ?? "unknown"))
                .ToArray(),
            Doc: doc,
            Throws: throws,
            File: Path.GetFileName(file)));
    }
}

methods.Sort((a, b) => string.CompareOrdinal(a.Name, b.Name));

var meta = new RuntimeMeta(
    Source: "src/PKHexWasm.Wasm (facade)",
    GeneratedAt: DateTimeOffset.UtcNow.ToString("yyyy-MM-dd"),
    MethodCount: methods.Count,
    Methods: [.. methods]);

var jsonOptions = new JsonSerializerOptions
{
    WriteIndented = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
};

var outPath = Path.Combine(root, "tools", "apigen", "runtime-meta.json");
File.WriteAllText(outPath, JsonSerializer.Serialize(meta, jsonOptions) + Environment.NewLine);
Console.WriteLine($"reflect: {methods.Count} export(s) → {Path.GetRelativePath(root, outPath)}");

// ---- v2: scan the vendored Core hierarchy (ADR 0001 raw facts) -------------

var coreProject = PKHexWasm.Reflector.CoreScan.CoreProjectDirectory(root);
var coreDll = Path.Combine(coreProject, "bin", "Release", "net10.0", "PKHeX.Core.dll");
if (!File.Exists(coreDll))
{
    Console.WriteLine("reflect: PKHeX.Core.dll not built — skipping v2 metadata (build the solution first)");
    return 0;
}

var coreXml = PKHexWasm.Reflector.CoreScan.DocsXmlPath(root);
EnsureDocsXml(coreProject, coreDll, coreXml);

var commit = Run("git", ["-C", coreProject, "rev-parse", "HEAD"], root);

var coreMeta = PKHexWasm.Reflector.CoreScan.Scan([coreDll], File.Exists(coreXml) ? coreXml : null, commit);
var v2Path = Path.Combine(root, "tools", "apigen", "runtime-meta-v2.json");
File.WriteAllText(v2Path, JsonSerializer.Serialize(coreMeta, jsonOptions) + Environment.NewLine);
Console.WriteLine(
    $"reflect: {coreMeta.Classes.Count} class(es), {coreMeta.Classes.Values.Sum(c => c.Members.Length)} member(s), {coreMeta.Enums.Count} enum(s) → {Path.GetRelativePath(root, v2Path)}");
return 0;

/// <summary>
/// Doc comments come from a generated XML file. It lives at a stable path
/// (CoreScan.DocsXmlPath) so IncrementalClean can never sweep it; rebuild it
/// when missing or older than the assembly.
/// </summary>
static void EnsureDocsXml(string coreProject, string coreDll, string coreXml)
{
    if (File.Exists(coreXml) && File.GetLastWriteTimeUtc(coreXml) >= File.GetLastWriteTimeUtc(coreDll))
    {
        return;
    }
    Console.WriteLine("reflect: generating PKHeX.Core documentation XML…");
    Run("dotnet", ["build",
        Path.Combine(coreProject, "PKHeX.Core.csproj"),
        "-c", "Release",
        "-p:GenerateDocumentationFile=true",
        $"-p:DocumentationFile={coreXml}",
        "--nologo", "-v", "q"], Directory.GetCurrentDirectory());
    if (!File.Exists(coreXml))
    {
        Console.WriteLine("reflect: warning — doc XML not produced; members will carry no docs");
    }
}

static string Run(string program, string[] args, string cwd)
{
    var psi = new System.Diagnostics.ProcessStartInfo
    {
        FileName = program,
        Arguments = string.Join(' ', args.Select(Quote)),
        WorkingDirectory = cwd,
        RedirectStandardOutput = true,
        RedirectStandardError = true,
    };
    using var p = System.Diagnostics.Process.Start(psi)
        ?? throw new InvalidOperationException($"failed to start {program}");
    var stdout = p.StandardOutput.ReadToEnd().Trim();
    p.WaitForExit();
    if (p.ExitCode != 0)
    {
        throw new InvalidOperationException($"{program} exited {p.ExitCode}: {p.StandardError.ReadToEnd()}");
    }
    return stdout;

    static string Quote(string arg) =>
        arg.Contains(' ') ? $"\"{arg}\"" : arg;
}

/// <summary>Pulls the &lt;summary&gt; text from the XML doc comment, if any.</summary>
static string? ExtractDocSummary(MethodDeclarationSyntax method)
{
    foreach (var trivia in method.GetLeadingTrivia())
    {
        if (!trivia.IsKind(SyntaxKind.SingleLineDocumentationCommentTrivia))
        {
            continue;
        }

        var lines = new List<string>();
        foreach (var raw in trivia.ToFullString().Split('\n'))
        {
            // strip comment slashes and XML tags rather than skipping lines —
            // one-line summaries (`/// <summary>X</summary>`) must survive
            var text = System.Text.RegularExpressions.Regex
                .Replace(raw.Trim().TrimStart('/', ' '), "</?[a-zA-Z][^>]*>", "")
                .Trim();
            if (text.Length > 0)
            {
                lines.Add(text);
            }
        }
        return lines.Count > 0 ? string.Join(" ", lines) : null;
    }
    return null;
}

/// <summary>Reads [JsThrows("Error", "clause")] attribute applications.</summary>
static List<ThrowContract> ExtractThrows(MethodDeclarationSyntax method)
{
    var contracts = new List<ThrowContract>();
    foreach (var attr in method.AttributeLists.SelectMany(a => a.Attributes))
    {
        var name = attr.Name.ToString();
        if (name is not ("JsThrows" or "JsThrowsAttribute"))
        {
            continue;
        }

        var args = attr.ArgumentList?.Arguments ?? default;
        if (args.Count != 2)
        {
            continue;
        }

        contracts.Add(new ThrowContract(
            Error: StripQuotes(args[0].Expression),
            Clause: StripQuotes(args[1].Expression)));
    }
    return contracts;
}

static string StripQuotes(ExpressionSyntax e) =>
    e switch
    {
        LiteralExpressionSyntax lit when lit.IsKind(SyntaxKind.StringLiteralExpression) =>
            lit.Token.ValueText,
        _ => e.ToString(),
    };

internal record ExportMethod(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("returns")] string ReturnType,
    [property: JsonPropertyName("params")] ExportParam[] Params,
    [property: JsonPropertyName("doc")] string? Doc,
    [property: JsonPropertyName("throws")] List<ThrowContract> Throws,
    [property: JsonPropertyName("file")] string File);

internal record ExportParam(
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("type")] string Type);

internal record ThrowContract(
    [property: JsonPropertyName("error")] string Error,
    [property: JsonPropertyName("clause")] string Clause);

internal record RuntimeMeta(
    [property: JsonPropertyName("source")] string Source,
    [property: JsonPropertyName("generatedAt")] string GeneratedAt,
    [property: JsonPropertyName("methodCount")] int MethodCount,
    [property: JsonPropertyName("methods")] ExportMethod[] Methods);
