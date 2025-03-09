(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Scripts/components/localization.ts":
/*!********************************************!*\
  !*** ./Scripts/components/localization.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Localization: () => (/* binding */ Localization),
/* harmony export */   initializeLocalization: () => (/* binding */ initializeLocalization)
/* harmony export */ });
class Localization {
    static getLocalizedText(dictionary, defaultLang = "en") {
        let pageLang = document.documentElement.lang || defaultLang;
        pageLang = pageLang.toLowerCase();
        return dictionary[pageLang] || dictionary[pageLang.split('-')[0]] || dictionary[defaultLang];
    }
    static setLocalizedText(elementId) {
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            targetElement.textContent = this.getLocalizedText(this.localizedTexts);
        }
    }
}
Localization.defaultCulture = "en";
Localization.localizedTexts = {
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
// Initialize localization
function initializeLocalization() {
    Localization.setLocalizedText("target-js");
}


/***/ }),

/***/ "./Scripts/components/navigationDrawer.ts":
/*!************************************************!*\
  !*** ./Scripts/components/navigationDrawer.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeNavigationDrawer: () => (/* binding */ initializeNavigationDrawer)
/* harmony export */ });
document.body.classList.add('js-enabled');
const defaultCulture = "en";
const pageLang = (document.documentElement.lang || defaultCulture).toLowerCase();
// Localized text dictionary for the menu button
const translations = {
    "en": "Menu",
    "zh-hk": "選單", "zh": "菜单",
    "ar": "قائمة", "he": "תפריט",
    "fa": "منو", "ur": "مینو",
    "ja": "メニュー", "th": "เมนู",
    "ko": "메뉴", "el": "Μενού",
    "hi": "मेनू"
};
// Get localized text for the menu button
const menuText = translations[pageLang] || translations["en"];
// Initialize Navigation Drawer
function initializeNavigationDrawer() {
    createMenuButton();
    attachEventListeners();
}
// Create and insert the menu button
function createMenuButton() {
    const menuButton = document.createElement("div");
    menuButton.id = "hamburger";
    const isRTL = document.documentElement.dir === "rtl";
    const menuIcon = `<span class="menu-icon"><span></span><span></span><span></span></span>`;
    const menuTextHtml = `<span class="menu-text">${menuText}</span>`;
    menuButton.innerHTML = isRTL ? menuIcon + menuTextHtml : menuTextHtml + menuIcon;
    const pageArea = document.querySelector(".page");
    if (pageArea) {
        pageArea.appendChild(menuButton);
    }
    else {
        document.body.appendChild(menuButton);
    }
}
// Attach event listeners
function attachEventListeners() {
    const menuButton = document.getElementById("hamburger");
    if (!menuButton)
        return;
    menuButton.addEventListener("click", toggleDrawer);
    window.addEventListener("scroll", checkScroll);
}
// Ensure an overlay exists when opening the drawer
function ensureOverlay() {
    if (!document.getElementById("overlay")) {
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.addEventListener("click", closeDrawer);
        document.body.appendChild(overlay);
    }
}
// Open the navigation drawer
function openDrawer() {
    ensureOverlay();
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.body.dataset.scrollY = scrollY.toString();
    document.body.style.top = `-${scrollY}px`;
    const menuButton = document.getElementById("hamburger");
    if (menuButton) {
        menuButton.style.top = `${scrollY}px`;
    }
    document.body.classList.add("drawer-open", "scroll-lock", "overlayed");
}
// Close the navigation drawer
function closeDrawer() {
    const scrollY = document.body.dataset.scrollY || "0";
    document.body.classList.remove("drawer-open", "scroll-lock", "overlayed");
    const menuButton = document.getElementById("hamburger");
    if (menuButton) {
        menuButton.style.top = "0";
    }
    document.body.style.removeProperty("top");
    window.scrollTo(0, parseInt(scrollY, 10));
}
// Toggle the drawer open/close state
function toggleDrawer() {
    if (document.body.classList.contains("drawer-open")) {
        closeDrawer();
    }
    else {
        openDrawer();
    }
}
// Apply scroll detection class
function checkScroll() {
    if (window.scrollY > 0) {
        document.body.classList.add("scrolled");
    }
    else {
        document.body.classList.remove("scrolled");
    }
}


/***/ }),

/***/ "./Scripts/components/readingOptions.ts":
/*!**********************************************!*\
  !*** ./Scripts/components/readingOptions.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeReadingOptions: () => (/* binding */ initializeReadingOptions)
/* harmony export */ });
const STORAGE_READING_MODE = "reading-options";
const STORAGE_TEXT_SIZE = "text-size";
const FONT_STEP = 1.1;
const MIN_SIZE = 0.8;
const MAX_SIZE = 1.5;
const defaultCulture = "en";
const pageLang = (document.documentElement.lang || defaultCulture).toLowerCase();
// Localized text dictionary
const translations = {
    "en": { legend: "Reading options", textSize: "Text size", decrease: "A–", increase: "A+", readingMode: "Reading mode" },
    "zh-hk": { legend: "閱讀選項", textSize: "文字大小", decrease: "字–", increase: "字+", readingMode: "閱讀模式" },
    "zh": { legend: "阅读选项", textSize: "文字大小", decrease: "字–", increase: "字+", readingMode: "阅读模式" },
    "ar": { legend: "خيارات القراءة", textSize: "حجم النص", decrease: "–أ", increase: "+أ", readingMode: "وضع القراءة" }, // RTL
    "he": { legend: "אפשרויות קריאה", textSize: "גודל טקסט", decrease: "–א", increase: "+א", readingMode: "מצב קריאה" }, // RTL
    "fa": { legend: "گزینه‌های خواندن", textSize: "اندازه متن", decrease: "–ا", increase: "+ا", readingMode: "حالت مطالعه" }, // RTL
    "ur": { legend: "پڑھنے کے اختیارات", textSize: "متن کا سائز", decrease: "–ا", increase: "+ا", readingMode: "مطالعہ کا موڈ" }, // RTL
    "ja": { legend: "読書オプション", textSize: "文字サイズ", decrease: "あ–", increase: "あ+", readingMode: "読書モード" },
    "th": { legend: "ตัวเลือกการอ่าน", textSize: "ขนาดตัวอักษร", decrease: "ก–", increase: "ก+", readingMode: "โหมดอ่าน" },
    "ko": { legend: "읽기 옵션", textSize: "글자 크기", decrease: "가–", increase: "가+", readingMode: "읽기 모드" },
    "el": { legend: "Επιλογές ανάγνωσης", textSize: "Μέγεθος κειμένου", decrease: "Α–", increase: "Α+", readingMode: "Λειτουργία ανάγνωσης" },
    "hi": { legend: "पढ़ने के विकल्प", textSize: "पाठ का आकार", decrease: "अ–", increase: "अ+", readingMode: "पढ़ने का मोड" }
};
// Get the localized text based on page language
const lang = translations[pageLang] || translations["en"];
// Generate and insert the Reading Options component
function initializeReadingOptions() {
    const readingContainer = document.querySelector("[data-component='reading-options']");
    if (!readingContainer)
        return;
    readingContainer.innerHTML = `
        <summary>${lang.legend}</summary>
        <div>
            <span>${lang.textSize}</span>
            <button type="button" data-action="decrease-font">${lang.decrease}</button>
            <button type="button" data-action="increase-font">${lang.increase}</button>
            <label><input type="checkbox" name="reading-mode"> ${lang.readingMode}</label>
        </div>
    `;
    attachEventListeners(readingContainer);
    loadSavedSettings();
}
function attachEventListeners(readingContainer) {
    readingContainer.addEventListener("change", event => {
        if (event.target.matches("[name='reading-mode']")) {
            updateReadingMode();
        }
    });
    readingContainer.addEventListener("click", event => {
        if (event.target.matches("[data-action='increase-font']")) {
            adjustFontSize("increase");
        }
        else if (event.target.matches("[data-action='decrease-font']")) {
            adjustFontSize("decrease");
        }
    });
}
function updateReadingMode() {
    const checkbox = document.querySelector("[name='reading-mode']");
    if (checkbox && checkbox.checked) {
        document.body.setAttribute("data-reading-mode", "on");
        localStorage.setItem(STORAGE_READING_MODE, "on");
    }
    else {
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
    }
    else if (direction === "decrease" && currentSize > MIN_SIZE) {
        setFontSize(currentSize / FONT_STEP);
    }
}
function loadSavedSettings() {
    var _a;
    const savedReadingMode = localStorage.getItem(STORAGE_READING_MODE);
    const savedSize = parseFloat((_a = localStorage.getItem(STORAGE_TEXT_SIZE)) !== null && _a !== void 0 ? _a : "1");
    if (savedReadingMode === "on") {
        document.body.setAttribute("data-reading-mode", "on");
        const checkbox = document.querySelector("[name='reading-mode']");
        if (checkbox)
            checkbox.checked = true;
    }
    if (!isNaN(savedSize) && savedSize >= MIN_SIZE && savedSize <= MAX_SIZE) {
        setFontSize(savedSize);
    }
    else {
        updateButtonState();
    }
}


/***/ }),

/***/ "./Scripts/components/themeSwitcher.ts":
/*!*********************************************!*\
  !*** ./Scripts/components/themeSwitcher.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeThemeSwitcher: () => (/* binding */ initializeThemeSwitcher)
/* harmony export */ });
const THEME_KEY = "theme";
const CONTRAST_KEY = "high-contrast";
const defaultCulture = "en";
const pageLang = (document.documentElement.lang || defaultCulture).toLowerCase();
// Localized text dictionary
const translations = {
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
const lang = translations[pageLang] || translations["en"];
// Generate and insert the Theme Switcher component
function initializeThemeSwitcher() {
    const themeContainer = document.querySelector("[data-component='theme-selector']");
    if (!themeContainer)
        return;
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
function attachEventListeners(themeContainer) {
    themeContainer.addEventListener("change", () => updateTheme());
}
// Apply the selected theme to the document
function applyTheme(theme, contrast) {
    let themeValue = theme === "auto" ? getSystemTheme() : theme;
    if (contrast === "true")
        themeValue += " high-contrast";
    document.documentElement.setAttribute("data-theme", themeValue);
}
// Get the system's preferred theme
function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
// Save the selected theme in localStorage
function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}
// Save high contrast preference
function saveContrast(isEnabled) {
    localStorage.setItem(CONTRAST_KEY, isEnabled);
}
// Update the theme based on user selection
function updateTheme() {
    var _a, _b;
    const selectedTheme = ((_a = document.querySelector("[name='theme']:checked")) === null || _a === void 0 ? void 0 : _a.value) || "auto";
    const isHighContrast = ((_b = document.querySelector("[name='high-contrast']")) === null || _b === void 0 ? void 0 : _b.checked) ? "true" : "false";
    saveTheme(selectedTheme);
    saveContrast(isHighContrast);
    applyTheme(selectedTheme, isHighContrast);
}
// Load stored preferences and apply them
function loadSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || "auto";
    const savedContrast = localStorage.getItem(CONTRAST_KEY) || "false";
    applyTheme(savedTheme, savedContrast);
    const themeContainer = document.querySelector("[data-component='theme-selector']");
    if (themeContainer) {
        const themeInput = themeContainer.querySelector(`[value="${savedTheme}"]`);
        const contrastInput = themeContainer.querySelector(`[name="high-contrast"]`);
        if (themeInput)
            themeInput.checked = true;
        if (contrastInput)
            contrastInput.checked = savedContrast === "true";
    }
    // Listen for system theme changes when "Auto" is selected
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (localStorage.getItem(THEME_KEY) === "auto") {
            applyTheme("auto", localStorage.getItem(CONTRAST_KEY) || "false");
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./Scripts/site.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_themeSwitcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/themeSwitcher */ "./Scripts/components/themeSwitcher.ts");
/* harmony import */ var _components_readingOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/readingOptions */ "./Scripts/components/readingOptions.ts");
/* harmony import */ var _components_navigationDrawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/navigationDrawer */ "./Scripts/components/navigationDrawer.ts");
/* harmony import */ var _components_localization__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/localization */ "./Scripts/components/localization.ts");




document.addEventListener("DOMContentLoaded", () => {
    (0,_components_localization__WEBPACK_IMPORTED_MODULE_3__.initializeLocalization)();
    (0,_components_themeSwitcher__WEBPACK_IMPORTED_MODULE_0__.initializeThemeSwitcher)();
    (0,_components_readingOptions__WEBPACK_IMPORTED_MODULE_1__.initializeReadingOptions)();
    (0,_components_navigationDrawer__WEBPACK_IMPORTED_MODULE_2__.initializeNavigationDrawer)();
});

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=site.js.map