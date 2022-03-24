//https://www.youtube.com/watch?v=m4hvxzLoN_I

var nextGreaterElements = function (nums) {
    if (nums == null || nums.length < 2) return [-1];

    let result = new Array(nums.length).fill(-1);

    let stack = [];

    for (let i = 0; i < 2 * nums.length; i++) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i % nums.length]) {
            result[stack.pop()] = nums[i % nums.length];
        }
        stack.push(i % nums.length);
    }
    return result;
};

console.log(nextGreaterElements([1, 2, 1]));
/*
 [1, 2, 1, 1, 2, 1]
i =0, 1, 2, 3, 4, 5
*/
