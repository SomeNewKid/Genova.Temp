using System.Collections.Generic;
using System.Globalization;
using Microsoft.Extensions.Localization;

namespace Genova.Temp.Localization;

public class DatastoreStringLocalizer : IStringLocalizer
{
    private readonly bool _useDummyData;

    public DatastoreStringLocalizer(bool useDummyData = false)
    {
        _useDummyData = useDummyData;
        _useDummyData = true;
    }

    public LocalizedString this[string name]
    {
        get
        {
            if (_useDummyData)
            {
                return new LocalizedString(name, "Text from database", false);
            }
            // Placeholder implementation: return a LocalizedString indicating the resource was not found
            return new LocalizedString(name, string.Empty, true);
        }
    }

    public LocalizedString this[string name, params object[] arguments]
    {
        get
        {
            if (_useDummyData)
            {
                return new LocalizedString(name, "Text from database", false);
            }
            // Placeholder implementation: return a LocalizedString indicating the resource was not found
            return new LocalizedString(name, string.Empty, true);
        }
    }

    public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
    {
        // Placeholder implementation: return an empty list of LocalizedString
        return new List<LocalizedString>();
    }

    public IStringLocalizer WithCulture(CultureInfo culture)
    {
        // Placeholder implementation: return a new instance of DatastoreStringLocalizer with the same _useDummyData value
        return new DatastoreStringLocalizer(_useDummyData);
    }
}