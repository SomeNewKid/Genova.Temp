export class Localization {
    private static defaultCulture = "en";

    private static localizedTexts: Record<string, string> = {
        "en": "Hello from JavaScript",
        "zh": "你好，來自瀏覽器的問候",
        "zh-hk": "你好，來自瀏覽器的問候",
        "ar": "مرحبًا من المتصفح",
        "he": "שלום מהדפדפן",
        "fa": "سلام از مرورگر",
        "ur": "براؤزر سے سلام",
        "ja": "ブラウザからこんにちは",
        "th": "สวัสดีจากเบราว์เซอร์",
        "ko": "브라우저에서 안녕하세요",
        "el": "Γεια σας από το πρόγραμμα περιήγησης",
        "hi": "ब्राउज़र से नमस्ते"
    };

    private static getLocalizedText(dictionary: Record<string, string>, defaultLang: string = "en"): string {
        let pageLang = document.documentElement.lang || defaultLang;
        pageLang = pageLang.toLowerCase();

        return dictionary[pageLang] || dictionary[pageLang.split('-')[0]] || dictionary[defaultLang];
    }

    public static setLocalizedText(elementId: string): void {
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            targetElement.textContent = this.getLocalizedText(this.localizedTexts);
        }
    }
}

// Initialize localization
export function initializeLocalization() {
    Localization.setLocalizedText("target-js");
}
