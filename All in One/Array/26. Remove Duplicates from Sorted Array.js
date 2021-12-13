//Next version of leetcode 27
var removeDuplicates = function (nums) {
    if (nums == null || nums.length < 2) nums;

    let left = 0;
    let right = 1;

    while (right < nums.length) {
        if (nums[left] == nums[right]) {
            right++;
        } else {
            left++;//1st occurence we will take
            nums[left] = nums[right];
            right++;
        }
    }
    return left + 1;
};