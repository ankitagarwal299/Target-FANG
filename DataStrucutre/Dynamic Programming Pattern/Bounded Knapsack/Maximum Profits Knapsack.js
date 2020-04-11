/* 
Problem Statement #
Given two integer arrays to represent weights and profits of ‘N’ items, we need to find a subset of these items which will give us
maximum profit such that their cumulative weight is not more than a given number ‘C’. Each item can only be selected once, which means
either we put an item in the knapsack or we skip it.

*/


/* 
Problem Statement #
Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack which has a capacity ‘C’. The goal is to get the maximum profit from the items in the knapsack. 

The only difference between the 0/1 Knapsack problem and this problem is that we are allowed to use an unlimited quantity of an item.
*/


let solveKnapsack = function (profits, weights, capacity) {
  // base checks
  if (capacity <= 0 || profits.length == 0 || weights.length != profits.length) return 0;

  const dp = Array(profits.length)
    .fill(0)
    .map(() => Array(capacity + 1).fill(0));

  // populate the capacity=0 columns
  for (let i = 0; i < profits.length; i++) dp[i][0] = 0;
  
  //populate for first row
  for (let i = 0; i <= capacity; i++) {
    if (weights[0] <= i) {
      dp[0][i] = profits[0];
    } else {
      //if weight == 0 and capacity of bag is less  then profit 0
      dp[0][i] = 0;
    }
  }

  // process all sub-arrays for all capacities
  for (let i = 1; i < profits.length; i++) {
    for (let c = 1; c <= capacity; c++) {
      let profit1 = 0,
        profit2 = 0;
      if (weights[i] <= c) profit1 = profits[i] + dp[i][c - weights[i]];
       profit2 = dp[i - 1][c];
      dp[i][c] = Math.max(profit1, profit2);    }
  }

  // maximum profit will be in the bottom-right corner.
  return dp[profits.length - 1][capacity];
};

var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

