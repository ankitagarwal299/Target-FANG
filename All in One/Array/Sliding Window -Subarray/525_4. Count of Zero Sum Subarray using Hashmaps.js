
var countSubSum = function (nums) {
    if (nums == null || nums.length == 0) return 0;
    let count = 0;

    let map = { 0: 1 };

    let prefixSum = 0;

    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];

        if (map[prefixSum - k]) {
            count += map[prefixSum - k];
        }

        if (map[prefixSum] != null) {
            map[prefixSum] += 1;
        } else {
            map[prefixSum] = 1;
        }
    }
    return count;

};

console.log(countSubSum([2, 8, -3, -5, 2, -4, 6, 1, 2, 1, -3, 4]));

//https://www.youtube.com/watch?v=C9-n_H7dsvU
//Pepcoding - Very Easy

//Copy/paste 
//560. Count Subarray Sum Equals K || Negative.js