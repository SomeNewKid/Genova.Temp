using System.Collections.Generic;
using Microsoft.Extensions.Localization;

namespace Genova.Temp.Localization;

public class CompositeStringLocalizerFactory : IStringLocalizerFactory
{
    private readonly IEnumerable<IStringLocalizerFactory> _factories;

    public CompositeStringLocalizerFactory(IEnumerable<IStringLocalizerFactory> factories)
    {
        _factories = factories;
    }

    public IStringLocalizer Create(Type resourceSource)
    {
        var localizers = new List<IStringLocalizer>();
        foreach (var factory in _factories)
        {
            localizers.Add(factory.Create(resourceSource));
        }
        return new CompositeStringLocalizer(localizers);
    }

    public IStringLocalizer Create(string baseName, string location)
    {
        var localizers = new List<IStringLocalizer>();
        foreach (var factory in _factories)
        {
            localizers.Add(factory.Create(baseName, location));
        }
        return new CompositeStringLocalizer(localizers);
    }
}