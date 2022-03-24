
var findMaxLength = function (nums) {
  if (nums == null || nums.length == 0) return 0;


  let map = { 0: -1 };//store sum 0 at index -1;
  let maxSublen = 0;

  let prefixSum = 0;
  for (let end = 0; end < nums.length; end++) {
    if (nums[end] == 1) {
      prefixSum += 1;
    } else {
      prefixSum -= 1;
    }

    if (map[prefixSum] != null) {
      maxSublen = Math.max(maxSublen, end - map[prefixSum]);
    } else {
      map[prefixSum] = end;
    }

  }
  return maxSublen
};
console.log(findMaxLength([1, 1, 0, 0, 1, 1, 0, 1, 1]));

//Very Easy
//https://www.youtube.com/watch?v=1WugaISSWx8
//Pepcoding