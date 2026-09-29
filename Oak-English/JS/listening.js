const activities = [
            {
                id: 1,
                title: "A dinner with friends",
                description: "Listen to a group of friends talking about their jobs.",
                image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=300&fit=crop",
                level: "A2",
                instructions: ["Press play to listen to the conversation", "You can listen as many times as you want", "Then choose the correct answer for each question"],
                script: "Anna: So, how is your new job going? Marco: It's great! I work as a chef in a small restaurant downtown. Anna: That sounds fun. Do you like it? Marco: Yes, I love cooking for people. What about you? Anna: I'm still working as a teacher at the same school.",
                questions: [
                    { q:"What is Marco's job?", options:["Teacher","Chef","Driver"], correct:1 },
                    { q:"Does Marco like his job?", options:["Yes, he loves it","No, he doesn't","He didn't say"], correct:0 },
                    { q:"What does Anna do?", options:["She is a chef","She is a teacher","She is a student"], correct:1 }
                ]
            },
            {
                id: 2,
                title: "Who is in the office?",
                description: "Listen to two coworkers talking in the office.",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
                level: "A2",
                instructions: ["Press play to listen to the conversation", "You can listen as many times as you want", "Then choose the correct answer for each question"],
                script: "Tom: Good morning! Are you new here? Laura: Yes, I started yesterday. I work in the marketing team. Tom: Nice to meet you. I'm Tom, I work in sales. Laura: Nice to meet you too. Where is the meeting room? Tom: It's on the second floor, next to the kitchen.",
                questions: [
                    { q:"When did Laura start working?", options:["Today","Yesterday","Last week"], correct:1 },
                    { q:"What team does Laura work in?", options:["Sales","Marketing","IT"], correct:1 },
                    { q:"Where is the meeting room?", options:["First floor","Second floor","Third floor"], correct:1 }
                ]
            },
            {
                id: 3,
                title: "The Interview Summary",
                description: "Listen to a short part of a job interview.",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop",
                level: "A2",
                instructions: ["Press play to listen to the interview", "You can listen as many times as you want", "Then choose the correct answer for each question"],
                script: "Interviewer: Can you tell me about your last job? Candidate: Yes, I worked as a receptionist for two years. Interviewer: What did you like about that job? Candidate: I liked talking to different people every day. Interviewer: Why do you want to work here? Candidate: I want to learn new skills and grow in my career.",
                questions: [
                    { q:"What was the candidate's last job?", options:["Receptionist","Chef","Teacher"], correct:0 },
                    { q:"How long did they work there?", options:["One year","Two years","Three years"], correct:1 },
                    { q:"Why do they want this job?", options:["For more money","To learn new skills","To work less"], correct:1 }
                ]
            }
        ];

        let currentActivity = null;
        let isPlaying = false;

        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            window.scrollTo(0, 0);
            if (sectionId === 'home') loadActivities();
            if (sectionId !== 'activities' && window.speechSynthesis) window.speechSynthesis.cancel();
        }

        function loadActivities() {
            const container = document.getElementById('activities-home');
            container.innerHTML = '';
            activities.forEach(a => {
                const card = document.createElement('div');
                card.className = 'activity-card';
                card.onclick = () => loadActivity(a.id);
                card.innerHTML = `
                    <img src="${a.image}" alt="${a.title}">
                    <div class="activity-card-content">
                        <h3>${a.title}</h3>
                        <p>${a.description}</p>
                        <span class="activity-level">${a.level}</span>
                    </div>`;
                container.appendChild(card);
            });
        }

        function loadActivity(id) {
            const a = activities.find(x => x.id === id);
            if (!a) return;
            currentActivity = a;

            document.getElementById('activity-title').textContent = a.title;
            document.getElementById('activity-description').textContent = a.description;

            const il = document.getElementById('instructions-list');
            il.innerHTML = '';
            a.instructions.forEach(i => { const li = document.createElement('li'); li.textContent = i; il.appendChild(li); });

            document.getElementById('transcriptBox').textContent = a.script;
            document.getElementById('transcriptBox').classList.remove('show');
            document.getElementById('transcriptToggleBtn').textContent = 'Mostrar transcripción';

            document.getElementById('playBtn').textContent = '▶';
            document.getElementById('playBtn').classList.remove('playing');
            document.getElementById('audioStatus').textContent = 'Sin límite de tiempo. Pulsa play cuando estés listo.';
            isPlaying = false;

            const qc = document.getElementById('quiz-container');
            qc.innerHTML = '';
            a.questions.forEach((q, qi) => {
                const block = document.createElement('div');
                block.className = 'quiz-question';
                let optsHtml = '';
                q.options.forEach((opt, oi) => {
                    optsHtml += `
                        <label class="option-label" id="q${qi}-opt${oi}">
                            <input type="radio" name="q${qi}" value="${oi}">
                            ${opt}
                        </label>`;
                });
                block.innerHTML = `<p class="q-text">${qi+1}. ${q.q}</p><div class="quiz-options">${optsHtml}</div>`;
                qc.appendChild(block);
            });

            document.getElementById('feedback').classList.remove('show', 'success', 'partial');
            document.getElementById('checkAnswersBtn').disabled = false;

            showSection('activities');
        }

        function toggleAudio(){
            if(!('speechSynthesis' in window)){
                document.getElementById('audioStatus').textContent = 'Tu navegador no soporta audio. Prueba en Chrome o Edge.';
                return;
            }
            const btn = document.getElementById('playBtn');
            const status = document.getElementById('audioStatus');

            if(isPlaying){
                window.speechSynthesis.cancel();
                isPlaying = false;
                btn.textContent = '▶';
                btn.classList.remove('playing');
                status.textContent = 'Audio detenido. Puedes escucharlo de nuevo cuando quieras.';
                return;
            }

            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(currentActivity.script);
            utter.lang = 'en-US';
            utter.rate = 0.92;
            utter.onend = () => {
                isPlaying = false;
                btn.textContent = '▶';
                btn.classList.remove('playing');
                status.textContent = 'Audio terminado. Puedes escucharlo otra vez o responder las preguntas.';
            };
            window.speechSynthesis.speak(utter);
            isPlaying = true;
            btn.textContent = '⏸';
            btn.classList.add('playing');
            status.textContent = 'Reproduciendo…';
        }

        function speakInstructions(){
            if(!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            const text = currentActivity.instructions.join('. ');
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'en-US';
            utter.rate = 0.92;
            window.speechSynthesis.speak(utter);
        }

        function toggleTranscript(){
            const box = document.getElementById('transcriptBox');
            const btn = document.getElementById('transcriptToggleBtn');
            box.classList.toggle('show');
            btn.textContent = box.classList.contains('show') ? 'Ocultar transcripción' : 'Mostrar transcripción';
        }

        function checkAnswers(){
            const a = currentActivity;
            let correctCount = 0;
            let details = [];

            a.questions.forEach((q, qi) => {
                const selected = document.querySelector(`input[name="q${qi}"]:checked`);
                const selectedValue = selected ? parseInt(selected.value) : null;
                const isCorrect = selectedValue === q.correct;
                if(isCorrect) correctCount++;

                q.options.forEach((opt, oi) => {
                    const label = document.getElementById(`q${qi}-opt${oi}`);
                    label.classList.remove('correct-answer','wrong-answer');
                    if(oi === q.correct) label.classList.add('correct-answer');
                    else if(oi === selectedValue && !isCorrect) label.classList.add('wrong-answer');
                });

                if(selectedValue === null){
                    details.push(`Pregunta ${qi+1}: no seleccionaste ninguna opción. La respuesta correcta era "${q.options[q.correct]}".`);
                } else if(isCorrect){
                    details.push(`Pregunta ${qi+1}: correcta — "${q.options[q.correct]}".`);
                } else {
                    details.push(`Pregunta ${qi+1}: incorrecta. Elegiste "${q.options[selectedValue]}", la respuesta correcta era "${q.options[q.correct]}".`);
                }
            });

            const total = a.questions.length;
            const feedback = document.getElementById('feedback');
            feedback.classList.remove('success','partial');
            feedback.classList.add(correctCount === total ? 'success' : 'partial');
            feedback.classList.add('show');

            document.getElementById('feedback-title').textContent = `Resultado: ${correctCount} de ${total} correctas`;
            document.getElementById('feedback-message').textContent = correctCount === total
                ? 'Respondiste todas las preguntas correctamente.'
                : 'Puedes escuchar el audio de nuevo y volver a intentarlo cuando quieras.';

            const list = document.getElementById('feedback-details');
            list.innerHTML = '';
            details.forEach(d => { const li = document.createElement('li'); li.textContent = d; list.appendChild(li); });

            feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        document.addEventListener('DOMContentLoaded', loadActivities);