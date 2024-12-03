const players = ["Player 1 👤", "Player 2 👥"]; // Player names with emojis
const scores = [0, 0]; // Scores for players
const targetScore = Math.floor(Math.random() * 50) + 20; // Random target between 20 and 70
let currentPlayer = 0; // Tracks the current player's turn
let gameWon = false;

// Update the target score display
document.getElementById("target-score").textContent = targetScore;

// Function to render the score grid
function updateScoreGrid() {
  const grid = document.getElementById("score-grid");
  grid.innerHTML = ""; // Clear the grid
  players.forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player}</td>
      <td>${scores[index]} ${index === 0 ? "🎯" : "⭐"}</td>
    `;
    grid.appendChild(row);
  });
}

// Function to roll the dice
function rollDice() {
  if (gameWon) return;

  const roll = Math.floor(Math.random() * 6) + 1; // Random dice roll between 1-6
  const diceDisplay = document.createElement("span");
  diceDisplay.className = "dice-roll";
  diceDisplay.textContent = `🎲 ${roll}`;
  document.getElementById("roll-dice").appendChild(diceDisplay);

  setTimeout(() => diceDisplay.remove(), 600); // Remove animation after 0.6s

  scores[currentPlayer] += roll; // Add roll to current player's score

  // Check for a winner
  if (scores[currentPlayer] >= targetScore) {
    document.getElementById("winner-message").textContent = `${players[currentPlayer]} wins with ${scores[currentPlayer]} points! 🏆`;
    gameWon = true;
    return;
  }

  // Switch to the next player
  currentPlayer = (currentPlayer + 1) % players.length;

  // Update the score grid
  updateScoreGrid();
}

// Attach the roll dice function to the button
document.getElementById("roll-dice").addEventListener("click", rollDice);

// Initial grid rendering
updateScoreGrid();
