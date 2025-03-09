import { getPageLanguage, getTranslation } from "../utilities/shared";

const THEME_KEY = "theme";
const CONTRAST_KEY = "high-contrast";

// Localized text dictionary
const translations: Record<string, { legend: string; auto: string; light: string; dark: string; highContrast: string; }> = {
    "en": { legend: "Theme options", auto: "Auto", light: "Light", dark: "Dark", highContrast: "High contrast" },
    "zh-hk": { legend: "主題選項", auto: "自動", light: "淺色", dark: "深色", highContrast: "高對比" },
    "zh": { legend: "主题选项", auto: "自动", light: "浅色", dark: "深色", highContrast: "高对比" },
    "ar": { legend: "خيارات السمة", auto: "تلقائي", light: "فاتح", dark: "داكن", highContrast: "تباين عالٍ" }, // RTL
    "he": { legend: "אפשרויות נושא", auto: "אוטומטי", light: "בהיר", dark: "כהה", highContrast: "ניגודיות גבוהה" }, // RTL
    "fa": { legend: "گزینه‌های تم", auto: "خودکار", light: "روشن", dark: "تاریک", highContrast: "کنتراست بالا" }, // RTL
    "ur": { legend: "تھیم کے اختیارات", auto: "خودکار", light: "ہلکا", dark: "گہرا", highContrast: "زیادہ تضاد" }, // RTL
    "ja": { legend: "テーマオプション", auto: "自動", light: "ライト", dark: "ダーク", highContrast: "高コントラスト" },
    "th": { legend: "ตัวเลือกธีม", auto: "อัตโนมัติ", light: "สว่าง", dark: "มืด", highContrast: "ความคมชัดสูง" },
    "ko": { legend: "테마 옵션", auto: "자동", light: "라이트", dark: "다크", highContrast: "고대비" },
    "el": { legend: "Επιλογές θέματος", auto: "Αυτόματο", light: "Φωτεινό", dark: "Σκοτεινό", highContrast: "Υψηλή αντίθεση" },
    "hi": { legend: "थीम विकल्प", auto: "स्वचालित", light: "हल्का", dark: "गहरा", highContrast: "उच्च कंट्रास्ट" }
};

// Get the localized text based on page language
const lang = getTranslation(translations);

// Generate and insert the Theme Switcher component
export function initializeThemeSwitcher(): void {
    const themeContainer = document.querySelector("[data-component='theme-selector']");
    if (!themeContainer) return;

    themeContainer.innerHTML = `
        <summary>${lang.legend}</summary>
        <div>
            <label><input type="radio" name="theme" value="auto"> ${lang.auto}</label>
            <label><input type="radio" name="theme" value="light"> ${lang.light}</label>
            <label><input type="radio" name="theme" value="dark"> ${lang.dark}</label>
            <label><input type="checkbox" name="high-contrast"> ${lang.highContrast}</label>
        </div>
    `;

    attachEventListeners(themeContainer);
    loadSavedTheme();
}

// Attach event listeners to handle user interactions
function attachEventListeners(themeContainer: Element): void {
    themeContainer.addEventListener("change", () => updateTheme());
}

// Apply the selected theme to the document
function applyTheme(theme: string, contrast: string): void {
    let themeValue = theme === "auto" ? getSystemTheme() : theme;
    if (contrast === "true") themeValue += " high-contrast";
    document.documentElement.setAttribute("data-theme", themeValue);
}

// Get the system's preferred theme
function getSystemTheme(): string {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Save the selected theme in localStorage
function saveTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme);
}

// Save high contrast preference
function saveContrast(isEnabled: string): void {
    localStorage.setItem(CONTRAST_KEY, isEnabled);
}

// Update the theme based on user selection
function updateTheme(): void {
    const selectedTheme = (document.querySelector("[name='theme']:checked") as HTMLInputElement)?.value || "auto";
    const isHighContrast = (document.querySelector("[name='high-contrast']") as HTMLInputElement)?.checked ? "true" : "false";

    saveTheme(selectedTheme);
    saveContrast(isHighContrast);
    applyTheme(selectedTheme, isHighContrast);
}

// Load stored preferences and apply them
function loadSavedTheme(): void {
    const savedTheme = localStorage.getItem(THEME_KEY) || "auto";
    const savedContrast = localStorage.getItem(CONTRAST_KEY) || "false";

    applyTheme(savedTheme, savedContrast);

    const themeContainer = document.querySelector("[data-component='theme-selector']");
    if (themeContainer) {
        const themeInput = themeContainer.querySelector(`[value="${savedTheme}"]`) as HTMLInputElement;
        const contrastInput = themeContainer.querySelector(`[name="high-contrast"]`) as HTMLInputElement;
        if (themeInput) themeInput.checked = true;
        if (contrastInput) contrastInput.checked = savedContrast === "true";
    }

    // Listen for system theme changes when "Auto" is selected
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (localStorage.getItem(THEME_KEY) === "auto") {
            applyTheme("auto", localStorage.getItem(CONTRAST_KEY) || "false");
        }
    });
}
