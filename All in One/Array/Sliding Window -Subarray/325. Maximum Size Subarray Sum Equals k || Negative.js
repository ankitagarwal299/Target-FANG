var LongestSubarray = function (nums, k) {

  let maxSubLength = -Infinity;

  let history = { 0: -1 };

  let prefixSum = 0;

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    if (history[prefixSum] == null) {
      history[prefixSum] = i;
    }

    if (history[prefixSum - k] != null) {
      maxSubLength = Math.max(maxSubLength, i - history[prefixSum - k]);
    }
  }

  return maxSubLength == Infinity ? -1 : maxSubLength;
};
//Very Easy

//https://www.youtube.com/watch?v=xa_60srQAKo&t=416s
console.log(LongestSubarray([-2, -1, 2, 1], 1));//2
console.log(LongestSubarray([1, -1, 5, -2, 3], 3));//4