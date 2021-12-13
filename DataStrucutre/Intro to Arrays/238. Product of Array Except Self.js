/*  https://www.youtube.com/watch?v=gREVHiZjXeQ */

//--VERy EASy
var productExceptSelf = function (nums) {
  if (nums == null || nums.length < 2) return nums;

  let productArr = [];
  let productLeft = 1;
  for (let i = 0; i < nums.length; i++) {
    productArr[i] = nums[i] * productLeft;
    productLeft = productArr[i];
  }

  let productRight = 1;
  for (let i = nums.length - 1; i > 0; i--) {
    productArr[i] = productArr[i - 1] * productRight;
    productRight = productRight * nums[i];
  }
  productArr[0] = productRight;

  return productArr;
};

console.log(productExceptSelf([1, 0, 3, 4]));
console.log(productExceptSelf([1, 2, 3, 4]));