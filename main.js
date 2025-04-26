let currentMode = "";
let currentNumber1 = 0;
let currentNumber2 = 0;
let currentList = [];
let missingNumber = 0;
let currentModeOrder = "";
let score = 0;

// Começar Par/Ímpar
function startEvenOdd() {
    currentMode = "evenOdd";
    currentNumber1 = Math.floor(Math.random() * 100);
    document.getElementById('question').textContent = `O número ${currentNumber1} é Par ou Ímpar? (Digite "par" ou "ímpar")`;
    prepareInput();
}

// Começar Multiplicação
function startMultiplication() {
    currentMode = "multiplication";
    currentNumber1 = Math.floor(Math.random() * 10);
    currentNumber2 = Math.floor(Math.random() * 10);
    document.getElementById('question').textContent = `Quanto é ${currentNumber1} x ${currentNumber2}?`;
    prepareInput();
}

// Começar Dezena e Unidade
function startTensUnits() {
    currentMode = "tensUnits";
    currentNumber1 = Math.floor(Math.random() * 100);
    document.getElementById('question').textContent = `Quantas dezenas e unidades tem ${currentNumber1}? (Ex: "4 dezenas e 5 unidades")`;
    prepareInput();
}

// Começar Ordem Crescente/Decrescente
function startOrder() {
    currentMode = "order";
    currentList = Array.from({length: 3}, () => Math.floor(Math.random() * 100));
    const modeOrder = Math.random() < 0.5 ? "crescente" : "decrescente";
    currentModeOrder = modeOrder;
    document.getElementById('question').textContent = `Organize em ordem ${modeOrder}: ${currentList.join(", ")}`;
    prepareInput();
}

// Começar Complete a Sequência
function startSequence() {
    currentMode = "sequence";
    let start = Math.floor(Math.random() * 50);
    let step = Math.floor(Math.random() * 5) + 1;
    currentList = [start, start + step, start + 2 * step];
    missingNumber = start + 3 * step;
    document.getElementById('question').textContent = `Complete a sequência: ${currentList.join(", ")}, ___`;
    prepareInput();
}

// Prepara input
function prepareInput() {
    document.getElementById('answer').value = "";
    document.getElementById('feedback').textContent = "";
    document.getElementById('answer').disabled = false;
    document.getElementById('checkBtn').disabled = false;
}

// Atualizar placar
function updateScore() {
    document.getElementById('score').textContent = `🏅 Acertos: ${score}`;
}

// Frases aleatórias de incentivo
function getRandomSuccessMessage() {
    const messages = [
        "Muito bem! 🎉",
        "Você é incrível! 🚀",
        "Continue assim! 🌈",
        "Show de bola! ⚡",
        "Mandou bem! 🏆"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// Verificar resposta
document.getElementById('checkBtn').addEventListener('click', function() {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    let correct = false;

    if (currentMode === "evenOdd") {
        const isEven = currentNumber1 % 2 === 0;
        correct = (isEven && userAnswer === "par") || (!isEven && userAnswer === "ímpar");

    } else if (currentMode === "multiplication") {
        const correctAnswer = currentNumber1 * currentNumber2;
        correct = parseInt(userAnswer) === correctAnswer;

    } else if (currentMode === "tensUnits") {
        const dezenas = Math.floor(currentNumber1 / 10);
        const unidades = currentNumber1 % 10;
        const expected = `${dezenas} dezenas e ${unidades} unidades`;
        correct = userAnswer === expected;

    } else if (currentMode === "order") {
        let sorted;
        if (currentModeOrder === "crescente") {
            sorted = [...currentList].sort((a,b) => a - b).join(",");
        } else {
            sorted = [...currentList].sort((a,b) => b - a).join(",");
        }
        correct = userAnswer === sorted;

    } else if (currentMode === "sequence") {
        correct = parseInt(userAnswer) === missingNumber;
    }

    if (correct) {
        score++;
        updateScore();
        document.getElementById('feedback').textContent = getRandomSuccessMessage();
        document.getElementById('feedback').className = "correct";
    } else {
        document.getElementById('feedback').textContent = "❌ Ops! Tente outra vez!";
        document.getElementById('feedback').className = "incorrect";
    }
});
