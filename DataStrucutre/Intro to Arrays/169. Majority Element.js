//JavaScript - Boyer-Moore Voting Algorithm - faster than 98.19%

//Solution1:
var majorityElement = function (nums) {
  if (nums == null || nums.length==0) return -1;
  if (nums.length==1) return nums[0];
  
  let count = 0,candidate = 0;

  for (let num of nums) {
    if (count == 0) {
      candidate = num;
    }
    count += num == candidate ? 1 : -1;
  }

  return candidate;
};


//Solution2:
var majorityElement = function(nums) {
  if (nums == null || nums.length==0) return -1;
  if (nums.length==1) return nums[0];

    var obj = {};
    
    for(var i = 0; i < nums.length; i++){
        obj[nums[i]] = obj[nums[i]] + 1 || 1;
        if(obj[nums[i]] > nums.length / 2)  return nums[i];
    }
    
};