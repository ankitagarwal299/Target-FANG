//Refer 33 only 1 line change
var search = function (nums, target) {
    if (nums == null || nums.length == 0) return false;

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2);

        if (nums[mid] == target) return true;

        if (nums[mid] == nums[right]) right--;//only this line is addded
        else if (nums[mid] < nums[right]) { //check right is sorted array

            if (nums[mid] <= target && target <= nums[right]) { //thats good right is sorted, check target lies in the range
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        else {

            if (nums[left] <= target && target <= nums[mid]) { //thats good left is sorted, check target lies in the range
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
    }
    return false
};
/*
This is not working with pivot approach
Test case
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1]
2

pivot is coming 0
and then going line27 ele block
*/