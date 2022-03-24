var search = function (nums, target) {
    if (nums == null || nums.length == 0) return -1;

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] == target) return mid;

        //check right is sorted array
        else if (nums[mid] <= nums[right]) {
            //thats good right is sorted, check target lies in the range
            if (nums[mid] <= target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }

        } else {
            //thats good left is sorted, check target lies in the range
            if (nums[left] <= target && target <= nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }

        }
    }
    return -1

};


//------------------------Below solutin does not work for 81. duplicates values
//Step1: Find pivot
//Step2: then search either sides
var search = function (nums, target) {
    if (nums == null || nums.length == 0) return -1;

    var getpivot = function (nums) {

        if (nums == null || nums.length == 0) return -1;

        let start = 0;
        let end = nums.length - 1;

        if (nums[start] <= nums[end]) {
            return start;
        }

        while (start < end) {
            let midIndex = start + Math.floor((end - start) / 2);
            if (nums[midIndex] > nums[end]) {
                start = midIndex + 1;//move to right
            } else {
                end = midIndex;
            }
        }
        return start;
    };

    var binarySearch = function (nums, left, right) {
        let start = left;
        let end = right;

        while (start <= end) {
            let midIndex = start + Math.floor((end - start) / 2);

            if (nums[midIndex] == target) {
                console.log(midIndex)
                return midIndex;
            } else if (target < nums[midIndex]) {
                end = midIndex - 1;
            } else {
                start = midIndex + 1;
            }
        }
        return -1;
    }

    let pivot = getpivot(nums);
    console.log("pivot", pivot)

    if (nums[pivot] <= target && target <= nums[nums.length - 1]) {

        return binarySearch(nums, pivot, nums.length - 1);
    } else {
        return binarySearch(nums, 0, pivot - 1);
    }
};