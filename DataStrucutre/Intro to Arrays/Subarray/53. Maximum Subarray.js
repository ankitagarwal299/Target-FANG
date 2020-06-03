var maxSubArray = function (nums) {
  if (nums == null || nums.length == 0) return -1;
  let maxSubArraySum = 0;
  let currentSum = 0;

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], nums[i] + currentSum);
    
    if (currentSum > maxSubArraySum) maxSubArraySum = currentSum;
  }
  return maxSubArraySum; // max sum among subarray
};

console.log(maxSubArray([-3, -2, -2]));

//find the contiguous subarray has the largest sum and return its sum.

//Similar to 152
