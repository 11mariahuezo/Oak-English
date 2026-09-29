// ==========================================================================
// LÓGICA DE JUEGO ACCESIBLE CON 11 FASES DE EVOLUCIÓN
// ==========================================================================

const ETAPAS = {
    // 4 Fases de Huevo (Lecciones 0 a 3)
    1: { rutaImagen: "img/huevo1.jpg", texto: "Level 1: A mysterious Dino egg ", alt: "An unbroken dinosaur egg." },
    2: { rutaImagen: "img/huevo2.jpg", texto: "Level 2: The egg starts to crack! ", alt: "A dinosaur egg with small cracks." },
    3: { rutaImagen: "img/huevo3.jpg", texto: "Level 3: You hear little sounds inside the egg! ", alt: "An egg with big cracks." },
    4: { rutaImagen: "img/huevo4.jpg", texto: "Level 4: The shell is about to break! ", alt: "An almost broken egg." },
    
    // 4 Fases de Bebé (Lecciones 4 a 7)
    5: { rutaImagen: "img/bebe1.jpg", texto: "Level 5: A cute baby Dino is born! ", alt: "A very small newborn dinosaur." },
    6: { rutaImagen: "img/bebe2.jpg", texto: "Level 6: Baby Dino learned to sit ", alt: "A sitting baby dinosaur." },
    7: { rutaImagen: "img/bebe3.jpg", texto: "Level 7: Baby Dino is taking the first steps! ", alt: "A baby dinosaur trying to walk." },
    8: { rutaImagen: "img/bebe4.jpg", texto: "Level 8: Baby Dino is playing happily! ", alt: "A baby dinosaur playing." },
    
    // 2 Fases de Niño (Lecciones 8 a 9)
    9: { rutaImagen: "img/niño1.jpg", texto: "Level 9: Young Dino is big and strong! ", alt: "A young dinosaur waving." },
    10: { rutaImagen: "img/niño2.jpg", texto: "Level 10: Young Dino practices English with you! ", alt: "A young dinosaur interacting." },
    
    // 1 Fase de Estudiante (Lección 10 en adelante)
    11: { rutaImagen: "img/estudiante.jpg", texto: "Level 11: Student Dino is ready with a backpack! ", alt: "A fully grown student dinosaur." }
};

const MAX_LECCIONES = 10; // 0 lecciones = Nivel 1, 10 lecciones completadas = Nivel 11
let leccionesCompletadas = parseInt(localStorage.getItem('dinoProgresoIngles')) || 0;

// Elementos DOM
const contenedorImg = document.getElementById('dino-contenedor-img');
const mascotaDisplay = document.getElementById('mascota-display');
const dinoImg = document.getElementById('dino-img');
const estadoTexto = document.getElementById('estado-texto');
const barraProgreso = document.getElementById('barra-progreso');
const barraAccesible = document.getElementById('barra-accesible');
const porcentajeTexto = document.getElementById('porcentaje-texto');
const nivelNumText = document.getElementById('nivel-num');

window.addEventListener('pet-progress-update', (event) => {
    const detail = event.detail || {};
    const stored = parseInt(localStorage.getItem('dinoProgresoIngles'), 10) || 0;
    const nextValue = Math.min(MAX_LECCIONES, Math.max(0, stored));
    if (detail.passed || typeof detail.percent === 'number') {
        leccionesCompletadas = nextValue;
        actualizarInterfaz(true);
        if (detail.passed) {
            generarCorazones();
            mostrarMensajeMotivador(detail.percent || 100);
        }
    }
});

function syncPetProgressFromStorage() {
    leccionesCompletadas = Math.min(MAX_LECCIONES, Math.max(0, parseInt(localStorage.getItem('dinoProgresoIngles'), 10) || 0));
    actualizarInterfaz(false);
}

syncPetProgressFromStorage();

function completarLeccion() {
    if (leccionesCompletadas >= MAX_LECCIONES) {
        alert("Congratulations! You finished the course and Dino reached the highest Student level.");
        return;
    }

    let nota = prompt("What score did you get in your exercise? (0 to 100):", "100");
    if (nota === null) return;
    
    let porcentajeAciertos = parseFloat(nota);

    if (isNaN(porcentajeAciertos) || porcentajeAciertos < 0 || porcentajeAciertos > 100) {
        alert("Please enter a valid number from 0 to 100.");
        return;
    }

    // Regla pedagógica del 80% o más
    if (porcentajeAciertos >= 80) {
        leccionesCompletadas++;
        localStorage.setItem('dinoProgresoIngles', leccionesCompletadas);
        
        actualizarInterfaz(true);
        mostrarMensajeMotivador(porcentajeAciertos);
        generarCorazones();
    } else {
        alert(`You got ${porcentajeAciertos}%. Almost there! You need 80% or more to help Dino grow. Try again! 💪`);
    }
}

function mostrarMensajeMotivador(nota) {
    const mensajes = [
        `Amazing work! You got ${nota}%. Dino is very proud of you! ⭐`,
        `Fantastic! ${nota}% accuracy. Keep going, you are learning English! 🚀`,
        `Wooow! ${nota}%. Your hard work is paying off and Dino celebrates with you! 🎉`
    ];
    
    let mensajeRandom = mensajes[Math.floor(Math.random() * mensajes.length)];
    let mensajeOriginal = estadoTexto.innerText;
    
    estadoTexto.innerText = mensajeRandom;
    
    setTimeout(() => {
        estadoTexto.innerText = mensajeOriginal;
    }, 4000);
}

function interactuarMascota() {
    contenedorImg.classList.add('animar-interaccion');
    generarCorazones();
    
    const mensajesFase = {
        1: "The little egg responds to your love! 🥚💖",
        2: "You feel little taps inside the egg! 🐣❤️",
        3: "The egg rocks happily! 🔨💖",
        4: "The shell shines with excitement! ✨❤️",
        5: "Baby Dino yawns and smiles! 🧩💖",
        6: "Baby Dino tries to clap! 👶❤️",
        7: "Baby Dino takes a few steps toward you! 🐾💖",
        8: "Baby Dino makes a tiny jump! 🎈❤️",
        9: "Young Dino gives you a big hug! ✨💖",
        10: "Dino practices pronunciation with you! 🗣️❤️",
        11: "Student Dino opens the notebook with excitement! 🎒📚❤️"
    };
    
    let nivelActual = leccionesCompletadas + 1;
    let mensajeOriginal = estadoTexto.innerText;
    
    estadoTexto.innerText = mensajesFase[nivelActual] || "Dino loves to play with you!";
    
    setTimeout(() => {
        contenedorImg.classList.remove('animar-interaccion');
        estadoTexto.innerText = mensajeOriginal;
    }, 3000);
}

function generarCorazones() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const emojis = ["💖", "❤️", "💕", "✨", "💗"];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const corazon = document.createElement('div');
            corazon.classList.add('corazon-flotante');
            corazon.innerText = emojis[Math.floor(Math.random() * emojis.length)];
            corazon.setAttribute('aria-hidden', 'true');
            
            const posX = Math.random() * 70 + 15;
            const posY = Math.random() * 30 + 40;
            
            corazon.style.left = `${posX}%`;
            corazon.style.top = `${posY}%`;
            
            mascotaDisplay.appendChild(corazon);
            
            setTimeout(() => {
                corazon.remove();
            }, 1500);
        }, i * 150);
    }
}

function actualizarInterfaz(conAnimacion) {
    // Calculamos el nivel de 1 a 11 basado en lecciones completadas (0 a 10)
    const nivelActual = leccionesCompletadas + 1;
    const etapa = ETAPAS[nivelActual];

    const porcentaje = Math.min((leccionesCompletadas / MAX_LECCIONES) * 100, 100);
    
    barraProgreso.style.width = `${porcentaje}%`;
    porcentajeTexto.innerText = `${Math.round(porcentaje)}%`;
    barraAccesible.setAttribute('aria-valuenow', Math.round(porcentaje));
    nivelNumText.innerText = nivelActual;

    dinoImg.src = etapa.rutaImagen;
    dinoImg.alt = etapa.alt;
    estadoTexto.innerText = etapa.texto;

    if (conAnimacion && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        contenedorImg.classList.add('animar-subida');
        setTimeout(() => {
            contenedorImg.classList.remove('animar-subida');
        }, 400);
    }
}

function reiniciarProgreso() {
    if (confirm("Do you want to restart the adventure? Your dinosaur will return to level 1 inside the egg.")) {
        leccionesCompletadas = 0;
        localStorage.removeItem('dinoProgresoIngles');
        actualizarInterfaz(true);
    }
}