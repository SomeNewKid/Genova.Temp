(function () {
    const THEME_KEY = "theme"; // Stores "light", "dark", or "auto"
    const CONTRAST_KEY = "high-contrast"; // Stores "true" or "false"
    const defaultCulture = "en"; // Default language
    const pageLang = (document.documentElement.lang || defaultCulture).toLowerCase();

    // Localized text
    const translations = {
        "en": { legend: "Appearance", light: "Light", dark: "Dark", auto: "Auto", contrast: "High contrast" },
        "zh-hk": { legend: "外觀", light: "淺色", dark: "深色", auto: "自動", contrast: "高對比" },
        "zh": { legend: "外观", light: "浅色", dark: "深色", auto: "自动", contrast: "高对比" },
        "ar": { legend: "المظهر", light: "فاتح", dark: "داكن", auto: "تلقائي", contrast: "تباين عالٍ" },
        "he": { legend: "מראה", light: "בהיר", dark: "כהה", auto: "אוטומטי", contrast: "ניגודיות גבוהה" },
        "fa": { legend: "ظاهر", light: "روشن", dark: "تاریک", auto: "خودکار", contrast: "کنتراست بالا" },
        "ur": { legend: "ظاہری شکل", light: "ہلکا", dark: "گہرا", auto: "خودکار", contrast: "اعلیٰ تضاد" },
        "ja": { legend: "外観", light: "ライト", dark: "ダーク", auto: "自動", contrast: "ハイコントラスト" },
        "th": { legend: "ลักษณะที่ปรากฏ", light: "สว่าง", dark: "มืด", auto: "อัตโนมัติ", contrast: "ความคมชัดสูง" },
        "ko": { legend: "모양", light: "라이트", dark: "다크", auto: "자동", contrast: "고대비" },
        "el": { legend: "Εμφάνιση", light: "Φωτεινό", dark: "Σκοτεινό", auto: "Αυτόματο", contrast: "Υψηλή αντίθεση" },
        "hi": { legend: "रूप", light: "हल्का", dark: "गहरा", auto: "स्वचालित", contrast: "उच्च विपरीतता" }
    };

    const lang = translations[pageLang] || translations["en"];

    // Generate and insert the Theme Selector
    const themeSelectorHTML = `
        <fieldset>
            <legend>${lang.legend}</legend>
            <label><input type="radio" name="theme" value="light"> ${lang.light}</label>
            <label><input type="radio" name="theme" value="dark"> ${lang.dark}</label>
            <label><input type="radio" name="theme" value="auto"> ${lang.auto}</label>
            <label><input type="checkbox" name="high-contrast"> ${lang.contrast}</label>
        </fieldset>
    `;

    const themeContainer = document.querySelector("[data-component='theme-selector']");
    if (themeContainer) {
        themeContainer.innerHTML = themeSelectorHTML;
    }

    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function applyTheme(theme, contrast) {
        let themeValue = theme;

        if (theme === "auto") {
            themeValue = getSystemTheme(); // Apply detected system theme
        }

        if (contrast === "true") {
            themeValue += " high-contrast"; // Append contrast mode
        }

        document.documentElement.setAttribute("data-theme", themeValue);
    }

    function saveTheme(theme) {
        localStorage.setItem(THEME_KEY, theme);
    }

    function saveContrast(isEnabled) {
        localStorage.setItem(CONTRAST_KEY, isEnabled);
    }

    function updateTheme() {
        const selectedTheme = document.querySelector("[name='theme']:checked")?.value || "auto";
        const isHighContrast = document.querySelector("[name='high-contrast']")?.checked ? "true" : "false";

        saveTheme(selectedTheme);
        saveContrast(isHighContrast);
        applyTheme(selectedTheme, isHighContrast);
    }

    // Load saved settings
    const savedTheme = localStorage.getItem(THEME_KEY) || "auto";
    const savedContrast = localStorage.getItem(CONTRAST_KEY) || "false";

    applyTheme(savedTheme, savedContrast);

    // Ensure correct UI state
    if (themeContainer) {
        const themeInput = themeContainer.querySelector(`[value="${savedTheme}"]`);
        const contrastInput = themeContainer.querySelector(`[name="high-contrast"]`);

        if (themeInput) {
            themeInput.checked = true;
        }
        if (contrastInput) {
            contrastInput.checked = savedContrast === "true";
        }

        // Listen for theme and contrast changes
        themeContainer.addEventListener("change", updateTheme);
    }

    // Listen for system theme changes when "Auto" is active
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (localStorage.getItem(THEME_KEY) === "auto") {
            applyTheme("auto", localStorage.getItem(CONTRAST_KEY) || "false");
        }
    });
})();





(function () {
    const STORAGE_READING_MODE = "reading-options";
    const STORAGE_TEXT_SIZE = "text-size";
    const FONT_STEP = 1.1;
    const MIN_SIZE = 0.8;
    const MAX_SIZE = 1.5;

    const defaultCulture = "en";
    const pageLang = (document.documentElement.lang || defaultCulture).toLowerCase();

    // Localized text
    const translations = {
        "en": { legend: "Reading options", textSize: "Text size", decrease: "A–", increase: "A+", readingMode: "Reading mode" },
        "zh-hk": { legend: "閱讀選項", textSize: "文字大小", decrease: "A–", increase: "A+", readingMode: "閱讀模式" },
        "zh": { legend: "阅读选项", textSize: "文字大小", decrease: "A–", increase: "A+", readingMode: "阅读模式" },
        "ar": { legend: "خيارات القراءة", textSize: "حجم النص", decrease: "A–", increase: "A+", readingMode: "وضع القراءة" },
        "he": { legend: "אפשרויות קריאה", textSize: "גודל טקסט", decrease: "A–", increase: "A+", readingMode: "מצב קריאה" },
        "fa": { legend: "گزینه‌های خواندن", textSize: "اندازه متن", decrease: "A–", increase: "A+", readingMode: "حالت مطالعه" },
        "ur": { legend: "پڑھنے کے اختیارات", textSize: "متن کا سائز", decrease: "A–", increase: "A+", readingMode: "مطالعہ کا موڈ" },
        "ja": { legend: "読書オプション", textSize: "文字サイズ", decrease: "A–", increase: "A+", readingMode: "読書モード" },
        "th": { legend: "ตัวเลือกการอ่าน", textSize: "ขนาดตัวอักษร", decrease: "A–", increase: "A+", readingMode: "โหมดอ่าน" },
        "ko": { legend: "읽기 옵션", textSize: "글자 크기", decrease: "A–", increase: "A+", readingMode: "읽기 모드" },
        "el": { legend: "Επιλογές ανάγνωσης", textSize: "Μέγεθος κειμένου", decrease: "A–", increase: "A+", readingMode: "Λειτουργία ανάγνωσης" },
        "hi": { legend: "पढ़ने के विकल्प", textSize: "पाठ का आकार", decrease: "A–", increase: "A+", readingMode: "पढ़ने का मोड" }
    };

    const lang = translations[pageLang] || translations["en"];

    // Generate and insert the Reading Options component
    const readingOptionsHTML = `
        <fieldset>
            <legend>${lang.legend}</legend>
            <div>
                <span>${lang.textSize}</span>
                <button type="button" data-action="decrease-font">${lang.decrease}</button>
                <button type="button" data-action="increase-font">${lang.increase}</button>
            </div>
            <label><input type="checkbox" name="reading-mode"> ${lang.readingMode}</label>
        </fieldset>
    `;

    const readingContainer = document.querySelector("[data-component='reading-options']");
    if (readingContainer) {
        readingContainer.innerHTML = readingOptionsHTML;
    }

    function updateReadingMode() {
        const checkbox = document.querySelector("[name='reading-mode']");
        if (checkbox.checked) {
            document.body.setAttribute("data-reading-mode", "on");
            localStorage.setItem(STORAGE_READING_MODE, "on");
        } else {
            document.body.removeAttribute("data-reading-mode");
            localStorage.removeItem(STORAGE_READING_MODE);
        }
    }

    function getFontSize() {
        return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("font-size")) / 16;
    }

    function setFontSize(scale) {
        document.documentElement.style.fontSize = `${scale * 16}px`;
        localStorage.setItem(STORAGE_TEXT_SIZE, scale.toFixed(2));
        updateButtonState();
    }

    function updateButtonState() {
        const currentSize = getFontSize();
        const decreaseButton = document.querySelector("[data-action='decrease-font']");
        const increaseButton = document.querySelector("[data-action='increase-font']");

        if (decreaseButton && increaseButton) {
            decreaseButton.disabled = currentSize <= MIN_SIZE;
            increaseButton.disabled = currentSize >= MAX_SIZE;
        }
    }

    function adjustFontSize(direction) {
        let currentSize = getFontSize();

        if (direction === "increase" && currentSize < MAX_SIZE) {
            setFontSize(currentSize * FONT_STEP);
        } else if (direction === "decrease" && currentSize > MIN_SIZE) {
            setFontSize(currentSize / FONT_STEP);
        }
    }

    // Load saved settings on page load
    const savedReadingMode = localStorage.getItem(STORAGE_READING_MODE);
    const savedSize = parseFloat(localStorage.getItem(STORAGE_TEXT_SIZE));

    if (savedReadingMode === "on") {
        document.body.setAttribute("data-reading-mode", "on");
        const checkbox = document.querySelector("[name='reading-mode']");
        if (checkbox) checkbox.checked = true;
    }

    if (!isNaN(savedSize) && savedSize >= MIN_SIZE && savedSize <= MAX_SIZE) {
        setFontSize(savedSize);
    } else {
        updateButtonState();
    }

    // Attach event listeners
    if (readingContainer) {
        readingContainer.addEventListener("change", (event) => {
            if (event.target.matches("[name='reading-mode']")) {
                updateReadingMode();
            }
        });

        readingContainer.addEventListener("click", (event) => {
            if (event.target.matches("[data-action='increase-font']")) {
                adjustFontSize("increase");
            } else if (event.target.matches("[data-action='decrease-font']")) {
                adjustFontSize("decrease");
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
