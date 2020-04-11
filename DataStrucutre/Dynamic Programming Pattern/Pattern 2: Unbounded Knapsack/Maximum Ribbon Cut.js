/* 
Problem Statement #

Given a number array to represent possible ribbon lengths and a total ribbon length ‘n’, we need to find the maximum number of pieces that the ribbon can be cut into.

This problem follows the Unbounded Knapsack pattern and is quite similar to Minimum Coin Change (MCC). The only difference is that in MCC we were asked to find the minimum number of coin changes, whereas in this problem we need to find the maximum number of pieces.

Example 1:

n: 5
Ribbon Lengths: {2,3,5}
Output: 2
Explanation: Ribbon pieces will be {2,3}.
Example 2:

n: 7
Ribbon Lengths: {2,3}
Output: 3
Explanation: Ribbon pieces will be {2,2,3}.
Example 3:

n: 13
Ribbon Lengths: {3,5,7}
Output: 3
Explanation: Ribbon pieces will be {3,3,7}.
*/

let countRibbonPieces = function(ribbonLengths, total) {
    const n = ribbonLengths.length;
    const dp = Array(n)
      .fill(0)
      .map(() => Array(total + 1).fill(0));
  
    for (let i = 0; i < n; i++) for (let j = 0; j <= total; j++) dp[i][j] = Number.MIN_VALUE;
  
    // populate the total=0 columns, as we don't need any ribbon to make zero total
    for (let i = 0; i < n; i++) dp[i][0] = 0;
  
    for (let i = 0; i < n; i++) {
      for (let t = 1; t <= total; t++) {
        if (i > 0) {
          // exclude the ribbon
          dp[i][t] = dp[i - 1][t];
        }
        // include the ribbon and check if the remaining length can be cut into available lenghts
        if (t >= ribbonLengths[i] && dp[i][t - ribbonLengths[i]] != Number.MIN_VALUE) {
          dp[i][t] = Math.max(dp[i][t], dp[i][t - ribbonLengths[i]] + 1);
        }
      }
    }
  
    // total combinations will be at the bottom-right corner, return '-1' if cutting is not possible
    return dp[n - 1][total] == Number.MIN_VALUE ? -1 : dp[n - 1][total];
  };
  
  console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([2, 3, 5], 5)}`);
  console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([2, 3], 7)}`);
  console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([3, 5, 7], 13)}`);
  console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([3, 5], 7)}`);
  