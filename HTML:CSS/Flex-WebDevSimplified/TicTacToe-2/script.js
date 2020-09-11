const X_CLASS = 'x';
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let circleTurn = false;
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restart");
const winningMessageText = document.querySelector("[data-winning-message-text]");
const cellElement = document.querySelectorAll("[data-cell]");

// cellElement.forEach((cell) => {
//     cell.addEventListener("click", handlerClick, { once: true });
// });


function startGame() {
    cellElement.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handlerClick)
        cell.addEventListener("click", handlerClick, { once: true });

    });

    winningMessageElement.classList.remove("show");
    setBoardHoverClass();

}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some((combination) => {
        return combination.every((index) => {
            return cellElement[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElement].every((cell) => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS);
    });
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerHTML = "Draw!!";

    } else {
        winningMessageText.innerHTML = `${circleTurn ? "O's" : "X's"} WIN!!`;
    }
    winningMessageElement.classList.add("show");

}


function handlerClick(e) {
    let cellClicked = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    //placeMark
    cellClicked.classList.add(currentClass);

    //checkwin
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        //Switch Turn
        circleTurn = !circleTurn;
        setBoardHoverClass();
    }

}



//game trigger
startGame();
restartButton.addEventListener('click', startGame);


