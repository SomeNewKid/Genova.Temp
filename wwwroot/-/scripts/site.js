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
