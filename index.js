const rockButtonEl = document.getElementById("rockButton");
const paperButtonEl = document.getElementById("paperButton");
const scissorsButtonEl = document.getElementById("scissorsButton");

const messageEl = document.getElementById("message");
const botAnswerEl = document.getElementById("botAnswer");

const restartButtonEl = document.getElementById("restartButton");

const currentScoreEl = document.getElementById("currentScore");
const highScoreEl = document.getElementById("highScore");
const totalCorrectsEl = document.getElementById("totalCorrects");

let currScore = 0;
let highScore = 0;
let totalCorrects = 0;

let currentCategory = "";
let currentResponse = "";

function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

async function generateWord() {
    let response = await fetch("https://random-word-api.herokuapp.com/word");
    let data = await response.json();
    return data[0];
}

function generateColor() {
    let colors = ["red", "green", "blue"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function handleNumberCondition(number) {
    console.log(number);
    switch (true) {
        case Number(number) % 2 === 0:
            return "rock";
        case Number(number) % 3 === 0:
            return "paper";
        default:
            return "scissors";
    }
}

function handleLengthCondition(word) {
    const length = word.length;
    switch (true) {
        case length > 0 && length <= 5:
            return "rock";
        case length > 5 && length <= 10:
            return "paper";
        case length > 10:
            return "scissors";
    }
}

function handleColorCondition(color) {
    switch (true) {
        case color === "red":
            return "rock";
        case color === "green":
            return "paper";
        case color === "blue":
            return "scissors";
    }
}

const categories = [
    {
        name: "number",
        answer: generateNumber,
        condition: (number) => handleNumberCondition(number),
    },
    {
        name: "length",
        answer: generateWord,
        condition: (word) => handleLengthCondition(word),
    },
    {
        name: "color",
        answer: generateColor,
        condition: (color) => handleColorCondition(color),
    },
];

async function startRound() {
    currentScoreEl.textContent = currScore;
    totalCorrectsEl.textContent = totalCorrects;

    const category = categories[Math.floor(Math.random() * categories.length)];

    currentCategory = category.name;
    currentResponse = await category.answer();

    await console.log(currentCategory, currentResponse);

    messageEl.textContent = currentResponse;
}

startRound();

rockButtonEl.addEventListener("click", () => handleGuess("rock"));
paperButtonEl.addEventListener("click", () => handleGuess("paper"));
scissorsButtonEl.addEventListener("click", () => handleGuess("scissors"));

function handleGuess(currAnswer) {
    const botAnswer =
        categories[
            categories.findIndex(
                (category) => category.name === currentCategory
            )
        ].condition(currentResponse);
    console.log(botAnswer, currAnswer);
    if (botAnswer === currAnswer) {
        currScore++;
        totalCorrects++;
        console.log(true);
        startRound();
    } else {
        console.log(false);
        currScore = 0;
        startRound();
    }
}
