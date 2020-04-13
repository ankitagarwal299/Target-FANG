/* 
Problem Statement #
Given a number sequence, find the increasing subsequence with the highest sum. Write a method that returns the highest sum.

Example 1:

Input: {4,1,2,6,10,1,12}
Output: 32
Explanation: The increaseing sequence is {4,6,10,12}. 
Please note the difference, as the LIS is {1,2,6,10,12} which has a sum of '31'.
Example 2:

Input: {-4,10,3,7,15}
Output: 25
Explanation: The increaseing sequences are {10, 15} and {3,7,15}.
 */

/* 
We can process one number at a time, so we have two options at any step:

1. If the current number is greater than the previous number that we included, we include that number in a running sum and make a recursive call for the remaining array.

2. We can skip the current number to make a recursive call for the remaining array.
The highest sum of any increasing subsequence would be the max value returned by the two recurse calls from the above two options.
 */

const findMSIS = function(nums) {
    const dp = [];
    function findMSISRecursive(nums, currentIndex, previousIndex, sum) {
      if (currentIndex === nums.length) return sum;
  
      dp[currentIndex] = dp[currentIndex] || [];
      if (typeof dp[currentIndex][previousIndex +1]  === 'undefined') {
        // include nums[currentIndex] if it is larger than the last included number
        let s1 = sum;
        if (previousIndex == -1 || nums[currentIndex] > nums[previousIndex]) {
          s1 = findMSISRecursive(nums, currentIndex + 1, currentIndex, sum + nums[currentIndex]);
        }
  
        // excluding the number at currentIndex
        const s2 = findMSISRecursive(nums, currentIndex + 1, previousIndex, sum);
        dp[currentIndex][previousIndex +1]  = Math.max(s1, s2);
      }
  
      return dp[currentIndex][previousIndex+1 ] 
    }
    return findMSISRecursive(nums, 0, -1, 0);
  };
  
  console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([4, 1, 2, 6, 10, 1, 12])}`);
  console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([-4, 10, 3, 7, 15])}`);
  console.log(
    'Maximum Sum Increasing Subsequence is: ---> ' +
      findMSIS([1, 3, 8, 4, 14, 6, 14, 1, 9, 4, 13, 3, 11, 17, 29])
  );
  
  