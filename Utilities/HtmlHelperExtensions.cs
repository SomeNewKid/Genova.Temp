namespace Genova.Temp.Utilities;

public static class HtmlHelperExtensions
{
    public static string ConvertToHtmlAttributes(object? obj)
    {
        if (obj == null) return string.Empty;

        var properties = obj.GetType().GetProperties()
            .Select(p => $"{p.Name.Replace('_', '-')}=\"{p.GetValue(obj)}\"");

        return string.Join(" ", properties);
    }

    public static string GenerateLanguageLink(
        string href,
        string lang,
        bool isRtl,
        string? ariaCurrent,
        string langName,
        string englishName)
    {
        // Build attributes
        var langAttr = $"lang=\"{lang}\"";
        var dirAttr = isRtl ? "dir=\"rtl\"" : "dir=\"ltr\"";
        var ariaAttr = !string.IsNullOrEmpty(ariaCurrent) ? $"aria-current=\"{ariaCurrent}\"" : string.Empty;

        // Construct anchor element
        return $"<a href=\"{href}\" {langAttr} {langAttr.Replace("lang", "lang2")} {dirAttr} {dirAttr.Replace("dir", "dir2")} {ariaAttr}>{langName} <small>{englishName}</small></a>";
    }
}
