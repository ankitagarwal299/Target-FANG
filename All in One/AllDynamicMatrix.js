//bruteforce
//https://www.youtube.com/watch?v=uyetDh-DyDg&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=1
//Sumeet Malik
var isValidSudoku = function (board) {

    function isValid(x, y, val) {
        for (let i = 0; i < board.length; i++) {
            if (val == board[i][y] && i != x) return false;
        }

        for (let j = 0; j < board[0].length; j++) {
            if (val == board[x][j] && j != y) return false;
        }

        let smi = 3 * Math.floor(x / 3);
        let smj = 3 * Math.floor(y / 3);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[smi + i][smj + j] == val && smi + i != x && smj + j != y) return false;
            }
        }


        return true;
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let currVal = board[i][j];
            if (currVal == '.') continue;

            if (!isValid(i, j, currVal)) {
                return false;
            }
        }
    }
    return true;

};

//Hash
var isValidSudoku = function (board) {
    let seen = new Set();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let currVal = board[i][j];
            if (currVal == '.') continue;

            /* add and check immediately */
            if (seen.has(currVal + ' found in row ' + i) ||
                seen.has(currVal + ' found in column ' + j) ||
                seen.has(currVal + ' found in box number ' + Math.floor(i / 3) * 3 + Math.floor(j / 3))) {
                return false;
            } else {
                /* 
                   Box# can be found using formula i / 3 * 3 + j / 3 eg. Box 1 , Box 2 , Box 3
                   Box# index is same for all 9 subboxes using formula i / 3  + j / 3 
                   eg. Box 0-0, 0-1, 0-2
                       Box 1-0, 1-1, 1-2
                       Box 2-0, 2-1, 2-2
               */
                seen.add(currVal + ' found in row ' + i);
                seen.add(currVal + ' found in column ' + j);
                seen.add(currVal + ' found in box number ' + Math.floor(i / 3) * 3 + Math.floor(j / 3));

            }

        }
    }
    return true;
};
var board = [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]
console.log(isValidSudoku(board));

[
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
]




var isValidSudoku = function (board, x, y, val) {
    //check in row
    for (let row = 0; row < board.length; row++) {
        if (board[row][y] == val) return false;
    }
    //check in column
    for (let col = 0; col < board[0].length; col++) {
        if (board[x][col] == val) return false;
    }

    let smi = Math.floor(x / 3) * 3;
    let smj = Math.floor(y / 3) * 3;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[smi + row][smj + col] == val) return false;
        }
    }


    return true;
};


var solveSudoku = function (board) {
    var result = []

    function traverse(board, i, j) {
        if (i == board.length) {
            result = board.map((subarr) => [...subarr]);

            return;
        }

        let ni = 0;
        let nj = 0;

        if (j == board[0].length - 1) {
            ni = i + 1;
            nj = 0;
        } else {
            ni = i;
            nj = j + 1;
        }

        if (board[i][j] != '.') {
            traverse(board, ni, nj);//cannot do anything , number already present , move forward for next cell
        } else {
            for (let po = 1; po <= 9; po++) {//po possible Option
                if (isValidSudoku(board, i, j, po) == true) {
                    board[i][j] = po;
                    traverse(board, ni, nj);
                    board[i][j] = '.';

                }
            }
        }
    }

    traverse(board, 0, 0);
    return result;

};




var board =
    [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ]

console.log(solveSudoku(board));

//Solution by JSer
//https://www.youtube.com/watch?v=yvt0emtFiIE&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=3
//Alternative Solution - By Sumit Malik - Bruteforce way
//https://www.youtube.com/watch?v=U0dg2X14gYc&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=35

//51. N - Queens I--Optimized Solution,
// Number of combinations N queen can place without killing
var solveNQueens = function (n) {
    const result = [];

    const board = new Array(n).fill(0).map(_ => Array(n).fill('.'));

    const cols = new Array(n).fill(false);
    const norDiagonal = new Array(n * 2 - 1).fill(false);
    const revDiagonal = new Array(n * 2 - 1).fill(false);

    function solve(row, col) {
        if (cols[col] || norDiagonal[row + col] || revDiagonal[row - col + n - 1]) return;

        board[row][col] = 'Q';
        cols[col] = true;
        norDiagonal[row + col] = true;
        revDiagonal[row - col + n - 1] = true;

        if (row == n - 1) {
            result.push(board.map(row => row.join('')));
        } else {
            //change to next row 
            for (let k = 0; k < n; k++) {
                solve(row + 1, k);
            }
        }

        board[row][col] = '.';
        cols[col] = false;
        norDiagonal[row + col] = false;
        revDiagonal[row - col + n - 1] = false;


    }
    //Start by inserting 1st queen on the col1,then on col2, col3.....
    for (let k = 0; k < n; k++) {
        solve(0, k);
    }

    return result;
};

//52. N - Queens II
//same as above no change. Number of combinations N queen can place without killing
var totalNQueens = function (n) {
    let counter = 0;

    const board = new Array(n).fill(0).map(_ => Array(n).fill('.'));

    const cols = new Array(n).fill(false);
    const norDiagonal = new Array(n * 2 - 1).fill(false);
    const revDiagonal = new Array(n * 2 - 1).fill(false);

    function solve(row, col) {
        if (cols[col] || norDiagonal[row + col] || revDiagonal[row - col + n - 1]) return;

        board[row][col] = 'Q';
        cols[col] = true;
        norDiagonal[row + col] = true;
        revDiagonal[row - col + n - 1] = true;

        if (row == n - 1) {
            //result.push(board.map(row => row.join('')));
            counter += 1;
        } else {
            for (let k = 0; k < n; k++) {
                solve(row + 1, k);
            }
        }

        board[row][col] = '.';
        cols[col] = false;
        norDiagonal[row + col] = false;
        revDiagonal[row - col + n - 1] = false;


    }
    //Start by inserting 1st queen on the col1, col2, col3.....
    for (let k = 0; k < n; k++) {
        solve(0, k);
    }

    return counter;
};


//Solving 2d Matrix as 1d , easy solutioon for N queen problem . Find one way where N queen can place.
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



//leetcode 1222. Queens That Can Attack the King
var queensAttacktheKing = function (queens, king) {
    let result = [];

    //retrieve queen in O(1), use Map
    let map = {};
    for (let item of queens) {
        if (!map[item]) {//As soon as insert into map, it is converted into string
            map[item] = 'Q';
        }
    }
    /* 
    {
        '0,1': 'Q',
        '1,0': 'Q',
        '4,0': 'Q',
        '0,4': 'Q',
        '3,3': 'Q',
        '2,4': 'Q'
    }

*/

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


//leetcode 1219. Path with Maximum Gold
// 1. Attempted Similar to Flood fill (AllFloodQuestions.js)
// 2. Attempted Similar to Island
// 3. Conflicting with leetcode solution
//https://www.youtube.com/watch?v=lNwXq3Ki32I&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=8
var getMaximumGold = function (grid) {

    let visited = grid.map(row => row.map(cell => cell == 0))

    let maxGold = 0;
    let bag = [];
    let result = [];


    function traverseandCollectGold(i, j) {
        //base case
        // if(i<0 || i>= grid.length || j<0 || j >= grid[0].length || visited[i][j]==true ||  grid[i][j]==0) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || visited[i][j] == true) {
            return;
        }

        visited[i][j] = true;
        bag.push(grid[i][j]);

        traverseandCollectGold(i - 1, j);//north -UP
        traverseandCollectGold(i, j + 1);//east -right
        traverseandCollectGold(i, j - 1);//west -left
        traverseandCollectGold(i + 1, j);//south -down

    }

    grid.forEach((row, i) => {
        row.forEach((col, j) => {
            if (grid[i][j] != 0 || visited[i][j] == false) {
                bag = [];
                traverseandCollectGold(i, j);
                let sum = 0;
                //let sum = bag.reduce((accumulator, currentValue)=>  {accumulator += currentValue},0);
                bag.forEach((item) => sum += item);
                result.push(bag);

                maxGold = Math.max(sum, maxGold);
            }
        });
    });
    console.log(result)
    return maxGold;
};


//result  is 24 according to leetcode, bcoz cannot visit twice 
let grid = [
    [0, 6, 0],
    [5, 8, 7],
    [0, 9, 0]
];

let grid = [
    [1, 0, 7],
    [2, 0, 6],
    [3, 4, 5],
    [0, 3, 0],
    [9, 0, 20]
]
console.log(getMaximumGold(grid));


//64. Minimum Path Sum -- Very Easy
var minPathSum = function (grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;

    let dp = new Array(grid.length).fill(0).map(_ => new Array(grid[0].length).fill(0));

    for (let i = dp.length - 1; i >= 0; i--) {
        for (let j = dp[0].length - 1; j >= 0; j--) {
            //Case1: Bottom Last box
            if (i == dp.length - 1 && j == dp[0].length - 1) {
                dp[i][j] = grid[i][j];

            } else if (i == dp.length - 1) {
                //Case2: Last row
                dp[i][j] = grid[i][j] + dp[i][j + 1];
            } else if (j == dp[0].length - 1) {
                //Case3: Last Column
                dp[i][j] = grid[i][j] + dp[i + 1][j];
            } else {
                dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
            }

        }
    }
    return dp[0][0];

};
//https://www.youtube.com/watch?v=BzTIOsC0xWM&t=0s
let grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]
console.log(minPathSum(grid));

let grid1 = [[2, 8, 41, 6, 4, 2], [6, 0, 9, 53, 8, 5], [1, 4, 3, 4, 0, 6, 5], [6, 4, 7, 2, 4, 6, 1], [1, 0, 3, 7, 1, 2, 7], [1, 5, 3, 2, 3, 0, 9], [2, 2, 5, 1, 9, 8, 0]];
console.log(minPathSum(grid1));

//print all paths -- Very Easy Extend of above
//print all paths
var minPathSum = function (grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;

    let dp = new Array(grid.length).fill(0).map(_ => new Array(grid[0].length).fill(0));

    for (let i = dp.length - 1; i >= 0; i--) {
        for (let j = dp[0].length - 1; j >= 0; j--) {
            //Case1: Bottom Last box
            if (i == dp.length - 1 && j == dp[0].length - 1) {
                dp[i][j] = grid[i][j];

            } else if (i == dp.length - 1) {
                //Case2: Last row
                dp[i][j] = grid[i][j] + dp[i][j + 1];
            } else if (j == dp[0].length - 1) {
                //Case3: Last Column
                dp[i][j] = grid[i][j] + dp[i + 1][j];
            } else {
                dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
            }

        }
    }
    //return dp[0][0];
    console.log(dp)

    //print all paths of minimum cost
    let paths = printAllPaths(dp);
    return paths;

};

function Pair(psf, row, col) {
    this.psf = psf;
    this.row = row;
    this.col = col;
}

function printAllPaths(dp) {
    let queue = [new Pair("", 0, 0)];
    let allPaths = [];

    while (queue.length > 0) {
        let node = queue.shift();

        //Last box/end point
        if (node.row == dp.length - 1 && node.col == dp[0].length - 1) {
            allPaths.push(node.psf);
        } else if (node.row == dp.length - 1) {
            queue.push(new Pair(node.psf + "H", node.row, node.col + 1));
        }
        else if (node.col == dp[0].length - 1) {
            queue.push(new Pair(node.psf + "V", node.row + 1, node.col));
        } else if (dp[node.row][node.col + 1] == dp[node.row + 1][node.col]) {
            queue.push(new Pair(node.psf + "H", node.row, node.col + 1));
            queue.push(new Pair(node.psf + "V", node.row + 1, node.col));
        } else {
            if (dp[node.row][node.col + 1] < dp[node.row + 1][node.col]) {
                queue.push(new Pair(node.psf + "H", node.row, node.col + 1));
            } else {
                queue.push(new Pair(node.psf + "V", node.row + 1, node.col));
            }
        }
    }
    return allPaths;
}

let grid1 = [[2, 6, 4, 1, 3], [9, 1, 1, 0, 5], [0, 7, 5, 2, 0], [0, 4, 3, 0, 7], [2, 0, 4, 3, 1]];
let grid2 = [[2, 6, 1, 1, 3], [9, 1, 1, 0, 5], [0, 7, 5, 2, 0], [4, 3, 0, 4, 7], [2, 0, 1, 4, 1]];
//https://www.youtube.com/watch?v=f8Vdifn2YjQ&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=10
console.log(minPathSum(grid2));


//Gold Dig from left to right  -- Very Easy
//Find path where to start digging to find maximum gold
var pathMaxGol = function (grid) {
    console.log("sdfdsf")
    if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;
    //let dp =0;
    //let dp =  new Array(grid.length).fill(0).map(_ => new Array(grid[0].length).fill(0));
    let dp = new Array(grid.length).fill(0).map(_ => new Array(grid[0].length).fill(0));


    /* Trick to start with last column and loop each row - Very unique */
    for (let col = dp[0].length - 1; col >= 0; col--) {
        for (let row = 0; row < dp.length; row++) {
            if (col == dp[0].length - 1) {
                //Case1: Last column
                dp[row][col] = grid[row][col];
            } else if (row == 0) {
                dp[row][col] = grid[row][col] + Math.max(dp[row][col + 1], dp[row + 1][col + 1]);
            } else if (row == dp.length - 1) {
                dp[row][col] = grid[row][col] + Math.max(dp[row - 1][col + 1], dp[row][col + 1]);
            } else {
                dp[row][col] = grid[row][col] + Math.max(dp[row - 1][col + 1], dp[row][col + 1], dp[row + 1][col + 1]);

            }
        }
    }
    console.log(dp)
    let maxGoldCollected = dp[0][0];
    for (let row = 1; row < dp.length; row++) {
        maxGoldCollected = Math.max(maxGoldCollected, dp[row][0]);
    }
    return maxGoldCollected;


};

let grid2 = [
    [0, 1, 4, 2, 8, 2],
    [4, 3, 6, 5, 0, 4],
    [1, 2, 4, 1, 4, 6],
    [2, 0, 7, 3, 2, 2],
    [3, 1, 5, 9, 2, 4],
    [2, 7, 0, 8, 5, 1]
];
//https://www.youtube.com/watch?v=hs0lilfJ7C0&t=773s
console.log(pathMaxGol(grid2));




