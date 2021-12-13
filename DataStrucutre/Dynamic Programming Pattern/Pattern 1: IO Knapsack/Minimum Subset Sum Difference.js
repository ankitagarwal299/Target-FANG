/* 
Problem Statement #
Given a set of positive numbers, partition the set into two subsets with a minimum difference between their subset sums.

Example 1: #
Input: {1, 2, 3, 9}
Output: 3
Explanation: We can partition the given set into two subsets where minimum absolute difference 
between the sum of numbers is '3'. Following are the two subsets: {1, 2, 3} & {9}.


Example 2: #
Input: {1, 2, 7, 1, 5}
Output: 0
Explanation: We can partition the given set into two subsets where minimum absolute difference 
between the sum of number is '0'. Following are the two subsets: {1, 2, 5} & {7, 1}.

Example 3:
Input: {1, 3, 100, 4}
Output: 92
Explanation: We can partition the given set into two subsets where minimum absolute difference 
between the sum of numbers is '92'. Here are the two subsets: {1, 3, 4} & {100}.

*/

const canPartition = function (num) {
  const dp = [];

  function canPartitionRecursive(num, currentIndex, sum1, sum2) {
    // base check
    if (currentIndex === num.length) return Math.abs(sum1 - sum2);

    dp[currentIndex] = dp[currentIndex] || [];
    // check if we have not already processed similar problem
    if (typeof dp[currentIndex][sum1] === 'undefined') {
      // recursive call after including the number at the currentIndex in the first set
      const diff1 = canPartitionRecursive(num, currentIndex + 1, sum1 + num[currentIndex], sum2);

      // recursive call after including the number at the currentIndex in the second set
      const diff2 = canPartitionRecursive(num, currentIndex + 1, sum1, sum2 + num[currentIndex]);

      dp[currentIndex][sum1] = Math.min(diff1, diff2);
    }
    return dp[currentIndex][sum1];
  }

  return canPartitionRecursive(num, 0, 0, 0);
};

console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 3, 9])}`);
console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 7, 1, 5])}`);
console.log(`Minimum subset difference is: ---> ${canPartition([1, 3, 100, 4])}`);




const canPartition = function (num, sum) {
  let totalSum = 0;

  for (let i = 0; i < num.length; i++) totalSum += num[i];

  // if 'sum' is a an odd number, we can't have two subsets with same total
  //if (sum % 2 !== 0) return false;-----this step is for partition equal sets

  // we are trying to find a subset of given numbers that has a total sum of ‘sum/2’.
  let sum = Math.floor(totalSum / 2);

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

  let sum1 = 0;
  for (let i = sum; i >= 0; i--) {
    if (dp[num.length - 1][i] == true) {
      sum1 = i;
    }
  }

  let sum2 = totalSum - sum1;//or totalSum - sum1*2

  return Math.abs(sum1 - sum2);
};

console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 3, 9])}`);
console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 7, 1, 5])}`);
console.log(`Minimum subset difference is: ---> ${canPartition([1, 3, 100, 4])}`);
