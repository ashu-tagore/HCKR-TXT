// Waiting for the document to finish loading before initializing
document.addEventListener("DOMContentLoaded", function () {
    // Selecting toggle, close, container, and all menu items
    const menuToggle = document.querySelector(".menu-toggle");
    const closeBtn = document.querySelector(".close-btn");
    const menuContainer = document.querySelector(".menu-container");
    const menuItems = document.querySelectorAll(".menu-item");

    // Showing menu and triggering menu item animation on toggle click
    menuToggle.addEventListener("click", function () {
        menuContainer.style.left = "0%";
        shuffleAll();
        animateMenuItems(menuItems, "in");
    });

    // Hiding menu and animating items out on close click
    closeBtn.addEventListener("click", function () {
        menuContainer.style.left = "-50%";
        animateMenuItems(menuItems, "out");
    });

    // Animating menu items sliding in (or out) one after another
    function animateMenuItems(items, direction) {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.left = direction === "in" ? "0px" : "-100px";
            }, index * 50);
        });
    }

    // Creating SplitType objects to split text for animation
    try {
        const link = new SplitType(".menu-item a", { types: "words, chars" });
        const span = new SplitType(".menu-item span", { types: "words, chars" });
        const menuTitle = new SplitType(".menu-title p", { types: "words, chars" });
        const menuContent = new SplitType(".menu-content p", { types: "words, chars" });
    } catch (error) {
        // Logging error if split type initialization fails
        console.error("SplitType initialization failed:", error);
    }

    // Selecting all items requiring shuffle or hover effect
    const links = document.querySelectorAll(
        ".menu-item, .menu-title, .menu-sub-item, .menu-sub-item .menu-content"
    );

    // Adjusting hover backgrounds and number positions for menu items
    document.querySelectorAll(".menu-item").forEach((item) => {
        // Selecting link element to determine width for background and number
        const linkElement = item.querySelector(".menu-item-link a");
        if (linkElement) {
            const width = linkElement.offsetWidth;
            const bgHover = item.querySelector(".menu-item-link .bg-hover");
            if (bgHover) {
                bgHover.style.width = width + 30 + "px";
            }

            const spanElement = item.querySelector("span");
            if (spanElement) {
                spanElement.style.left = width + 40 + "px";

                const chars = item.querySelectorAll("span .char");

                // Adding char-active class (coloring letters) one by one
                function colorChars(chars) {
                    chars.forEach((char, index) => {
                        setTimeout(() => {
                            char.classList.add("char-active");
                        }, index * 50);
                    });
                }

                // Removing char-active class from all letters
                function clearColorChars(chars) {
                    chars.forEach((char) => {
                        char.classList.remove("char-active");
                    });
                }

                // Triggering colorChars and clearColorChars on hover in and out
                linkElement.addEventListener("mouseenter", () => {
                    colorChars(chars);
                });
                linkElement.addEventListener("mouseleave", () => {
                    clearColorChars(chars);
                });
            }
        }
    });

    // Adding shuffle text animation and number shuffle to all links on hover
    links.forEach((link) => {
        link.addEventListener("mouseenter", (event) => {
            const targetElement = event.currentTarget.querySelector(
                ".menu-item-link a, .menu-title a, .menu-content p"
            );
            if (targetElement) {
                addShuffleEffect(targetElement);
            }
            const spanElement = link.querySelector("span");
            if (spanElement) {
                addShuffleEffect(spanElement);
            }
        });
    });

    // Shuffling all relevant texts and numbers when calling shuffleAll
    function shuffleAll() {
        links.forEach((link) => {
            const targetElement = link.querySelector(".menu-item-link a, .menu-title p, .menu-content p");
            if (targetElement) {
                addShuffleEffect(targetElement);
            }
        });
    }

    // Creating a random "shuffling" letter effect for SplitType elements
    function addShuffleEffect(element) {
        const chars = element.querySelectorAll(".char");
        if (chars.length === 0) return;

        const originalText = [...chars].map(char => char.textContent);
        const shuffleInterval = 10;
        const resetDelay = 75;
        const additionalDelay = 150;

        // Animating each letter by randomizing and then restoring its value
        chars.forEach((char, index) => {
            setTimeout(() => {
                const interval = setInterval(() => {
                    char.textContent = String.fromCharCode(
                        97 + Math.floor(Math.random() * 26)
                    );
                }, shuffleInterval);

                setTimeout(() => {
                    clearInterval(interval);
                    char.textContent = originalText[index];
                }, resetDelay + index * additionalDelay);
            }, index * shuffleInterval);
        });
    }
});
