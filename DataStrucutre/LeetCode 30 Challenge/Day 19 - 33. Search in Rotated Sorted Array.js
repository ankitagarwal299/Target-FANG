//https://www.youtube.com/watch?v=oTfPJKGEHcc&t=677s

var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;
  
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (nums[mid] == target) return mid;

    // the only difference from the first one, trickly case, just updat left and right
    //if ((nums[left] == nums[mid]) && (nums[right] == nums[mid])) { ++left; --right; }

    if (nums[left] <= nums[mid]) {
      //this is increasing then target can be found before and after mid
      if (target >= nums[left] && target <= nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      //this is increasing then target can be found before and after mid
      if (target >= nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return mid
}

console.log(search([4, 5, 6, 7, 0, 1, 2], 0));

/* 
Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

You are given a target value to search. If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.

Your algorithm's runtime complexity must be in the order of O(log n).

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
 */



 //reference : https://www.youtube.com/watch?v=QdVrY3stDD4&t=323s

var search = function (nums) {
  if (nums == null || nums.length == 0) return -1;

  let left = 0;
  let right = nums.length - 1;
  let midpoint;

  //Find pivot , smallest element in sorted rotated array
  while (left < right) {
    midpoint = left + (right - left) / 2; //protect integer overflow
    if (nums[midpoint] > nums[right]) {
      //[4,5,6,7,0,1,2]
      left = midpoint + 1;
    } else {
      right = midpoint;
    }
  }

  // Above loop breaks if left is the smallest
  //reset boundaries
  let start = left;
  left = 0;
  right = nums.length - 1;

  //decide which side to search
  if (target >= nums[start] && target < nums[right]) {
    left = start;
  } else {
    right = start;
  }

  //regular binary search
  while (left <= right) {
    midpoint = left + (right - left) / 2;
    if (nums[midpoint] == target) return midpoint;
    else if (nums[midpoint] < target) {
      left = midpoint + 1;
    } else {
      right = midpoint - 1;
    }
  }

  return -1;
};

console.log(search([4, 5, 6, 7, 0, 1, 2], 0));
