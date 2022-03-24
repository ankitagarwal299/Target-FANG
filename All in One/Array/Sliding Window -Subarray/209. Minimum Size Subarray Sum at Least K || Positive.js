//variation from 862(862 is complex)
var minSubArrayLen = function (s, nums) {
    if (nums == null || nums.length == 0) return 0;

    let windowSum = 0;
    let minSizeSubSum = Infinity;

    let start = 0;
    for (let end = 0; end < nums.length; end++) {
        windowSum += nums[end];

        while (windowSum >= s) {//sum is greater than or equal to target
            minSizeSubSum = Math.min(minSizeSubSum, end - start + 1);
            windowSum -= nums[start];
            start++;
        }
    }
    return minSizeSubSum == Infinity ? 0 : minSizeSubSum;
};
//All positive numbers