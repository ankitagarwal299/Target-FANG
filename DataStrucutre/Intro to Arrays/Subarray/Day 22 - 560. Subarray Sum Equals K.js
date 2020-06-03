//https://www.youtube.com/watch?v=HbbYPQc-Oo4
//https://www.youtube.com/watch?v=AmlVSNBHzJg

var subarraySum = function (nums, k) {
  if (nums == null && nums.length == 0) return 0;

  let map = {};
  let count = 0;
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];

    if (map[sum - k]) {
      count = count + map[sum - k];
    }

    map[sum] = map[sum] == null ? 1 : map[sum] + 1;
  }

  return count;
};

console.log(subarraySum([3, 4, 7, 2, -3, 1, 4, 2], 7));

//------------------------------https://www.youtube.com/watch?v=YkacnIOt2jM----------------------
var subarraySum = function (nums, k) {
  if (nums == null && nums.length == 0) return 0;

  let map = {}; //key= PrefixSum , Value =  Count of PrefixSum
  let count = 0;
  let curr_sum = 0;

  for (let i = 0; i < nums.length; i++) {
    curr_sum += nums[i];

    if (curr_sum == k) {
      //we found new subarray with sum k
      count += 1;
    }

    if (map[curr_sum - k] != null) {
      count = count + map[curr_sum - k];
    }

    if (curr_sum in map) {
      map[curr_sum] += 1;
    } else {
      map[curr_sum] = 1;
    }
  }

  return count;
};

console.log(subarraySum([2,0,2], 2));

//find the total number of continuous subarrays whose sum equals to k
