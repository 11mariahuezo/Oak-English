// ========================================
// OAK ENGLISH
// ACCESSIBILITY + READING + CALM MODE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    if (!document.getElementById("accessibilityToggle")) {
        document.body.insertAdjacentHTML("beforeend", `
            <div class="accessibility-container">
                <button id="accessibilityToggle" type="button" aria-label="Open accessibility menu" aria-expanded="false"></button>
                <div id="accessibilityMenu" aria-hidden="true">
                    <div class="accessibility-header">
                        <strong>Accessibility</strong>
                        <button id="closeAccessibility" class="close-btn" type="button" aria-label="Close menu">×</button>
                    </div>
                    <div class="accessibility-section">
                        <h3>Text size</h3>
                        <div class="text-size-controls">
                            <button id="decreaseText" type="button">A−</button>
                            <span id="textSizeValue">100%</span>
                            <button id="increaseText" type="button">A+</button>
                        </div>
                    </div>
                    <div class="accessibility-section">
                        <h3>Reading</h3>
                        <button id="btnRead" type="button">Read focused item</button>
                    </div>
                    <div class="accessibility-section">
                        <h3>Language</h3>
                        <button id="languageToggle" type="button" aria-pressed="false">Español</button>
                    </div>
                    <div class="accessibility-section">
                        <h3>Appearance</h3>
                        <button id="highContrast" type="button">High contrast</button>
                        <button id="highlightLinks" type="button">Highlight links</button>
                        <button id="darkMode" type="button">Dark mode</button>
                        <button id="calmMode" type="button" aria-pressed="false">Calm mode</button>
                    </div>
                    <button id="resetAccessibility" class="accessibility-reset" type="button">Reset settings</button>
                </div>
            </div>
        `);
    }

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

    let autoReadToggle = null;

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

    let languageToggle =
        document.getElementById("languageToggle");

    if (menu && !languageToggle) {
        const languageSection = document.createElement("div");
        languageSection.className = "accessibility-section";
        languageSection.innerHTML = `
            <h3>Language</h3>
            <button id="languageToggle" type="button" aria-pressed="false">Español</button>
        `;
        menu.insertBefore(languageSection, menu.querySelector(".accessibility-reset"));
        languageToggle = languageSection.querySelector("#languageToggle");
    }

    if (menu) {
        const sectionOrder = ["Language", "Text size", "Reading", "Visual", "Appearance"];
        const sections = [...menu.querySelectorAll(".accessibility-section")];

        sections.sort((firstSection, secondSection) => {
            const firstTitle = firstSection.querySelector("h3")?.textContent.trim();
            const secondTitle = secondSection.querySelector("h3")?.textContent.trim();
            const firstPosition = sectionOrder.indexOf(firstTitle);
            const secondPosition = sectionOrder.indexOf(secondTitle);

            return (firstPosition < 0 ? sectionOrder.length : firstPosition) -
                (secondPosition < 0 ? sectionOrder.length : secondPosition);
        });

        sections.forEach(section => menu.appendChild(section));
    }

    const translations = {
        "Home": "Inicio",
        "My Pet": "Mi mascota",
        "Skills": "Habilidades",
        "Grammar": "Gramática",
        "Vocabulary": "Vocabulario",
        "Reading": "Lectura",
        "Listening": "Escucha",
        "Writing": "Escritura",
        "Speaking": "Habla",
        "Accessibility": "Accesibilidad",
        "Language": "Idioma",
        "Español": "English",
        "Text size": "Tamaño del texto",
        "Reading": "Lectura",
        "Appearance": "Apariencia",
        "Visual": "Apariencia",
        "High contrast": "Alto contraste",
        "Highlight links": "Resaltar enlaces",
        "Dark mode": "Modo oscuro",
        "Calm mode": "Modo tranquilo",
        "Reset settings": "Restablecer ajustes",
        "Read focused item": "Leer elemento seleccionado",
        "Read on hover: On": "Leer al pasar el ratón: Activado",
        "Read on hover: Off": "Leer al pasar el ratón: Desactivado",
        "Start learning": "Empezar a aprender",
        "Open skills": "Abrir habilidades",
        "Open grammar": "Abrir gramática",
        "Open vocabulary": "Abrir vocabulario",
        "Practise words": "Practicar palabras",
        "Choose practice": "Elegir práctica",
        "Try these activities": "Prueba estas actividades",
        "Choose a level": "Elige un nivel",
        "Choose one activity": "Elige una actividad",
        "Choose a listening level": "Elige un nivel de escucha",
        "Choose a reading level": "Elige un nivel de lectura",
        "Choose a speaking level": "Elige un nivel de habla",
        "Choose a writing level": "Elige un nivel de escritura",
        "See level details": "Ver detalles del nivel",
        "Hide level details": "Ocultar detalles del nivel",
        "See activity details": "Ver detalles de la actividad",
        "Start A1 practice": "Empezar práctica A1",
        "Start A2 practice": "Empezar práctica A2",
        "Start B1 practice": "Empezar práctica B1",
        "Start B2 practice": "Empezar práctica B2",
        "Start reading": "Empezar lectura",
        "Start listening": "Empezar escucha",
        "Start speaking": "Empezar habla",
        "Start writing": "Empezar escritura",
        "See the full writing syllabus →": "Ver todo el programa de escritura →",
        "See the full listening syllabus →": "Ver todo el programa de escucha →",
        "See the full reading syllabus →": "Ver todo el programa de lectura →",
        "See the full speaking syllabus →": "Ver todo el programa de habla →",
        "Key topics": "Temas que practicarás",
        "Instructions:": "Instrucciones:",
        "Back to Home": "Volver al inicio",
        "Back": "Volver",
        "Submit Answer": "Enviar respuesta",
        "Check answers": "Comprobar respuestas",
        "Show transcript": "Mostrar transcripción",
        "More information": "Más información"
    };

    Object.assign(translations, {
        "Learn at your own pace": "Aprende a tu ritmo",
        "Your learning path": "Tu camino de aprendizaje",
        "One step at a time": "Un paso cada vez",
        "Four skills, one branch": "Cuatro habilidades, un camino",
        "English vocabulary, made clear": "Vocabulario de inglés, explicado de forma clara",
        "English vocabulary, ": "Vocabulario de inglés, ",
        "made clear": "explicado de forma clara",
        "Language skills": "Habilidades del idioma",
        "Skill focus": "Habilidad que practicarás",
        "Your English grows ring by ring": "Tu inglés crece poco a poco",
        "Your English grows ": "Tu inglés crece ",
        "ring": "anillo",
        " by ring": " a anillo",
        "Choose what feels right": "Elige lo que te parezca mejor",
        "Choose a level. Start practice now or see the details first.": "Elige un nivel. Empieza a practicar o mira los detalles primero.",
        "Choose a skill": "Elige una habilidad",
        "Choose one activity": "Elige una actividad",
        "Start practice now": "Empezar a practicar ahora",
        "Beginner Level": "Nivel inicial",
        "Elementary Level": "Nivel básico",
        "Intermediate Level": "Nivel intermedio",
        "Upper-Intermediate Level": "Nivel intermedio alto",
        "Basic communication": "Comunicación básica",
        "Essential grammar": "Gramática básica",
        "Listening skills": "Habilidades de escucha",
        "Reading basics": "Lectura básica",
        "Everyday exchanges": "Conversaciones diarias",
        "Descriptive grammar": "Gramática para describir",
        "Understanding short messages": "Entender mensajes cortos",
        "Simple storytelling": "Contar historias sencillas",
        "Work & business": "Trabajo y negocios",
        "Travel & culture": "Viajes y cultura",
        "Advanced grammar": "Gramática avanzada",
        "Fluent speaking": "Hablar con fluidez",
        "Sentence structure": "Estructura de las frases",
        "Paragraph organization": "Organización de párrafos",
        "Formal vs. informal tone": "Forma formal o informal",
        "Editing & proofreading": "Revisar y corregir",
        "Listening for gist": "Escuchar la idea principal",
        "Listening for detail": "Escuchar los detalles",
        "Understanding accents": "Entender diferentes acentos",
        "Following conversations": "Seguir conversaciones",
        "Skimming & scanning": "Buscar información en un texto",
        "Context clues": "Pistas del contexto",
        "Vocabulary in context": "Vocabulario en contexto",
        "Critical reading": "Lectura crítica",
        "Pronunciation & rhythm": "Pronunciación y ritmo",
        "Conversation flow": "Seguir una conversación",
        "Expressing opinions": "Expresar opiniones",
        "Public speaking": "Hablar delante de otras personas",
        "Practice with games": "Practicar con juegos",
        "Interactive games: learn by playing": "Juegos interactivos: aprende jugando",
        "Memory": "Memoria",
        "Matching pairs": "Parejas iguales",
        "Puzzle": "Rompecabezas",
        "Start Interactive Quiz": "Empezar el quiz",
        "Watch Videos": "Ver videos",
        "Watch Video Masterclass": "Ver video",
        "Practice and improve your grammar.": "Practica y mejora tu gramática.",
        "Build clear, well-organized written English for messages, essays, and reports.": "Escribe mensajes y frases claras paso a paso.",
        "Train your ear to catch meaning in conversations, audio, and natural speech.": "Entrena tu oído para entender conversaciones y audios.",
        "Understand texts of every kind, from signs and messages to articles and literature.": "Entiende textos cortos, mensajes y cuentos.",
        "Speak with confidence in everyday, social, and professional situations.": "Habla con confianza en situaciones de cada día.",
        "Each card shows what matters most. Open it for more detail, or go straight to practice.": "Cada tarjeta te muestra qué practicar. Mira los detalles o empieza ahora.",
        "Move at your own pace: start with the basics, then intermediate, and practice everything with games whenever you like.": "Ve a tu ritmo. Empieza por lo básico y practica con juegos cuando quieras.",
        "Good writing starts with structure.": "Escribir bien empieza con frases ordenadas.",
        "Listening well means more than hearing words.": "Escuchar bien es entender el significado de las palabras.",
        "Reading opens the door to everything else.": "Leer te ayuda a aprender muchas cosas nuevas.",
        "Speaking is where everything comes together.": "Hablar reúne todo lo que has aprendido.",
        "Choose writing, listening, reading, or speaking and go straight to the exercises, or review the details first.": "Elige escribir, escuchar, leer o hablar. Después empieza la práctica.",
        "What will you learn?": "¿Qué aprenderás?",
        "How will you learn?": "¿Cómo aprenderás?",
        "Your learning path": "Tu camino para aprender",
        "No pressure, no rush": "Sin presión y sin prisa",
        "Words for Every Day": "Palabras para cada día",
        "Daily Vocabulary": "Vocabulario diario",
        "Personalized Exercises": "Ejercicios para ti",
        "My Study Guide": "Mi guía de estudio",
        "Activity Title": "Título de la actividad",
        "Why Practice With Us?": "¿Por qué practicar aquí?",
        "Verificar respuestas": "Comprobar respuestas",
        "Escuchar instrucciones": "Escuchar instrucciones",
        "Mostrar transcripción": "Mostrar texto",
        "Start": "Empezar",
        "Next": "Siguiente",
        "Finish": "Terminar",
        "Try again": "Intentar de nuevo",
        "Correct!": "¡Correcto!",
        "Not quite": "Casi. Inténtalo de nuevo",
        "Your score": "Tu resultado",
        "You have": "Tienes",
        "points": "puntos",
        "Level details": "Detalles del nivel",
        "See the full A1 syllabus →": "Ver todo el programa A1 →",
        "See the full A2 syllabus →": "Ver todo el programa A2 →",
        "See the full B1 syllabus →": "Ver todo el programa B1 →",
        "See the full B2 syllabus →": "Ver todo el programa B2 →"
    });

    Object.assign(translations, {
        "Show transcript": "Mostrar texto",
        "Hide transcript": "Ocultar texto",
        "No time limit. Press play when you are ready.": "No hay límite de tiempo. Pulsa reproducir cuando estés listo.",
        "Your browser does not support audio. Try Chrome or Edge.": "Tu navegador no puede reproducir este audio. Prueba Chrome o Edge.",
        "Audio stopped. You can listen again whenever you want.": "El audio se detuvo. Puedes escucharlo otra vez cuando quieras.",
        "Audio finished. You can listen again or answer the questions.": "El audio terminó. Puedes escucharlo otra vez o responder las preguntas.",
        "Result:": "Resultado:",
        "correct": "correctas",
        "Your answer": "Tu respuesta",
        "Correct answer": "Respuesta correcta",
        "Correct! Resuming the video...": "¡Correcto! El video continúa...",
        "That's not it. Try again.": "No es esa. Inténtalo de nuevo.",
        "Play audio": "Reproducir audio",
        "No sound? Here is the script:": "¿No escuchas el audio? Aquí está el texto:",
        "Show model answer": "Mostrar ejemplo de respuesta",
        "Model answer": "Ejemplo de respuesta",
        "Start exercise": "Empezar ejercicio",
        "Hide exercise": "Ocultar ejercicio",
        "Return to the catalog": "Volver al catálogo",
        "Weekly vocabulary: topics": "Vocabulario semanal: temas",
        "Basic": "Básico",
        "Intermediate": "Intermedio",
        "Advanced": "Avanzado",
        "6 Words": "6 palabras",
        "10 Words": "10 palabras",
        "15 Words": "15 palabras",
        "Create your profile": "Crear tu perfil",
        "Continue": "Continuar",
        "See details": "Ver detalles",
        "Start learning": "Empezar a aprender",
        "Watch Videos": "Ver videos",
        "Back to the topic": "Volver al tema",
        "Back to lesson": "Volver a la lección",
        "Back to vocabulary": "Volver al vocabulario",
        "Close video": "Cerrar video",
        "Send message": "Enviar mensaje",
        "Write a message": "Escribe un mensaje",
        "Open Teacher IA chat": "Abrir chat del profesor IA",
        "Close chat": "Cerrar chat",
        "What do you want to practise?": "¿Qué quieres practicar?",
        "Answer the question": "Responde la pregunta",
        "Check your answer": "Comprueba tu respuesta",
        "Next question": "Siguiente pregunta",
        "Try again": "Intentar de nuevo",
        "Well done!": "¡Muy bien!",
        "Keep practising": "Sigue practicando"
    });

    const originalText = new Map();
    const originalAttributes = new WeakMap();
    const originalTitle = document.title;
    let isTranslating = false;
    const translationEntries = Object.entries(translations)
        .sort((first, second) => second[0].length - first[0].length);

    function replaceTranslations(text) {
        return translationEntries.reduce((result, [key, value]) => {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const isWord = /^[\p{L}\d]/u.test(key) && /[\p{L}\d]$/u.test(key);
            const pattern = isWord ? `\\b${escapedKey}\\b` : escapedKey;
            return result.replace(new RegExp(pattern, "gu"), value);
        }, text);
    }

    function captureVisiblePage(root = document.body) {
        const textNodes = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let node;

        while ((node = textNodes.nextNode())) {
            if (!node.parentElement.closest("script, style")) nodes.push(node);
        }

        nodes.forEach(textNode => {
            if (!originalText.has(textNode)) {
                originalText.set(textNode, textNode.nodeValue);
            }
        });

        const elements = root.querySelectorAll
            ? root.querySelectorAll("[aria-label], [title], [placeholder], img[alt]")
            : [];

        elements.forEach(element => {
            let savedAttributes = originalAttributes.get(element);

            if (!savedAttributes) {
                savedAttributes = {};
                originalAttributes.set(element, savedAttributes);
            }

            ["aria-label", "title", "placeholder", "alt"].forEach(attribute => {
                if (!element.hasAttribute(attribute)) return;
                if (savedAttributes[attribute] === undefined) {
                    savedAttributes[attribute] = element.getAttribute(attribute);
                }
            });
        });
    }

    function translatePage(toSpanish, root = document.body) {
        isTranslating = true;
        const textNodes = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let node;

        while ((node = textNodes.nextNode())) {
            if (!node.parentElement.closest("script, style")) nodes.push(node);
        }

        nodes.forEach(textNode => {

            const original = originalText.get(textNode);

            if (original === undefined) return;

            const newText = toSpanish
                ? replaceTranslations(original)
                : original;

            if (textNode.nodeValue !== newText) {
                textNode.nodeValue = newText;
            }

});

        const elements = root.querySelectorAll
            ? root.querySelectorAll("[aria-label], [title], [placeholder], img[alt]")
            : [];

        elements.forEach(element => {
            const savedAttributes = originalAttributes.get(element);
            if (!savedAttributes) return;

            ["aria-label", "title", "placeholder", "alt"].forEach(attribute => {
                const original = savedAttributes[attribute];
                if (original === undefined) return;
                if (toSpanish && translations[original]) {
                    element.setAttribute(attribute, translations[original]);
                } else if (!toSpanish) {
                    element.setAttribute(attribute, original);
                }
            });
        });

        document.documentElement.lang = toSpanish ? "es" : "en";

        const translatedTitle = translationEntries
            .reduce((text, [key, value]) => text.replaceAll(key, value), originalTitle);
        document.title = toSpanish ? translatedTitle : originalTitle;
        if (languageToggle) {
            languageToggle.textContent = toSpanish ? "English" : "Español";
            languageToggle.setAttribute("aria-pressed", toSpanish ? "true" : "false");
        }

        if (btnRead) {
            btnRead.textContent = toSpanish
                ? "🔊 Leer elemento seleccionado"
                : "🔊 Read focused item";
            btnRead.setAttribute(
                "aria-label",
                toSpanish ? "Leer el elemento seleccionado" : "Read the focused item"
            );
        }

        if (autoReadToggle) {
            autoReadToggle.textContent = autoReadEnabled
                ? (toSpanish ? "🔊 Leer al pasar el ratón: Activado" : "🔊 Read on hover: On")
                : (toSpanish ? "🔇 Leer al pasar el ratón: Desactivado" : "🔇 Read on hover: Off");
        }

        queueMicrotask(() => {
            isTranslating = false;
        });
    }

    const LANGUAGE_KEY = "oakEnglishLanguage";
    let spanishEnabled = localStorage.getItem(LANGUAGE_KEY) === "es";

    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            spanishEnabled = !spanishEnabled;
            localStorage.setItem(LANGUAGE_KEY, spanishEnabled ? "es" : "en");
            translatePage(spanishEnabled);
        });
    }

    captureVisiblePage();
    translatePage(spanishEnabled);

    const translationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (isTranslating) return;

            if (mutation.type === "characterData") {
                if (!spanishEnabled || !mutation.target.parentElement) return;
                originalText.set(mutation.target, mutation.target.nodeValue);
                captureVisiblePage(mutation.target.parentElement);
                translatePage(true, mutation.target.parentElement);
                return;
            }

            mutation.addedNodes.forEach(addedNode => {
                const contentRoot = addedNode.nodeType === Node.ELEMENT_NODE
                    ? addedNode
                    : mutation.target;

                if (!(contentRoot instanceof Element)) return;
                captureVisiblePage(contentRoot);
                if (spanishEnabled) translatePage(true, contentRoot);
            });
        });
    });

    translationObserver.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true
    });

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

    const AUTO_READ_KEY =
        "oakEnglishAutoReadV2";


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
    // SCREEN READER / FOCUSED ELEMENT READING
    // ========================================

    const readableSelector =
        "h1, h2, h3, h4, h5, h6, p, li, a, button, input, textarea, select, img, [role='button'], [role='heading']";

    let lastReadElement = null;
    let lastFocusedReadableElement = null;

    function getReadableText(element) {
        if (!element) return "";

        if (element.matches("img")) {
            return element.getAttribute("alt") || "";
        }

        if (element.matches("input, textarea, select")) {
            const label = element.labels?.[0]?.innerText || "";
            const value = element.value ? ` ${element.value}` : "";
            return `${label} ${element.getAttribute("placeholder") || ""}${value}`.trim();
        }

        return (
            element.getAttribute("aria-label") ||
            element.getAttribute("title") ||
            element.innerText ||
            element.textContent ||
            ""
        ).replace(/\s+/g, " ").trim();
    }

    function speakElement(element) {
        if (!element || element.closest("#accessibilityMenu") || element === toggle) return;

        const text = getReadableText(element);
        if (!text || text === lastReadElement?.text) return;

        speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 1;
        speechSynthesis.speak(speech);
        lastReadElement = { element, text };
    }

    let autoReadEnabled =
        localStorage.getItem(AUTO_READ_KEY) === "1";

    function setAutoRead(enabled) {
        autoReadEnabled = enabled;

        if (autoReadToggle) {
            autoReadToggle.textContent = enabled
                ? (spanishEnabled ? "🔊 Leer al pasar el ratón: Activado" : "🔊 Read on hover: On")
                : (spanishEnabled ? "🔇 Leer al pasar el ratón: Desactivado" : "🔇 Read on hover: Off");
            autoReadToggle.setAttribute(
                "aria-pressed",
                enabled ? "true" : "false"
            );
            autoReadToggle.classList.toggle("active", enabled);
        }

        localStorage.setItem(
            AUTO_READ_KEY,
            enabled ? "1" : "0"
        );
    }

    function getReadableElement(target) {
        return target instanceof Element ? target.closest(readableSelector) : null;
    }

    if (menu && btnRead) {
        autoReadToggle = document.createElement("button");
        autoReadToggle.type = "button";
        autoReadToggle.setAttribute("aria-label", "Toggle reading on hover");
        btnRead.insertAdjacentElement("afterend", autoReadToggle);
        autoReadToggle.addEventListener("click", () => {
            setAutoRead(!autoReadEnabled);
        });
        setAutoRead(autoReadEnabled);
    }

    let hoverTimer = null;

    document.addEventListener("mouseover", event => {
        if (!autoReadEnabled) return;

        const element = getReadableElement(event.target);
        if (!element || element.contains(event.relatedTarget)) return;

        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(() => speakElement(element), 500);
    });

    document.addEventListener("mouseout", () => {
        window.clearTimeout(hoverTimer);
    });

    document.addEventListener("focusin", event => {
        const element = getReadableElement(event.target);

        if (element && !element.closest("#accessibilityMenu")) {
            lastFocusedReadableElement = element;
        }
    });

    if (btnRead) {
        btnRead.textContent = spanishEnabled
            ? "🔊 Leer elemento seleccionado"
            : "🔊 Read focused item";
        btnRead.setAttribute(
            "aria-label",
            spanishEnabled ? "Leer el elemento seleccionado" : "Read the focused item"
        );
        btnRead.addEventListener("click", () => {
            speakElement(lastFocusedReadableElement);
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

                setAutoRead(false);

                spanishEnabled = false;
                localStorage.removeItem(LANGUAGE_KEY);
                translatePage(false);


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

                localStorage.removeItem(
                    AUTO_READ_KEY
                );

            }
        );

    }

});