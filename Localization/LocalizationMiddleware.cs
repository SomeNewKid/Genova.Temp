using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace Genova.Temp.Localization;

public class LocalizationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly RequestLocalizationOptions _localizationOptions;
    private readonly string _defaultCulture;
    private CultureInfo _culture = CultureInfo.CurrentCulture;

    public LocalizationMiddleware(RequestDelegate next, IOptions<RequestLocalizationOptions> localizationOptions)
    {
        _next = next;
        _localizationOptions = localizationOptions.Value;
        _defaultCulture = _localizationOptions.DefaultRequestCulture.Culture.Name;
    }

    public async Task Invoke(HttpContext context, ILocalizationService localizationService)
    {
        string? path = context.Request.Path.Value?.Trim('/');
        string[] slugs = path?.Split('/') ?? Array.Empty<string>();
        string? cultureSlug = slugs?.FirstOrDefault();
        List<string>? supportedCultures = _localizationOptions.SupportedCultures?.Select(c => c.Name).ToList();
         
        CultureInfo cultureToSet = _localizationOptions.DefaultRequestCulture.Culture;

        if (!string.IsNullOrEmpty(cultureSlug) && supportedCultures != null)
        {
            var matchingCulture = supportedCultures
                .FirstOrDefault(c => string.Equals(c, cultureSlug, StringComparison.OrdinalIgnoreCase));

            if (matchingCulture != null)
            {
                cultureToSet = new CultureInfo(matchingCulture);

                // Remove the culture slug from the path
                if (slugs != null)
                {
                    path = "/" + string.Join('/', slugs.Skip(1));
                    context.Request.Path = new PathString(path);
                }
            }
        }

        localizationService.CurrentPagePath = path ?? "";

        localizationService.CurrentPageCulture = cultureToSet;

        // A specific culture is required for localization
        // For example, the "zh" neutral culture will serialize currency as ¤1,234.56 ('¤' used for all neutral cultures, even "en")
        // Whereas, the "zh-CN" specific culture will serialize currency as ¥1,234.56
        var specificCulture = GetSpecificCultureInfo(cultureToSet);
        CultureInfo.CurrentCulture = specificCulture;
        CultureInfo.CurrentUICulture = specificCulture;

        var requestCulture = new RequestCulture(cultureToSet);
        var customRequestCultureProvider = new LocalizationRequestCultureProvider(cultureToSet);
        context.Features.Set<IRequestCultureFeature>(new RequestCultureFeature(requestCulture, customRequestCultureProvider));

        await _next(context);
    }

    private static CultureInfo GetSpecificCultureInfo(CultureInfo culture)
    {
        if (!culture.IsNeutralCulture)
        {
            return culture; // Already a specific culture
        }

        // ✅ Predefined Mappings of Common Neutral Cultures
        var cultureMappings = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { "af", "af-ZA" }, // Afrikaans (South Africa)
            { "am", "am-ET" }, // Amharic (Ethiopia)
            { "ar", "ar-SA" }, // Arabic (Saudi Arabia)
            { "bg", "bg-BG" }, // Bulgarian (Bulgaria)
            { "bn", "bn-BD" }, // Bengali (Bangladesh)
            { "cs", "cs-CZ" }, // Czech (Czech Republic)
            { "da", "da-DK" }, // Danish (Denmark)
            { "de", "de-DE" }, // German (Germany)
            { "el", "el-GR" }, // Greek (Greece)
            { "en", "en-AU" }, // English (Australia) (en-US for United States)
            { "es", "es-ES" }, // Spanish (Spain)
            { "et", "et-EE" }, // Estonian (Estonia)
            { "fa", "fa-IR" }, // Persian (Iran)
            { "fi", "fi-FI" }, // Finnish (Finland)
            { "fr", "fr-FR" }, // French (France)
            { "gu", "gu-IN" }, // Gujarati (India)
            { "ha", "ha-NG" }, // Hausa (Nigeria)
            { "he", "he-IL" }, // Hebrew (Israel)
            { "hi", "hi-IN" }, // Hindi (India)
            { "hr", "hr-HR" }, // Croatian (Croatia)
            { "hu", "hu-HU" }, // Hungarian (Hungary)
            { "id", "id-ID" }, // Indonesian (Indonesia)
            { "ig", "ig-NG" }, // Igbo (Nigeria)
            { "it", "it-IT" }, // Italian (Italy)
            { "ja", "ja-JP" }, // Japanese (Japan)
            { "km", "km-KH" }, // Khmer (Cambodia)
            { "kn", "kn-IN" }, // Kannada (India)
            { "ko", "ko-KR" }, // Korean (South Korea)
            { "lt", "lt-LT" }, // Lithuanian (Lithuania)
            { "lo", "lo-LA" }, // Lao (Laos)
            { "lv", "lv-LV" }, // Latvian (Latvia)
            { "ml", "ml-IN" }, // Malayalam (India)
            { "mr", "mr-IN" }, // Marathi (India)
            { "my", "my-MM" }, // Burmese (Myanmar)
            { "nl", "nl-NL" }, // Dutch (Netherlands)
            { "or", "or-IN" }, // Odia (India)
            { "pa", "pa-IN" }, // Punjabi (India)
            { "pl", "pl-PL" }, // Polish (Poland)
            { "pt", "pt-BR" }, // Portuguese (Brazil)
            { "ro", "ro-RO" }, // Romanian (Romania)
            { "ru", "ru-RU" }, // Russian (Russia)
            { "si", "si-LK" }, // Sinhala (Sri Lanka)
            { "sk", "sk-SK" }, // Slovak (Slovakia)
            { "sl", "sl-SI" }, // Slovenian (Slovenia)
            { "so", "so-SO" }, // Somali (Somalia)
            { "sq", "sq-AL" }, // Albanian (Albania)
            { "sr", "sr-RS" }, // Serbian (Serbia)
            { "sw", "sw-KE" }, // Swahili (Kenya)
            { "ta", "ta-IN" }, // Tamil (India)
            { "te", "te-IN" }, // Telugu (India)
            { "th", "th-TH" }, // Thai (Thailand)
            { "tr", "tr-TR" }, // Turkish (Turkey)
            { "uk", "uk-UA" }, // Ukrainian (Ukraine)
            { "ur", "ur-PK" }, // Urdu (Pakistan)
            { "vi", "vi-VN" }, // Vietnamese (Vietnam)
            { "xh", "xh-ZA" }, // Xhosa (South Africa)
            { "yo", "yo-NG" }, // Yoruba (Nigeria)
            { "zh", "zh-CN" }, // Chinese (China)
            { "zu", "zu-ZA" }  // Zulu (South Africa)
        };

        // ✅ Return Specific Culture from Dictionary (if exists)
        if (cultureMappings.TryGetValue(culture.Name, out var specificCulture))
        {
            return new CultureInfo(specificCulture);
        }

        // ✅ Fallback: Let .NET Pick a Default Specific Culture
        try
        {
            return CultureInfo.CreateSpecificCulture(culture.Name);
        }
        catch
        {
            return culture; // return the neutral culture as-is
        }
    }
}