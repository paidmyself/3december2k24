const players = ["Player 1 👤", "Player 2 👥"];
let scores, targetScore, rollbackValue, currentPlayer, gameWon;

// Reset game state
function resetGame() {
  scores = [0, 0];
  targetScore = Math.floor(Math.random() * 50) + 20;
  rollbackValue = Math.floor(Math.random() * 6) + 1;
  currentPlayer = 0;
  gameWon = false;

  document.getElementById("target-score").textContent = targetScore;
  document.getElementById("game-status").textContent = "";
  document.getElementById("winner-message").textContent = "";
  document.getElementById("throw-log").innerHTML = "";
  updateScoreGrid();

  // Show constraint popup
  document.getElementById("constraint-message").textContent = `Cette partie : si un joueur tire ${rollbackValue}, il perd ${rollbackValue} points.`;
  document.getElementById("constraint-popup").style.display = "block";
}

// Update score grid
function updateScoreGrid() {
  const grid = document.getElementById("score-grid");
  grid.innerHTML = "";
  players.forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${player}</td><td>${scores[index]}</td>`;
    grid.appendChild(row);
  });
}

// Update game status
function updateGameStatus(roll) {
  const log = document.getElementById("throw-log");
  log.innerHTML += `<p>${players[currentPlayer]} a tiré ${roll}. ${
    roll === rollbackValue
      ? `Rollback activé (-${rollbackValue} points)`
      : ""
  } Score actuel : ${scores[currentPlayer]}.</p>`;
  document.getElementById("game-status").textContent = `C'est au tour de ${players[(currentPlayer + 1) % players.length]}`;
}

// Roll dice
function rollDice() {
  if (gameWon) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  scores[currentPlayer] += roll;

  if (roll === rollbackValue) {
    scores[currentPlayer] = Math.max(0, scores[currentPlayer] - rollbackValue);
  }

  if (scores[currentPlayer] >= targetScore) {
    document.getElementById("winner-message").textContent = `${players[currentPlayer]} wins with ${scores[currentPlayer]} points! 🏆`;
    gameWon = true;
    return;
  }

  updateGameStatus(roll);
  currentPlayer = (currentPlayer + 1) % players.length;
  updateScoreGrid();
}

// Event listeners
document.getElementById("roll-dice").addEventListener("click", rollDice);
document.getElementById("reset-game").addEventListener("click", resetGame);
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("constraint-popup").style.display = "none";
});

// Initialize game
resetGame();
