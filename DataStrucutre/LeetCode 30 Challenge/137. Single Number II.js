/* 
Given a non-empty array of integers, every element appears three times except for one, which appears exactly once. Find that single one.

Note:

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Example 1:

Input: [2,2,3,2]
Output: 3
Example 2:

Input: [0,1,0,1,0,1,99]
Output: 99
 */

// var singleNumber = function(nums) {
//     var lib = {};
  
//     for (var i = 0; i < nums.length; i++){
//       if (lib[nums[i]] === undefined){
//         lib[nums[i]] = 1;
//       } else {
//         lib[nums[i]]++;
//         if (lib[nums[i]] === 3){
//           delete lib[nums[i]];
//         }
//       }
//     }
  
//     return Number(Object.keys(lib)[0]);
//   };