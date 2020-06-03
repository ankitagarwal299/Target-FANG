var minSubArrayLen = function( nums,s) {
    if(!nums || nums.length==0) return 0;

    let result = Number.MAX_VALUE;
    let left=0;
    let currentSum =0;

    for(let right=0;right <nums.length ; right++){
        currentSum += nums[right];
        while(currentSum >= s) {
            result = Math.min(result, right-left+1);
            currentSum-=nums[left];
            left++;
        }
    }
    return (result == Number.MAX_VALUE)? 0:result;
};

console.log(minSubArrayLen([2,3,1,2,4,3],7));

//find the minimal length of a contiguous subarray of which the sum ≥ s


