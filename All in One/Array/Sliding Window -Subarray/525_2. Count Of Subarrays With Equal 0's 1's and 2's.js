
var count012 = function (nums) {
  if (nums == null || nums.length == 0) return 0;

  let countEq012 = 0;

  let map = { '0#0': 1 };

  let count0 = 0;
  let count1 = 0;
  let count2 = 0;


  for (let end = 0; end < nums.length; end++) {
    if (nums[end] == 0) count0++;
    if (nums[end] == 1) count1++;
    if (nums[end] == 2) count2++;

    let key = (count1 - count0) + "#" + (count2 - count1);
    if (map[key] != null) {
      countEq012 += map[key];
      map[key]++;
    } else {
      map[key] = 1;
    }
  }
  return countEq012;
};

console.log(count012([1, 1, 2, 0, 1, 0, 1, 2, 1, 2, 2, 0, 1]));//9
//https://www.youtube.com/watch?v=fPR4C822JOM
//Pepcoding - very Easy
