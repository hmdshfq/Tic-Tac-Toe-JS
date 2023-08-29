let userTurn = true;
let nextPlayer = document.querySelector('#next-player');
let winsPlayerX = localStorage.getItem('X');
let winsPlayerO = localStorage.getItem('O');
let playerXScore = document.querySelector('#player-x-score');
let playerOScore = document.querySelector('#player-o-score');

(function checkPlayerWins() {
    if (!winsPlayerX && !winsPlayerO) {
        localStorage.setItem('X', 0);
        localStorage.setItem('O', 0);
        winsPlayerX = localStorage.getItem('X');
        winsPlayerO = localStorage.getItem('O');
    }
    playerXScore.textContent = winsPlayerX;
    playerOScore.textContent = winsPlayerO;
})();

function playGame(event) {
    if (event.code === 'Space' || event.type === 'click') {
        mark(event);
        logic();
    }
}

function logic() {
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
    let cellValues = cellElements.map((element) => element.value);

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

    // Evaluate if X or O wins or it's a draw
    winPatterns.forEach((pattern) => {
        if (
            cellValues[pattern[0]] === 'X' &&
            cellValues[pattern[1]] === 'X' &&
            cellValues[pattern[2]] === 'X'
        ) {
            disableCells();
            localStorage.setItem('X', Number(winsPlayerX) + 1);
            playerXScore.textContent = localStorage.getItem('X');
            cellElements[pattern[0]].style.color = 'goldenrod';
            cellElements[pattern[1]].style.color = 'goldenrod';
            cellElements[pattern[2]].style.color = 'goldenrod';
            nextPlayer.style.color = 'goldenrod';
            nextPlayer.style.fontWeight = 500;
            nextPlayer.textContent = 'Player X Wins!';
        } else if (
            cellValues[pattern[0]] === 'O' &&
            cellValues[pattern[1]] === 'O' &&
            cellValues[pattern[2]] === 'O'
        ) {
            disableCells();
            localStorage.setItem('O', Number(winsPlayerO) + 1);
            playerOScore.textContent = localStorage.getItem('O');
            cellElements[pattern[0]].style.color = 'goldenrod';
            cellElements[pattern[1]].style.color = 'goldenrod';
            cellElements[pattern[2]].style.color = 'goldenrod';
            nextPlayer.style.color = 'goldenrod';
            nextPlayer.style.fontWeight = 500;
            nextPlayer.textContent = 'Player O Wins!';
        } else if (emptyCells === 0) {
            nextPlayer.textContent = 'Match Tied!';
        }
    });

    function disableCells() {
        cellElements.forEach((cell) => (cell.disabled = true));
    }
}

function mark(event) {
    let input = event.target;

    if (userTurn === true) {
        input.value = 'X';
        input.disabled = true;
        nextPlayer.textContent = "Player O's Turn";
        userTurn = false;
    } else {
        input.value = 'O';
        input.disabled = true;
        nextPlayer.textContent = "Player X's Turn";
        userTurn = true;
    }
}

function restart() {
    window.location.reload();
}

function reset() {
    let message = 'Do you really want to RESET the score?';
    if (confirm(message) == true) {
        localStorage.setItem('X', 0);
        localStorage.setItem('O', 0);
        playerXScore.textContent = localStorage.getItem('X');
        playerOScore.textContent = localStorage.getItem('O');
        alert('Score Reset!');
        restart();
    } else {
        alert('Score kept!');
    }
}
