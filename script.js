let timer = 0;
let interval;
let wordsTyped = 0;
let correctWords = 0;
let totalWords = 9; // For "The quick brown fox jumps over the lazy dog."
let isTyping = false;
let isFinished = false;
let startTime;

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "Typing is a skill that improves with practice.",
    "Technology is best when it brings people together.",
    "The sun shines bright on the clear blue sky."
]; // Array of random sentences

let currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
document.getElementById("test-text").innerHTML = currentSentence;

const typingArea = document.getElementById("typing-area");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

typingArea.addEventListener('input', startTyping);

function startTyping() {
    if (!isTyping) {
        isTyping = true;
        startTime = new Date(); // Start time when typing begins
        interval = setInterval(updateTimer, 1000); // Start timer
    }

    const typedText = typingArea.value;
    wordsTyped = typedText.split(" ").filter(word => word.length > 0).length;

    // Check if the user has finished typing the sentence
    if (typedText.trim() === currentSentence) {
        finishTyping();
    }

    updateStats(typedText);
}

function updateTimer() {
    timer++; // Increase timer by 1 second
    timerDisplay.innerHTML = `Time: ${timer}s`;
}

function updateStats(typedText) {
    const typedWords = typedText.trim().split(" ");
    correctWords = 0;

    typedWords.forEach((word, index) => {
        if (word === currentSentence.split(" ")[index]) {
            correctWords++;
        }
    });

    const accuracy = (correctWords / wordsTyped) * 100 || 0;
    const elapsedTime = (new Date() - startTime) / 1000 / 60; // Time in minutes
    const wpm = (wordsTyped / elapsedTime) || 0; // Calculate WPM

    wpmDisplay.innerHTML = `WPM: ${Math.round(wpm)}`;
    accuracyDisplay.innerHTML = `Accuracy: ${Math.round(accuracy)}%`;
}

function finishTyping() {
    clearInterval(interval); // Stop the timer
    typingArea.disabled = true; // Disable further typing
    isFinished = true; // Mark that the test is finished
    alert(`Test completed! Final WPM: ${Math.round(wordsTyped / ((new Date() - startTime) / 1000 / 60))}`);
}

function restartTest() {
    clearInterval(interval);
    timer = 0;
    isTyping = false;
    isFinished = false;
    wordsTyped = 0;
    correctWords = 0;

    // Change the prompt text to a new sentence
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    document.getElementById("test-text").innerHTML = currentSentence;

    typingArea.disabled = false;
    typingArea.value = "";
    timerDisplay.innerHTML = "Time: 0s";
    wpmDisplay.innerHTML = "WPM: 0";
    accuracyDisplay.innerHTML = "Accuracy: 100%";
}
