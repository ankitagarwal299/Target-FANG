
function gameOver(obj) {
    document.querySelector('.end-game').style.display = "block";
    document.querySelector('.end-game .text').innerHTML = (obj.player == huPlayer) ? "You win!" : "You lose.";

    for (let index of winCombos[obj.index]) {
        document.getElementById(index).style.backgroundColor = (obj.player == huPlayer) ? "blue" : "red";
    }
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.removeEventListener('click', turnClick);
    });
}

function checkTie() {
    if (emptySquares().length == 0) {
        document.querySelector('.end-game').style.display = "block";
        document.querySelector('.end-game .text').innerHTML = "Tie Game!";

        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.removeEventListener('click', turnClick);
        });

        return true;
    }

    return false;
}

function emptySquares() {
    return origBoard.filter(item => item != "X" && item != "O");
}

function minimax(newboard, player) {
    //available spots
    let availSpots = emptySquares();

    //check for terminal states such as win, loseand tie
    //and return value accordingly
    if (checkWin(newboard, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(newboard, aiPlayer)) {
        return { score: 10 }
    } else if (availSpots.length == 0) {
        return { score: 0 };
    }

    //an array to collect scores from each empty spot
    const moves = [];

    //loop through available spots
    for (let i = 0; i < availSpots.length; i++) {
        //create an object for each spot and store the index of that spot
        var move = {};
        move.index = newboard[availSpots[i]];//?

        //set the empty spot on the board to curr player
        newboard[availSpots[i]] = player;

        /* collect the score resulted from calling the minimax 
        on the opponent if the current player */
        if (player == aiPlayer) {
            var result = minimax(newboard, huPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newboard, aiPlayer);
            move.score = result.score;
        }


        //reset the spot
        newboard[availSpots[i]] = move.index;

        //push the object to the array
        moves.push(move);
    }


    var bestMove;
    if (player == aiPlayer) {
        //If computer's turn, loop over the moves and choose the move with
        //highest score
        var bestScore = -100;
        for (let i = 0; i < moves.length; i++) {
            bestScore = Math.max(moves[i].score, bestScore);
            bestMove = i;
        }
    } else {
        //else choose the move with lowest scrore
        var bestScore = 100;
        for (let i = 0; i < moves.length; i++) {
            bestScore = Math.min(moves[i].score, bestScore);
            bestMove = i;
        }
    }
    return moves[bestMove];
}

function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}

function checkWin(board, player) {
    /* return winCombos.some((combination) => {
        return combination.every((index) => {
            return board[index] == player;
        });
    }); */

    for (let [index, combo] of winCombos.entries()) {
        let winCombo = combo.every((index) => {
            return board[index] == player;
        });

        /* if found an array where every elem in the array equals player */
        if (winCombo) {
            return { index: index, player: player };
        }
    }

    return false;
}

function turn(sqaureId, player) {
    origBoard[sqaureId] = player;
    document.getElementById(sqaureId).innerHTML = player;
    const gameWon = checkWin(origBoard, player);
    if (gameWon) {
        gameOver(gameWon);
    }
}

function turnClick(e) {
    if (origBoard[e.target.id] != "X" && origBoard[e.target.id] != "O") {
        turn(e.target.id, huPlayer);
        turn(bestSpot(), aiPlayer);
    }
}

function startGame() {
    origBoard = Array.from(Array(9).keys());
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', turnClick, false);
    });
}

function restartGame() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "";
    });

    document.querySelector('.end-game').style.display = "none";

    startGame();
}

let origBoard = [];
const huPlayer = "O";
const aiPlayer = "X";

const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

startGame();


/* Steps */
// 0. Restart game if already played by resetting DOM,  color , Message
// 1. Setup Board ; addEventlistener ;attach click handler
// 2. turnClick halnder call both the player turn
// 3. turn updates the DOM with player move and check win and gameover
// 4.