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

//From Educative- Frustated with this method

/* var coinChange = function (coins, amount) {
  //fill dp 2D array
  const dp = Array(coins.length)
    .fill(0)
    .map(() => Array(amount + 1).fill(0));

  for (let i = 0; i < coins.length; i++) {
    for (let j = 0; j <= amount; j++) {
      dp[i][j] = Number.MAX_VALUE;
    }
  }

  for (let i = 0; i < coins.length; i++) {
    dp[i][0] = 0;
  }

  for (let i = 0; i < coins.length; i++) {
    for (let t = 1; t <= amount; t++) {
      if (i > 0) {
        dp[i][t] = dp[i - 1][t];
      }
      if (t >= coins[i]) {
        dp[i][t] = Math.min( dp[i][t] , dp[i][t-coins[i]] +1);
      }
    }
  }
  return dp[coins.length-1][amount] === Number.MAX_VALUE ? -1: dp[coins.length-1][amount];
}; */

var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1);

  //0 amount with any coin
  dp[0] = 0;

  for (let i = 0; i <= amount; i++) {
    for (let coin = 0; coin < coins.length; coin++) {
      if (i >= coins[coin]) {
        dp[i] = Math.min(dp[i], 1 + dp[i - coins[coin]]);
      }
    }
  }
  return dp[amount] > amount? -1:dp[amount]
};

console.log(coinChange([1, 2, 3], 5));
