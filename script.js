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
