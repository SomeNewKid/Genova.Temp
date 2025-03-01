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

    public CultureInfo CurrentPageCulture { get; set; } = CultureInfo.CurrentCulture;

    public IList<CultureInfo> SupportedUICultures { get; }
}