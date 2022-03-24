var pivotIndex = function (nums) {
    if (nums == null || nums.length == 0) return -1;

    let totalSum = 0;
    for (let i = 0; i < nums.length; i++) {
        totalSum += nums[i];
    }

    let left = 0
    let right = totalSum;
    for (let i = 0; i < nums.length; i++) {

        right -= nums[i];

        if (left == right) {
            return i;
        }
        left += nums[i]
    }

    return -1;

};
//724. Find Pivot Index
//Sum of all elem at left of pivot == Sum of all elem at right of pivot

//This question is copy paste of 1991
//Pepcoding
//https://www.youtube.com/watch?v=AH-YhFNJoas