function binarySearchNearlySorted(nums, target) {
    if (nums == null || nums.length == 0) return -1;

    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        let midIndex = start + Math.floor((end - start) / 2);

        if (nums[midIndex] == target) return midIndex;

        if (nums[midIndex - 1] == target) return midIndex - 1;
        if (nums[midIndex + 1] == target) return midIndex + 1;

        if (nums[midIndex] > target) {
            end = midIndex - 2;
        } else {
            start = midIndex + 2;
        }
    }
    return -1;
}

//https://www.youtube.com/watch?v=W3-KgsCVH1U
//https://www.callicoder.com/binary-search-nearly-almost-sorted-array/
console.log(binarySearchNearlySorted([10, 3, 40, 20, 50, 80, 70], 40));
console.log(binarySearchNearlySorted([10, 3, 40, 20, 50, 80, 70], 90));
