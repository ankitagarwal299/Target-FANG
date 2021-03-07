/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function (nums) {
    if (nums == null || nums.length == 0) return [];

    let numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        numMap.set(nums[i], numMap.get(nums[i]) ? numMap.get(nums[i]) + 1 : 1);
    }

    nums.sort(comparator);

    return nums;

    /*comparator fn*/
    function comparator(a, b) {

        if (numMap.get(a) < numMap.get(b)) {
            return -1;
        } else if (numMap.get(a) > numMap.get(b)) {
            return 1;
        } else if (numMap.get(a) == numMap.get(a)) {
            return (a > b) ? -1 : 1;//-1 means comes first
        }
    }
};

console.log(frequencySort([-1, 1, -6, 4, 5, -6, 1, 4, 1]));
//TRY with HEAP Pending
