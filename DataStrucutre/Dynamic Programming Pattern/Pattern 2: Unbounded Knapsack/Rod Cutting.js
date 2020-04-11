/* 

Problem Statement #
Given a rod of length ‘n’, we are asked to cut the rod and sell the pieces in a way that will maximize the profit. We are also given the price of every piece of length ‘i’ where ‘1 <= i <= n’.

Example:

Lengths: [1, 2, 3, 4, 5]
Prices: [2, 6, 7, 10, 13]
Rod Length: 5

Let’s try different combinations of cutting the rod:

Five pieces of length 1 => 10 price
Two pieces of length 2 and one piece of length 1 => 14 price
One piece of length 3 and two pieces of length 1 => 11 price
One piece of length 3 and one piece of length 2 => 13 price
One piece of length 4 and one piece of length 1 => 12 price
One piece of length 5 => 13 price

This shows that we get the maximum price (14) by cutting the rod into two pieces of length ‘2’ and one piece of length ‘1’.

*/

const solveRodCutting = function(lengths, prices, n) {
    // base checks
    if (n <= 0 || prices.length === 0 || prices.length != lengths.length) return 0;
  
    const lengthCount = lengths.length;
    const dp = Array(lengthCount)
      .fill(0)
      .map(() => Array(n + 1).fill(0));
  
    // process all rod lengths for all prices
    for (let i = 0; i < lengthCount; i++) {
      for (let len = 1; len <= n; len++) {
        let p1 = 0,
          p2 = 0;
        if (lengths[i] <= len) p1 = prices[i] + dp[i][len - lengths[i]];
        if (i > 0) p2 = dp[i - 1][len];
        dp[i][len] = Math.max(p1, p2);
      }
    }
  
    // maximum price will be at the bottom-right corner.
    return dp[lengthCount - 1][n];
  };
  
  const lengths = [1, 2, 3, 4, 5];
  const prices = [2, 6, 7, 10, 13];
  console.log(`Maximum profit: ---> ${solveRodCutting(lengths, prices, 5)}`);
  
  