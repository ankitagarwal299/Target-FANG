//Time is O(N) or O(4N) with 4 for loops.
//1st loop will find the min or the left side value of where the order isn't ascending.
//2nd loop will find the max or the right side value of where the order isn't ascending.
//3rd loop will loop over to find the iteration where the min value occurs.
//4th loop will loop over to find the iteration where the max value occurs.
//The answer is iteration of max value minus the iteration of left + 1.

var findUnsortedSubarray = function (nums) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  let flag = false;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      flag = true;
      if (flag) {
        min = Math.min(min, nums[i]); //find the minimum among the unsorted array
      }
    }
  }
  flag = false;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] > nums[i + 1]) {
      flag = true;
      if (flag) {
        max = Math.max(max, nums[i]); //find the minimum among the unsorted array
      }
    }
  }

  //find leftIndex
  let leftIndex, rightIndex;
  for (leftIndex = 0; leftIndex < nums.length; leftIndex++) {
    if (min < nums[leftIndex]) {
      break;
    }
  }

  for (rightIndex = nums.length - 1; rightIndex >= 0; rightIndex--) {
    if (max > nums[rightIndex]) {
      break;
    }
  }

  return rightIndex - leftIndex < 0 ? 0 : rightIndex - leftIndex + 1;
};
console.log(findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]));


//https://www.youtube.com/watch?v=p-O7FExDH1M
