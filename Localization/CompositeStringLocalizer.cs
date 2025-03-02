using System.Collections.Generic;
using System.Globalization;
using Microsoft.Extensions.Localization;

namespace Genova.Temp.Localization;

public class CompositeStringLocalizer : IStringLocalizer
{
    private readonly IEnumerable<IStringLocalizer> _localizers;

    public CompositeStringLocalizer(IEnumerable<IStringLocalizer> localizers)
    {
        _localizers = localizers;
    }

    public LocalizedString this[string name]
    {
        get
        {
            foreach (var localizer in _localizers)
            {
                var localizedString = localizer[name];
                if (!localizedString.ResourceNotFound)
                {
                    return localizedString;
                }
            }
            return new LocalizedString(name, name, true);
        }
    }

    public LocalizedString this[string name, params object[] arguments]
    {
        get
        {
            foreach (var localizer in _localizers)
            {
                var localizedString = localizer[name, arguments];
                if (!localizedString.ResourceNotFound)
                {
                    return localizedString;
                }
            }
            return new LocalizedString(name, name, true);
        }
    }

    public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
    {
        var allStrings = new List<LocalizedString>();
        foreach (var localizer in _localizers)
        {
            allStrings.AddRange(localizer.GetAllStrings(includeParentCultures));
        }
        return allStrings;
    }

    public IStringLocalizer WithCulture(CultureInfo culture)
    {
        var localizersWithCulture = new List<IStringLocalizer>();
        foreach (var localizer in _localizers)
        {
            // Create a new instance of each localizer with the specified culture
            var localizerWithCulture = CreateLocalizerWithCulture(localizer, culture);
            localizersWithCulture.Add(localizerWithCulture);
        }
        return new CompositeStringLocalizer(localizersWithCulture);
    }

    private IStringLocalizer CreateLocalizerWithCulture(IStringLocalizer localizer, CultureInfo culture)
    {
        // Implement logic to create a new instance of the localizer with the specified culture
        // This is a placeholder implementation and should be replaced with actual logic
        return localizer;
    }
}