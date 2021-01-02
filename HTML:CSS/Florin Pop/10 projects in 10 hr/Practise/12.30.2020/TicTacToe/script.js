function gameOver(gameWon) {
    const cells = document.querySelectorAll('.cells');
    cells.forEach((cell) => {
        cell.removeEventListener('click', turnClick);
    });
    document.querySelector('.end-game').style.display = "block";
    document.querySelector('.end-game .text').innerHTML = gameWon.player == huPlayer ? "You Win!!" : "You loose!!";

    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
    }

}

function minimax(newBoard, player) {
    let availSpots = emptySquares();

    if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 }
    } else if (checkWin(newBoard, huPlayer)) {
        return { score: -10 }
    } else if (availSpots.length == 0) {
        return { score: 0 }
    }

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            let result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        //reset spot
        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player == aiPlayer) {
        var bestScore = -100;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 100;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWin(board, player) {
    for (let [index, wincombo] of winCombos.entries()) {
        let win = wincombo.every((index) => {
            return board[index] == player;
        });

        if (win) {
            return { index: index, player: player };
        }
    }

    return false;
}

function emptySquares() {
    return origBoard.filter((item) => item != "X" && item != "O");
}

function checkTie() {
    if (emptySquares().length == 0) {
        document.querySelector('.end-game').style.display = "block";
        document.querySelector('.end-game .text').innerHTML = "Tie Game!!";

        const cells = document.querySelectorAll('.cells');
        cells.forEach((cell) => {
            cell.removeEventListener('click', turnClick);
        });
    }
}

function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}

function turn(squareID, player) {
    document.getElementById(squareID).innerHTML = player;
    origBoard[squareID] = player;

    const gameWon = checkWin(origBoard, player);
    if (gameWon) {
        gameOver(gameWon);
        return;
    }

    checkTie();
}

function turnClick(e) {
    //check if player already played
    if (origBoard[e.target.id] != "X" && origBoard[e.target.id] != "O") {
        turn(e.target.id, huPlayer);
        turn(bestSpot(), aiPlayer);
    }
}

function startGame() {
    const cells = document.querySelectorAll('.cells');
    cells.forEach((cell) => {
        cell.addEventListener('click', turnClick);
    });
    origBoard = Array.from(Array(9).keys());
}

function replay() {
    const cells = document.querySelectorAll('.cells');
    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.removeEventListener('click', turnClick);
        cell.style.backgroundColor = "";
    });

    document.querySelector('.end-game').style.display = "none";
    startGame();
}

var origBoard = [];
const aiPlayer = "X";
const huPlayer = "O";
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];


startGame();