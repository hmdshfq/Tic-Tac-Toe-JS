let userTurn = true;


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
