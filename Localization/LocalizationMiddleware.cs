using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace Genova.Temp.Localization;

public class LocalizationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly RequestLocalizationOptions _localizationOptions;
    private readonly string _defaultCulture;
    private CultureInfo _culture = CultureInfo.CurrentCulture;

    public LocalizationMiddleware(RequestDelegate next, IOptions<RequestLocalizationOptions> localizationOptions)
    {
        _next = next;
        _localizationOptions = localizationOptions.Value;
        _defaultCulture = _localizationOptions.DefaultRequestCulture.Culture.Name;
    }

    public async Task Invoke(HttpContext context, ILocalizationService localizationService)
    {
        string? path = context.Request.Path.Value?.Trim('/');
        string[] slugs = path?.Split('/') ?? Array.Empty<string>();
        string? cultureSlug = slugs?.FirstOrDefault();
        List<string>? supportedCultures = _localizationOptions.SupportedCultures?.Select(c => c.Name).ToList();
         
        CultureInfo cultureToSet = _localizationOptions.DefaultRequestCulture.Culture;

        if (!string.IsNullOrEmpty(cultureSlug) && supportedCultures != null)
        {
            var matchingCulture = supportedCultures
                .FirstOrDefault(c => string.Equals(c, cultureSlug, StringComparison.OrdinalIgnoreCase));

            if (matchingCulture != null)
            {
                cultureToSet = new CultureInfo(matchingCulture);

                // Remove the culture slug from the path
                if (slugs != null)
                {
                    string newPath = string.Join('/', slugs.Skip(1));
                    context.Request.Path = new PathString("/" + newPath);
                }
            }
        }

        localizationService.CurrentPageCulture = cultureToSet;
        CultureInfo.CurrentCulture = cultureToSet;
        CultureInfo.CurrentUICulture = cultureToSet;

        var requestCulture = new RequestCulture(cultureToSet);
        var customRequestCultureProvider = new LocalizationRequestCultureProvider(cultureToSet);
        context.Features.Set<IRequestCultureFeature>(new RequestCultureFeature(requestCulture, customRequestCultureProvider));

        await _next(context);
    }
}