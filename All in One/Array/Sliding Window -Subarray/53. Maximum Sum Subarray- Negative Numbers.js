var maxSubArray = function (nums) {
  if (nums == null || nums.length == 0) return 0;

  let currSum = nums[0];
  let overallsum = nums[0];

  for (let i = 1; i < nums.length; i++) {

    //decide if include in previous train or start new
    if (currSum >= 0) {//positive araha hain
      currSum += nums[i];
    } else {
      currSum = nums[i];
    }

    //challenge overal all sum
    if (currSum > overallsum) {
      overallsum = currSum;
    }

  }

  return overallsum;

};
//kadane's Algo
//1. Negative values
//2. window is not given
//3. target sum not given

//Pepcoding
//https://www.youtube.com/watch?v=VMtyGnNcdPw&t=24s