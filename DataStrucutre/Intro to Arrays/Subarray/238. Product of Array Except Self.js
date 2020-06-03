/* 
Example:

Input:  [1,2,3,4]
Output: [24,12,8,6]

//https://www.youtube.com/watch?v=gREVHiZjXeQ
 */


var productExceptSelf = function (nums) {
    let output = [];
    let product = 1;
  
    for (let i = 0; i < nums.length; i++) {
      product = product * nums[i]
      output.push(product);
    }
    console.log(output);
    product = 1;
    for (let i = nums.length - 1; i > 0; i--) {
      output[i] = output[i-1] * product;
      product = product * nums[i]
    }
    output[0] = product;
    console.log(output);
  };
  
  console.log(productExceptSelf([1, 0, 3, 4]));
