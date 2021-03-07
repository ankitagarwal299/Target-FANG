const cells = document.querySelectorAll('.cells');
const endGame = document.querySelector('.end-game');

function emptySpots() {
    return origBoard.filter((cell) => {
        return cell != "X" && cell != "O";
    });
}

function minimax(newBoard, player) {
    let availSpots = emptySpots();

    //return base case
    if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (availSpots.length == 0) {
        return { score: 0 };
    }

    const moves = [];
    //recursive
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;

        if (player == huPlayer) {
            move.score = minimax(newBoard, aiPlayer).score;
        } else {
            move.score = minimax(newBoard, huPlayer).score;

        }

        //reset Spot
        newBoard[availSpots[i]] = move.index;
        //push
        moves.push(move);
    }


    var bestMove;
    if (player == aiPlayer) {
        let bestScore = -100;
        for (let i = 0; i < moves.length; i++) {

            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 100;
        for (let i = 0; i < moves.length; i++) {

            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }



    return moves[bestMove];
}


function gameOver(gameWon) {
    endGame.style.display = "block";
    document.querySelector('.end-game .text').innerHTML = gameWon.player == "huPlayer" ? "You Won" : "You Lose";
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == "huPlayer" ? "blue" : "red";
    }

    cells.forEach((cell) => {
        cell.removeEventListener('click', turnClick);
    });

    endGame.style.display = "block";
}

function checkWin(origBoard, player) {
    for (let [index, combos] of winCombos.entries()) {
        let win = combos.every((index) => {
            return origBoard[index] == player;
        });

        if (win) {
            return { index: index, player: player }
        }
    }
    return false;
}

function checkTie(origBoard, player) {
    if (emptySpots().length == 0) {
        document.querySelector('.end-game .text').innerHTML = "Tie Game";
        endGame.style.display = "block";
    }

}

function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;

    let gameWon = checkWin(origBoard, player);
    if (gameWon) {
        gameOver(gameWon);
        return;
    }
    checkTie(origBoard, player);

}

function turnClick(e) {
    if (origBoard[e.target.id] != "X" && origBoard[e.target.id] != "O") {
        turn(e.target.id, huPlayer);
        turn(bestSpot(), aiPlayer);
    }

}

function startGame() {
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "";
        cell.addEventListener('click', turnClick);
    });
    //always forget to set board
    origBoard = Array.from(Array(9).keys());
}

function replay() {
    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "";
        cell.removeEventListener('click', turnClick);
    });

    endGame.style.display = "none";
    startGame();
}

var origBoard = [];
var aiPlayer = "X";
var huPlayer = "O";

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

startGame();