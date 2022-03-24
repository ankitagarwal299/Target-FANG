
var findMaxLength = function (nums) {
  if (nums == null || nums.length == 0) return 0;

  let longSub012 = 0;

  let map = { '0#0': -1 };

  let count0 = 0;
  let count1 = 0;
  let count2 = 0;


  for (let end = 0; end < nums.length; end++) {
    if (nums[end] == 0) count0++;
    if (nums[end] == 1) count1++;
    if (nums[end] == 2) count2++;

    let key = (count1 - count0) + "#" + (count2 - count1);
    if (map[key] != null) {
      longSub012 = Math.max(longSub012, end - map[key]);
    } else {
      map[key] = end;
    }
  }
  console.log(map);

  return longSub012;
};

console.log(findMaxLength([1, 1, 2, 0, 1, 0, 1, 2, 1, 2, 2, 0, 1]));//9
//https://www.youtube.com/watch?v=MRoWBJvJeLQ
//Pepcoding - very Easy
