/* 
You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Example 1:

Input: coins = [1, 2, 5], amount = 11
Output: 3 
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Note:
You may assume that you have an infinite number of each kind of coin.

*/
var coinChange1 = function(coins, amount) {
  if (amount <= 0) return 0;

  // Initialize the dp array with rows for each coin and columns for each amount
  let dp = new Array(coins.length).fill(null).map(() => new Array(amount + 1).fill(Infinity));

  // Base case: 0 coins needed to make amount 0
  for (let i = 0; i < coins.length; i++) {
    dp[i][0] = 0;
  }

  // Base case: If the first coin can divide the amount, fill the corresponding cells
  for (let i = 0; i <= amount; i++) {
    if (i >= coins[0] && (i % coins[0] == 0)) {
      dp[0][i] = i / coins[0];
    }
  }

  // Dynamic programming filling
  for (let i = 1; i < coins.length; i++) {
    for (let j = 1; j <= amount; j++) {
      const coin = coins[i];

      if (j >= coin) {
        // Include condition: compare including, not including
        dp[i][j] = Math.min(dp[i][j - coin] + 1, dp[i - 1][j]);
      } else {
        // If the current coin is too large, use the previous row's value
        dp[i][j] = dp[i - 1][j];
      }
    }
  }



  // The result is in the bottom-right cell of the dp array
  return dp[coins.length - 1][amount] === Infinity ? -1 : dp[coins.length - 1][amount];
};

// Example usage:
const coins = [195, 265, 404, 396];
const amount = 3239;
//console.log(coinChange(coins, amount)); // Output: 8//[1,2,5]
console.log(coinChange([2, 1, 5], 11)); // Output: 8//