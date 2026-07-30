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

    // Desabilita todos os botões de opção após o clique
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
