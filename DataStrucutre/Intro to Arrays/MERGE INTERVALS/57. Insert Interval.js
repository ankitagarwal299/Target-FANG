//57. Insert Interval - Practice 20 times this code
var insert = function (intervals, newInterval) {
  if (intervals?.length == 0) return [newInterval];

  let result = [];

  intervals.sort((a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

  let i = 0;
  //loop and add  meetings until new interval starttime is greater than existinig meetinig
  while (i < intervals.length && intervals[i][0] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  //Check if above condition failed on for 1st meeting or 
  //New Meeting is starting after the last meeting start time 
  //Question is it is starting before last meetiing ending?
  if (i == 0 || newInterval[0] > result[result.length - 1][1]) {
    result.push(newInterval);
    //add new interval
  } else {
    //merging
    let lastInterval = result[result.length - 1];
    lastInterval[1] = Math.max(lastInterval[1], newInterval[1]);//same starnge it update array directly
  }


  function getIntersection(prev, curr) {
    return prev[1] >= curr[0];
  }

  //insert all meetinigs after inserting new interval from above
  while (i < intervals.length) {
    let lastInterval = result[result.length - 1];
    let intersection = getIntersection(lastInterval, intervals[i]);
    if (intersection) {
      //merging
      lastInterval[1] = Math.max(lastInterval[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
    i++;

  }
  return result;
};

let meeting_times = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]]

let new_meeting = [4, 8]
//https://www.youtube.com/watch?v=dxbRB6gWCqg
console.log(insert_meeting(meeting_times, new_meeting))


