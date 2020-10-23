//JSer - inplace merging interval, do not need to create new array
var merge = function (intervals) {

  intervals.sort((a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

  const isOverlap = (a, b) => {
    return a[1] >= b[0];
  }

  const mergeIntervals = (a, b) => {
    return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
  }

  let i = 1;
  while (i < intervals.length) {
    if (isOverlap(intervals[i - 1], intervals[i])) {
      intervals.splice(i - 1, 2, mergeIntervals(intervals[i - 1], intervals[i]));
    } else {
      i++;
    }
  }

  return intervals;
};

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
console.log(merge([[1, 4], [4, 5]]));