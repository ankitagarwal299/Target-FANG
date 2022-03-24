
var subarraySum = function (nums, k) {
  if (nums == null || nums.length == 0) return 0;
  let count = 0;

  let map = { 0: 1 };

  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    if (map[prefixSum - k]) {
      count += map[prefixSum - k];
    }

    if (map[prefixSum] != null) {
      map[prefixSum] += 1;
    } else {
      map[prefixSum] = 1;
    }
  }
  return count;
};

console.log(subarraySum([3, 9, -2, 4, 1, -7, 2, 6, -5, 8, -3, -7, 6, 2, 1]));


//https://www.youtube.com/watch?v=QM0klnvTQzk&t=19s
//(Pepcoding) similar to 974, 974_1
