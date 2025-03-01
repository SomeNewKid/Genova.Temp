using Genova.Temp.Localization;

namespace Genova.Temp.ResponseModifiers;

public class ResponseModifierFactory
{
    public IResponseModifier GetResponseModifier(string contentType, ResponseContext responseContext)
    {
        contentType = contentType?.Split(';')[0].Trim().ToLowerInvariant() ?? string.Empty;

        switch (contentType)
        {
            case "text/html":
                return new HtmlResponseModifier(responseContext);
            case "application/javascript":
            case "text/javascript":
                return new JavascriptResponseModifier(responseContext);
            case "text/css":
                return new CssResponseModifier(responseContext);
            /*
            case "image/png":
                return new PngResponseModifier(localizationService);
            */
            default:
                return new NoResponseModifier(responseContext);
        }
    }
}