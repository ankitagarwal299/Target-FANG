var numSubarrayProductLessThanK = function (nums, k) {
  if (nums == null || nums.length == 0) return -1;
  let currentProduct = 1;
  let count = 0;
  let left = 0;
  let right = 0;

  while (right < nums.length) {
    currentProduct = currentProduct * nums[right];

    while (currentProduct >= k) {
      currentProduct = currentProduct / nums[left];
      left++;
    }
    count = count + (right - left + 1);
    right++;
  }

  return count; // number of subarrays
};

console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100));

// Find Count(number of) subarrays where the product of all the elements in the subarray is less than k.






//Sliding window problem
10
5
10,5

5,2
2

5,2,6
5,6
6


console.log(numSubarrayProductLessThanK([2,3,-2,4], 100));

2

2,3
3

2,3,-2
3,-2
-2

2,3,-2,4
3,-2,4
-2,4
4