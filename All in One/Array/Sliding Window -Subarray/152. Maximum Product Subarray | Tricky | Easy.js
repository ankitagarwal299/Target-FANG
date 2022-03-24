var maxProduct = function (nums) {
    if (nums == null || nums.length == 0) return 0;

    let currSubproductLeft = 1;
    let currSubproductRight = 1;

    let overallMaxProduct = -Infinity;



    for (let i = 0; i < nums.length; i++) {
        currSubproductLeft *= nums[i];
        overallMaxProduct = Math.max(currSubproductLeft, overallMaxProduct);
        if (currSubproductLeft == 0) currSubproductLeft = 1;
    }

    for (let i = nums.length - 1; i >= 0; i--) {
        currSubproductRight *= nums[i];
        overallMaxProduct = Math.max(currSubproductRight, overallMaxProduct);
        if (currSubproductRight == 0) currSubproductRight = 1;
    }
    return overallMaxProduct;
};

console.log(maxProduct([2, 3, -2, 4]));
console.log(maxProduct([-2, 0, -1]));

//https://www.youtube.com/watch?v=jzQ-f2uU0UU
//(Pepcoding) very easy

