var search = function (nums, target) {
    if (nums == null || nums.length == 0) return -1;


    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        let midIndex = start + Math.floor((end - start) / 2);

        if (target == nums[midIndex]) {
            return midIndex;
        } else if (target < nums[midIndex]) {
            end = midIndex - 1;
        } else {
            start = midIndex + 1;
        }
    }
    return -1;
};