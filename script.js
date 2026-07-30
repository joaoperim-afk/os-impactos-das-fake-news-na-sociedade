// --- MODO CLARO / ESCURO ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlTag = document.documentElement;

// Verifica tema salvo ou padrão
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
    if (theme === 'dark') {
        themeToggleBtn.innerHTML = '☀️ Modo Claro';
    } else {
        themeToggleBtn.innerHTML = '🌙 Modo Escuro';
    }
}

// --- MINI-GAME: DETETIVE DA VERDADE ---
const newsList = [
    {
        headline: "Cientistas criam chá que cura o diabetes em apenas 3 dias.",
        isFake: true,
        explanation: "FALSO: Não existe cura milagrosa rápida para o diabetes. Trata-se de desinformação perigosa para a saúde."
    },
    {
        headline: "Telescópio James Webb descobre novos detalhes de galáxias distantes.",
        isFake: false,
        explanation: "VERDADEIRO: O James Webb é um telescópio real que envia imagens e dados valiosos frequentemente."
    },
    {
        headline: "Usar o celular carregando atrai raios em dias de chuva dentro de casa.",
        isFake: true,
        explanation: "FALSO: Raios são atraídos por pontos altos externos, não pela bateria do celular na tomada."
    },
    {
        headline: "A Floresta Amazônica abriga mais de 10% de toda a biodiversidade conhecida na Terra.",
        isFake: false,
        explanation: "VERDADEIRO: A Amazônia possui uma das maiores biodiversidades do planeta confirmada por cientistas."
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
        headlineEl.textContent = "🎉 Você completou o desafio do Detetive!";
        btnFake.style.display = 'none';
        btnReal.style.display = 'none';
        feedbackEl.className = "feedback correct";
        feedbackEl.textContent = `Jogo Finalizado! Sua pontuação final foi: ${score}/${newsList.length}`;
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

    // Avança para a próxima notícia após 3.5 segundos
    setTimeout(() => {
        currentIndex++;
        loadNews();
    }, 3500);
}

btnFake.addEventListener('click', () => checkAnswer(true));
btnReal.addEventListener('click', () => checkAnswer(false));

// Inicializa o jogo
loadNews();
