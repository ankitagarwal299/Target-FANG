//Next version of leetcode 27
var removeDuplicates = function (nums) {
    if (nums == null || nums.length < 2) nums;

    /*
     * This index will move only when we modify the array in-place to include a new
     * non-duplicate element.
     */
    let index = 0;


    for (let i = 0; i < nums.length; i++) {
        if (i != 0 && nums[i] == nums[i - 1]) {
            continue;
        }

        nums[index] = nums[i];
        index++;
    }
    console.log(nums.slice(0, index))
    return index;
};
//https://www.callicoder.com/remove-duplicates-from-sorted-array/