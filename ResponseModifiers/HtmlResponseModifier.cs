using Genova.Temp.Localization;

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
        return content.Replace("</body>", $"<p>Modified by Middleware</p>{message}</body>");
    }
}