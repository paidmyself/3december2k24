const players = ["Player 1", "Player 2"];
const scores = [0, 0];
const targetScore = Math.floor(Math.random() * 50) + 20;
let currentPlayer = 0;
let gameWon = false;

document.getElementById("target-score").textContent = targetScore;

function updateScoreGrid() {
  const grid = document.getElementById("score-grid");
  grid.innerHTML = "";
  players.forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${player}</td>
      <td>${scores[index]}</td>
    `;
    grid.appendChild(row);
  });
}

function rollDice() {
  if (gameWon) return;
  const roll = Math.floor(Math.random() * 6) + 1;
  scores[currentPlayer] += roll;
  if (scores[currentPlayer] >= targetScore) {
    document.getElementById("winner-message").textContent = `${players[currentPlayer]} wins with ${scores[currentPlayer]} points!`;
    gameWon = true;
    return;
  }
  currentPlayer = (currentPlayer + 1) % players.length;
  updateScoreGrid();
}

document.getElementById("roll-dice").addEventListener("click", rollDice);

updateScoreGrid();
