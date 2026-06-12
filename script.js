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

let livesCounter = 7;
function showLives() {
    lives.innerHTML = livesCounter;
}

initiateWord();
showLives();

let usedLetterArray = [];
let wrongLettersArray = [];
let messageMarker = 0;

function checkLetter() {
    const libraryText = libraryInput.value.toLowerCase();
    
    if (libraryText == "") {
        messageMarker = 0;
    } else if (usedLetterArray.includes(libraryText)) {
        messageMarker = 1;

        libraryInput.value = "";
    } else if (randomLibraryWord.includes(libraryText)) {
        for (let i = 0; i < randomLibraryWordLength; ++i) {
            if (randomLibraryWord[i] === libraryText) {
                foundLetters[i] = libraryText;
                
                messageMarker = 2;
            }
        }
        usedLetterArray.push(libraryText);
        
        showWord();
        libraryInput.value = "";
        
        if (foundLetters.includes("_") == false) {
            messageMarker = 3;

            gameOver = 1;
            submitButton.textContent = "New Game";
        }
    } else {
        messageMarker = 4;

        --livesCounter;

        wrongLettersArray.push(libraryText);
        wrongLetters.innerHTML = wrongLettersArray.join(" ");

        libraryInput.value = "";
        showLives();
        
        if (livesCounter == 0) {
            messageMarker = 5;
            
            gameOver = 1;
            submitButton.textContent = "New Game";
        }
    }
    allMessages ();
}

function newGame() {
    randomLibraryWord = library[Math.floor(Math.random() * n)];
    randomLibraryWordLength = randomLibraryWord.length;

    livesCounter = 7;
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

function allMessages () {
    if (messageMarker == 0) {
        displayMessage.style.color = "red";
        displayMessage.innerHTML = "You must enter a letter!";
    } else if (messageMarker == 1) {
        displayMessage.style.color = "orange";
        displayMessage.innerHTML = "Letter used already!";
    } else if (messageMarker == 2) {
         displayMessage.style.color = "green";
        displayMessage.innerHTML = "You guessed right!";
    } else if (messageMarker == 3) {
        displayMessage.style.color = "green";
        displayMessage.innerHTML = "You win!";
    } else if (messageMarker == 4) {
        displayMessage.style.color = "red";
        displayMessage.innerHTML = "Try again!";
    } else {
        displayMessage.style.color = "red";
        displayMessage.innerHTML = "Game over!";
    }
}