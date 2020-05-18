
var missingNumber = function (nums) {
  let x1 = 0;
  for (let i = 0; i < nums.length; i++) {
    x1 = x1 ^ nums[i];
  }

  let x2 = 0;
  for (let i = 0; i < nums.length+1; i++) {//arraylength +1 for missing number
    x2 = x2 ^ i;
  }

  return x1 ^ x2;
};



//https://www.youtube.com/watch?v=YMYVYSWL93w&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=25

var missingNumber = function (nums) {
  let sum = 0;

  for (let i of nums) {
    sum += i;
  }

  let n = nums.length + 1;
  return((n * (n - 1)) / 2) - sum;
};

console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
