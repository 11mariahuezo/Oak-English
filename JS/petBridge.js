(function () {
  const STORAGE = {
    progress: 'dinoProgresoIngles',
    last: 'dinoPetLastResult',
    pageHash: 'dinoPetSessionPage'
  };

  const PASS_THRESHOLD = 80;

  function normalizeNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getCurrentProgress() {
    return clamp(normalizeNumber(localStorage.getItem(STORAGE.progress), 0), 0, 10);
  }

  function setCurrentProgress(nextValue) {
    localStorage.setItem(STORAGE.progress, String(clamp(nextValue, 0, 10)));
  }

  function notifyPet(payload) {
    localStorage.setItem(STORAGE.last, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent('pet-progress-update', { detail: payload }));

    const popup = document.getElementById('pet-result-popup');
    if (popup) {
      popup.remove();
    }

    const bubble = document.createElement('div');
    bubble.id = 'pet-result-popup';
    bubble.style.position = 'fixed';
    bubble.style.right = '18px';
    bubble.style.bottom = '18px';
    bubble.style.zIndex = '2000';
    bubble.style.background = '#ffffff';
    bubble.style.border = '1px solid #dfeaf7';
    bubble.style.borderRadius = '16px';
    bubble.style.boxShadow = '0 12px 30px rgba(22,35,63,0.12)';
    bubble.style.padding = '14px 16px';
    bubble.style.maxWidth = '320px';
    bubble.style.fontFamily = 'Poppins, sans-serif';
    bubble.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="font-size:2rem;">🦖</div>
        <div>
          <div style="font-weight:700;color:#16233F;">${payload.passed ? 'Dino grew!' : 'Almost there!'}</div>
          <div style="font-size:0.9rem;color:#647180;">${payload.label}: ${payload.percent}%</div>
        </div>
      </div>
    `;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2800);
  }

  function markPageDone(label, percent, passed) {
    const previous = getCurrentProgress();
    const next = passed ? Math.min(10, previous + 1) : previous;

    if (passed) {
      setCurrentProgress(next);
    }

    const payload = {
      label,
      percent,
      passed,
      nextLevel: next + 1,
      date: new Date().toISOString()
    };

    notifyPet(payload);

    if (window.location.pathname.indexOf('Mascota.html') === -1) {
      setTimeout(() => {
        window.location.href = 'Mascota.html';
      }, 700);
    }

    return true;
  }

  window.petProgressFromExercise = function (label, percent) {
    const value = clamp(normalizeNumber(percent, 0), 0, 100);
    const passed = value >= PASS_THRESHOLD;
    markPageDone(label, value, passed);
    return { label, percent: value, passed };
  };
})();
