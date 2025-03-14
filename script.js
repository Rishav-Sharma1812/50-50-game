let points = 1000;
let highScore = 1000; // Initially set high score to 1000
localStorage.setItem("highScore", highScore); // Store it in local storage

let dailyRewardClaimed = localStorage.getItem("dailyReward") || "false";

document.getElementById('points').textContent = points;
document.getElementById('high-score').textContent = highScore;

// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Play Game Logic
document.getElementById('play').addEventListener('click', function () {
    playGame();
});

function playGame() {
    const bet = parseInt(document.getElementById('bet').value);
    const guess = parseInt(document.getElementById('guess').value);
    const difficulty = document.getElementById('difficulty').value;
    
    let maxNumber = difficulty === "easy" ? 2 : difficulty === "medium" ? 5 : 10;
    const resultDiv = document.getElementById('result');

    if (isNaN(bet) || isNaN(guess) || bet <= 0 || guess < 1 || guess > maxNumber) {
        resultDiv.textContent = 'Enter a valid bet and guess!';
        return;
    }

    if (bet > points) {
        resultDiv.textContent = 'Your bet exceeds your points!';
        return;
    }

    const randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    if (guess === randomNumber) {
        points += bet * (maxNumber / 2);
        resultDiv.innerHTML = `🎉 Correct! The number was ${randomNumber}. You now have <b>${points}</b> points!`;
    } else {
        points -= bet;
        resultDiv.innerHTML = `😢 Wrong! The correct number was ${randomNumber}. You now have <b>${points}</b> points.`;
    }

    updatePoints();
}

// Lucky Spin Feature
document.getElementById('lucky-spin').addEventListener('click', function () {
    const multipliers = [1, 2, 3, 5];
    const randomMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];

    points = Math.floor(points * randomMultiplier);
    document.getElementById('result').textContent = `🎡 Lucky Spin! Your points are now ${points}`;
    updatePoints();
});



// Double or Nothing Feature
document.getElementById('double-or-nothing').addEventListener('click', function () {
    let decision = confirm("Do you want to risk all points to double them?");
    if (decision) {
        let win = Math.random() < 0.5;
        points = win ? points * 2 : 0;
        document.getElementById('result').textContent = win ? "🔥 You doubled your points!" : "😢 You lost everything!";
        updatePoints();
    }
});

// Daily Reward Feature
if (dailyRewardClaimed === "false") {
    points += 200;
    localStorage.setItem("dailyReward", "true");
    alert("🎁 You received a daily reward of 200 points!");
    updatePoints();
}

// Update Points & High Score
function updatePoints() {
    document.getElementById('points').textContent = points;
    
    if (points > highScore) {
        highScore = points;
        localStorage.setItem("highScore", highScore);
        document.getElementById('high-score').textContent = highScore;
    }
}

// Reset Game
document.getElementById('reset').addEventListener('click', function () {
    points = 1000;
    highScore = localStorage.getItem("highScore") || 1000; // Ensure high score remains
    updatePoints();
});

// Select elements
const difficultySelect = document.getElementById("difficulty");
const guessInput = document.getElementById("guess");

// Function to update placeholder based on difficulty
function updatePlaceholder() {
    let difficulty = difficultySelect.value;
    if (difficulty === "easy") {
        guessInput.placeholder = "Enter 1 or 2";
        guessInput.min = 1;
        guessInput.max = 2;
    } else if (difficulty === "medium") {
        guessInput.placeholder = "Enter 1 to 5";
        guessInput.min = 1;
        guessInput.max = 5;
    } else if (difficulty === "hard") {
        guessInput.placeholder = "Enter 1 to 10";
        guessInput.min = 1;
        guessInput.max = 10;
    }
}

// Update placeholder on difficulty change
difficultySelect.addEventListener("change", updatePlaceholder);

// Set default placeholder when page loads
updatePlaceholder();
