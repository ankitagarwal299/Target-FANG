function firstSmallerToLeft(nums) {
    let result = new Array(nums.length).fill(-1);

    let stack = [];
    for (let i = 0; i < nums.length; i++) {

        //monotonic decreasing queue
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
console.log(firstSmallerToLeft([8, 6, 4, 5, 7]));//[-1, -1, -1, 4, 5]


function firstGreaterToLeft(nums) {
    let result = new Array(nums.length).fill(-1);

    let stack = [];
    for (let i = 0; i < nums.length; i++) {

        //monotonic decreasing queue
        while (stack.length != 0 && stack[stack.length - 1] > nums[i]) {//sign change
            stack.pop();
        }
        if (stack.length > 0) {
            result[i] = stack[stack.length - 1];
        }

        stack.push(nums[i]);
    }
    return result;
}
console.log(firstGreaterToLeft([8, 6, 4, 5, 7]));//[-1, -1, -1, 4, 5]