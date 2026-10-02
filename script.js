const cells = document.querySelectorAll(".cell");
const statusEl = document.getElementById("status");
const scoreEls = {
  X: document.getElementById("scoreX"),
  O: document.getElementById("scoreO"),
  D: document.getElementById("scoreD"),
};

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

let board, current, gameOver;
const scores = { X: 0, O: 0, D: 0 };

function startRound() {
  board = Array(9).fill("");
  current = "X";
  gameOver = false;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.className = "cell";
  });
  statusEl.textContent = "Player X's turn";
}

function handleMove(e) {
  const i = Number(e.target.dataset.index);
  if (gameOver || board[i]) return;

  board[i] = current;
  e.target.textContent = current;
  e.target.classList.add(current.toLowerCase());
  e.target.disabled = true;

  const winLine = getWinLine();
  if (winLine) {
    gameOver = true;
    winLine.forEach((idx) => cells[idx].classList.add("win"));
    statusEl.textContent = `🎉 Player ${current} wins!`;
    scores[current]++;
    updateScores();
    disableAll();
  } else if (board.every(Boolean)) {
    gameOver = true;
    statusEl.textContent = "It's a draw!";
    scores.D++;
    updateScores();
  } else {
    current = current === "X" ? "O" : "X";
    statusEl.textContent = `Player ${current}'s turn`;
  }
}

function getWinLine() {
  return WIN_LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function disableAll() {
  cells.forEach((c) => (c.disabled = true));
}

function updateScores() {
  scoreEls.X.textContent = scores.X;
  scoreEls.O.textContent = scores.O;
  scoreEls.D.textContent = scores.D;
}

cells.forEach((cell) => cell.addEventListener("click", handleMove));
document.getElementById("restart").addEventListener("click", startRound);
document.getElementById("reset").addEventListener("click", () => {
  scores.X = scores.O = scores.D = 0;
  updateScores();
  startRound();
});

startRound();