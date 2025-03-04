document.addEventListener("DOMContentLoaded", function () {
    const detailsElements = document.querySelectorAll("details");

    document.addEventListener("click", function (event) {
        let clickedInside = false;

        detailsElements.forEach((details) => {
            // If the clicked element is inside a <details>, mark as inside
            if (details.contains(event.target)) {
                clickedInside = true;
                // Ensure only one details stays open
                detailsElements.forEach((otherDetails) => {
                    if (otherDetails !== details) {
                        otherDetails.removeAttribute("open");
                    }
                });
            }
        });

        // If click was outside all <details>, close all
        if (!clickedInside) {
            detailsElements.forEach((details) => details.removeAttribute("open"));
        }
    });
});