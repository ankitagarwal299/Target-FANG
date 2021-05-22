//https://www.youtube.com/watch?v=35JK-scUhpw&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=34
//Alternative Solution - By Sumit Malik - Bruteforce way
//https://www.youtube.com/watch?v=U0dg2X14gYc&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=35

//Solving 2d Matrix as 1d , easy solutioon for N queen problem . Find one way where N queen can place.
/* 
    Trick
    row = cell / 4
    col = cell % 4
    cell = row*4 + col
*/
//this is only combination , queen can 
var solveNQueens = function (n) {

    let board = new Array(n).fill(0).map(_ => Array(n).fill('.'));
    let result = [];

    function traverse(queen, lcono) {
        if (queen == n) {

            result.push(board.map(row => row.slice()));
            //result.push(board.map(row => row.join()));
            return;
        }
        for (let cell = lcono + 1; cell < n * n; cell++) {

            let row = Math.floor(cell / n);
            let col = cell % n;
            board[row][col] = 'Q';

            traverse(queen + 1, cell);//(queen, cellno)
            board[row][col] = '.';
        }

    }
    traverse(0, -1);//(queen, cellno)
    return result;
};
//4 choose 2 = 4C2 = 4! / 2! * (4 - 2)! =6
//Not Permutation 4P2 = 4!/ (4-2)!= 12
console.log(solveNQueens(2));



//https://www.youtube.com/watch?v=U0dg2X14gYc&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=36
var solveNQueens = function (n) {

    let board = new Array(n).fill(0).map(_ => Array(n).fill('.'));
    let result = [];

    function isQueenSafe(i, j) {

        //check up change row
        for (let row = i; row >= 0; row--) {
            if (board[row][j] == 'Q') return false;
        }
        //check col change col
        for (let col = j; col >= 0; col--) {
            if (board[i][col] == 'Q') return false;
        }

        //check left diagonal
        for (let row = i, col = j; row >= 0 && col >= 0; row-- , col--) {
            if (board[row][col] == 'Q') return false;
        }
        //check right diagonal
        for (let row = i, col = j; row >= 0 && col < n; row-- , col++) {
            if (board[row][col] == 'Q') return false;
        }
        return true;
    }

    function traverse(queen, locono) {
        if (queen == n) {
            result.push(board.map(row => row.slice()));
            return;
        }

        for (let cell = locono + 1; cell < n * n; cell++) {
            let row = Math.floor(cell / n);
            let col = Math.floor(cell % n);

            if (board[row][col] == '.' && isQueenSafe(row, col)) {
                board[row][col] = 'Q';
                traverse(queen + 1, row * n + col);
                board[row][col] = '.';
            }
        }
    }


    traverse(0, 0);
    return result;
}
console.log(solveNQueens(4));


var queensAttacktheKing = function (queens, king) {
    let result = [];

    //retrieve queen in O(1), use Map
    let map = {};
    for (let item of queens) {
        if (!map[item]) {
            map[item] = 'Q';
        }
    }

    console.log(map)
    //check 8 directions
    let [i, j] = king;
    //left col --
    for (let row = i, col = j; col >= 0; col--) {
        if (map[`${row},${col}`] == 'Q') {
            result.push([row, col]);
            break;
        }
    }
    //left-up diagonal row--,col --
    for (let row = i, col = j; row >= 0, col >= 0; row-- , col--) {
        if (map[`${row},${col}`] == 'Q') {
            result.push([row, col]);
            break;
        }
    }
    //up row --
    for (let row = i, col = j; row >= 0; row--) {
        if (map[`${row},${col}`] == 'Q') {
            result.push([row, col]);
            break;
        }
    }

    //up row--,col ++
    for (let row = i, col = j; row >= 0, col <= 8; row-- , col++) {
        if (map[`${row},${col}`] == 'Q') {
            result.push([row, col]);
            break;
        }
    }


    //up row,col ++
    for (let row = i, col = j; col <= 8; col++) {
        if (map[`${row},${col}`] == 'Q') {

            result.push([row, col]);
            break;
        }
    }

    //up row++,col ++
    for (let row = i, col = j; row <= 8, col <= 8; row++ , col++) {
        if (map[`${row},${col}`] == 'Q') {
            result.push([row, col]);
            break;
        }
    }

    //up row,col ++
    for (let row = i, col = j; row <= 8; row++) {
        if (map[`${row},${col}`] == 'Q') {
            result.push([row, col]);
            break;
        }
    }
    //up row,col ++
    for (let row = i, col = j; row <= 8, col >= 0; row++ , col--) {
        if (map[`${row},${col}`] == 'Q') {
            result.push([row, col]);
            break;
        }
    }


    return result;

};

let queens = [[0, 1], [1, 0], [4, 0], [0, 4], [3, 3], [2, 4]];
let king = [0, 0];

console.log(queensAttacktheKing(queens, king));
