var pivotIndex = function (nums) {
    if (nums == null || nums.length == 0) return -1;
  
    let total = 0;
    nums.forEach(function (num) {
      return (total += num);
    });
  
    let leftSum = 0;
    for (let i = 0; i < nums.length; i++) {
      if (total - leftSum - nums[i] == leftSum) return nums[i];
  
      leftSum += nums[i];
    }

    return -1;
  }
  
  console.log(pivotIndex([1, 7, 3, 6, 5, 6]));
  