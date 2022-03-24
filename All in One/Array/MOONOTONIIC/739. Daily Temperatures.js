var dailyTemperatures = function (temperatures) {
    if (temperatures == null || temperatures.length == 0) return [];

    let result = new Array(temperatures.length).fill(0);

    let stack = [];

    for (let i = temperatures.length - 1; i >= 0; i--) {
        //let index = stack[stack.length-1];//cannot do like this, index value not decreasing
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
            stack.pop();
        }

        if (stack.length > 0) {
            let index = stack[stack.length - 1];
            result[i] = index - i;
        }

        stack.push(i);
    }
    return result;
};