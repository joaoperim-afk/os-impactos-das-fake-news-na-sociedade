document.addEventListener('DOMContentLoaded', () => {

    // --- MODO CLARO / ESCURO ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlTag = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlTag.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlTag.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggleBtn.innerHTML = theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    }


    // --- CONTEÚDO DAS JANELAS FLUTUANTES (MODAL) ---
    const modalData = {
        saude: {
            title: "🩺 O Impacto na Saúde Pública e Infodemia",
            body: `
                <p>A Organização Mundial da Saúde (OMS) criou o termo <strong>Infodemia</strong> para descrever o excesso de informações — algumas precisas e outras não — que tornam difícil para as pessoas encontrarem fontes confiáveis quando precisam.</p>
                <p>Na saúde, boatos e receitas milagrosas não apenas desinformam, mas podem provocar danos graves e o abandono de tratamentos médicos reais.</p>
                <div class="modal-quote">
                    "A desinformação em saúde mata tanto quanto vírus e bactérias. Quando uma pessoa deixa de se vacinar ou toma remédios sem eficácia por causa de uma notícia falsa, o impacto é coletivo." 
                    <br><br><strong>— Dra. Margareth Dalcolmo</strong>, Pesquisadora da Fundação Oswaldo Cruz (Fiocruz).
                </div>
                <p><strong>Como prevenir:</strong> Sempre consulte canais oficiais de saúde ou a orientação de um médico antes de partilhar avisos de pânico ou dicas de remédios caseiros.</p>
            `
        },
        democracia: {
            title: "🏛️ Desinformação e o Desafio Democrático",
            body: `
                <p>Em sistemas democráticos, a escolha consciente depende do acesso a fatos reais. As Fake News alteram essa dinâmica ao criarem realidades paralelas onde opiniões e teorias da conspiração substituem dados comprovados.</p>
                <p>Pesquisadores alertam que o objetivo principal da desinformação em massa não é apenas fazer a pessoa acreditar numa mentira, mas sim fazer com que ela <strong>deixe de acreditar na verdade</strong>.</p>
                <div class="modal-quote">
                    "O ecossistema de desinformação não busca apenas vencer um debate, mas destruir a confiança pública no jornalismo profissional, na ciência e nas instituições."
                    <br><br><strong>— Prof. Manuel Castells</strong>, Sociólogo e especialista em comunicação digital.
                </div>
                <p><strong>Como prevenir:</strong> Busque informações em fontes jornalísticas com histórico de verificação de fatos.</p>
            `
        },
        economia: {
            title: "💸 Golpes Financeiros e Engenharia Social",
            body: `
                <p>As Fake News também movem uma indústria milionária de fraudes digitais. Através da <em>engenharia social</em>, criminosos criam boatos alarmantes ou ofertas imperdíveis para manipular o comportamento do utilizador.</p>
                <p>Mensagens falsas como "Liberado saque extraordinário" servem de isca para roubar senhas, dados de cartão e instalar vírus em telemóveis.</p>
                <div class="modal-quote">
                    "O elo mais vulnerável da segurança digital é o fator humano. O golpista usa a urgência na notícia falsa para fazer a vítima agir por impulso."
                    <br><br><strong>— Bruce Schneier</strong>, Especialista internacional em segurança da informação.
                </div>
                <p><strong>Como prevenir:</strong> Desconfie de vantagens exageradas, dinheiro fácil ou mensagens que solicitem os seus dados com urgência.</p>
            `
        }
    };

    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Abre o modal ao clicar nos cards
    document.querySelectorAll('[data-modal]').forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.getAttribute('data-modal');
            const data = modalData[topic];

            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-body-content">
                        <h3>${data.title}</h3>
                        ${data.body}
                    </div>
                `;
                modal.classList.remove('hidden');
            }
        });
    });

    // Fecha o modal no botão "X"
    modalCloseBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Fecha o modal clicando fora da caixa
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });


    // --- JOGO 1: DETETIVE DA VERDADE ---
    const newsList = [
        {
            headline: "Cientistas criam chá que cura o diabetes em apenas 3 dias.",
            isFake: true,
            explanation: "FALSO: Não existe cura milagrosa rápida para o diabetes. É uma desinformação de saúde."
        },
        {
            headline: "Telescópio James Webb descobre novos detalhes de galáxias distantes.",
            isFake: false,
            explanation: "VERDADEIRO: O James Webb envia dados reais e valiosos frequentemente."
        },
        {
            headline: "Usar o celular carregando atrai raios em dias de chuva dentro de casa.",
            isFake: true,
            explanation: "FALSO: Raios são atraídos por pontos altos externos, não pela bateria na tomada."
        }
    ];

    let currentIndex = 0;
    let score = 0;

    const headlineEl = document.getElementById('headline');
    const feedbackEl = document.getElementById('game-feedback');
    const scoreEl = document.getElementById('score');
    const btnFake = document.getElementById('btn-fake');
    const btnReal = document.getElementById('btn-real');

    function loadNews() {
        feedbackEl.classList.add('hidden');
        btnFake.disabled = false;
        btnReal.disabled = false;

        if (currentIndex < newsList.length) {
            headlineEl.textContent = `"${newsList[currentIndex].headline}"`;
        } else {
            headlineEl.textContent = "🎉 Você completou o Jogo 1!";
            btnFake.style.display = 'none';
            btnReal.style.display = 'none';
            feedbackEl.className = "feedback correct";
            feedbackEl.textContent = `Pontuação final: ${score}/${newsList.length}`;
            feedbackEl.classList.remove('hidden');
        }
    }

    function checkAnswer(userSaidFake) {
        const currentNews = newsList[currentIndex];
        const isCorrect = userSaidFake === currentNews.isFake;

        btnFake.disabled = true;
        btnReal.disabled = true;

        if (isCorrect) {
            score++;
            scoreEl.textContent = score;
            feedbackEl.className = "feedback correct";
            feedbackEl.textContent = `✨ Correto! ${currentNews.explanation}`;
        } else {
            feedbackEl.className = "feedback wrong";
            feedbackEl.textContent = `❌ Errado! ${currentNews.explanation}`;
        }

        feedbackEl.classList.remove('hidden');

        setTimeout(() => {
            currentIndex++;
            loadNews();
        }, 3000);
    }

    btnFake.addEventListener('click', () => checkAnswer(true));
    btnReal.addEventListener('click', () => checkAnswer(false));

    loadNews();


    // --- JOGO 2: CAÇA-GATILHOS EMOCIONAIS ---
    const triggerQuestions = [
        {
            headline: "URGENTE! Compartilhe antes que o governo apague este vídeo!!!",
            correct: "Urgência & Pânico",
            options: ["Urgência & Pânico", "Curiosidade Científica", "Empatia"],
            explanation: "Fake news usam urgência para impedir que você pense criticamente antes de compartilhar."
        },
        {
            headline: "Você não vai acreditar no segredo chocante que este famoso descobriu!",
            correct: "Curiosidade Extrema",
            options: ["Medo", "Curiosidade Extrema", "Tristeza"],
            explanation: "O 'clickbait' explora a curiosidade para gerar cliques fáceis sem entregar conteúdo real."
        },
        {
            headline: "Aviso assustador: Esse alimento comum na sua casa está te envenenando lentamente!",
            correct: "Medo & Insegurança",
            options: ["Raiva", "Alegria", "Medo & Insegurança"],
            explanation: "Gatilhos de medo geram alertas imediatos na nossa mente, facilitando a proliferação do boato."
        }
    ];

    let triggerIndex = 0;
    let triggerScore = 0;

    const triggerHeadlineEl = document.getElementById('trigger-headline');
    const triggerOptionsEl = document.getElementById('trigger-options');
    const triggerFeedbackEl = document.getElementById('trigger-feedback');
    const triggerScoreEl = document.getElementById('trigger-score');

    function loadTriggerQuestion() {
        triggerFeedbackEl.classList.add('hidden');
        triggerOptionsEl.innerHTML = '';

        if (triggerIndex < triggerQuestions.length) {
            const q = triggerQuestions[triggerIndex];
            triggerHeadlineEl.textContent = `"${q.headline}"`;

            q.options.forEach(option => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-option';
                btn.textContent = option;
                btn.onclick = () => checkTriggerAnswer(option);
                triggerOptionsEl.appendChild(btn);
            });
        } else {
            triggerHeadlineEl.textContent = "🏆 Excelente! Você aprendeu a identificar os gatilhos das Fake News!";
            triggerOptionsEl.innerHTML = '';
            triggerFeedbackEl.className = "feedback correct";
            triggerFeedbackEl.textContent = `Pontuação final: ${triggerScore}/${triggerQuestions.length}`;
            triggerFeedbackEl.classList.remove('hidden');
        }
    }

    function checkTriggerAnswer(selectedOption) {
        const q = triggerQuestions[triggerIndex];
        const isCorrect = selectedOption === q.correct;

        const buttons = triggerOptionsEl.querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = true);

        if (isCorrect) {
            triggerScore++;
            triggerScoreEl.textContent = triggerScore;
            triggerFeedbackEl.className = "feedback correct";
            triggerFeedbackEl.textContent = `🎯 Exato! ${q.explanation}`;
        } else {
            triggerFeedbackEl.className = "feedback wrong";
            triggerFeedbackEl.textContent = `❌ Não exatamente. O gatilho principal é "${q.correct}". ${q.explanation}`;
        }

        triggerFeedbackEl.classList.remove('hidden');

        setTimeout(() => {
            triggerIndex++;
            loadTriggerQuestion();
        }, 3500);
    }

    loadTriggerQuestion();

});
