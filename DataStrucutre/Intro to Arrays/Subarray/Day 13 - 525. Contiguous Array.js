//https://www.youtube.com/watch?v=9ZyLjjk536U - Tech Dose

var findMaxLength = function (nums) {
    let sum = 0;
    let map = {};
    let maxContiguousSubArray = 0;
  
    for (let i = 0; i < nums.length; i++) {
      sum = sum +  (nums[i] == 0 ? -1 : 1);
      /* if (nums[i] == 0) sum--;
      else sum++; */
  
      if (map[sum] != null) maxContiguousSubArray = Math.max(maxContiguousSubArray, i - map[sum]);
      else map[sum] = i;
    }
  console.log(map)
    return maxContiguousSubArray;
  };
  
  console.log(findMaxLength([1, 1, 0, 0, 1, 1, 0, 1, 1]));
  
//find the maximum length of a contiguous subarray with equal number of 0 and 1.

