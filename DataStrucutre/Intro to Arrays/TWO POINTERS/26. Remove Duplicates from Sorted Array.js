var binarySearch = function (nums, val) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < val) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
};

var removeElement = function (nums, val) {
  let index = binarySearch(nums, val);
  for (let i = index+1; i < nums.length; i++) {
    if (nums[i] != val) {
      [nums[index], nums[i]] = [nums[i], nums[index]];
      index++;
    }
  }

  return index;
};

console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
