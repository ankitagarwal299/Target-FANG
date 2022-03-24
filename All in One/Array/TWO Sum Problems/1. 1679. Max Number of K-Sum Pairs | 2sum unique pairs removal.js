var maxOperations = function (nums, k) {
    if (nums == null || nums.length == 0) return 0;

    nums.sort((a, b) => a - b);

    //max no. of operations to remove all unique pairs 
    let coutpairs = 0;

    let start = 0;
    let end = nums.length - 1;
    while (start < end) {
        if (nums[start] + nums[end] == k) {
            start++;
            end--;
            coutpairs++;//move both pointers
        } else if (nums[start] + nums[end] < k) {
            start++;
        } else {
            end--;
        }
    }
    return coutpairs;
};