/* can be done by heaps */
//https://www.youtube.com/watch?v=S3vgXAgFY6E&list=PLvx8w9g4qv_p6Z2JWeKWCnqCsULQeNXYV&index=5

//first way
var maxProduct = function (nums, k) {

    nums.sort((a, b) => b - a);

    let product = 1;
    for (let i = 0; i < k; i++) {
        product *= nums[i] - 1
    }

    return product;

};

console.log(maxProduct([3, 4, 5, 2], 2));


//Second way
var maxProduct = function (nums) {
    let first = -Infinity;
    let second = -Infinity;

    let product = 1;
    for (let i = 0; i < nums.length; i++) {
        if (first < nums[i]) {
            second = first;
            first = nums[i];
        }
    }

    return (first - 1) * (second - 1);

};

console.log(maxProduct([3, 4, 5, 2]));

//3rd way- Heap




