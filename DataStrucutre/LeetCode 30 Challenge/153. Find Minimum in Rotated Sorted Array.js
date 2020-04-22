var findMin = function (nums) {
  if (nums == null || nums.length == 0) return -1;
  if (nums.length == 1) return nums[0];

  let left = 0;
  let right = nums.length - 1;
  let midpoint;

  while (left < right) {
    midpoint = left + (right - left) / 2;
    if (midpoint> 0 && nums[midpoint-1] > nums[midpoint]) {
        //if midpoint is less than previous elem , we found elem
      return midpoint;
    } else if(nums[left] < nums[midpoint] && nums[midpoint] > nums[right]) {
        //if leftmost is less than midpoint , then check if it is 
      left = midpoint + 1;
    }else{
        right = midpoint -1;
    }
  }

  return nums[left];
};

console.log(findMin([3, 4, 5, 1, 2]));

/* 
Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).

Find the minimum element.

You may assume no duplicate exists in the array.

Example 1:

Input: [3,4,5,1,2] 
Output: 1
Example 2:

Input: [4,5,6,7,0,1,2]
Output: 0
 */
