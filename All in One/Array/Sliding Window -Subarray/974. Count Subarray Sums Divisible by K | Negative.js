

//Very Easy
var subarraysDivByK = function (nums, k) {
    if (nums == null || nums.length == 0 || k == 0) return 0;

    let overallcount = 0;

    let map = { 0: 1 };

    let prefixSum = 0;

    for (let end = 0; end < nums.length; end++) {
        prefixSum += nums[end];

        let remainder = prefixSum % k

        if (remainder < 0) {//if remainder is negative, make it poositive
            remainder += k
        }

        if (map[remainder] != null) {
            overallcount += map[remainder];

            map[remainder] += 1;
        } else {
            map[remainder] = 1;
        }
    }
    return overallcount;
};

//https://www.youtube.com/watch?v=QM0klnvTQzk&t=19s
//(Pepcoding)