/**
 * // Definition for an Interval.
 * function Interval(start, end) {
 *    this.start = start;
 *    this.end = end;
 * };
 */


var employeeFreeTime = function (schedule) {
  if (schedule.length == 0) return [[]];

  let intervals = [];

  // Step 1: Flatten the schedule list to a single list of intervals
  for (const employee of schedule) {
      for (const interval of employee) {
          intervals.push(interval);
      }
  }

  // Step 2: Sort the intervals by start time
  intervals.sort((a, b) => a.start - b.start);

  // Step 3: Merge intervals and find free time (same code 56. Merge Intervals)
  let mergedintervals = [intervals[0]];//insert first interval 

  for (let i = 1; i < intervals.length; i++) {
      let nextInterval = intervals[i];
      let lastInterval = mergedintervals[mergedintervals.length - 1];

      if (lastInterval.end >= nextInterval.start) {
          lastInterval.end = Math.max(lastInterval.end, nextInterval.end) // Merge intervals by extending the end time of the last merged interval

          continue;
      }

      mergedintervals.push(nextInterval);
  }
  console.log("mergedintervals--->", mergedintervals)

  // Step 4: Find the free time between merged intervals
  let freeTime = []
  for (let i = 1; i < mergedintervals.length; i++) {
      let nextInterval = mergedintervals[i]
      let previousInterval = mergedintervals[i - 1];

      freeTime.push(new Interval(previousInterval.end, nextInterval.start));
  }

  return freeTime;
};