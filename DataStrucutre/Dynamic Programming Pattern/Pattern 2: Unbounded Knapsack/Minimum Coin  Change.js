/* 
Given an infinite supply of ‘n’ coin denominations and a total money amount, we are asked to find the minimum number of coins needed to make up that amount.

Example 1:

Denominations: {1,2,3}
Total amount: 5
Output: 2
Explanation: We need minimum of two coins {2,3} to make a total of '5'
Example 2:

Denominations: {1,2,3}
Total amount: 11
Output: 4
Explanation: We need minimum four coins {2,3,3,3} to make a total of '11'
 */
let countChange = function(denominations, total) {
    const n = denominations.length;
    const dp = Array(denominations.length)
      .fill(0)
      .map(() => Array(total + 1).fill(0));
  
    for (let i = 0; i < n; i++) for (let j = 0; j <= total; j++) dp[i][j] = Number.MAX_VALUE;
  
    // populate the total=0 columns, as we don't need any coin to make zero total
    for (let i = 0; i < n; i++) dp[i][0] = 0;
  
    for (let i = 0; i < n; i++) {
      for (let t = 1; t <= total; t++) {
        if (i > 0) {
          // exclude the coin
          dp[i][t] = dp[i - 1][t];
        }
        if (t >= denominations[i]) {
          // include the coin
          dp[i][t] = Math.min(dp[i][t], dp[i][t - denominations[i]] + 1);
        }
      }
    }
  
    // total combinations will be at the bottom-right corner.
    return dp[n - 1][total] === Number.MAX_VALUE ? -1 : dp[n - 1][total];
  };
  
  console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
  console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`);
  console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`);
  console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`);
  