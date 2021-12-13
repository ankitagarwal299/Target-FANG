//https://www.youtube.com/watch?v=XFPHg5KjHoo

const checkSubarraySum = (nums, k) => {
  if (!nums || nums.length == 0) return false;
  let result = [-1];
  let sum = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum > k) {
      sum -= nums[left++];
    }

    if(sum == k && (result.length==1 || result[1] - result[0] < right- left)){
      result.push([left+1,right+1])
    }
  }

  return result;
};


console.log(subarraySum([2,3,1,2,4,3],7));
console.log(subarraySum([1,2,3,4,5,0,0,0,6,7,8,9,10],15));

//https://www.youtube.com/watch?v=XFPHg5KjHoo

//slight variant from 560. Subarray Sum Equals K. Here we need to find sum equals
