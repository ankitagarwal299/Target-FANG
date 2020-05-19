var containsNearbyDuplicate = function (nums, k) {
  let hashMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (hashMap.has(nums[i]) && i - hashMap.get(nums[i]) <= k) {
      return true;
    } else {
      hashMap.set(nums[i], i);
    }
  }

  return false;
};

console.log(containsNearbyDuplicate([1, 2, 3, 1], 3));
console.log(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2));

//https://www.youtube.com/watch?v=Gaszkdd0RZA&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=20
