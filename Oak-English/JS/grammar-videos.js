const videos = [
    {
      id: 'VJzqOdKgdq4',
      title: 'Prepositional phrases',
      checkpoint: {
        time: 20,
        question: 'What topic is explained right before this point in the video?',
        options: [
          { text: 'Prepositional  phrases', correct: true },
          { text: 'Adjectives', correct: false },
          { text: 'Modal verbs', correct: false }
        ]
      }
    },

    {
        id: 'qqX4NMjBHE8',
      title: 'Simple present',
      checkpoint: {
        time: 18,
        question: 'What is the use of the simple present?',
        options: [
          { text: 'Habits, routines, facts.', correct: true },
          { text: 'Imaginary situations', correct: false },
          { text: 'Future situations', correct: false }
          ]
        
        }
    },
    
    {
      id: '-Kmpd4EZAGM',
      title: 'Articles',
      checkpoint: null // no question, plays normally
    },
    {
      id: 'xaIeqK5jZHw',
      title: 'Possessive adjectives',
      checkpoint: {
        time: 15,
        question: 'What is the main idea of this section?',
        options: [
          { text: 'Option A', correct: false },
          { text: 'Option B', correct: true },
          { text: 'Option C', correct: false }
        ]
      }
    },
    {
      id: '_pWh761n6qQ',
      title: 'Simple past',
      checkpoint: null
    }
  ];

  const grid = document.getElementById('videosGrid');

  videos.forEach((v, i) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <div class="video-thumb">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}">
        <div class="thumb-overlay">
          <div class="big-play">▶</div>
        </div>
        ${v.checkpoint ? '<div class="checkpoint-pill">Has a question</div>' : ''}
      </div>
      <div class="video-info">
        <div class="video-number">Video ${i + 1}</div>
        <div class="video-title">${v.title}</div>
        <div class="play-hint">
          <span class="dot">▶</span>
          <span>Click to watch full screen</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openModal(v));
    grid.appendChild(card);
  });

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalTitleBar = document.getElementById('modalTitleBar');
  const questionOverlay = document.getElementById('questionOverlay');
  const questionText = document.getElementById('questionText');
  const qOptions = document.getElementById('qOptions');
  const qFeedback = document.getElementById('qFeedback');

  let ytPlayer = null;
  let ytApiReady = false;
  let pollTimer = null;
  let currentVideo = null;
  let cleared = false;
  let questionShown = false;

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  window.onYouTubeIframeAPIReady = function () {
    ytApiReady = true;
  };

  function openModal(video) {
    currentVideo = video;
    cleared = false;
    questionShown = false;
    modalTitleBar.textContent = video.title;
    questionOverlay.classList.remove('active');
    modalBackdrop.classList.add('active');

    if (!ytApiReady) {
      setTimeout(() => openModal(video), 200);
      return;
    }

    if (ytPlayer) {
      ytPlayer.loadVideoById(video.id);
    } else {
      ytPlayer = new YT.Player('modal-yt-player', {
        videoId: video.id,
        playerVars: { rel: 0, modestbranding: 1, autoplay: 1 },
        events: {
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      });
    }

    clearInterval(pollTimer);
    pollTimer = setInterval(checkCheckpoint, 300);
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    clearInterval(pollTimer);
    if (ytPlayer && ytPlayer.stopVideo) ytPlayer.stopVideo();
    questionOverlay.classList.remove('active');
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });

  function checkCheckpoint() {
    if (!ytPlayer || !ytPlayer.getCurrentTime || !currentVideo || !currentVideo.checkpoint) return;
    const t = ytPlayer.getCurrentTime();
    const cp = currentVideo.checkpoint;

    if (!cleared && !questionShown && t >= cp.time) {
      ytPlayer.pauseVideo();
      showQuestion(cp);
      questionShown = true;
    }
  }

  function onPlayerStateChange(e) {
    if (!currentVideo || !currentVideo.checkpoint) return;
    const cp = currentVideo.checkpoint;
    if (!cleared && e.data === YT.PlayerState.PLAYING) {
      if (ytPlayer.getCurrentTime() > cp.time + 0.5) {
        ytPlayer.seekTo(cp.time, true);
      }
    }
  }

  
  function onPlayerError(e) {
    const reasons = {
      2: 'Invalid video ID.',
      5: 'This video cannot be played in the HTML5 player.',
      100: 'Video not found (removed or private).',
      101: 'The video owner disabled embedding on other websites.',
      150: 'The video owner disabled embedding on other websites.'
    };
    console.error('YouTube player error for video', currentVideo && currentVideo.id, '-', reasons[e.data] || e.data);
    modalTitleBar.textContent = (currentVideo ? currentVideo.title + ' — ' : '') + 'this video could not be loaded (' + (reasons[e.data] || 'unknown error') + ')';
  }

  function showQuestion(cp) {
    questionText.textContent = cp.question;
    qOptions.innerHTML = '';
    qFeedback.textContent = '';
    cp.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'q-option';
      btn.textContent = opt.text;
      btn.onclick = () => handleAnswer(opt, btn);
      qOptions.appendChild(btn);
    });
    questionOverlay.classList.add('active');
  }

  function handleAnswer(opt, btn) {
    if (opt.correct) {
      btn.classList.add('correct');
      qFeedback.textContent = 'Correct! Resuming the video...';
      cleared = true;
      setTimeout(() => {
        questionOverlay.classList.remove('active');
        ytPlayer.playVideo();
      }, 700);
    } else {
      btn.classList.add('wrong');
      qFeedback.textContent = "That's not it. Try again.";
      setTimeout(() => btn.classList.remove('wrong'), 600);
    }
  }