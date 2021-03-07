const replay = document.querySelector('.replay');
const cells = document.querySelectorAll('.cell');
const endgame = document.querySelector('.endgame');

function minimax(newBoard, player) {
    let availSpots = emptySpots();

    //check base score condition
    if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (availSpots.length == 0) {
        return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < availSpots.length; i++) {

        let move = {};

        //set the empty spot to current player
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            move.score = minimax(newBoard, huPlayer).score;
        } else {
            move.score = minimax(newBoard, aiPlayer).score;
        }

        // reset the spot to empty
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player == huPlayer) {
        var bestScore = 100;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = -100;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];

}

function checkWin(board, player) {
    let win = winCombos.some((combos) => {
        return combos.every(item => {
            return board[item] == player;
        });
    });
    if (win) {
        // endgame.innerHTML = `${player} wins`;
        // endgame.style.display = 'block';
        return true;
    }

    return false;
}

function emptySpots() {
    //return (orginBoard.filter(item => item != 'X' || item != 'O').length == 0) ? true : false;
    return (orginBoard.filter(item => item != 'X' && item != 'O'));

}
function checkTie() {
    if (emptySpots().length == 0) {
        endgame.innerHTML = 'Game Tie';
        endgame.style.display = 'block';
    }
    return true;
}

function turn(square, player) {
    orginBoard[square] = player;
    document.getElementById(square).textContent = player;

    if (checkWin(orginBoard, player)) {
        endgame.innerHTML = `${player} wins`;
        endgame.style.display = 'block';
    }
    if (checkTie()) return true;

    return false;
}

function bestSpot() {
    return minimax(orginBoard, aiPlayer).index;
}

function turnClick(e) {
    //check if empty on the board
    if (orginBoard[e.target.id] != 'X' && orginBoard[e.target.id] != 'O') {
        turn(e.target.id, huPlayer);

        if (orginBoard.filter(item => item != 'X' && item != 'O').length > 0) {
            turn(bestSpot(), aiPlayer);
        }

    }
}

function startGame() {
    orginBoard = Array.from(Array(9).keys());
    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.style.backgroundColor = '';
        cell.addEventListener('click', turnClick);
    });
}

replay.addEventListener('click', function () {
    cells.forEach((cell) => {
        cell.innerHTML = '';
        cell.style.backgroundColor = '';
        //cell.removeEventListener('click',)
    });
    endgame.style.display = 'none';


    startGame();
});

var orginBoard = [];
var aiPlayer = 'X';
var huPlayer = 'O';
var winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

startGame();