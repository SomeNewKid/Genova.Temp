using System.Globalization;
using Genova.Temp.Localization;

namespace Genova.Temp.ResponseModifiers;

public class ResponseContext
{
    public string OriginalRequestPath { get; set; } = "";
    public string RequestPath { get; set; } = "";
    public CultureInfo? CurrentPageCulture { get; set; }
}