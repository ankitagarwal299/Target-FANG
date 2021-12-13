//DIY: Number of Islands
//200. Number of Islands leetcode

var friendCircles = function (grid, n) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;

    let visited = new Set();//track the visited nodes

    let circles = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] == 1 && !visited.has(row + "_" + col)) {
                circles = circles + dfs(row, col, visited);
            }
        }
    }

    function dfs(row, col) {
        if (row < 0 || col < 0 || row > grid.length || col > grid[row].length || grid[row][col] == 0 ||
            visited.has(row + "_" + col)) {
            return 0;
        }

        visited.add(row + "_" + col);

        dfs(row + 1, col);
        dfs(row - 1, col);

        dfs(row, col + 1);
        dfs(row, col - 1);

        return 1;

    }


    return circles;// total islands or circles
};



let n = 4;//total users
var friends = [
    [1, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1]
];
console.log(friendCircles(friends, n));
