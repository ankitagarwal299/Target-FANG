/* Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

Example 1:

Input: [3,0,1]
Output: 2
Example 2:

Input: [9,6,4,2,3,5,7,0,1]
Output: 8
Note:
Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity? */

var missingNumber = function (nums) {
  let x1 = 0;
  for (let i = 0; i < nums.length; i++) {
    x1 = x1 ^ nums[i];
  }

  let x2 = 0;
  for (let i = 0; i < nums.length+1; i++) {//arraylength +1 for missing number
    x2 = x2 ^ i;
  }

  return x1 ^ x2;
};

console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
