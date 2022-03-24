var findMin = function (nums) {

    if (nums == null || nums.length == 0) return -1;

    let start = 0;
    let end = nums.length - 1;

    if (nums[start] <= nums[end]) {
        return nums[start];
    }

    while (start < end) {
        let midIndex = start + Math.floor((end - start) / 2);
        if (nums[midIndex] > nums[end]) {
            start = midIndex + 1;//move to right
        } else {
            end = midIndex;
        }
    }
    return nums[start];
};

//Find miniimum or pivot value
//https://www.youtube.com/watch?v=j3187M1P2Xg
//Very Easy

//COMPARE with END/HIGH