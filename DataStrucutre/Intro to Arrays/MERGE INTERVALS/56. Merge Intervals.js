class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`);
  }
}

function merge(intervals) {
  if (intervals.length < 2) {
    return intervals;
  }
  // sort the intervals on the start time
  intervals.sort((a, b) => a.start - b.start);
  const mergedIntervals = [];

  let start = intervals[0];
  let end = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i].start <= end){
        // overlapping intervals, adjust the 'end'
        end = Math.max(intervals[i].end , end);
    }else{
        mergedIntervals.push(new Interval(start,end));
        start = intervals[i].start;
        end = intervals[i].end;
    }
  }

  // add the last interval
  mergedIntervals.push(new Interval(start,end));

  return mergedIntervals;
}

process.stdout.write("Merged intervals: ");
let result = merge([
  new Interval(1, 4),
  new Interval(2, 5),
  new Interval(7, 9),
]);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

process.stdout.write("Merged intervals: ");
result = merge([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)]);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();

process.stdout.write("Merged intervals: ");
result = merge([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)]);
for (i = 0; i < result.length; i++) {
  result[i].print_interval();
}
console.log();
