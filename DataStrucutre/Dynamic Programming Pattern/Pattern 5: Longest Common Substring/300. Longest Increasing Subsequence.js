/* 
Problem Statement #
Given a number sequence, find the length of its Longest Increasing Subsequence (LIS). In an increasing subsequence, all the elements are in increasing order (from lowest to highest).

Example 1:

Input: {4,2,3,6,10,1,12}
Output: 5
Explanation: The LIS is {2,3,6,10,12}.
Example 1:

Input: {-4,10,3,7,15}
Output: 4
Explanation: The LIS is {-4,3,7,15}.
 */

const findLISLength = function(nums) {
    const dp = [];
    function findLISLengthRecursive(nums, currentIndex, previousIndex) {
      if (currentIndex == nums.length) return 0;
  
      dp[currentIndex] = dp[currentIndex] || [];
      if (typeof dp[currentIndex][previousIndex + 1] === 'undefined') {
        // include nums[currentIndex] if it is larger than the last included number
        let c1 = 0;
        if (previousIndex == -1 || nums[currentIndex] > nums[previousIndex]) {
          c1 = 1 + findLISLengthRecursive(nums, currentIndex + 1, currentIndex);
        }
  
        const c2 = findLISLengthRecursive(nums, currentIndex + 1, previousIndex);
        dp[currentIndex][previousIndex + 1] = Math.max(c1, c2);
      }
  
      return dp[currentIndex][previousIndex + 1];
    }
    return findLISLengthRecursive(nums, 0, -1);
  };
  
  console.log(
    `Length of Longest Increasing Subsequence: ---> ${findLISLength([4, 2, 3, 6, 10, 1, 12])}`
  );
  console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([-4, 10, 3, 7, 15])}`);
  