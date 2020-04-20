var numIslands = function (grid) {
    if (grid == null || grid.length == 0) {
      return 0;
    }
  
    let numIslands = 0;
  
    for (let i = 0; i < grid.length ; i++) {
      for (let j = 0; j < grid[0].length ; j++) {
        if (grid[i][j] == "1") {
          numIslands = numIslands + dfs(grid, i, j);
        }
      }
    }
  return numIslands;
   
  }
  
  function dfs(grid, i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] == '0') {
      return 0;
    }
  
    grid[i][j] = 0;
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
  
    return 1;
  }
  
  var islands = [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1]
  ]
 /*  var islands = [
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]; */
  console.log(numIslands(islands));



/* 
Example 1:

Input:
11110
11010
11000
00000

Output: 1

Example 2:

Input:
[
[1,1,0,0,0],
[1,1,0,0,0],
[0,0,1,0,0],
[0,0,0,1,1]
]

Output: 3
*/