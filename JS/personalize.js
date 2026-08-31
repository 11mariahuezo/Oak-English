(function(){
  var THEME = {
    grammar:    { badge:'GR', color:'#4B4FA0', title:'Grammar' },
    vocabulary: { badge:'VO', color:'#5C7C9E', title:'Vocabulary' },
    reading:    { badge:'RE', color:'#233B75', title:'Reading' },
    listening:  { badge:'LI', color:'#345FA8', title:'Listening' },
    writing:    { badge:'WR', color:'#3E6FD1', title:'Writing' },
    speaking:   { badge:'SP', color:'#16233F', title:'Speaking' }
  };

  var DATA = {
    grammar: {
      type:'quiz',
      levels:{
        A1:{ tip:'Master the verb "to be" and the simple present.',
             question:'Choose the correct form: "She ___ a teacher."',
             options:['is','are','am','be'], correct:0,
             explanation:'With "she", we use "is" — the verb "to be" changes with each subject.' },
        A2:{ tip:'Practice regular and irregular verbs in the past simple.',
             question:'Yesterday, I ___ to the market.',
             options:['goed','gone','went','going'], correct:2,
             explanation:'"Go" is irregular — its past simple form is "went", not "goed".' },
        B1:{ tip:'Use the present perfect to talk about life experiences.',
             question:'Complete: "I ___ sushi before."',
             options:['never tried','never try','have never tried','never have tried'], correct:2,
             explanation:'"Have never tried" is the present perfect — used for experiences up to now.' },
        B2:{ tip:'Practice the third conditional for hypothetical past situations.',
             question:'If she ___ harder, she would have passed the exam.',
             options:['studied','would study','had studied','has studied'], correct:2,
             explanation:'Third conditional: "If + past perfect, ... would have + past participle".' }
      }
    },
    vocabulary: {
      type:'quiz',
      levels:{
        A1:{ tip:'Build everyday vocabulary for places and objects.',
             question:'Which word means "a place where you buy food"?',
             options:['Hospital','Supermarket','Library','Airport'], correct:1,
             explanation:'A supermarket is where you go to buy groceries and food.' },
        A2:{ tip:'Learn words for describing things and prices.',
             question:'Choose the opposite of "cheap".',
             options:['Expensive','Cold','Small','Fast'], correct:0,
             explanation:'"Expensive" is the opposite of "cheap" — both describe price.' },
        B1:{ tip:'Expand your vocabulary with common phrasal verbs.',
             question:'"To put off" a meeting means to...',
             options:['Cancel it','Postpone it','Attend it','Start it'], correct:1,
             explanation:'"Put off" means to delay or reschedule something for later.' },
        B2:{ tip:'Master nuanced idiomatic expressions.',
             question:'"To turn a blind eye" means to...',
             options:['Ignore something on purpose','Look carefully','Get angry','Apologize'], correct:0,
             explanation:'This idiom describes deliberately pretending not to notice something.' }
      }
    },
    reading: {
      type:'quiz',
      levels:{
        A1:{ tip:'Practice reading short signs and notices.',
             passage:'"OPEN: Monday to Friday, 9am – 5pm. Closed on weekends."',
             question:'Can you visit the store on Sunday?',
             options:['Yes','No'], correct:1,
             explanation:'The sign says the store is closed on weekends, and Sunday is part of the weekend.' },
        A2:{ tip:'Practice reading short personal messages.',
             passage:'"Hi Ana, I can\'t come to the party tonight because I have a headache. See you next week! – Marco"',
             question:'Why can\'t Marco come to the party?',
             options:['He\'s busy','He\'s sick','He forgot','He doesn\'t want to'], correct:1,
             explanation:'Marco says he has a headache, which means he\'s not feeling well.' },
        B1:{ tip:'Read short articles and find the main idea.',
             passage:'"Remote work has become common since many companies realized employees can be just as productive from home, saving time and money on commuting."',
             question:'What is the main idea of the text?',
             options:['Employees dislike remote work','Remote work can be productive and save resources','Companies are closing offices','Commuting is enjoyable'], correct:1,
             explanation:'The text focuses on productivity and savings as the benefits of remote work.' },
        B2:{ tip:'Read more complex texts and identify the author\'s point of view.',
             passage:'"While some argue that social media connects people, critics point out it often replaces meaningful, face-to-face interaction with superficial engagement."',
             question:'What is the critics\' view mentioned in the text?',
             options:['Social media improves relationships','Social media can reduce genuine connection','Social media has no effect','Social media should be banned'], correct:1,
             explanation:'The critics believe social media replaces real connection with something more superficial.' }
      }
    },
    listening: {
      type:'quiz',
      levels:{
        A1:{ tip:'Listen for simple greetings and numbers.',
             script:'Hello! My name is Laura. I am ten years old.',
             question:'How old is Laura?',
             options:['9','10','11','12'], correct:1,
             explanation:'Laura says, "I am ten years old."' },
        A2:{ tip:'Listen for details in short everyday conversations.',
             script:'Excuse me, where is the train station? It\'s two blocks from here, next to the bank.',
             question:'Where is the train station?',
             options:['Next to the school','Two blocks away, next to the bank','Inside the bank','Far from here'], correct:1,
             explanation:'The speaker says it\'s "two blocks from here, next to the bank."' },
        B1:{ tip:'Follow longer conversations and identify opinions.',
             script:'I think the new restaurant downtown is great, but the service was a bit slow last time we went.',
             question:'What did the speaker think about the service?',
             options:['Excellent','A bit slow','Very fast','Terrible'], correct:1,
             explanation:'The speaker directly says the service "was a bit slow."' },
        B2:{ tip:'Understand nuanced opinions and mixed feelings.',
             script:'Honestly, I wasn\'t thrilled with the presentation, though I have to admit the data was solid.',
             question:'What is the speaker\'s overall opinion?',
             options:['Completely positive','Completely negative','Mixed feelings','Indifferent'], correct:2,
             explanation:'The speaker criticizes the presentation but praises the data — that\'s a mixed opinion.' }
      }
    },
    writing: {
      type:'write',
      levels:{
        A1:{ tip:'Practice writing simple sentences about yourself.',
             prompt:'Write 2–3 sentences introducing yourself.',
             model:'My name is Sofia. I am 24 years old. I live in San Salvador.' },
        A2:{ tip:'Practice writing a short informal message.',
             prompt:'Write a short text message canceling plans with a friend.',
             model:'Hi! I\'m sorry, but I can\'t come today because I feel sick. Can we meet next week instead?' },
        B1:{ tip:'Practice writing a short opinion paragraph.',
             prompt:'Write a short paragraph about your favorite way to learn English.',
             model:'My favorite way to learn English is by watching movies with subtitles, because it helps me understand real conversations while improving my listening skills.' },
        B2:{ tip:'Practice writing a short formal email.',
             prompt:'Write a short formal email requesting a meeting with your manager.',
             model:'Dear Mr. Smith, I would like to request a brief meeting this week to discuss my current project. Please let me know a convenient time. Best regards, Ana.' }
      }
    },
    speaking: {
      type:'speak',
      levels:{
        A1:{ tip:'Practice introducing yourself out loud.',
             prompt:'Say out loud: your name, your age, and where you\'re from.',
             model:'Hi, my name is Carlos. I am 19 years old. I\'m from El Salvador.' },
        A2:{ tip:'Practice describing your daily routine out loud.',
             prompt:'Say out loud: three things you do every morning.',
             model:'Every morning, I wake up at 7, I have breakfast, and I go to work.' },
        B1:{ tip:'Practice giving your opinion politely.',
             prompt:'Say out loud: your opinion about learning English online versus in person.',
             model:'In my opinion, learning online is convenient, but in-person classes help me practice speaking more.' },
        B2:{ tip:'Practice presenting a short, structured argument.',
             prompt:'Say out loud: an argument for or against remote work, in under a minute.',
             model:'I believe remote work benefits both employees and companies because it saves time, reduces costs, and improves work-life balance, although it requires strong self-discipline.' }
      }
    }
  };

  var ORDER = ['writing','listening','reading','speaking','grammar','vocabulary'];
  var currentLevel = 'A1';
  var completed = {}; // key: "skill" -> true once attempted at currentLevel
  var listEl = document.getElementById('exercise-list');
  var progressEl = document.getElementById('progress-count');

  function buildCard(skill){
    var t = THEME[skill];
    var card = document.createElement('div');
    card.className = 'exercise-card';
    card.dataset.skill = skill;
    card.innerHTML =
      '<div class="exercise-head">' +
        '<div class="exercise-badge" style="background:' + t.color + '">' + t.badge + '</div>' +
        '<div class="exercise-titles">' +
          '<h2>' + t.title + '</h2>' +
          '<p class="exercise-tip" data-role="tip"></p>' +
        '</div>' +
        '<button class="btn btn-start" type="button" aria-expanded="false">' +
          'Start exercise <span class="chevron" aria-hidden="true">▾</span>' +
        '</button>' +
      '</div>' +
      '<div class="exercise-body" hidden data-role="body"></div>';
    return card;
  }

  function renderExerciseBody(skill, container){
    var def = DATA[skill];
    var lvl = def.levels[currentLevel];
    container.innerHTML = '';

    if(def.type === 'quiz'){
      if(lvl.passage){
        var p = document.createElement('div');
        p.className = 'passage-box';
        p.textContent = lvl.passage;
        container.appendChild(p);
      }
      if(lvl.script){
        var btnListen = document.createElement('button');
        btnListen.className = 'listen-btn';
        btnListen.type = 'button';
        btnListen.innerHTML = '🔊 Play audio';
        btnListen.addEventListener('click', function(){
          if('speechSynthesis' in window){
            var u = new SpeechSynthesisUtterance(lvl.script);
            u.lang = 'en-US';
            u.rate = 0.95;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(u);
          }
        });
        container.appendChild(btnListen);
        var scriptBox = document.createElement('p');
        scriptBox.className = 'exercise-tip';
        scriptBox.style.marginBottom = '1rem';
        scriptBox.textContent = 'No sound? Here is the script: "' + lvl.script + '"';
        container.appendChild(scriptBox);
      }
      var q = document.createElement('p');
      q.className = 'question-text';
      q.textContent = lvl.question;
      container.appendChild(q);

      var opts = document.createElement('div');
      opts.className = 'options';
      var fb = document.createElement('div');
      fb.className = 'feedback';
      fb.hidden = true;

      lvl.options.forEach(function(optText, i){
        var b = document.createElement('button');
        b.className = 'option-btn';
        b.type = 'button';
        b.textContent = optText;
        b.addEventListener('click', function(){
          Array.prototype.forEach.call(opts.children, function(other){ other.disabled = true; });
          if(i === lvl.correct){
            b.classList.add('correct');
            fb.className = 'feedback correct';
            fb.textContent = 'Correct! ' + lvl.explanation;
          } else {
            b.classList.add('incorrect');
            opts.children[lvl.correct].classList.add('correct');
            fb.className = 'feedback incorrect';
            fb.textContent = 'Not quite. ' + lvl.explanation;
          }
          fb.hidden = false;
          markCompleted(skill);
        });
        opts.appendChild(b);
      });
      container.appendChild(opts);
      container.appendChild(fb);
    }

    if(def.type === 'write'){
      var prompt = document.createElement('p');
      prompt.className = 'question-text';
      prompt.textContent = lvl.prompt;
      container.appendChild(prompt);

      var textarea = document.createElement('textarea');
      textarea.className = 'write-area';
      textarea.placeholder = 'Write your answer here…';
      container.appendChild(textarea);

      var revealBtn = document.createElement('button');
      revealBtn.className = 'btn btn-reveal';
      revealBtn.type = 'button';
      revealBtn.textContent = 'Show model answer';
      container.appendChild(revealBtn);

      var model = document.createElement('div');
      model.className = 'model-answer';
      model.hidden = true;
      model.innerHTML = '<strong>Model answer</strong>' + lvl.model;
      container.appendChild(model);

      revealBtn.addEventListener('click', function(){
        model.hidden = false;
        markCompleted(skill);
      });
    }

    if(def.type === 'speak'){
      var sp = document.createElement('p');
      sp.className = 'question-text';
      sp.textContent = lvl.prompt;
      container.appendChild(sp);

      var revealBtn2 = document.createElement('button');
      revealBtn2.className = 'btn btn-reveal';
      revealBtn2.type = 'button';
      revealBtn2.textContent = 'Show model answer';
      container.appendChild(revealBtn2);

      var model2 = document.createElement('div');
      model2.className = 'model-answer';
      model2.hidden = true;
      model2.innerHTML = '<strong>Model answer</strong>' + lvl.model;
      container.appendChild(model2);

      revealBtn2.addEventListener('click', function(){
        model2.hidden = false;
        markCompleted(skill);
      });
    }
  }

  function markCompleted(skill){
    if(!completed[skill]){
      completed[skill] = true;
      updateProgress();
    }
  }
  function updateProgress(){
    progressEl.textContent = Object.keys(completed).length;
  }

  function refreshAll(){
    completed = {};
    updateProgress();
    document.querySelectorAll('.exercise-card').forEach(function(card){
      var skill = card.dataset.skill;
      var tipEl = card.querySelector('[data-role="tip"]');
      tipEl.textContent = DATA[skill].levels[currentLevel].tip;
      var body = card.querySelector('[data-role="body"]');
      if(!body.hidden){ renderExerciseBody(skill, body); }
      else { body.innerHTML = ''; } // will rebuild on open
    });
  }

  ORDER.forEach(function(skill){
    var card = buildCard(skill);
    listEl.appendChild(card);
    var tipEl = card.querySelector('[data-role="tip"]');
    tipEl.textContent = DATA[skill].levels[currentLevel].tip;

    var startBtn = card.querySelector('.btn-start');
    var body = card.querySelector('[data-role="body"]');
    startBtn.addEventListener('click', function(){
      var expanded = startBtn.getAttribute('aria-expanded') === 'true';
      startBtn.setAttribute('aria-expanded', String(!expanded));
      body.hidden = expanded;
      startBtn.firstChild.textContent = expanded ? 'Start exercise ' : 'Hide exercise ';
      if(!expanded){ renderExerciseBody(skill, body); }
    });
  });

  document.querySelectorAll('.level-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.level-btn').forEach(function(b){ b.setAttribute('aria-pressed','false'); });
      btn.setAttribute('aria-pressed','true');
      currentLevel = btn.dataset.level;
      refreshAll();
    });
  });
})();