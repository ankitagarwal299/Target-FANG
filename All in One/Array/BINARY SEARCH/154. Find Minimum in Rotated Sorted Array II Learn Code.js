var findMin = function (nums) {
    if (nums == null || nums.length == 0) return -1;

    let start = 0;
    let end = nums.length - 1;

    if (nums[start] < nums[end]) {
        return nums[start];
    }

    while (start < end) {
        let midIndex = start + Math.floor((end - start) / 2);

        if (nums[midIndex] == nums[end]) end-- //thisline is added
        else if (nums[midIndex] > nums[end]) {
            start = midIndex + 1;//move to right
        } else {
            end = midIndex;
        }
    }
    return nums[start];
};

//https://www.youtube.com/watch?v=j3187M1P2Xg
//Very Easy

/* Same
153. Find Minimum in Rotated Sorted Array.js
154. Find Minimum in Rotated Sorted ArrayII.js

*/
//NO other apraoch working neither peak element next nothing 

//Tough case [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]