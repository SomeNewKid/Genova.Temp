(function () {
    console.log("Starting up");

    const THEME_KEY = "theme"; // Key used in localStorage
    const defaultCulture = "en"; // Fallback if `lang` is missing
    const pageLang = (document.documentElement.lang || defaultCulture).toLowerCase();

    // Localized text for different languages
    const translations = {
        "en": { legend: "Theme", light: "Light", dark: "Dark", auto: "Automatic" },
        "zh-hk": { legend: "主題", light: "淺色", dark: "深色", auto: "自動" },
        "zh": { legend: "主题", light: "浅色", dark: "深色", auto: "自动" },
        "ar": { legend: "السمة", light: "فاتح", dark: "داكن", auto: "تلقائي" },
        "he": { legend: "ערכת נושא", light: "בהיר", dark: "כהה", auto: "אוטומטי" },
        "fa": { legend: "تم", light: "روشن", dark: "تاریک", auto: "خودکار" },
        "ur": { legend: "تھیم", light: "ہلکا", dark: "گہرا", auto: "خودکار" },
        "ja": { legend: "テーマ", light: "ライト", dark: "ダーク", auto: "自動" },
        "th": { legend: "ธีม", light: "สว่าง", dark: "มืด", auto: "อัตโนมัติ" },
        "ko": { legend: "테마", light: "라이트", dark: "다크", auto: "자동" },
        "el": { legend: "Θέμα", light: "Φωτεινό", dark: "Σκοτεινό", auto: "Αυτόματο" },
        "hi": { legend: "थीम", light: "हल्का", dark: "गहरा", auto: "स्वचालित" }
    };

    // Get translations for the detected language, fallback to English
    const lang = translations[pageLang] || translations[defaultCulture.toLowerCase()];

    // Generate Theme Selector HTML
    const themeSelectorHTML = `
        <fieldset>
            <legend>${lang.legend}</legend>
            <label><input type="radio" name="theme" value="light"> ${lang.light}</label>
            <label><input type="radio" name="theme" value="dark"> ${lang.dark}</label>
            <label><input type="radio" name="theme" value="auto"> ${lang.auto}</label>
        </fieldset>
    `;

    // Insert Theme Selector only if JavaScript is enabled
    const themeContainer = document.querySelector("[data-component='theme-selector']");
    if (themeContainer) {
        themeContainer.innerHTML = themeSelectorHTML;
    }

    function setTheme(theme, save = true) {
        if (theme === "auto") {
            localStorage.removeItem(THEME_KEY);
            theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        } else if (save) {
            localStorage.setItem(THEME_KEY, theme);
        }

        document.documentElement.setAttribute("data-theme", theme);

        if (themeContainer) {
            const themeInput = themeContainer.querySelector(`[value="auto"]`);
            if (localStorage.getItem(THEME_KEY) === null && themeInput) {
                themeInput.checked = true;
            } else {
                const selectedInput = themeContainer.querySelector(`[value="${theme}"]`);
                if (selectedInput) {
                    selectedInput.checked = true;
                }
            }
        }
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    setTheme(savedTheme ? savedTheme : "auto", false);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (localStorage.getItem(THEME_KEY) === null) {
            setTheme("auto");
        }
    });

    if (themeContainer) {
        themeContainer.addEventListener("change", (event) => {
            if (event.target.matches("[name='theme']")) {
                setTheme(event.target.value);
            }
        });
    }
})();




document.addEventListener("DOMContentLoaded", function () {


    // Localization dictionary
    var localizedTexts = {
        "en": "Hello from JavaScript",
        "zh": "你好，來自瀏覽器的問候", // Simplified & fallback for Traditional
        "zh-hk": "你好，來自瀏覽器的問候", // Traditional Chinese (Hong Kong)
        "ar": "مرحبًا من المتصفح", // Arabic
        "he": "שלום מהדפדפן", // Hebrew
        "fa": "سلام از مرورگر", // Persian
        "ur": "براؤزر سے سلام", // Urdu
        "ja": "ブラウザからこんにちは", // Japanese
        "th": "สวัสดีจากเบราว์เซอร์", // Thai
        "ko": "브라우저에서 안녕하세요", // Korean
        "el": "Γεια σας από το πρόγραμμα περιήγησης", // Greek
        "hi": "ब्राउज़र से नमस्ते" // Hindi
    };

    // Helper function to get the localized text
    function getLocalizedText(dictionary, defaultCulture = "en") {
        // Extract the language from <html lang="...">
        var pageLang = document.documentElement.lang || defaultCulture;

        // Normalize to lowercase for case-insensitive matching
        pageLang = pageLang.toLowerCase();

        // First try exact match, then try base language (e.g., "zh" for "zh-HK"), then default
        return dictionary[pageLang] || dictionary[pageLang.split('-')[0]] || dictionary[defaultCulture];
    }

    // Find the element with ID "target-js"
    var targetElement = document.getElementById("target-js");

    // Check if the element exists to avoid errors
    if (targetElement) {
        // Get the localized text based on the page language
        targetElement.textContent = getLocalizedText(localizedTexts);
    } else {
        console.error("Element with ID 'target-js' not found.");
    }
});
