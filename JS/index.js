// STEP CONFIGURATION
const steps = [
  {
    id: "age",
    step: "Step 1 of 8",
    question: "How old is the student?",
    sub: "We personalize the content based on age.",
    type: "avatar",
    options: [
      { value: "4-7",   emoji: "🧒", label: "4–7 years old"  },
      { value: "8-12",  emoji: "👦", label: "8–12 years old" },
      { value: "13-17", emoji: "🧑", label: "13–17 years old"}
    ]
  },
  {
    id: "level",
    step: "Step 2 of 8",
    question: "What is the student's current English level?",
    sub: "We'll start from where you are.",
    type: "cards", cols: 1,
    options: [
      { value: "beginner",     icon: "ti-seedling", label: "Beginner", desc: "Basic vocabulary and greetings" },
      { value: "intermediate", icon: "ti-plant-2",  label: "Intermediate", desc: "Can hold simple conversations" },
      { value: "advanced",     icon: "ti-trees",    label: "Advanced", desc: "Speaks fluently and wants to improve" }
    ]
  },
  {
    id: "goal",
    step: "Step 3 of 8",
    question: "What is the main goal?",
    sub: "This guides the type of lessons we create.",
    type: "cards", cols: 2,
    options: [
      { value: "conversation",  icon: "ti-messages",   label: "Conversation", desc: "Speak with confidence" },
      { value: "school",        icon: "ti-school",     label: "School", desc: "Improve grades" },
      { value: "vocabulary",    icon: "ti-vocabulary", label: "Vocabulary", desc: "More words, more expression" },
      { value: "pronunciation", icon: "ti-microphone", label: "Pronunciation", desc: "Sound natural" }
    ]
  },
  {
    id: "time",
    step: "Step 4 of 8",
    question: "How much time can you study each day?",
    sub: "We'll create a realistic plan for you.",
    type: "cards", cols: 2,
    options: [
      { value: "10",  icon: "ti-clock",        label: "10 minutes", desc: "Quick sessions" },
      { value: "20",  icon: "ti-clock-2",      label: "20 minutes", desc: "Moderate pace" },
      { value: "30",  icon: "ti-clock-hour-4", label: "30 minutes", desc: "Solid learning" },
      { value: "30+", icon: "ti-clock-hour-8", label: "30+ minutes", desc: "Full immersion" }
    ]
  },
  {
    id: "style",
    step: "Step 5 of 8",
    question: "How do you learn best?",
    sub: "We adapt lesson formats to your preferences.",
    type: "cards", cols: 2,
    options: [
      { value: "videos",    icon: "ti-player-play",    label: "Videos", desc: "Visual and auditory learning" },
      { value: "games",     icon: "ti-device-gamepad", label: "Games", desc: "Learn through play" },
      { value: "reading",   icon: "ti-book",           label: "Reading", desc: "Texts and written exercises" },
      { value: "listening", icon: "ti-headphones",     label: "Listening", desc: "Podcasts and audio lessons" }
    ]
  },
  {
    id: "needs",
    step: "Step 6 of 8",
    question: "Do you need any special accommodations?",
    sub: "This helps us make the content more accessible.",
    type: "cards", cols: 1,
    options: [
      { value: "none",       icon: "ti-circle-check", label: "No, none", desc: "Standard learning" },
      { value: "tea",        icon: "ti-puzzle", label: "Autism (ASD)", desc: "Clear structure, no ambiguity" },
      { value: "down",       icon: "ti-heart", label: "Down Syndrome", desc: "Slower pace, visual support" },
      { value: "other",      icon: "ti-dots", label: "Other", desc: "Tell us more during registration" },
      { value: "prefer-not", icon: "ti-lock", label: "Prefer not to answer", desc: "" }
    ]
  },
  {
    id: "days",
    step: "Step 7 of 8",
    question: "How many days per week will you study?",
    sub: "Consistency is the key to success.",
    type: "cards", cols: 2,
    options: [
      { value: "1-2", icon: "ti-calendar-week", label: "1–2 days", desc: "Easy start" },
      { value: "3-4", icon: "ti-calendar-event", label: "3–4 days", desc: "Steady progress" },
      { value: "5",   icon: "ti-calendar-stats", label: "5 days", desc: "Fast improvement" },
      { value: "7",   icon: "ti-calendar-check", label: "Every day", desc: "Maximum immersion" }
    ]
  },
  {
    id: "topic",
    step: "Step 8 of 8",
    question: "What topic excites you the most?",
    sub: "We'll use this to make lessons more engaging.",
    type: "cards", cols: 2,
    options: [
      { value: "animals",    icon: "ti-paw", label: "Animals", desc: "Nature and its creatures" },
      { value: "videogames", icon: "ti-device-gamepad-2", label: "Video Games", desc: "Digital adventures" },
      { value: "sports",     icon: "ti-ball-football", label: "Sports", desc: "Energy and competition" },
      { value: "music",      icon: "ti-music", label: "Music", desc: "Songs and rhythms" }
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
        ${isLast ? "Ver mi perfil" : "Continue"}
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
      <div class="step-label" style="color:#0F6E56">Profile completed</div>
      <div class="question" style="margin-bottom:4px">Almost ready</div>
      <div class="question-sub">Your personalized learning profile is ready.</div>
      <div class="chips">${chips}</div>
      <div class="register-card">
        <div class="register-title">Create your account</div>
        <div class="register-sub">Save your progress and start learning today..</div>
        <div class="field">
          <label>Full name</label>
          <input type="text" id="inp-name" placeholder="E.g.. María González" autocomplete="name">
        </div>
        <div class="field">
          <label>Email address</label>
          <input type="email" id="inp-email" placeholder="email@example.com" autocomplete="email">
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" id="inp-pwd" placeholder="Minimum 8 characters" autocomplete="new-password">
        </div>
        <button class="btn-next" onclick="register()" style="margin-top:1.25rem">
          Create account
          <i class="ti ti-user-plus" aria-hidden="true"></i>
        </button>
        <p class="login-link">Already have an account?<a href="login.html">Sign in</a></p>
      </div>
    </div>
  `;
}

//  REGISTRO
async function register() {

    const name = document.getElementById("inp-name").value.trim();
    const email = document.getElementById("inp-email").value.trim();
    const pwd = document.getElementById("inp-pwd").value;

    if (!name || !email || !pwd) {
        alert("Please fill out all fields.");
        return;
    }

    if (pwd.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    try {


        const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: pwd,
    options: {
        data: {
            name: name,
            age: answers.age,
            level: answers.level,
            goal: answers.goal,
            study_time: answers.time,
            learning_style: answers.style,
            needs: answers.needs,
            study_days: answers.days,
            topic: answers.topic
        }
    }
});

        if (error) {
            throw error;
        }
        
        const payload = {
            name: name,
            email: email,
            profile: answers
        };

        localStorage.setItem(
            "userProfile",
            JSON.stringify(payload)
        );

        renderSuccess(name);

        setTimeout(() => {
            window.location.href = "home.html";
        }, 2500);


    } catch (error) {

    console.error("ERROR COMPLETO:", error);
    console.error("MENSAJE:", error?.message);
    console.error("DETALLES:", error?.details);
    console.error("HINT:", error?.hint);
    console.error("CÓDIGO:", error?.code);

    alert(
        "Error: " +
        (error?.message || "Error desconocido")
    );
  }
}


//  PANTALLA DE ÉXITO

function renderSuccess(name) {
  const chips = Object.values(answers)
    .map(v => `<span class="chip">${v}</span>`).join("");

  wrapper.innerHTML = `
    <div class="success slide-in">
      <div class="success-icon">🎉</div>
      <div class="success-title">¡Welcome, ${name.split(" ")[0]}!</div>
      <div class="success-sub">Your account has been created. Your personalized learning plan is ready.</div>
      <div class="chips" style="justify-content:center; margin-top:1.5rem">${chips}</div>
    </div>
  `;
}


//  ARRANQUE

renderStep();