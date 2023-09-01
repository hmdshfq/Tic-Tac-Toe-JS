let userTurn;
let message = document.querySelector('#message');
let playerXScore = localStorage.getItem('X');
let playerOScore = localStorage.getItem('O');
let playerXScoreElement = document.querySelector('#player-x-score');
let playerOScoreElement = document.querySelector('#player-o-score');
let randomNumber = Math.random() * 10;

/*
* Check if the score exists in local storage 
* and assign it to the score board
*/
function checkScore() {
    if (!playerXScore && !playerOScore) {
        localStorage.setItem('X', 0);
        localStorage.setItem('O', 0);
        playerXScore = 0;
        playerOScore = 0;
    }
    playerXScoreElement.textContent = playerXScore;
    playerOScoreElement.textContent = playerOScore;
};
checkScore();

// Randomize each player's turn
if (randomNumber <= 5.5) {
    userTurn = true;
    message.textContent = "Player X's Turn";
} else {
    userTurn = false;
    message.textContent = "Player O's Turn";
}

// Start game when user clicks or press space key
function playGame(event) {
    if (event.code === 'Space' || event.type === 'click') {
        markCell(event);
        gameLogic();
    }
}

// Mark X or O in the selected cell
function markCell(event) {
    let input = event.target;

    if (userTurn === true) {
        input.value = 'X';
        input.disabled = true;
        message.textContent = "Player O's Turn";
        userTurn = false;
    } else {
        input.value = 'O';
        input.disabled = true;
        message.textContent = "Player X's Turn";
        userTurn = true;
    }
}

// The main logic of winning the game
function gameLogic() {
    // Array of id names of cells
    let cellIds = [
        'cell-1',
        'cell-2',
        'cell-3',
        'cell-4',
        'cell-5',
        'cell-6',
        'cell-7',
        'cell-8',
        'cell-9',
    ];

    // Array of cell elements
    let cellElements = cellIds.map((cell) =>
        document.querySelector(`#${cell}`)
    );

    // Array of cell values
    let cellValues = cellElements.map((cell) => cell.value);

    // Array of winning patterns
    let winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    // Number of empty cells left
    let emptyCells = cellValues.filter((value) => value === '').length;

    // Flag for match tied condition
    let won = false;

    // Evaluate if X or O wins
    winPatterns.forEach((pattern) => {
        let cell1 = cellElements[pattern[0]];
        let cell2 = cellElements[pattern[1]];
        let cell3 = cellElements[pattern[2]];
        if (cell1.value === 'X' && cell2.value === 'X' && cell3.value === 'X') {
            winner('X');
            winStyles([cell1, cell2, cell3, message]);
        } else if (
            cell1.value === 'O' &&
            cell2.value === 'O' &&
            cell3.value === 'O'
        ) {
            winner('O');
            winStyles([cell1, cell2, cell3, message]);
        }
    });

    // Check if the match is tied
    if (emptyCells === 0 && won === false) {
        message.textContent = 'Match Tied!';
    }

    // Winner player logic
    function winner(player) {
        if (player === 'X') {
            playerXScore = Number(playerXScore) + 1;
            localStorage.setItem('X', playerXScore);
            playerXScoreElement.textContent = playerXScore;
            message.textContent = 'Player X Wins!';
        } else {
            playerOScore = Number(playerOScore) + 1;
            localStorage.setItem('O', playerOScore);
            playerOScoreElement.textContent = playerOScore;
            message.textContent = 'Player O Wins!';
        }
        disableCells();
        won = true;
    }

    // Winner styles
    function winStyles(elements) {
        elements.forEach((element) => {
            element.classList.add('win');
        });
    }

    // Disable all cells
    function disableCells() {
        cellElements.forEach((cell) => (cell.disabled = true));
    }
}

// Restart the game
function restart() {
    window.location.reload();
}

// Reset the score and restart the game
function reset() {
    let message = 'Do you really want to RESET the score?';
    if (confirm(message) == true) {
        localStorage.setItem('X', 0);
        localStorage.setItem('O', 0);
        alert('Score Reset!');
        restart();
    } else {
        alert('Score kept!');
    }
}
