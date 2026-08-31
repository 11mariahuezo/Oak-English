// ========================================
// OAK ENGLISH
// ACCESSIBILITY + READING + CALM MODE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // GET ELEMENTS
    // ========================================

    const toggle =
        document.getElementById("accessibilityToggle");

    const menu =
        document.getElementById("accessibilityMenu");

    const close =
        document.getElementById("closeAccessibility");

    const btnRead =
        document.getElementById("btnRead");

    const btnPause =
        document.getElementById("btnPause");

    const btnResume =
        document.getElementById("btnResume");

    const btnStop =
        document.getElementById("btnStop");

    const increaseText =
        document.getElementById("increaseText");

    const decreaseText =
        document.getElementById("decreaseText");

    const textSizeValue =
        document.getElementById("textSizeValue");

    const highContrast =
        document.getElementById("highContrast");

    const highlightLinks =
        document.getElementById("highlightLinks");

    const darkMode =
        document.getElementById("darkMode");

    const calmMode =
        document.getElementById("calmMode");

    const resetAccessibility =
        document.getElementById("resetAccessibility");


    // ========================================
    // STORAGE KEYS
    // ========================================

    const TEXT_SIZE_KEY =
        "oakEnglishTextSize";

    const CONTRAST_KEY =
        "oakEnglishHighContrast";

    const LINKS_KEY =
        "oakEnglishHighlightLinks";

    const DARK_KEY =
        "oakEnglishDarkMode";

    const CALM_KEY =
        "oakEnglishCalmMode";


    // ========================================
    // ACCESSIBILITY MENU
    // ========================================

    if (toggle && menu) {

        toggle.addEventListener("click", () => {

            const isOpen =
                menu.classList.toggle("show");

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menu.setAttribute(
                "aria-hidden",
                isOpen ? "false" : "true"
            );

        });

    }


    // ========================================
    // CLOSE MENU
    // ========================================

    if (close && menu && toggle) {

        close.addEventListener("click", () => {

            menu.classList.remove("show");

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menu.setAttribute(
                "aria-hidden",
                "true"
            );

        });

    }


    // ========================================
    // CLOSE WITH ESCAPE
    // ========================================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (menu) {
                menu.classList.remove("show");
            }

            if (toggle) {

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    // ========================================
    // SCREEN READER / READ PAGE
    // ========================================

    function getPageText() {

        const main =
            document.querySelector("main");

        if (main) {

            return main.innerText;

        }

        return document.body.innerText;

    }


    if (btnRead) {

        btnRead.addEventListener("click", () => {

            speechSynthesis.cancel();

            const text =
                getPageText();

            if (!text.trim()) {

                return;

            }

            const speech =
                new SpeechSynthesisUtterance(text);

            speech.lang = "en-US";

            speech.rate = 0.9;

            speech.pitch = 1;

            speech.volume = 1;

            speechSynthesis.speak(speech);

        });

    }


    // ========================================
    // PAUSE READING
    // ========================================

    if (btnPause) {

        btnPause.addEventListener("click", () => {

            if (speechSynthesis.speaking) {

                speechSynthesis.pause();

            }

        });

    }


    // ========================================
    // RESUME READING
    // ========================================

    if (btnResume) {

        btnResume.addEventListener("click", () => {

            if (speechSynthesis.paused) {

                speechSynthesis.resume();

            }

        });

    }


    // ========================================
    // STOP READING
    // ========================================

    if (btnStop) {

        btnStop.addEventListener("click", () => {

            speechSynthesis.cancel();

        });

    }


    // ========================================
    // TEXT SIZE
    // ========================================

    let textSize =
        Number(
            localStorage.getItem(TEXT_SIZE_KEY)
        ) || 100;


    function updateTextSize() {

        document.documentElement.style.fontSize =
            `${textSize}%`;

        if (textSizeValue) {

            textSizeValue.textContent =
                `${textSize}%`;

        }

        localStorage.setItem(
            TEXT_SIZE_KEY,
            textSize
        );

    }


    if (increaseText) {

        increaseText.addEventListener(
            "click",
            () => {

                if (textSize < 150) {

                    textSize += 10;

                    updateTextSize();

                }

            }
        );

    }


    if (decreaseText) {

        decreaseText.addEventListener(
            "click",
            () => {

                if (textSize > 80) {

                    textSize -= 10;

                    updateTextSize();

                }

            }
        );

    }


    // Load saved text size
    updateTextSize();


    // ========================================
    // HIGH CONTRAST
    // ========================================

    function setHighContrast(enabled) {

        document.body.classList.toggle(
            "high-contrast",
            enabled
        );

        if (highContrast) {

            highContrast.classList.toggle(
                "active",
                enabled
            );

        }

        localStorage.setItem(
            CONTRAST_KEY,
            enabled ? "1" : "0"
        );

    }


    if (highContrast) {

        highContrast.addEventListener(
            "click",
            () => {

                const enabled =
                    !document.body.classList.contains(
                        "high-contrast"
                    );

                setHighContrast(enabled);

            }
        );

    }


    // ========================================
    // HIGHLIGHT LINKS
    // ========================================

    function setHighlightLinks(enabled) {

        document.body.classList.toggle(
            "highlight-links",
            enabled
        );

        if (highlightLinks) {

            highlightLinks.classList.toggle(
                "active",
                enabled
            );

        }

        localStorage.setItem(
            LINKS_KEY,
            enabled ? "1" : "0"
        );

    }


    if (highlightLinks) {

        highlightLinks.addEventListener(
            "click",
            () => {

                const enabled =
                    !document.body.classList.contains(
                        "highlight-links"
                    );

                setHighlightLinks(enabled);

            }
        );

    }


    // ========================================
    // DARK MODE
    // ========================================

    function setDarkMode(enabled) {

        document.body.classList.toggle(
            "accessibility-dark",
            enabled
        );

        if (darkMode) {

            darkMode.classList.toggle(
                "active",
                enabled
            );

        }

        localStorage.setItem(
            DARK_KEY,
            enabled ? "1" : "0"
        );

    }


    if (darkMode) {

        darkMode.addEventListener(
            "click",
            () => {

                const enabled =
                    !document.body.classList.contains(
                        "accessibility-dark"
                    );

                setDarkMode(enabled);

            }
        );

    }


    // ========================================
    // 🌿 CALM MODE
    // ========================================

    function setCalmMode(enabled) {

        document.body.classList.toggle(
            "calm-mode",
            enabled
        );

        if (calmMode) {

            calmMode.classList.toggle(
                "active",
                enabled
            );

            calmMode.setAttribute(
                "aria-pressed",
                enabled ? "true" : "false"
            );

        }

        localStorage.setItem(
            CALM_KEY,
            enabled ? "1" : "0"
        );

    }


    if (calmMode) {

        calmMode.addEventListener(
            "click",
            () => {

                const enabled =
                    !document.body.classList.contains(
                        "calm-mode"
                    );

                setCalmMode(enabled);

            }
        );

    }


    // ========================================
    // LOAD SAVED SETTINGS
    // ========================================

    setHighContrast(
        localStorage.getItem(CONTRAST_KEY) === "1"
    );

    setHighlightLinks(
        localStorage.getItem(LINKS_KEY) === "1"
    );

    setDarkMode(
        localStorage.getItem(DARK_KEY) === "1"
    );

    setCalmMode(
        localStorage.getItem(CALM_KEY) === "1"
    );


    // ========================================
    // RESET EVERYTHING
    // ========================================

    if (resetAccessibility) {

        resetAccessibility.addEventListener(
            "click",
            () => {

                // Stop reading
                speechSynthesis.cancel();


                // Text size
                textSize = 100;

                updateTextSize();


                // Visual settings
                setHighContrast(false);

                setHighlightLinks(false);

                setDarkMode(false);

                setCalmMode(false);


                // Clear saved settings
                localStorage.removeItem(
                    TEXT_SIZE_KEY
                );

                localStorage.removeItem(
                    CONTRAST_KEY
                );

                localStorage.removeItem(
                    LINKS_KEY
                );

                localStorage.removeItem(
                    DARK_KEY
                );

                localStorage.removeItem(
                    CALM_KEY
                );

            }
        );

    }

});