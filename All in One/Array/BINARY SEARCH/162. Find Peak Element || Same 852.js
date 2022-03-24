var findPeakElement = function (nums) {
    if (nums == null || nums.length == 0) return -1;

    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        let midIndex = start + Math.floor((end - start) / 2);
        if (nums[midIndex] <= nums[midIndex + 1]) {//importNT
            start = midIndex + 1;
        } else {
            end = midIndex;
        }
    }
    return start
};
//KEVIN https://www.youtube.com/watch?v=CFgUQUL7j_c

//Same
/*
162. Find Peak Element.js
852. Peak Index in a Mountain Array.js

*/