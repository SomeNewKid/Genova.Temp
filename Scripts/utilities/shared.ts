// Default Culture Setting
export const DEFAULT_CULTURE = "en";

// Get Current Page Language
export function getPageLanguage(): string {
    return (document.documentElement.lang || DEFAULT_CULTURE).toLowerCase();
}

// Generic Translation Helper
export function getTranslation<T>(translations: Record<string, T>, defaultLang: string = DEFAULT_CULTURE): T {
    const pageLang = getPageLanguage();
    return translations[pageLang] || translations[pageLang.split('-')[0]] || translations[defaultLang];
}
