using System.Globalization;
using Microsoft.Extensions.Options;

namespace Genova.Temp.Localization;

public class LocalizationService : ILocalizationService
{
    public LocalizationService(IOptions<RequestLocalizationOptions> localizationOptions)
    {
        var options = localizationOptions.Value;
        SupportedUICultures = options.SupportedUICultures ?? new List<CultureInfo>();
    }

    public CultureInfo CurrentPageCulture { get; set; } = CultureInfo.CurrentUICulture;

    public CultureInfo DefaultCulture => 
        SupportedUICultures.Count > 0 
        ? SupportedUICultures[0] 
        : CultureInfo.CurrentUICulture;

    public IList<CultureInfo> SupportedUICultures { get; }
}