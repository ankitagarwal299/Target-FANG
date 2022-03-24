
var countSubEq01 = function (nums) {
    if (nums == null || nums.length == 0) return 0;

    let count = 0;
    let map = { 0: 1 };

    let prefixSum = 0;
    for (let end = 0; end < nums.length; end++) {
        if (nums[end] == 1) {
            prefixSum += 1;
        } else {
            prefixSum -= 1;
        }

        if (map[prefixSum] != null) {
            count += map[prefixSum];
            map[prefixSum]++;
        } else {
            map[prefixSum] = 1;
        }

    }
    return count;
};

console.log(countSubEq01([1, 1, 0, 0, 1, 1, 0, 1, 1]));
//Refer 525_4. Count of Zero Sum Subarray using Hashmaps