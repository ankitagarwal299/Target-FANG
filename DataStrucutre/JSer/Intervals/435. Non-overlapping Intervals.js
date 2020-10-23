
/* Most asked question */
var eraseOverlapIntervals = function (intervals) {
  if (intervals == null || intervals == undefined || intervals.length < 1) return 0;
  if (intervals.length == 1) return 1;


  let left = 0;
  let right = 1;
  let count = 0;

  while (right < intervals.length) {
    if (intervals[left][1] <= intervals[right][0]) {//Non-overlapping case
      left = right;
      right = right + 1;
    } else if (intervals[left][1] <= intervals[right][1]) { //overflow case 1, if end of left smaller than end of right, remove right
      right += 1;
      count += 1;
    } else if (intervals[left][1] > intervals[right][1]) { //overflow case 2,  if end of left greater than end of right, remove left
      left = right;
      right = right + 1;
      count += 1;
    }
  }

  return count;
};

//https://www.youtube.com/watch?v=BTObFnHbD4U&list=RDCMUCnxhETjJtTPs37hOZ7vQ88g&start_radio=1&t=791
//TEch Dose

let input = [[1, 2], [2, 3], [3, 4], [1, 3]]
console.log(eraseOverlapIntervals(input));

input = [[1, 2], [1, 2], [1, 2]]
console.log(eraseOverlapIntervals(input));

input = [[1, 2], [2, 3]]
console.log(eraseOverlapIntervals(input));
