const checkSubarraySum = (nums, k) => {
  if (!nums || nums.length == 0) return false;

  let map = new Map();
  map.set(0, -1); //required in case of [6] or [2,4] or [0,2,3,1,5]

  let sum = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    if (k != 0) {
      //check is required otherwise it is infinity
      sum = sum % k;
    }
    if (map.has(sum)) {
        //if (right - map.get(sum) +1 >= 2) { cannot include + 1  as map{0:-1} if it is map{0:0} then element at 0 cannot be place and array index start with 0

      if (right - map.get(sum)  >= 2) { // length of subarray ;right-left + 1 --- check size
        return true;
      }
    } else {
      map.set(sum, right);
    }
  }

  return false;
};

console.log(checkSubarraySum([6], 6));
console.log(checkSubarraySum([2, 4], 6));
console.log(checkSubarraySum([0,2,3,1,5], 6));


//https://www.youtube.com/watch?v=9DMEGpnmIMM
//https://www.youtube.com/watch?v=wsTcByj8QbI&t=31s

//similar to problem 560. Subbary sum equal k
