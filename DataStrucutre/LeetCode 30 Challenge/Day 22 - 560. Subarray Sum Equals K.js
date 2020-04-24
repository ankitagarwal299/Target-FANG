//https://www.youtube.com/watch?v=HbbYPQc-Oo4
//https://www.youtube.com/watch?v=AmlVSNBHzJg

var subarraySum = function (nums, k) {
  if (nums == null && nums.length == 0) return 0;

  let map = {};
  let count = 0;
  let sum =0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (map[sum - k]) {
        count = count + map[sum - k];
    }

    map[sum] = (map[sum] == null) ? 1 : map[sum] + 1;
  }

  return count;
}

console.log(subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7));

/* 
Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose 
sum equals to k.

Example 1:
Input:nums = [1,1,1], k = 2
Output: 2
 */
