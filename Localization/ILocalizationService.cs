﻿using System.Globalization;

namespace Genova.Temp.Localization;

public interface ILocalizationService
{
    CultureInfo CurrentPageCulture { get; set; }

    CultureInfo DefaultCulture { get; }

    IList<CultureInfo> SupportedUICultures { get; }
}