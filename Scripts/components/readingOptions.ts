import { getPageLanguage, getTranslation } from "../utilities/shared";

const STORAGE_READING_MODE = "reading-options";
const STORAGE_TEXT_SIZE = "text-size";
const FONT_STEP = 1.1;
const MIN_SIZE = 0.8;
const MAX_SIZE = 1.5;

// Localized text dictionary
const translations: Record<string, { legend: string; textSize: string; decrease: string; increase: string; readingMode: string; }> = {
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
const lang = getTranslation(translations);

// Generate and insert the Reading Options component
export function initializeReadingOptions(): void {
    const readingContainer = document.querySelector("[data-component='reading-options']");
    if (!readingContainer) return;

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

function attachEventListeners(readingContainer: Element): void {
    readingContainer.addEventListener("change", event => {
        if ((event.target as HTMLElement).matches("[name='reading-mode']")) {
            updateReadingMode();
        }
    });

    readingContainer.addEventListener("click", event => {
        if ((event.target as HTMLElement).matches("[data-action='increase-font']")) {
            adjustFontSize("increase");
        } else if ((event.target as HTMLElement).matches("[data-action='decrease-font']")) {
            adjustFontSize("decrease");
        }
    });
}

function updateReadingMode(): void {
    const checkbox = document.querySelector<HTMLInputElement>("[name='reading-mode']");
    if (checkbox && checkbox.checked) {
        document.body.setAttribute("data-reading-mode", "on");
        localStorage.setItem(STORAGE_READING_MODE, "on");
    } else {
        document.body.removeAttribute("data-reading-mode");
        localStorage.removeItem(STORAGE_READING_MODE);
    }
}

function getFontSize(): number {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("font-size")) / 16;
}

function setFontSize(scale: number): void {
    document.documentElement.style.fontSize = `${scale * 16}px`;
    localStorage.setItem(STORAGE_TEXT_SIZE, scale.toFixed(2));
    updateButtonState();
}

function updateButtonState(): void {
    const currentSize = getFontSize();
    const decreaseButton = document.querySelector<HTMLButtonElement>("[data-action='decrease-font']");
    const increaseButton = document.querySelector<HTMLButtonElement>("[data-action='increase-font']");

    if (decreaseButton && increaseButton) {
        decreaseButton.disabled = currentSize <= MIN_SIZE;
        increaseButton.disabled = currentSize >= MAX_SIZE;
    }
}

function adjustFontSize(direction: "increase" | "decrease"): void {
    let currentSize = getFontSize();
    if (direction === "increase" && currentSize < MAX_SIZE) {
        setFontSize(currentSize * FONT_STEP);
    } else if (direction === "decrease" && currentSize > MIN_SIZE) {
        setFontSize(currentSize / FONT_STEP);
    }
}

function loadSavedSettings(): void {
    const savedReadingMode = localStorage.getItem(STORAGE_READING_MODE);
    const savedSize = parseFloat(localStorage.getItem(STORAGE_TEXT_SIZE) ?? "1");

    if (savedReadingMode === "on") {
        document.body.setAttribute("data-reading-mode", "on");
        const checkbox = document.querySelector<HTMLInputElement>("[name='reading-mode']");
        if (checkbox) checkbox.checked = true;
    }

    if (!isNaN(savedSize) && savedSize >= MIN_SIZE && savedSize <= MAX_SIZE) {
        setFontSize(savedSize);
    } else {
        updateButtonState();
    }
}