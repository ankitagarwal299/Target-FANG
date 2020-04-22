var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    let mid;
    
    while (left <= right) {
      mid = Math.floor((left + right) / 2);
      if (nums[mid == target]) return mid;
  
      // the only difference from the first one, trickly case, just updat left and right
      if ((nums[left] == nums[mid]) && (nums[right] == nums[mid])) { ++left; --right; }
  
      if (nums[left] <= nums[mid]) {
        //this is increasing then target can be found before and after mid
        if (target >= nums[left] && target <= nums[mid]) right = mid - 1;
        else left = mid + 1;
      } else {
        //this is increasing then target can be found before and after mid
        if (target >= nums[mid] && target <= nums[right]) left = mid + 1;
        else right = mid - 1;
      }
    }  
    return mid
  }
  
  console.log(search([2, 5, 6, 0, 0, 1, 2], 0));
