//33. Search in Rotated Sorted Array    leetcode (with distinct values).
//81. Search in Rotated Sorted Array II leetcode (with duplicate values).
//153. Find Minimum in Rotated Sorted Array  leetcode (with distinct values).

var search = function (nums, target) {
    if (nums == null | nums.length == 0) return -1;

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] == target) return mid;

        //search right
        if (nums[mid] < nums[right]) {
            if (nums[mid] <= target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        } else {
            if (nums[left] <= target && target <= nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
    }
    return -1;

};
console.log(search([4, 5, 6, 7, 0, 1, 2], 0));//4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3));//-1
console.log(search([1], 0));//-1
console.log(search([6, 7, 1, 2, 3, 4, 5], 3));//4
console.log(search([6, 7, 1, 2, 3, 4, 5], 6));//0

console.log(search([4, 5, 6, 1, 2, 3], 3));//5
console.log(search([4, 5, 6, 1, 2, 3], 6));//2



console.log(search([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], 2));//doesnot work for duplicates


//https://www.youtube.com/watch?v=Kcj2NGnuSNg
//53. Find Minimum in Rotated Sorted Array -- Remember by heart
var findMin = function (nums) {
    if (nums == null || nums.length == 0) return null

    if (nums.length == 1) return nums[0];



    let left = 0;
    let right = nums.length - 1;

    if (nums[left] < nums[right]) {
        //means already sorted and not rotated
        return nums[0];
    }

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[mid + 1]) {
            //edge case 1
            return nums[mid + 1];//8,1,2 , here mid is 8 

        } else if (nums[mid] < nums[mid - 1]) {
            //edge case 1
            return nums[mid];//8,1,2 , here mid is 1 

        } else if (nums[left] < nums[mid]) {
            //means left is sorted, cannot find min here
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return null

};
console.log(findMin([3, 4, 5, 1, 2]));


