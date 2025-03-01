document.addEventListener("DOMContentLoaded", function () {
    // Find the element with ID "target-js"
    var targetElement = document.getElementById("target-js");

    // Check if the element exists to avoid errors
    if (targetElement) {
        targetElement.textContent = "Hello from JavaScript";
    } else {
        console.error("Element with ID 'target-js' not found.");
    }
});