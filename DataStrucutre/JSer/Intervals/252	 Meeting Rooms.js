/* Q. Determine if the person could attend all meeting */
class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function canAttendAll(intervals) {
  if (!intervals || intervals.length < 2) return true;

  intervals.sort((a, b) => a.start - b.start);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i].start < intervals[i - 1].end) return false;
  }

  return true;
}

//let input = [[1, 4], [2, 5], [7, 9]];
input = [new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)]
console.log(canAttendAll(input));


input = [[6, 7], [2, 4], [8, 12]];
console.log(canAttendAll(input));


input = [[4, 5], [2, 3], [3, 6]]
console.log(canAttendAll(input));

