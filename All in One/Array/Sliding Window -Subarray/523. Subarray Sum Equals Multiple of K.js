var checkSubarraySum = function (nums, k) {
  if (nums == null || nums.length == 0 || k == 0) return false;

  let map = { 0: -1 };

  let prefixSum = 0;

  for (let end = 0; end < nums.length; end++) {
    prefixSum += nums[end];

    prefixSum = prefixSum % k;//reduce prefixsum (take remainder of prefixsum %k and add to next, store remaiinder in map)

    if (map[prefixSum] != null) {
      if (end - map[prefixSum] >= 2) return true;
    } else {
      map[prefixSum] = end;
    }

  }
  return false;
};

console.log(checkSubarraySum([6], 6));
console.log(checkSubarraySum([2, 4], 6));
console.log(checkSubarraySum([0, 2, 3, 1, 5], 6));

//JSER - ImpoortNT VIDEO
//https://www.youtube.com/watch?v=9DMEGpnmIMM

//Pepcoding - reason is explained
//https://www.youtube.com/watch?v=QM0klnvTQzk&t=19s