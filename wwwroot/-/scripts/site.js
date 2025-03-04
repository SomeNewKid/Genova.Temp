document.addEventListener('DOMContentLoaded', function () {

    document.body.classList.add('js-enabled');

    // Detect RTL mode
    var isRTL = document.documentElement.dir === "rtl";

    // Select the masthead header
    var masthead = document.querySelector('[data-component="masthead"]');

    if (masthead) {
        // Create the menu button
        var menuButton = document.createElement("div");
        menuButton.id = "hamburger";
        var menuIcon = `<span class="menu-icon"><span></span><span></span><span></span></span>`;
        var menuText = `<span class="menu-text">MENU</span>`;
        menuButton.innerHTML = isRTL ? menuIcon + menuText : menuText + menuIcon;

        // Append to the masthead
        masthead.appendChild(menuButton);

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
            document.body.classList.add("drawer-open", "overlayed");
            menuButton.classList.add("open"); // Change icon to "X"
        }

        // Function to close the drawer
        function closeDrawer() {
            document.body.classList.remove("drawer-open", "overlayed");
            menuButton.classList.remove("open"); // Change back to hamburger
        }

        // Click event to toggle between open and close
        menuButton.addEventListener("click", function () {
            if (document.body.classList.contains("drawer-open")) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }
});