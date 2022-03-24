

//Find the length of the smallest contiguous subarray whose sum is equal to K (Instead of greater than equal to K).
var shortestSubarray = function (nums, k) {

    let minSubLength = Infinity;

    let windowSum = 0;

    let start = 0;
    for (let end = 0; end < nums.length; end++) {
        windowSum += nums[end];

        while (windowSum > k) {// Shrink the window as small as possible until the 'windowSum' is smaller than or equal to 'K'
            windowSum -= nums[start];//discard since it is going out of winndow
            start++;
        }

        if (windowSum == k) {
            minSubLength = Math.min(minSubLength, end - start + 1);
        }
    }
    return minSubLength
};