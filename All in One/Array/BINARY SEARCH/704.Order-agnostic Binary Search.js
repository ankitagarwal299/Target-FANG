var searchOrderNotKnown = function (nums, target) {
    if (nums == null || nums.length == 0) return -1;


    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        let midIndex = start + Math.floor((end - start) / 2);

        if (target == nums[midIndex]) {
            return midIndex;
        } else if (
            //VVIMP to check in first half or second half
            (nums[start] < nums[end] && target < nums[midIndex]) ||
            (nums[start] > nums[end] && target > nums[midIndex])) {
            end = midIndex - 1;
        } else {
            start = midIndex + 1;
        }
    }
    return -1;
};
//https://www.callicoder.com/order-agnostic-binary-search/
//decreasing
console.log(searchOrderNotKnown([32, 28, 17, 9, 3], 9));//3

//increasing
console.log(searchOrderNotKnown([2, 8, 11, 19], 11));//3