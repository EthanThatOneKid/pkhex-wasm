using System;

namespace PKHexWasm.Wasm;

/// <summary>
/// Declares one <c>@throws</c> contract of an exported method for the
/// documentation generator. Applied multiple times where several errors apply.
/// </summary>
[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
public sealed class JsThrowsAttribute : Attribute
{
    public string Error { get; }
    public string Clause { get; }

    public JsThrowsAttribute(string error, string clause)
    {
        Error = error;
        Clause = clause;
    }
}
