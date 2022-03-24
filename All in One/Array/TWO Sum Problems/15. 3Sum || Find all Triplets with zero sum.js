
var threeSum = function (nums) {
    if (nums == null || nums.length < 3) return [];
    let target = 0;//given in question

    nums.sort((a, b) => a - b);

    let allpairs = [];

    function twoSum(left, right, target) {
        let pairs = [];

        let start = left;
        let end = right;

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

    for (let i = 0; i <= nums.length - 3; i++) {
        let curr = nums[i];

        if (i != 0 && nums[i] == nums[i - 1]) {
            // i++;//for loop will take care
            continue;
        }

        let currpairs = twoSum(i + 1, nums.length - 1, target - curr);
        for (let i = 0; i < currpairs.length; i++) {
            allpairs.push([curr, ...currpairs[i]]);
        }
    }
    return allpairs
};
//https://www.youtube.com/watch?v=1IBgYGJqKP8
//Excellent pepcoding

//https://www.callicoder.com/find-triplets-with-zero-sum/
