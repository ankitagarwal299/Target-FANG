function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", turnClick, false);
    }

    document.querySelector(".end-game").style.display = "block";
    document.querySelector(".end-game .text").innerText = gameWon.player == huPlayer ? "You win!" : "You lose.";
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => {
        e == player ? a.concat(i) : a;
    }, []);


    for (let [index, win] of winCombos.entries) {
        let wonConfirmed = win.every((index) => {
            plays.indexOf(index) > -1;
        });

        if (wonConfirmed) {
            return { index: index, player: player }
        }
    }
    return false;
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementsById(squareId).innerHTML = player;

    let gameWon = checkWin(origBoard, player);
    if (gameWon) {
        gameOver(gameWon);
    }
}

function turnClick(e) {
    if (typeof origBoard[e.target.id] == "number") {
        turn(e.target.id, huPlayer);
        // if (!checkWin(origBoard, huPlayer) && !checkTie()) {
        turn(bestSpot, aiPlayer);
        // }
    }
}

function start() {
    /* reset game */
    document.querySelector(".end-game").style.display = "none";
    origBoard = Array.from(Array(9).keys());

    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.style.removeProperty("background-color");
        cell.addEventListener("click", turnClick, false);
    });
}



var origBoard = [];
const huPlayer = "O";
const aiPlayer = "X";
const winCombos = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[6, 4, 2]
];

const cells = document.querySelector(".cell");

startGame();
