/* =====================================================
OAK ENGLISH - SPEAKING
===================================================== */

/* =====================================================
EXERCISES
===================================================== */

const exercises = [


{
    icon: "🍽️",
    grad: "linear-gradient(135deg,#1B3A66,#3E6DA8)",
    title: "A dinner with friends",
    desc: "Describe the last dinner you had with friends: who was there, what you talked about, and how you felt.",
    keywords: [
        "dinner",
        "friends",
        "talked",
        "food",
        "felt",
        "evening",
        "fun",
        "together"
    ]
},

{
    icon: "💼",
    grad: "linear-gradient(135deg,#2E5590,#5B87C4)",
    title: "Who is in the office?",
    desc: "Describe two coworkers: what they look like, their job, and one thing you like about working with them.",
    keywords: [
        "coworker",
        "office",
        "job",
        "works",
        "looks",
        "team",
        "desk",
        "colleague"
    ]
},

{
    icon: "🎙️",
    grad: "linear-gradient(135deg,#17325B,#40679E)",
    title: "The Interview Summary",
    desc: "Imagine you just finished a job interview. Summarize in three sentences what you were asked and how you answered.",
    keywords: [
        "interview",
        "asked",
        "answered",
        "job",
        "experience",
        "questions",
        "summary",
        "position"
    ]
}


];

/* =====================================================
ELEMENTS
===================================================== */

const grid = document.getElementById("cardsGrid");
const overlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const micBtn = document.getElementById("micBtn");
const finishBtn = document.getElementById("finishBtn");
const transcriptBox = document.getElementById("transcriptBox");
const resultsBox = document.getElementById("resultsBox");
const micWarn = document.getElementById("micWarn");
const micStatus = document.getElementById("micStatus");

/* =====================================================
CREATE CARDS
===================================================== */

exercises.forEach((ex, i) => {


const div = document.createElement("div");

div.className = "oak-speaking-card";

div.innerHTML = `

    <div
        class="oak-card-image"
        style="background:${ex.grad}"
    >
        ${ex.icon}
    </div>

    <div class="oak-card-content">

        <h3>
            ${ex.title}
        </h3>

        <p>
            ${ex.desc}
        </p>

        <button
            class="oak-practice-btn"
            type="button"
        >
            Practice now
        </button>

    </div>

`;

const practiceBtn =
    div.querySelector(".oak-practice-btn");

practiceBtn.addEventListener(
    "click",
    () => openSpeakingPractice(i)
);

grid.appendChild(div);


});

/* =====================================================
VARIABLES
===================================================== */

let currentEx = null;
let recognition = null;
let recognizing = false;
let finalTranscript = "";
let startTime = null;

let audioCtx = null;
let analyser = null;
let source = null;
let waveAnim = null;
let micStream = null;

/* =====================================================
OPEN SPEAKING PRACTICE
===================================================== */

function openSpeakingPractice(i) {


currentEx = exercises[i];

document.getElementById("mTitle").textContent =
    currentEx.title;

document.getElementById("mTask").textContent =
    currentEx.desc;


transcriptBox.innerHTML = `
    <span class="oak-placeholder">
        Tu transcripción aparecerá aquí mientras hablas…
    </span>
`;


resultsBox.classList.remove("is-open");

finishBtn.disabled = true;

micWarn.style.display = "none";

finalTranscript = "";

startTime = null;


clearWave();

stopRecording();


overlay.classList.add("is-open");

overlay.setAttribute(
    "aria-hidden",
    "false"
);


}

/* =====================================================
CLOSE SPEAKING PRACTICE
===================================================== */

function closeSpeakingPractice() {

stopRecording();

clearWave();

overlay.classList.remove("is-open");

overlay.setAttribute(
    "aria-hidden",
    "true"
);


}

closeModalBtn.addEventListener(
"click",
closeSpeakingPractice
);

/* =====================================================
CLOSE CLICKING OUTSIDE
===================================================== */

overlay.addEventListener(
"click",
(event) => {


    if (event.target === overlay) {
        closeSpeakingPractice();
    }

}


);

/* =====================================================
ESCAPE
===================================================== */

document.addEventListener(
"keydown",
(event) => {


    if (
        event.key === "Escape" &&
        overlay.classList.contains("is-open")
    ) {

        closeSpeakingPractice();

    }

}


);

/* =====================================================
SPEECH RECOGNITION
===================================================== */

const SpeechRecognitionAPI =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

/* =====================================================
TOGGLE RECORDING
===================================================== */

async function toggleRecording() {


if (recognizing) {

    stopRecording();

    return;
}


micWarn.style.display = "none";


/* Browser */

if (!SpeechRecognitionAPI) {

    micWarn.textContent =
        "Tu navegador no soporta reconocimiento de voz. Prueba en Chrome o Edge de escritorio.";

    micWarn.style.display = "block";

    return;
}


/* Microphone */

if (
    !navigator.mediaDevices ||
    !navigator.mediaDevices.getUserMedia
) {

    micWarn.textContent =
        "Tu navegador no permite acceder al micrófono en este entorno.";

    micWarn.style.display = "block";

    return;
}


try {

    micStream =
        await navigator.mediaDevices.getUserMedia({
            audio: true
        });

}

catch (err) {

    console.error(err);

    micWarn.textContent =
        "No se pudo acceder al micrófono. Revisa los permisos del navegador.";

    micWarn.style.display = "block";

    return;
}


/* =================================================
   AUDIO VISUALIZER
================================================= */

try {

    const AudioContextAPI =
        window.AudioContext ||
        window.webkitAudioContext;

    audioCtx =
        new AudioContextAPI();

    source =
        audioCtx.createMediaStreamSource(
            micStream
        );

    analyser =
        audioCtx.createAnalyser();

    analyser.fftSize = 256;

    analyser.smoothingTimeConstant = 0.8;

    source.connect(analyser);

    drawWave();

}

catch (err) {

    console.warn(
        "No se pudo iniciar el visualizador:",
        err
    );

}


/* =================================================
   SPEECH RECOGNITION
================================================= */

recognition =
    new SpeechRecognitionAPI();

recognition.lang =
    "en-US";

recognition.continuous =
    true;

recognition.interimResults =
    true;


/* =================================================
   RESULTS
================================================= */

recognition.onresult =
    (event) => {

        let interim = "";


        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            if (
                event.results[i].isFinal
            ) {

                finalTranscript +=
                    event.results[i][0]
                        .transcript + " ";

            }

            else {

                interim +=
                    event.results[i][0]
                        .transcript;

            }

        }


        const text =
            finalTranscript + interim;


        transcriptBox.innerHTML = "";


        if (text.trim()) {

            transcriptBox.textContent =
                text;

        }

        else {

            transcriptBox.innerHTML = `
                <span class="oak-placeholder">
                    Escuchando…
                </span>
            `;

        }


        finishBtn.disabled =
            finalTranscript.trim().length === 0;

    };


/* =================================================
   ERROR
================================================= */

recognition.onerror =
    (event) => {

        console.warn(
            "Speech Recognition:",
            event.error
        );

    };


/* =================================================
   RESTART
================================================= */

recognition.onend =
    () => {

        if (recognizing) {

            try {

                recognition.start();

            }

            catch (error) {

                console.warn(
                    "Recognition restart:",
                    error
                );

            }

        }

    };


/* =================================================
   START
================================================= */

try {

    recognition.start();

}

catch (error) {

    console.warn(
        "No se pudo iniciar reconocimiento:",
        error
    );

}


recognizing = true;

startTime = Date.now();


/* =================================================
   BUTTON
================================================= */

micBtn.classList.add(
    "is-recording"
);

micBtn.textContent =
    "⏹";

micBtn.setAttribute(
    "aria-label",
    "Detener grabación"
);


micStatus.textContent =
    "Grabando… pulsa para terminar";


}

/* =====================================================
STOP RECORDING
===================================================== */

function stopRecording() {


recognizing = false;


/* Speech recognition */

if (recognition) {

    try {

        recognition.onend = null;

        recognition.stop();

    }

    catch (e) {}

    recognition = null;

}


/* Microphone */

if (micStream) {

    micStream
        .getTracks()
        .forEach(
            track => track.stop()
        );

    micStream = null;

}


/* Audio */

if (source) {

    try {
        source.disconnect();
    }

    catch (e) {}

    source = null;

}


if (audioCtx) {

    try {
        audioCtx.close();
    }

    catch (e) {}

    audioCtx = null;

}


analyser = null;


/* Animation */

if (waveAnim) {

    cancelAnimationFrame(
        waveAnim
    );

    waveAnim = null;

}


/* Button */

micBtn.classList.remove(
    "is-recording"
);

micBtn.textContent =
    "🎤";

micBtn.setAttribute(
    "aria-label",
    "Comenzar grabación"
);


micStatus.textContent =
    "Pulsa para grabar de nuevo";


clearWave();

}

/* =====================================================
MICROPHONE BUTTON
===================================================== */

micBtn.addEventListener(
"click",
toggleRecording
);

/* =====================================================
CLEAR WAVE
===================================================== */

function clearWave() {


const canvas =
    document.getElementById(
        "waveCanvas"
    );

if (!canvas) return;


const ctx =
    canvas.getContext("2d");


ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
);

}

/* =====================================================
AUDIO WAVE
===================================================== */

function drawWave() {


const canvas =
    document.getElementById(
        "waveCanvas"
    );

if (!canvas || !analyser) return;


const ctx =
    canvas.getContext("2d");


const data =
    new Uint8Array(
        analyser.frequencyBinCount
    );


function loop() {

    if (!analyser || !recognizing) {
        return;
    }


    waveAnim =
        requestAnimationFrame(
            loop
        );


    analyser.getByteTimeDomainData(
        data
    );


    /* CALCULAR VOLUMEN */

    let sum = 0;


    for (
        let i = 0;
        i < data.length;
        i++
    ) {

        const value =
            (data[i] - 128) / 128;

        sum += value * value;

    }


    const volume =
        Math.sqrt(
            sum / data.length
        );


    /* LIMPIAR CANVAS */

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* Si casi no hay sonido */

    if (volume < 0.025) {
        return;
    }


    /* DIBUJAR ONDA */

    ctx.beginPath();


    const slice =
        canvas.width /
        data.length;


    let x = 0;


    for (
        let i = 0;
        i < data.length;
        i++
    ) {

        const v =
            data[i] / 128.0;


        const y =
            v *
            canvas.height /
            2;


        if (i === 0) {

            ctx.moveTo(
                x,
                y
            );

        }

        else {

            ctx.lineTo(
                x,
                y
            );

        }


        x += slice;

    }


    ctx.strokeStyle =
        "#152B54";

    ctx.lineWidth =
        2;

    ctx.stroke();

}


loop();


}

/* =====================================================
EVALUATE SPEECH
===================================================== */

function evaluateSpeech() {

const endTime =
    Date.now();


const durationSec =
    startTime
        ? Math.max(
            1,
            (endTime - startTime) / 1000
        )
        : 1;


stopRecording();


const transcript =
    finalTranscript
        .trim()
        .toLowerCase();


if (!transcript) {
    return;
}


/* =================================================
   WORDS
================================================= */

const words =
    transcript
        .split(/\s+/)
        .filter(Boolean);


const wpm =
    Math.round(
        words.length /
        (durationSec / 60)
    );


/* =================================================
   CONTENT
================================================= */

const matched =
    currentEx.keywords.filter(
        keyword =>
            transcript.includes(keyword)
    );


const contentPct =
    Math.round(
        (
            matched.length /
            currentEx.keywords.length
        ) * 100
    );


/* =================================================
   FILLERS
================================================= */

const fillerList = [
    "um",
    "uh",
    "erm",
    "like i said",
    "you know"
];


let fillerCount = 0;


fillerList.forEach(
    filler => {

        const escaped =
            filler.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );


        const re =
            new RegExp(
                `\\b${escaped}\\b`,
                "g"
            );


        const matches =
            transcript.match(re);


        if (matches) {

            fillerCount +=
                matches.length;

        }

    }
);


/* =================================================
   PACE
================================================= */

let paceScore = 100;


if (wpm < 90) {

    paceScore =
        Math.max(
            30,
            100 -
            (90 - wpm) * 1.5
        );

}


if (wpm > 150) {

    paceScore =
        Math.max(
            30,
            100 -
            (wpm - 150) * 1.5
        );

}


if (words.length < 5) {

    paceScore = 20;

}


/* =================================================
   FLUENCY
================================================= */

const fluencyScore =
    Math.max(
        0,
        100 -
        fillerCount * 12
    );


/* =================================================
   OVERALL
================================================= */

const overall =
    Math.round(
        contentPct * 0.5 +
        fluencyScore * 0.3 +
        paceScore * 0.2
    );


/* =================================================
   DISPLAY RESULTS
================================================= */

resultsBox.classList.add(
    "is-open"
);


document.getElementById(
    "scoreNum"
).textContent =
    overall + "%";


document.getElementById(
    "mContent"
).textContent =
    matched.length +
    "/" +
    currentEx.keywords.length +
    " ideas clave";


document.getElementById(
    "mPace"
).textContent =
    words.length < 5
        ? "—"
        : wpm;


document.getElementById(
    "mFillers"
).textContent =
    fillerCount;


document.getElementById(
    "mDur"
).textContent =
    Math.round(durationSec) +
    "s";


/* =================================================
   FEEDBACK
================================================= */

let note = "";


if (words.length < 5) {

    note =
        "Casi no se registró audio. " +
        "Intenta hablar un poco más cerca " +
        "del micrófono y responde con al menos " +
        "2-3 frases.";

}

else if (overall >= 75) {

    note =
        "Muy buena respuesta: cubriste " +
        "la mayoría de las ideas clave " +
        "con un ritmo natural.";

}

else if (overall >= 50) {

    note =
        "Vas bien. Intenta mencionar más " +
        "detalles de la situación (" +
        currentEx.keywords
            .slice(0, 3)
            .join(", ") +
        ") y reduce las pausas largas.";

}

else {

    note =
        "Te faltó cubrir varias ideas clave. " +
        "Vuelve a leer la tarea, piensa 2 frases " +
        "antes de grabar y evita muletillas " +
        "como 'um' o 'uh'.";

}


document.getElementById(
    "feedbackNote"
).textContent =
    note;


}

/* =====================================================
FINISH BUTTON
===================================================== */

finishBtn.addEventListener(
"click",
evaluateSpeech
);
