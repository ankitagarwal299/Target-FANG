function firstSmallerToRight(nums) {
    let result = new Array(nums.length).fill(-1);

    let stack = [];
    for (let i = nums.length - 1; i >= 0; i--) {

        //monotonic inc queue
        while (stack.length != 0 && stack[stack.length - 1] > nums[i]) {
            stack.pop();
        }
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }

        stack.push(nums[i]);
    }
    return result;
}
console.log(firstSmallerToRight([8, 6, 4, 5, 7]));// [6, 4, -1, -1, -1]


function firstGreaterToRight(nums) {
    let result = new Array(nums.length).fill(-1);

    let stack = [];
    for (let i = nums.length - 1; i >= 0; i--) {

        //monotonic dec queue
        while (stack.length != 0 && stack[stack.length - 1] < nums[i]) {//sign change
            stack.pop();
        }
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }

        stack.push(nums[i]);
    }
    return result;
}
console.log(firstGreaterToRight([8, 6, 4, 5, 7]));//[-1, 7, 5, 7, -1]