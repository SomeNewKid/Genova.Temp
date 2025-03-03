using Genova.Temp.Localization;
using System.Globalization;
using System.Text.RegularExpressions;

namespace Genova.Temp.ResponseModifiers;

public class HtmlResponseModifier : TextResponseModifier
{
    // ASP.NET Core and its tag helpers often force changes to HTML element attributes,
    // such as forcably changing lang="" forcibly inserting dir="" attributes.
    // To stop this, the Razor files may prepend the following prefix to attributes,
    // so that the rendered attribute is MODIFY_ATTRIBUTE_PREFIX_lang="".
    // After ASP.NET has finished rendered the HTML, we need to remove
    // this attribute prefix.
    // Hacky, sure, but ChatGPT and I could not figure out any other way of
    // suppressing ASP.NET's insistence on changing some attribute values.

    public const string MODIFY_ATTRIBUTE_PREFIX = "MODIFY_ATTRIBUTE_PREFIX_";

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

        modifiedContent = modifiedContent.Replace(MODIFY_ATTRIBUTE_PREFIX, "").Trim();

        return modifiedContent;
    }
}