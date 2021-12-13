
/* Most asked question */
var eraseOverlapIntervals = function (intervals) {
  if (intervals == null || intervals.length < 1) return 0;

  let removeCount = 0;
  //events finishing early in timeline will have less conflicts with other meetings
  intervals.sort((a, b) => a[1] - b[1]);


  let previnterval = intervals[0]
  for (let i = 1; i < intervals.length; i++) {
    //check if other meeting conflict
    let curr = intervals[i];

    if (previnterval[1] <= curr[0]) {
      previnterval = curr;
    } else {
      removeCount += 1;//conflict then remove
    }
  }
  return removeCount;
};
//the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
//Purpose is to remove 
//https://www.youtube.com/watch?v=3oDvuHCTFmY