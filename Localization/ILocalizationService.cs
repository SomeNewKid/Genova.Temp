using System.Globalization;

namespace Genova.Temp.Localization;

public interface ILocalizationService
{
    CultureInfo CurrentPageCulture { get; set; }

    IList<CultureInfo> SupportedUICultures { get; }
}