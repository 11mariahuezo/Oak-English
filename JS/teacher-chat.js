(() => {
  const teacherReplies = [
    {
      keywords: ['hello', 'hi', 'hola'],
      answer: 'Hello! I am Pet IA. You can ask me about grammar, words, pronunciation, or write a sentence for practice.'
    },
    {
      keywords: ['present simple', 'simple present', 'do you', 'does'],
      answer: 'Use the present simple for habits and facts. Example: I study English every day. For a question, say: Do you study English?'
    },
    {
      keywords: ['past', 'pasado', 'yesterday', 'last week'],
      answer: 'Use the past simple for finished actions. Example: I visited London yesterday. Many regular verbs end in -ed.'
    },
    {
      keywords: ['vocabulary', 'word', 'palabra', 'meaning', 'significa'],
      answer: 'Send me one English word. I will explain its meaning and give you a short example.'
    },
    {
      keywords: ['correct', 'corregir', 'correction', 'sentence', 'frase'],
      answer: 'Write your sentence here. I will show a friendly correction and explain one small change.'
    },
    {
      keywords: ['pronunciation', 'pronounce', 'say', 'decir'],
      answer: 'Write the word you want to say. I can show a simple pronunciation guide and an example sentence.'
    },
    {
      keywords: ['thank', 'gracias', 'great', 'bien'],
      answer: 'You are welcome! Keep going. Small practice every day makes a big difference.'
    }
  ];

  function getReply(message) {
    const normalized = message
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const match = teacherReplies.find(item =>
      item.keywords.some(keyword => normalized.includes(keyword))
    );

    if (match) return match.answer;

    if (normalized.split(/\s+/).length === 1) {
      return `"${message}" is a good word to practise. Ask me “What does ${message} mean?” or write a sentence with it.`;
    }

    return 'I want to help! Try asking about present simple, past simple, a word meaning, pronunciation, or sentence correction.';
  }

  function addMessage(container, text, type) {
    const messageRow = document.createElement('div');
    messageRow.className = `teacher-chat-message-row ${type}`;

    if (type === 'teacher') {
      const avatar = document.createElement('img');
      avatar.className = 'teacher-chat-message-avatar';
      avatar.src = 'img/huevo.png';
      avatar.alt = 'Pet IA';
      messageRow.appendChild(avatar);
    }

    const message = document.createElement('div');
    message.className = 'teacher-chat-message';
    message.textContent = text;
    messageRow.appendChild(message);
    container.appendChild(messageRow);
    container.scrollTop = container.scrollHeight;
  }

  function createChat() {
    const stylesheet = document.querySelector('link[href$="teacher-chat.css"]');
    if (!stylesheet) {
      const newStylesheet = document.createElement('link');
      newStylesheet.rel = 'stylesheet';
      newStylesheet.href = 'css/teacher-chat.css';
      document.head.appendChild(newStylesheet);
    }

    let launcher = document.getElementById('teacher-chat-launcher');
    if (!launcher) {
      launcher = document.createElement('button');
      launcher.id = 'teacher-chat-launcher';
      launcher.className = 'teacher-chat-launcher';
      launcher.type = 'button';
      launcher.setAttribute('aria-label', 'Open Pet IA chat');
      launcher.setAttribute('aria-expanded', 'false');
      launcher.textContent = '🩵';
      document.body.appendChild(launcher);
    }

    if (document.getElementById('teacher-chat-panel')) return;

    const panel = document.createElement('section');
    panel.className = 'teacher-chat-panel';
    panel.hidden = true;
    panel.setAttribute('aria-label', 'Pet IA chat');
    panel.innerHTML = `
      <header class="teacher-chat-header">
        <div class="teacher-chat-title">
          <span class="teacher-chat-avatar" aria-hidden="true"><img src="img/huevo.png" alt=""></span>
          <span>Pet IA</span>
        </div>
        <button class="teacher-chat-close" type="button" aria-label="Close chat">×</button>
      </header>
      <div class="teacher-chat-messages" aria-live="polite"></div>
      <div class="teacher-chat-suggestions" aria-label="Quick questions">
        <button type="button" data-question="Explain present simple">Present simple</button>
        <button type="button" data-question="Help me correct my sentence">Correct a sentence</button>
        <button type="button" data-question="How do I pronounce this word?">Pronunciation</button>
      </div>
      <form class="teacher-chat-form">
        <input class="teacher-chat-input" type="text" placeholder="Ask your teacher..." autocomplete="off" aria-label="Write a message">
        <button class="teacher-chat-send" type="submit" aria-label="Send message">➤</button>
      </form>
    `;

    document.body.append(launcher, panel);

    const messages = panel.querySelector('.teacher-chat-messages');
    const input = panel.querySelector('.teacher-chat-input');
    const close = panel.querySelector('.teacher-chat-close');
    const suggestions = panel.querySelectorAll('[data-question]');

    addMessage(messages, 'Hi! I am Pet IA. How can I help you learn English?', 'teacher');

    function toggleChat(open) {
      panel.hidden = !open;
      launcher.setAttribute('aria-expanded', String(open));
      if (open) input.focus();
    }

    launcher.addEventListener('click', () => toggleChat(panel.hidden));
    close.addEventListener('click', () => toggleChat(false));
    suggestions.forEach(suggestion => {
      suggestion.addEventListener('click', () => {
        input.value = suggestion.dataset.question;
        input.focus();
      });
    });
    panel.querySelector('.teacher-chat-form').addEventListener('submit', event => {
      event.preventDefault();
      const message = input.value.trim();
      if (!message) return;
      addMessage(messages, message, 'student');
      input.value = '';
      window.setTimeout(() => addMessage(messages, getReply(message), 'teacher'), 250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChat);
  } else {
    createChat();
  }
})();
