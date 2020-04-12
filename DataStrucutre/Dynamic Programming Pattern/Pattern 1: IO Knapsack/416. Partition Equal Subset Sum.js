/* 
Problem Statement #
Given a set of positive numbers, find if we can partition it into two subsets such that the sum of elements in both the subsets is equal.

Example 1: #
Input: {1, 2, 3, 4}
Output: True
Explanation: The given set can be partitioned into two subsets with equal sum: {1, 4} & {2, 3}

Example 2: #
Input: {1, 1, 3, 4, 7}
Output: True
Explanation: The given set can be partitioned into two subsets with equal sum: {1, 3, 4} & {1, 7}

Example 3: #
Input: {2, 3, 4, 6}

Output: False
Explanation: The given set cannot be partitioned into two subsets with equal sum.

*/

let canPartition = function (num) {
  // find the total sum
  let sum = 0;
  for (let i = 0; i < num.length; i++) sum += num[i];

  // if 'sum' is a an odd number, we can't have two subsets with same total
  if (sum % 2 !== 0) return false;

  // we are trying to find a subset of given numbers that has a total sum of ‘sum/2’.
  sum = sum / 2;

  let dp = Array(num.length)
    .fill(false)
    .map(() => Array.apply(sum + 1).fill(false));

  // populate the sum=0 column, as we can always have '0' sum without including any element
  for (let i = 0; i < num.length; i++) dp[i][0] = num[i];

  //with only one number we can form subset if the required sum is equal to the value
  for (let j = 0; j < sum; j++) dp[0][j] = j == num[0];

  // process all subsets for all sums
  for (let i = 1; i < num.length; i++) {
    for (let s = 1; s <= sum; s++) {
      if (dp[i - 1][s]) {
        dp[i][s] = dp[i - 1][s];
      } else {
        dp[i][s] = dp[i - 1][s - num[i]];
      }
    }
  }

  return dp[num.length - 1][sum];
};

console.log(`Can partitioning be done: ---> ${canPartition([1, 2, 3, 4])}`);
console.log(`Can partitioning be done: ---> ${canPartition([1, 1, 3, 4, 7])}`);
console.log(`Can partitioning be done: ---> ${canPartition([2, 3, 4, 6])}`);
