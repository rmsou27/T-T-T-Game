const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message-text');
const restartButton = document.getElementById('restart-button');
const aiButton = document.getElementById('ai-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let isAIPlaying = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6] // Diagonals
];

function checkWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.textContent = `Player ${gameBoard[a]} wins!`;
            gameActive = false;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        message.textContent = 'It\'s a draw!';
        gameActive = false;
    }
}

function handleClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer); // Add class for styling
        checkWin();
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;

            if (isAIPlaying && currentPlayer === 'O' && gameActive) {
                setTimeout(aiMove, 500); // AI makes move after a short delay
            }
        }
    }
}

function aiMove() {
    // Simple AI:  Chooses the first available spot
    let bestMove = -1;
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === '') {
            bestMove = i;
            break;
        }
    }

    if (bestMove !== -1) {
        gameBoard[bestMove] = 'O';
        cells[bestMove].textContent = 'O';
        cells[bestMove].classList.add('O');
        checkWin();
        if (gameActive) {
            currentPlayer = 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove classes
    });
}

function toggleAI() {
    isAIPlaying = !isAIPlaying;
    if (isAIPlaying && currentPlayer === 'O' && gameActive) {
        setTimeout(aiMove, 500);
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
aiButton.addEventListener('click', toggleAI);