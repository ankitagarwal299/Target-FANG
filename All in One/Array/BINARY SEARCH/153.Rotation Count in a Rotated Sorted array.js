//same as find minimum in rotated sorted array
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
//For Duplicates values
/* It is impossible to find no. of rotations through binary search,
We need to perform linear search for minum element and find index


Sameway it is impossible to find where the minimum element start while finding minimum element

*/