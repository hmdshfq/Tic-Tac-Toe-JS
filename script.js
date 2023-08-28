let userTurn = true;

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
    let cellValues = cellElements.map(
        (element) => element.value
    );

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

}

function mark(event) {
    let input = event.target;

    if (userTurn === true) {
        input.value = 'X';
        input.disabled = true;
        userTurn = false;
    } else {
        input.value = 'O';
        input.disabled = true;
        userTurn = true;
    }
}

function reset() {
    window.location.reload();
}
