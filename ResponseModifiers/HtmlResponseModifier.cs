using Genova.Temp.Localization;
using System.Globalization;

namespace Genova.Temp.ResponseModifiers;

public class HtmlResponseModifier : TextResponseModifier
{
    public HtmlResponseModifier(ResponseContext responseContext)
        : base(responseContext)
    {
    }

    protected override string ModifyContent(string content)
    {
        string message = "";
        if (ResponseContext != null &&
            ResponseContext.CurrentPageCulture != null)
        {
            message = $"<p>Current culture: {ResponseContext.CurrentPageCulture.DisplayName}</p>";
        }
        string modifiedContent = content; // content.Replace("</body>", $"<p>Modified by Middleware</p>{message}</body>");

        // Split the modified content into head and body parts
        string splitAt = "</nav>";
        int headEndIndex = modifiedContent.IndexOf(splitAt) + splitAt.Length;
        string modifiedHead = modifiedContent.Substring(0, headEndIndex);
        string modifiedBody = modifiedContent.Substring(headEndIndex);

        modifiedBody = RemoveLinkSlug(modifiedBody, "en");
        modifiedBody = RemoveLinkSlug(modifiedBody, "zh");
        modifiedBody = RemoveLinkSlug(modifiedBody, "zh-hk");
        modifiedBody = RemoveLinkSlug(modifiedBody, "ar");

        if (ResponseContext != null &&
            ResponseContext.CurrentPageCulture != null)
        {
            string cultureSlug = ResponseContext.CurrentPageCulture.Name;
            string defaultCultureSlug = CultureInfo.CurrentUICulture.Name.ToLowerInvariant();
            if (!cultureSlug.Equals(defaultCultureSlug, StringComparison.OrdinalIgnoreCase))
            {
                modifiedBody = PrependLinkSlug(modifiedBody, cultureSlug.ToLowerInvariant());
                modifiedHead = modifiedHead.Replace(" lang=\"en\"", $" lang=\"{cultureSlug}\"");
                if (cultureSlug == "ar")
                {
                    modifiedHead = modifiedHead.Replace(" lang=\"ar\"", " lang=\"ar\" dir=\"rtl\"");
                }
            }
        }
        return modifiedHead + modifiedBody;
    }

    private string PrependLinkSlug(string content, string slug)
    {
        return content.Replace(" href=\"", " href=\"/" + slug);
    }

    private string RemoveLinkSlug(string content, string slug)
    {
        content = content.Replace(" href=\"/" + slug, " href=\"/");
        return content.Replace(" href=\"//", " href=\"/");
    }
}