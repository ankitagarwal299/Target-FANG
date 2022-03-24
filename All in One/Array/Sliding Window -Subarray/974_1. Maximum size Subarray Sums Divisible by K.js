

//Very Easy
var subarraysDivByK = function (nums, k) {
    if (nums == null || nums.length == 0 || k == 0) return 0;

    let maxSize = -Infinity;

    let map = { 0: -1 };//store remainder map (only change here)

    let prefixSum = 0;

    for (let end = 0; end < nums.length; end++) {
        prefixSum += nums[end];

        let remainder = prefixSum % k

        if (remainder < 0) {//if remainder is negative, make it poositive
            remainder += k
        }

        if (map[remainder] != null) {
            maxSize = Math.max(maxSize, end - map[remainder]);
        } else {
            map[remainder] = end;//index
        }
    }
    return maxSize;
};

//https://www.youtube.com/watch?v=GrV3MTR_Uk0&t=78s
//Sumit Malik

//same as 974. Count Subarray Sums Divisible by K | Negative.js