/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    if (nums == null || nums.length < 2) return 0;

    let stack = [];
    let leftminIndex = Infinity;
    for (let i = 0; i < nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
            leftminIndex = Math.min(leftminIndex, stack.pop());//compare with all values in stack
        }
        stack.push(i);
    }

    stack = [];//re-initialize
    let rightMaxIndex = -Infinity;
    for (let i = nums.length - 1; i >= 0; i--) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
            rightMaxIndex = Math.max(rightMaxIndex, stack.pop());//compare with all values in stack
        }
        stack.push(i);
    }

    return rightMaxIndex - leftminIndex > 0 ? rightMaxIndex - leftminIndex + 1 : 0;
};

console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]));//5
console.log(findUnsortedSubarray([1, 3, 4, 7, 6, 2, 12, 10, 9, 11]));//9 very good example https://www.youtube.com/watch?v=UfBfr-VRYOU
//https://www.youtube.com/watch?v=m4hvxzLoN_I