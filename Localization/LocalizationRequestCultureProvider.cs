using System.Globalization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Http;

namespace Genova.Temp.Localization;

public class LocalizationRequestCultureProvider : RequestCultureProvider
{
    private readonly CultureInfo _culture;

    public LocalizationRequestCultureProvider(CultureInfo culture)
    {
        _culture = culture;
    }

    public override Task<ProviderCultureResult?> DetermineProviderCultureResult(HttpContext httpContext)
    {
        var providerResultCulture = new ProviderCultureResult(_culture.Name, _culture.Name);
        return Task.FromResult<ProviderCultureResult?>(providerResultCulture);
    }
}