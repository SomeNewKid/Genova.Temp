document.addEventListener('DOMContentLoaded', function () {

    document.body.classList.add('js-enabled');

    // Detect RTL mode
    var isRTL = document.documentElement.dir === "rtl";

    // Create the menu button
    var menuButton = document.createElement("div");
    menuButton.id = "hamburger";
    var menuIcon = `<span class="menu-icon"><span></span><span></span><span></span></span>`;
    var menuText = `<span class="menu-text">MENU</span>`;
    menuButton.innerHTML = isRTL ? menuIcon + menuText : menuText + menuIcon;

    // Append to the body
    document.body.appendChild(menuButton);

    // Function to ensure the overlay exists
    function ensureOverlay() {
        if (!document.getElementById("overlay")) {
            var overlay = document.createElement("div");
            overlay.id = "overlay";

            // Close the drawer when the overlay is clicked
            overlay.addEventListener("click", closeDrawer);

            document.body.appendChild(overlay);
        }
    }

    // Function to open the drawer
    function openDrawer() {
        ensureOverlay();

        var scrollY = window.scrollY || document.documentElement.scrollTop;
        document.body.dataset.scrollY = scrollY; // Save the scroll position

        // Apply styles to prevent scrolling
        document.body.style.top = `-${scrollY}px`;
        //document.querySelector('.page').style.top = `-${scrollY}px`;
        document.getElementById("hamburger").style.top = `${scrollY}px`;

        document.body.classList.add("drawer-open", "scroll-lock", "overlayed");
        menuButton.classList.add("open"); // Change icon to "X"
    }

    // Function to close the drawer
    function closeDrawer() {
        var scrollY = document.body.dataset.scrollY || "0";
        document.body.classList.remove("drawer-open", "scroll-lock", "overlayed");
        menuButton.classList.remove("open"); // Change back to hamburger

        document.body.style.removeProperty("top");
        //document.querySelector('.page').style.removeProperty("top");
        document.getElementById("hamburger").style.top = "0"; // Reset `#hamburger`

        // Restore scroll position
        window.scrollTo(0, parseInt(scrollY, 10));
    }

    // Click event to toggle between open and close
    menuButton.addEventListener("click", function () {
        if (document.body.classList.contains("drawer-open")) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });

    function checkScroll() {
        if (window.scrollY > 0) {
            document.body.classList.add("scrolled");
        } else {
            document.body.classList.remove("scrolled");
        }
    }

    // Run on page load in case the user refreshes while scrolled
    checkScroll();

    // Listen for scroll events
    window.addEventListener("scroll", checkScroll);
});