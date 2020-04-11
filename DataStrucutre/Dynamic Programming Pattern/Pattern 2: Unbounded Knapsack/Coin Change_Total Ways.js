/* 
Given an infinite supply of ‘n’ coin denominations and a total money amount, 
we are asked to find the total number of distinct ways to make up that amount.

Example:
Denominations: {1,2,3}
Total amount: 5
Output: 5
Explanation: There are five ways to make the change for '5', here are those ways:
  1. {1,1,1,1,1} 
  2. {1,1,1,2} 
  3. {1,2,2}
  4. {1,1,3}
  5. {2,3}
 */


let countChange = function(denominations, total) {
    const n = denominations.length;
    const dp = Array(denominations.length)
      .fill(0)
      .map(() => Array(total + 1).fill(0));
  
    // populate the total=0 columns, as we will always have an empty set for zero toal
    for (let i = 0; i < n; i++) dp[i][0] = 1;
    // process all sub-arrays for all capacities
  
    for (let i = 0; i < n; i++) {
      for (let t = 1; t <= total; t++) {
        if (i > 0) dp[i][t] = dp[i - 1][t];
        if (t >= denominations[i]) dp[i][t] += dp[i][t - denominations[i]];
      }
    }
  
    // total combinations will be at the bottom-right corner.
    return dp[n - 1][total];
  };
  
  console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
  