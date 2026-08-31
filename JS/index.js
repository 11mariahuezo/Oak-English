//  CONFIGURACIÓN DE PASOS
const steps = [
  {
    id: "age",
    step: "Paso 1 de 8",
    question: "¿Qué edad tiene el estudiante?",
    sub: "Personalizamos el contenido según la edad.",
    type: "avatar",
    options: [
      { value: "4-7",   emoji: "🧒", label: "4–7 años"  },
      { value: "8-12",  emoji: "👦", label: "8–12 años" },
      { value: "13-17", emoji: "🧑", label: "13–17 años"}
    ]
  },
  {
    id: "level",
    step: "Paso 2 de 8",
    question: "¿Cuál es su nivel de inglés actual?",
    sub: "Comenzaremos desde donde estés.",
    type: "cards", cols: 1,
    options: [
      { value: "beginner",     icon: "ti-seedling", label: "Principiante", desc: "Vocabulario básico y saludos" },
      { value: "intermediate", icon: "ti-plant-2",  label: "Intermedio",   desc: "Puede mantener conversaciones simples" },
      { value: "advanced",     icon: "ti-trees",    label: "Avanzado",     desc: "Habla con fluidez, quiere perfeccionar" }
    ]
  },
  {
    id: "goal",
    step: "Paso 3 de 8",
    question: "¿Cuál es su objetivo principal?",
    sub: "Esto guía el tipo de lecciones que crearemos.",
    type: "cards", cols: 2,
    options: [
      { value: "conversation",  icon: "ti-messages",   label: "Conversar",     desc: "Hablar con confianza" },
      { value: "school",        icon: "ti-school",     label: "Escuela",       desc: "Mejorar calificaciones" },
      { value: "vocabulary",    icon: "ti-vocabulary", label: "Vocabulario",   desc: "Más palabras, más expresión" },
      { value: "pronunciation", icon: "ti-microphone", label: "Pronunciación", desc: "Sonar natural" }
    ]
  },
  {
    id: "time",
    step: "Paso 4 de 8",
    question: "¿Cuánto tiempo puede estudiar al día?",
    sub: "Crearemos un plan realista para ti.",
    type: "cards", cols: 2,
    options: [
      { value: "10",  icon: "ti-clock",        label: "10 minutos",  desc: "Sesiones rápidas"   },
      { value: "20",  icon: "ti-clock-2",      label: "20 minutos",  desc: "Ritmo moderado"     },
      { value: "30",  icon: "ti-clock-hour-4", label: "30 minutos",  desc: "Aprendizaje sólido" },
      { value: "30+", icon: "ti-clock-hour-8", label: "+30 minutos", desc: "Inmersión completa" }
    ]
  },
  {
    id: "style",
    step: "Paso 5 de 8",
    question: "¿Cómo aprende mejor?",
    sub: "Adaptamos el formato de las lecciones.",
    type: "cards", cols: 2,
    options: [
      { value: "videos",    icon: "ti-player-play",    label: "Videos",     desc: "Aprendizaje visual y auditivo" },
      { value: "games",     icon: "ti-device-gamepad", label: "Juegos",     desc: "Aprender jugando"              },
      { value: "reading",   icon: "ti-book",           label: "Lectura",    desc: "Textos y ejercicios escritos"  },
      { value: "listening", icon: "ti-headphones",     label: "Escuchando", desc: "Podcasts y audios"             }
    ]
  },
  {
    id: "needs",
    step: "Paso 6 de 8",
    question: "¿Necesita alguna adaptación especial?",
    sub: "Esto nos ayuda a hacer el contenido más accesible.",
    type: "cards", cols: 1,
    options: [
      { value: "none",       icon: "ti-circle-check", label: "No, ninguna",          desc: "Aprendizaje estándar"              },
      { value: "tea",        icon: "ti-puzzle",        label: "Autismo (TEA)",         desc: "Estructura clara, sin ambigüedades"},
      { value: "down",       icon: "ti-heart",         label: "Síndrome de Down",      desc: "Ritmo pausado, refuerzo visual"    },
      { value: "other",      icon: "ti-dots",          label: "Otra",                  desc: "Cuéntanos más al registrarte"      },
      { value: "prefer-not", icon: "ti-lock",          label: "Prefiero no responder", desc: ""                                  }
    ]
  },
  {
    id: "days",
    step: "Paso 7 de 8",
    question: "¿Cuántos días a la semana estudiará?",
    sub: "La constancia es la clave del éxito.",
    type: "cards", cols: 2,
    options: [
      { value: "1-2", icon: "ti-calendar-week",  label: "1–2 días",       desc: "Inicio suave"     },
      { value: "3-4", icon: "ti-calendar-event", label: "3–4 días",       desc: "Progreso estable" },
      { value: "5",   icon: "ti-calendar-stats", label: "5 días",         desc: "Avance rápido"    },
      { value: "7",   icon: "ti-calendar-check", label: "Todos los días", desc: "Máxima inmersión" }
    ]
  },
  {
    id: "topic",
    step: "Paso 8 de 8",
    question: "¿Qué tema le entusiasma más?",
    sub: "Usaremos esto para hacer las lecciones más divertidas.",
    type: "cards", cols: 2,
    options: [
      { value: "animals",    icon: "ti-paw",              label: "Animales",    desc: "La naturaleza y sus criaturas" },
      { value: "videogames", icon: "ti-device-gamepad-2", label: "Videojuegos", desc: "Aventuras digitales"           },
      { value: "sports",     icon: "ti-ball-football",    label: "Deportes",    desc: "Energía y competencia"         },
      { value: "music",      icon: "ti-music",            label: "Música",      desc: "Canciones y ritmos"            }
    ]
  }
];


//  ESTADO

let current  = 0;
let answers  = {};
let selected = null;
const wrapper = document.getElementById("onboarding-wrapper");

//  RENDER PASO

function renderStep() {
  const s = steps[current];
  selected = null;

  const pct = Math.round(((current + 1) / steps.length) * 100);
  let optionsHtml = "";

  if (s.type === "avatar") {
    optionsHtml = `<div class="avatar-grid">` +
      s.options.map(o => `
        <div class="avatar-opt" data-value="${o.value}" onclick="pick(this)">
          <span class="avatar-emoji">${o.emoji}</span>
          <span class="avatar-label">${o.label}</span>
        </div>
      `).join("") +
    `</div>`;
  } else {
    const gridClass = (s.cols || 1) === 2 ? "cols-2" : "cols-1";
    optionsHtml = `<div class="options-grid ${gridClass}">` +
      s.options.map(o => `
        <div class="opt-card" data-value="${o.value}" onclick="pick(this)">
          <i class="ti ${o.icon} opt-icon" aria-hidden="true"></i>
          <div>
            <div class="opt-name">${o.label}</div>
            ${o.desc ? `<div class="opt-desc">${o.desc}</div>` : ""}
          </div>
        </div>
      `).join("") +
    `</div>`;
  }

  const isLast = current === steps.length - 1;

  wrapper.innerHTML = `
    <div class="slide-in">
      <div class="progress-row">
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="progress-pct">${pct}%</span>
      </div>
      <div class="step-label">${s.step}</div>
      <div class="question">${s.question}</div>
      <div class="question-sub">${s.sub}</div>
      ${optionsHtml}
      <button class="btn-next" id="btnNext" disabled onclick="nextStep()">
        ${isLast ? "Ver mi perfil" : "Continuar"}
        <i class="ti ti-arrow-right" aria-hidden="true"></i>
      </button>
    </div>
  `;
}

//  SELECCIÓN
function pick(el) {
  wrapper.querySelectorAll(".opt-card.selected, .avatar-opt.selected")
         .forEach(e => e.classList.remove("selected"));
  el.classList.add("selected");
  selected = el.dataset.value;
  document.getElementById("btnNext").disabled = false;
}

//  AVANZAR
function nextStep() {
  if (!selected) return;
  answers[steps[current].id] = selected;
  current++;
  if (current < steps.length) {
    renderStep();
  } else {
    renderRegister();
  }
}

//  PANTALLA DE REGISTRO

function renderRegister() {
  const chips = Object.values(answers)
    .map(v => `<span class="chip">${v}</span>`).join("");

  wrapper.innerHTML = `
    <div class="slide-in">
      <div class="step-label" style="color:#0F6E56">Perfil completado</div>
      <div class="question" style="margin-bottom:4px">Casi listo</div>
      <div class="question-sub">Tu perfil de aprendizaje personalizado está listo.</div>
      <div class="chips">${chips}</div>
      <div class="register-card">
        <div class="register-title">Crear tu cuenta</div>
        <div class="register-sub">Guarda tu progreso y empieza a aprender hoy.</div>
        <div class="field">
          <label>Nombre completo</label>
          <input type="text" id="inp-name" placeholder="Ej. María González" autocomplete="name">
        </div>
        <div class="field">
          <label>Correo electrónico</label>
          <input type="email" id="inp-email" placeholder="correo@ejemplo.com" autocomplete="email">
        </div>
        <div class="field">
          <label>Contraseña</label>
          <input type="password" id="inp-pwd" placeholder="Mínimo 8 caracteres" autocomplete="new-password">
        </div>
        <button class="btn-next" onclick="register()" style="margin-top:1.25rem">
          Crear cuenta
          <i class="ti ti-user-plus" aria-hidden="true"></i>
        </button>
        <p class="login-link">¿Ya tienes cuenta? <a href="login.html">Iniciar sesión</a></p>
      </div>
    </div>
  `;
}

//  REGISTRO

async function register() {
  const name  = document.getElementById("inp-name").value.trim();
  const email = document.getElementById("inp-email").value.trim();
  const pwd   = document.getElementById("inp-pwd").value;

  if (!name || !email || !pwd) {
    alert("Por favor completa todos los campos.");
    return;
  }
  if (pwd.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  const payload = { name, email, password: pwd, profile: answers };

  // Guardar en localStorage hasta tener backend
  localStorage.setItem("userProfile", JSON.stringify(payload));

  // Muestra pantalla de éxito y redirige al home
  renderSuccess(name);
  setTimeout(() => { window.location.href = "home.html"; }, 2500);

  //  API ──
  // try {
  //   const res = await fetch("/api/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload)
  //   });
  //   const data = await res.json();
  //   if (!res.ok) throw new Error(data.message || "Error al registrar");
  //   localStorage.setItem("userProfile", JSON.stringify(payload));
  //   renderSuccess(name);
  //   setTimeout(() => { window.location.href = "login.html"; }, 2500);
  // } catch (err) {
  //   alert(err.message);
  // }
}


//  PANTALLA DE ÉXITO

function renderSuccess(name) {
  const chips = Object.values(answers)
    .map(v => `<span class="chip">${v}</span>`).join("");

  wrapper.innerHTML = `
    <div class="success slide-in">
      <div class="success-icon">🎉</div>
      <div class="success-title">¡Bienvenido, ${name.split(" ")[0]}!</div>
      <div class="success-sub">Tu cuenta ha sido creada. Tu plan de aprendizaje personalizado está listo.</div>
      <div class="chips" style="justify-content:center; margin-top:1.5rem">${chips}</div>
    </div>
  `;
}


//  ARRANQUE

renderStep();