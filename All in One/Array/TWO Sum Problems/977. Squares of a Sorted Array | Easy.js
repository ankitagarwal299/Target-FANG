var sortedSquares = function (nums) {
    if (nums == null || nums.length == 0) return nums;

    let arr = new Array(nums.length).fill(0);

    let start = 0;
    let end = nums.length - 1;

    let index = nums.length - 1;

    while (start <= end) {
        let leftSq = nums[start] * nums[start];
        let rightSq = nums[end] * nums[end];

        if (leftSq > rightSq) {

            arr[index] = leftSq;
            start++;

            index--;

        } else {

            arr[index] = rightSq;
            end--;

            index--;
        }
    }
    return arr;
};