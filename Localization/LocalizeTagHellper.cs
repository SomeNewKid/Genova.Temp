using System.Globalization;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Genova.Temp.Localization;

[HtmlTargetElement("localize")]
public class LocalizeTagHelper : TagHelper
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public LocalizeTagHelper(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public override async Task ProcessAsync(TagHelperContext context, TagHelperOutput output)
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null)
        {
            output.SuppressOutput();
            return;
        }

        // Retrieve child content (this ensures we get <case> elements)
        var childContent = (await output.GetChildContentAsync()).GetContent();
        if (string.IsNullOrWhiteSpace(childContent))
        {
            output.SuppressOutput();
            return;
        }

        // Determine the current culture
        CultureInfo currentCulture = CultureInfo.CurrentUICulture; // Default to system-wide culture
        if (httpContext.Items.TryGetValue("CurrentPageCulture", out var cultureObj) && cultureObj is CultureInfo cultureInfo)
        {
            currentCulture = cultureInfo;
        }

        var neutralCulture = currentCulture.TwoLetterISOLanguageName; // Extract base language (e.g., "zh" from "zh-HK")

        // Extract all <case> elements inside <localize>
        var caseMatches = ExtractCases(childContent); // Parse <case> elements

        // Select the best matching case
        var selectedContent = caseMatches.ContainsKey(currentCulture.Name)
            ? caseMatches[currentCulture.Name] // Exact match
            : caseMatches.ContainsKey(neutralCulture)
                ? caseMatches[neutralCulture] // Neutral match
                : caseMatches.ContainsKey("en")
                    ? caseMatches["en"] // Default to English
                    : string.Empty; // No match found

        // Replace content with the selected case + debugging output
        output.Content.SetHtmlContent(string.IsNullOrEmpty(selectedContent) ? "" : selectedContent);
        output.TagName = null; // Remove <localize> wrapper
    }

    private Dictionary<string, string> ExtractCases(string content)
    {
        var caseMatches = new Dictionary<string, string>();
        var regex = new Regex(@"<case culture=""(.*?)"">(.*?)<\/case>", RegexOptions.Singleline);

        foreach (Match match in regex.Matches(content))
        {
            if (match.Groups.Count == 3)
            {
                var culture = match.Groups[1].Value.Trim();
                var text = match.Groups[2].Value.Trim();
                caseMatches[culture] = text;
            }
        }

        return caseMatches;
    }
}
