
import { getPageLanguage, getTranslation } from "../utilities/shared";

document.body.classList.add('js-enabled');

// Localized text dictionary for the menu button
const translations: Record<string, string> = {
    "en": "Menu",
    "zh-hk": "選單", "zh": "菜单",
    "ar": "قائمة", "he": "תפריט",
    "fa": "منو", "ur": "مینو",
    "ja": "メニュー", "th": "เมนู",
    "ko": "메뉴", "el": "Μενού",
    "hi": "मेनू"
};

// Get localized text for the menu button
const menuText = getTranslation(translations);

// Initialize Navigation Drawer
export function initializeNavigationDrawer(): void {
    createMenuButton();
    attachEventListeners();
}

// Create and insert the menu button
function createMenuButton(): void {
    const menuButton = document.createElement("div");
    menuButton.id = "hamburger";

    const isRTL = document.documentElement.dir === "rtl";
    const menuIcon = `<span class="menu-icon"><span></span><span></span><span></span></span>`;
    const menuTextHtml = `<span class="menu-text">${menuText}</span>`;

    menuButton.innerHTML = isRTL ? menuIcon + menuTextHtml : menuTextHtml + menuIcon;

    const pageArea = document.querySelector(".page");
    if (pageArea) {
        pageArea.appendChild(menuButton);
    } else {
        document.body.appendChild(menuButton);
    }
}

// Attach event listeners
function attachEventListeners(): void {
    const menuButton = document.getElementById("hamburger");
    if (!menuButton) return;

    menuButton.addEventListener("click", toggleDrawer);
    window.addEventListener("scroll", checkScroll);
}

// Ensure an overlay exists when opening the drawer
function ensureOverlay(): void {
    if (!document.getElementById("overlay")) {
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.addEventListener("click", closeDrawer);
        document.body.appendChild(overlay);
    }
}

// Open the navigation drawer
function openDrawer(): void {
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
function closeDrawer(): void {
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
function toggleDrawer(): void {
    if (document.body.classList.contains("drawer-open")) {
        closeDrawer();
    } else {
        openDrawer();
    }
}

// Apply scroll detection class
function checkScroll(): void {
    if (window.scrollY > 0) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
}
