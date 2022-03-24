//Do it after
//424. Longest Repeating Character Replacement
//485. Max Consecutive Ones.js
var longestOnes = function (nums, k) {
    if (nums == null || nums.length == 0) return 0;

    let longSubstr = -1;
    let countZero = 0;

    let start = 0;
    for (let end = 0; end < nums.length; end++) {
        if (nums[end] == 0) countZero++;

        while (countZero > k) {
            if (nums[start] == 0) countZero--;//shrink the window , if start is 0 then decrement also
            start++;
        }

        longSubstr = Math.max(longSubstr, end - start + 1);
    }
    return longSubstr;
};
//https://www.callicoder.com/longest-subarray-with-ones-after-replacement/
//https://www.youtube.com/watch?v=ix_TazzqHn0

//487. Max Consecutive Ones II is same here asking to flip only 1 zero