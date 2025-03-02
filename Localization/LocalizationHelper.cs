using System.Globalization;
using System.Collections.Generic;
using System.Linq;

namespace Genova.Temp.Localization;

public static class LocalizationHelper
{
    public static string GetLocalizedValue(string[,] localizedValues, string defaultCulture = "en")
    {
        var currentCulture = CultureInfo.CurrentUICulture.Name;
        var neutralCulture = CultureInfo.CurrentUICulture.TwoLetterISOLanguageName;

        // Convert 2D array to dictionary for easy lookup
        var localizationDict = Enumerable.Range(0, localizedValues.GetLength(0))
            .ToDictionary(i => localizedValues[i, 0], i => localizedValues[i, 1]);

        // First try exact match, then neutral match, then fallback to default culture
        return localizationDict.TryGetValue(currentCulture, out var value)
            ? value
            : localizationDict.TryGetValue(neutralCulture, out value)
                ? value
                : localizationDict.GetValueOrDefault(defaultCulture, $"[Missing translation: {defaultCulture}]");
    }
}
