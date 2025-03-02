using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System.Globalization;

namespace Genova.Temp.Localization;

public class FallbackStringLocalizerFactory : IStringLocalizerFactory
{
    private readonly IStringLocalizerFactory _innerFactory;
    private readonly CultureInfo _defaultCulture;

    public FallbackStringLocalizerFactory(IStringLocalizerFactory innerFactory, IOptions<RequestLocalizationOptions> localizationOptions)
    {
        _innerFactory = innerFactory;
        _defaultCulture = localizationOptions.Value.DefaultRequestCulture.Culture;
    }

    public IStringLocalizer Create(Type resourceSource)
    {
        var localizer = _innerFactory.Create(resourceSource);
        return new FallbackStringLocalizer(localizer, _defaultCulture);
    }

    public IStringLocalizer Create(string baseName, string location)
    {
        var localizer = _innerFactory.Create(baseName, location);
        return new FallbackStringLocalizer(localizer, _defaultCulture);
    }
}