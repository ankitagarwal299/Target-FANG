//4Sum - https://www.youtube.com/watch?v=hGz0b8L7plI

//But i will do it recursively
//https://www.youtube.com/watch?v=LfB2tkmsrCA
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    if (nums == null || nums.length < 4) return [];

    nums.sort((a, b) => a - b);
    return recusive(0, target, 4, nums);

};

function twoSum(left, target, k, nums) {
    // if(nums.length - left < k) return result;

    let pairs = [];

    let start = left;
    let end = nums.length - 1;

    while (start < end) {
        if (left != start && nums[start] == nums[start - 1]) {
            start++;
            continue;
        }
        let sum = nums[start] + nums[end];

        if (sum == target) {
            pairs.push([nums[start], nums[end]]);
            start++;
            end--;
        } else if (sum > target) {
            end--;
        } else {
            start++;
        }
    }
    return pairs;
}


function recusive(left, target, k, nums) {

    if (k == 2) {
        return twoSum(left, target, k, nums);
    }

    let result = [];

    //if(nums.length - left < k) return result;

    for (let i = left; i <= nums.length - k; i++) {

        if (i != left && nums[i] == nums[i - 1]) continue;

        let curr = nums[i];

        let subres = recusive(i + 1, target - curr, k - 1, nums);


        for (let j = 0; j < subres.length; j++) {
            result.push([curr, ...subres[j]])
        }
    }
    return result;
}