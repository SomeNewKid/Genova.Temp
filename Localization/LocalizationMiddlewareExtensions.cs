using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace Genova.Temp.Localization;

public static class LocalizationMiddlewareExtensions
{
    public static IApplicationBuilder UseLocalization(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<LocalizationMiddleware>();
    }

    public static IServiceCollection ConfigureLocalization(this IServiceCollection services, IConfiguration configuration)
    {
        // Load localization settings from appsettings.json
        var supportedCultures = configuration.GetSection("Localization:SupportedCultures").Get<string[]>() ?? Array.Empty<string>();
        var defaultCulture = supportedCultures.FirstOrDefault() ?? "en";

        // Define supported cultures
        var supportedCultureInfos = supportedCultures.Select(c => new CultureInfo(c)).ToArray();

        // Add localization services
        services.Configure<RequestLocalizationOptions>(options =>
        {
            options.DefaultRequestCulture = new RequestCulture(defaultCulture);
            options.SupportedCultures = supportedCultureInfos;
            options.SupportedUICultures = supportedCultureInfos;
            options.FallBackToParentCultures = true;
            options.FallBackToParentUICultures = true;
        });

        // Register the localization service as scoped
        services.AddScoped<ILocalizationService, LocalizationService>();

        // Register the custom CompositeStringLocalizerFactory
        services.AddSingleton<IStringLocalizerFactory, CompositeStringLocalizerFactory>(sp =>
        {
            var innerFactory = new ResourceManagerStringLocalizerFactory(
                sp.GetRequiredService<IOptions<LocalizationOptions>>(),
                sp.GetRequiredService<ILoggerFactory>());
            var localizationOptions = sp.GetRequiredService<IOptions<RequestLocalizationOptions>>();
            var fallbackFactory = new FallbackStringLocalizerFactory(innerFactory, localizationOptions);
            var datastoreFactory = new DatastoreStringLocalizerFactory();
            var factories = new List<IStringLocalizerFactory> { fallbackFactory, datastoreFactory };
            return new CompositeStringLocalizerFactory(factories);
        });

        return services;
    }
}