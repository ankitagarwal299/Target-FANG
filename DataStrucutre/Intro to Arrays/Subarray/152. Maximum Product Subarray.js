var maxProduct = function(nums) {
    if (nums == null || nums.length==0) return -1;

   /*  let currentMax = Number.MIN_VALUE;//cannot do this , it will be negative
    let currentMin = Number.MAX_VALUE; 
    */
    let currentMax = nums[0];
    let currentMin = nums[0];
    let finalMax = 0;

    for(let i=1; i< nums.length; i++){
        /* 3 coditions*/
         // 1. number(+) * prevMax(+) is the largest
        // 2. number(+) it self is the largest
        // 3. number(-) * prevMin(-) is the largest 
        currentMax = Math.max(nums[i], currentMax * nums[i] , currentMin * nums[i]);
        currentMin = Math.min(nums[i], currentMax * nums[i] , currentMin * nums[i]);

        if(currentMax > finalMax) finalMax = currentMax;
    }

    return finalMax;//return maximum product of subarray
};

console.log(maxProduct([2,3,-2,4]));
console.log(maxProduct([-2,0,-1]));

// find the contiguous subarray within an array has the largest product.

