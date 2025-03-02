using Microsoft.Extensions.Localization;

namespace Genova.Temp.Localization;

public class DatastoreStringLocalizerFactory : IStringLocalizerFactory
{
    public IStringLocalizer Create(Type resourceSource)
    {
        // Create and return an instance of DatastoreStringLocalizer
        return new DatastoreStringLocalizer();
    }

    public IStringLocalizer Create(string baseName, string location)
    {
        // Create and return an instance of DatastoreStringLocalizer
        return new DatastoreStringLocalizer();
    }
}