/* 
53. Maximum Subarray
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.



Example:

Input: [4,-3,-2,2,3,1,-2,-3,4,2,-6,-3,-1,3,1,2],
Output: 7
Explanation: [2,3,1,-2,-3,4,2] has the largest sum = 6.*/

var maxSubArray = function (nums) {
    let max_so_far = -Infinity;
    let max_ending_here = 0;
    let start =0;
    let end =0;
    let search = 0;
  
    for (let i = 0; i < nums.length; i++) {
      max_ending_here = max_ending_here + nums[i];
  
      if (max_so_far < max_ending_here) {
        max_so_far = max_ending_here;
        start = search;end = i;
        
      }
  
      if (max_ending_here < 0) {
        max_ending_here = 0;
        search = i+1;
      }
    }
  
    //return max_so_far;
    return {start,end}
  }
  
    console.log(maxSubArray([ -3, -2,  -2]))


    //*** Above will not work for all -negative numbers
    var maxSubArray = function (nums) {
        let max_so_far = -Infinity;
        let max_ending_here = 0;
        let start =0;
        let end =0;
        let search = 0;
      
        for (let i = 0; i < nums.length; i++) {
          //max_ending_here = max_ending_here + nums[i];

          max_so_far = Math.max(max_so_far,max_ending_here);
          max_ending_here = Math.max(max_ending_here,max_ending_here + nums[i] );

        }
      
        return max_so_far;
      }

      console.log(maxSubArray([ -3, -2,  -2]))
