var minPathSum = function(grid) {

  if (grid == null || grid.length == 0 ) return 0;

  let dp = Array(grid.length)
  .fill(0)
  .map(() => Array(grid[0].length).fill(0));

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    dp[i][j] = dp[i][j] + grid[i][j];

    if (i > 0 && j > 0) {
      dp[i][j] = dp[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1]);
    }else if ( i > 0) {
      dp[i][j]=dp[i][j] + grid[i-1][j];
    }else if (j >0){
      dp[i][j]=dp[i][j] + grid[i][j-1];
    }
  }
}

return dp[dp.length-1][dp[0].length-1];
    
};

var islands = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
  ]
console.log(minPathSum(islands));
/* 
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example:

Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.
 */