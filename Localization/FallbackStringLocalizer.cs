using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using System.Resources;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Genova.Temp.Localization;

public class FallbackStringLocalizer : IStringLocalizer
{
    private readonly IStringLocalizer _localizer;
    private readonly CultureInfo _defaultCulture;

    public FallbackStringLocalizer(IStringLocalizer innerLocalizer, CultureInfo defaultCulture)
    {
        _localizer = innerLocalizer;
        _defaultCulture = defaultCulture;
    }

    public LocalizedString this[string name]
    {
        get
        {

            var localizedString = _localizer[name];
            if (localizedString.ResourceNotFound &&
                !IsDefaultOrParentCulture(CultureInfo.CurrentUICulture))
            {
                CultureInfo currentCulture = CultureInfo.CurrentCulture;
                CultureInfo currentUICulture = CultureInfo.CurrentUICulture;

                CultureInfo.CurrentCulture = _defaultCulture;
                CultureInfo.CurrentUICulture = _defaultCulture;

                localizedString = _localizer[name];

                CultureInfo.CurrentCulture = currentCulture;
                CultureInfo.CurrentUICulture = currentUICulture;
            }
            return localizedString;
        }
    }

    public LocalizedString this[string name, params object[] arguments]
    {
        get
        {
            var localizedString = _localizer[name, arguments];
            if (localizedString.ResourceNotFound &&
                !IsDefaultOrParentCulture(CultureInfo.CurrentUICulture))
            {
                CultureInfo currentCulture = CultureInfo.CurrentCulture;
                CultureInfo currentUICulture = CultureInfo.CurrentUICulture;

                CultureInfo.CurrentCulture = _defaultCulture;
                CultureInfo.CurrentUICulture = _defaultCulture;

                localizedString = _localizer[name, arguments];

                CultureInfo.CurrentCulture = currentCulture;
                CultureInfo.CurrentUICulture = currentUICulture;
            }
            return localizedString;
        }
    }

    public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
    {
        return _localizer.GetAllStrings(includeParentCultures);
    }

    public IStringLocalizer WithCulture(CultureInfo culture)
    {
        var resourceManager = new ResourceManager(typeof(SharedResource));
        var assembly = typeof(SharedResource).Assembly;
        var resourceNamesCache = new ResourceNamesCache();
        var loggerFactory = new LoggerFactory();

        var baseName = typeof(SharedResource).FullName ?? "SharedResource";

        var localizer = new ResourceManagerStringLocalizer(
            resourceManager,
            assembly,
            baseName,
            resourceNamesCache,
            loggerFactory.CreateLogger<ResourceManagerStringLocalizer>());

        return new FallbackStringLocalizer(localizer, _defaultCulture);
    }

    private bool IsDefaultOrParentCulture(CultureInfo culture)
    {
        return culture.Equals(_defaultCulture) ||
               (culture.Parent != null && culture.Parent.Equals(_defaultCulture));
    }
}