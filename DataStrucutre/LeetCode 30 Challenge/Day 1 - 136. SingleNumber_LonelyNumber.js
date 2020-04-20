/*
136. Single Number

Given a non-empty array of integers, every element appears twice except for one. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Example 1:

Input: [2,2,1]
Output: 1
Example 2:

Input: [4,1,2,1,2]
Output: 4 

*/

var singleNumber = function (nums) {
  let x1 = 0;

  for (let i = 0; i < nums.length; i++) {
      x1 = x1 ^ nums[i];
  }

  return x1;
};

console.log(singleNumber([2, 2, 1]));



