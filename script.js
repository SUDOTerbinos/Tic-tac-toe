const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const player1Name = document.getElementById('player1-name');
const player2Name = document.getElementById('player2-name');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

let currentPlayer = '🤣';
let board = Array(9).fill(null);
let scores = { '🤣': 0, '😡': 0 };

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function updateScores() {
    player1Score.textContent = scores['🤣'];
    player2Score.textContent = scores['😡'];
}

function checkWin() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell);
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index]) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (checkWin()) {
        const winner = currentPlayer;
        alert(`${winner === '🤣' ? player1Input.value : player2Input.value} wins!`);
        scores[winner]++;
        updateScores();
        resetBoard();
    } else if (checkDraw()) {
        alert("It's a draw!");
        resetBoard();
    } else {
        currentPlayer = currentPlayer === '🤣' ? '😡' : '🤣';
    }
}

function resetBoard() {
    board = Array(9).fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('🤣', '😡');
    });
    currentPlayer = '🤣';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetBoard);

// Initialize player names
player1Name.textContent = `${player1Input.value}:`;
player2Name.textContent = `${player2Input.value}:`;

// Update names when changed
player1Input.addEventListener('input', () => {
    player1Name.textContent = `${player1Input.value}:`;
});
player2Input.addEventListener('input', () => {
    player2Name.textContent = `${player2Input.value}:`;
});
