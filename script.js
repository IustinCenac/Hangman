const library = ["compass", "volcano", "ecosystem", "archive", "nectar", 
    "orbit", "catalyst", "model", "peninsula", "symbol"
];

const n = library.length;
let randomLibraryWord = library[Math.floor(Math.random() * n)];
let randomLibraryWordLength = randomLibraryWord.length;

const guessedWord = document.getElementById("guessedWord");
const libraryInput = document.getElementById("libraryInput");
const displayMessage = document.getElementById("displayMessage");
const wrongLetters = document.getElementById("wrongLetters");
const lives = document.getElementById("lives");

let gameOver = 0;
const submitButton = document.getElementById("Submit");
submitButton.addEventListener("click", () => {
    if (gameOver) {
        newGame();
    } else {
        checkLetter();
    }
});

let foundLetters = [];
function initiateWord() {
    for (let i = 0; i < randomLibraryWordLength; ++i) {
        if (i === 0 || i === randomLibraryWordLength - 1) {
            foundLetters[i] = randomLibraryWord[i];
        } else {
            foundLetters[i] = "_";
        }
    }
    showWord();
}

function showWord() {
    guessedWord.innerHTML = foundLetters.join(" ");
}

let livesCounter = 3;
function showLives() {
    lives.innerHTML = livesCounter;
}

initiateWord();
showLives();

let usedLetterArray = [];
let wrongLettersArray = [];

function checkLetter() {
    const libraryText = libraryInput.value.toLowerCase();
    
    if (libraryText == "") {
        displayMessage.style.color = "red";
        displayMessage.innerHTML = "You must enter a letter!";
    } else if (usedLetterArray.includes(libraryText)) {
        displayMessage.style.color = "orange";
        displayMessage.innerHTML = "Letter used already!";

        libraryInput.value = "";
    } else if (randomLibraryWord.includes(libraryText)) {
        for (let i = 0; i < randomLibraryWordLength; ++i) {
            if (randomLibraryWord[i] === libraryText) {
                foundLetters[i] = libraryText;

                displayMessage.style.color = "green";
                displayMessage.innerHTML = "You guessed right!";
            }
        }
        usedLetterArray.push(libraryText);
        
        showWord();
        libraryInput.value = "";
        
        if (foundLetters.includes("_") == false) {
            displayMessage.style.color = "green";
            displayMessage.innerHTML = "You win!";

            gameOver = 1;
            submitButton.textContent = "New Game";
        }
    } else {
        displayMessage.style.color = "red";
        displayMessage.innerHTML = "Try again!";

        --livesCounter;

        wrongLettersArray.push(libraryText);
        wrongLetters.innerHTML = wrongLettersArray.join(" ");

        libraryInput.value = "";
        showLives();
        
        if (livesCounter == 0) {
            displayMessage.style.color = "red";
            displayMessage.innerHTML = "Game over!";
            
            gameOver = 1;
            submitButton.textContent = "New Game";
        }
    }
}

function newGame() {
    //plec de la/si afisez tot resetat
    randomLibraryWord = library[Math.floor(Math.random() * n)];
    randomLibraryWordLength = randomLibraryWord.length;

    livesCounter = 3;
    gameOver = 0;

    usedLetterArray = [];
    wrongLettersArray = [];
    foundLetters = [];

    libraryInput.value = "";
    wrongLetters.innerHTML = "";
    displayMessage.innerHTML = "";
    
    initiateWord();
    showLives();

    submitButton.textContent = "Submit";
}