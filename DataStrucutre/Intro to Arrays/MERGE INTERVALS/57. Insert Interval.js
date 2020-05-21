class Interval {
    constructor(start, end) {
      this.start = start;
      this.end = end;
    }
  
    print_interval() {
      process.stdout.write(`[${this.start}, ${this.end}]`);
    }
  }
  
  function insert(intervals, new_interval) {
    let merged = [],
      i = 0;
  
    // skip and add to output) all intervals that come before the 'new_interval'
    while (i < intervals.length && intervals[i].end < new_interval.start) {
      merged.push(intervals[i]);
      i += 1;
    }
  
    // merge all intervals that overlap with 'new_interval'
    while (i < intervals.length && intervals[i].start <= new_interval.end) {
      new_interval.start = Math.min(intervals[i].start, new_interval.start);
      new_interval.end = Math.max(intervals[i].end, new_interval.end);
      i += 1;
    }
  
    // insert the new_interval
    merged.push(new_interval);
  
    // add all the remaining intervals to the output
    while (i < intervals.length) {
      merged.push(intervals[i]);
      i += 1;
    }
  
    return merged;
  }
  
  
  let result = insert([new Interval(1, 3),new Interval(5, 7),new Interval(8, 12)], new Interval(4, 6));

  /* Q. Insert Interval */