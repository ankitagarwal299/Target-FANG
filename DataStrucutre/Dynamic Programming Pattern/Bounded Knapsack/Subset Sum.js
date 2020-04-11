/* 
Problem Statement #
Given a set of positive numbers, determine if there exists a subset whose sum is equal to a given number ‘S’. 

Example 1: #
Input: {1, 2, 3, 7}, S=6
Output: True
The given set has a subset whose sum is '6': {1, 2, 3}


Example 2: #
Input: {1, 2, 7, 1, 5}, S=10
Output: True
The given set has a subset whose sum is '10': {1, 2, 7}

Example 3:
Input: {1, 3, 4, 8}, S=6
Output: False
The given set does not have any subset whose sum is equal to '6'.

*/

const canPartition = function (num, sum) {
  const dp = Array(num.length)
    .fill(false)
    .map(() => Array(sum + 1).fill(false));

  // populate the sum=0 columns, as we can always form '0' sum with an empty set
  for (let i = 0; i < num; i++) dp[i][0] = true;

  // with only one number, we can form a subset only when the required sum is equal to its value
  for (let s = 1; s <= sum; s++) dp[0][s] = num[0] === s;

  // process all subsets for all sums
  for (let i = 1; i < num.length; i++) {
    for (let s = 1; s <= sum; s++) {
        if (dp[i - 1][s]) {
            dp[i][s] = dp[i - 1][s];
          } else if (s >= num[i]) {
            // else include the number and see if we can find a subset to get the remaining sum
            dp[i][s] = dp[i - 1][s - num[i]];
          }
    }
  }

  // the bottom-right corner will have our answer.
  return dp[num.length - 1][sum];
};

console.log(`Can partitioning be done: ---> ${canPartition([1, 2, 3, 4], 6)}`);
console.log(
  `Can partitioning be done: ---> ${canPartition([1, 2, 7, 1, 5], 10)}`
);
console.log(`Can partitioning be done: ---> ${canPartition([1, 3, 4, 8], 6)}`);
