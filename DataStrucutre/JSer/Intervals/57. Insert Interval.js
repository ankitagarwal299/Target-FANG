var merge = function (intervals, newInterval) {

  if (intervals.length == 0) return [newInterval];

  let start = 0;
  let end = intervals.length - 1;

  let targetIndex = 0;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (intervals[middle][0] >= newInterval[0]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  targetIndex = start;//here assign index to insert


  //Code for 56
  //insert
  intervals.splice(targetIndex, 0, newInterval);

  const isOverlap = (a, b) => {
    return a[1] >= b[0];
  }

  const mergeIntervals = (a, b) => {
    return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
  }

  let i = targetIndex;
  while (i < intervals.length) {
    if (isOverlap(intervals[i - 1], intervals[i])) {
      intervals.splice(i - 1, 2, mergeIntervals(intervals[i - 1], intervals[i]));
    } else {
      i++;
    }
  }

  return intervals;

};

console.log(merge([[1, 3], [6, 9]], [2, 5]));
console.log(merge([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]));
console.log(merge([], [5, 7]));
console.log(merge([[1, 5]], [2, 3]));
console.log(merge([[1, 5]], [2, 7]));