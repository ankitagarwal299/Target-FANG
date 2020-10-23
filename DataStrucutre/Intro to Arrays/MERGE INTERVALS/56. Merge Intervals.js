var merge = function (intervals) {
  let result = [];
  intervals.sort((a, b) => (a[0] !== b[0]) ? a[0] - b[0] : a[1] - b[1]);

  let current = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= current[1]) {
      current[1] = Math.max(current[1], intervals[i][1]);
    } else {
      result.push(current);
      current = intervals[i];
    }
  }

  /* push final interval */
  result.push(current);

  return result;
};

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
console.log(merge([[1, 4], [4, 5]]));