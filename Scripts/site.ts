import { initializeThemeSwitcher } from "./components/themeSwitcher";
import { initializeReadingOptions } from "./components/readingOptions";
import { initializeNavigationDrawer } from "./components/navigationDrawer";
import { initializeLocalization  } from "./components/localization";

document.addEventListener("DOMContentLoaded", () => {
    initializeLocalization();
    initializeThemeSwitcher();
    initializeReadingOptions();
    initializeNavigationDrawer();
});
