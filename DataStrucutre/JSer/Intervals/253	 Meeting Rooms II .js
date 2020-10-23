//Educative

/* 
Similar Problems #
Problem 1: Given a list of intervals, find the point where the maximum number of intervals overlap.
I am not able to find above problem/solution
 */
class PriorityQueue {
  storage = [];

  constructor(comparator) {
    this.compare = comparator;
  }

  get size() {
    return this.storage.length;
  }

  _exists(index) {
    return this.storage[index] != undefined;
  }

  _swap(i, j) {
    let item = this.storage;
    [item[i], item[j]] = [item[j], item[i]];
  }

  getParent(index) {
    if (index % 2 == 0) {
      return (index - 2) / 2;
    } else {
      return (index - 1) / 2;
    }
  }

  add(item) {
    this.storage.push(item);
    let index = this.size - 1;

    while (index > 0) {
      let parent = this.getParent(index);
      if (this.compare(this.storage[index], this.storage[parent]) < 0) {
        this._swap(index, parent);
        index = parent;
      } else {
        break;
      }
    }
  }

  getChild(index) {
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;

    let shouldSwapWithLeft = this._exists(leftChildIndex) && this.compare(this.storage[leftChildIndex], this.storage[index]) < 0;
    let shouldSwapWithRight = this._exists(rightChildIndex) && this.compare(this.storage[rightChildIndex], this.storage[index]) < 0;

    if (!shouldSwapWithLeft && !shouldSwapWithRight) return undefined;

    if (shouldSwapWithLeft && shouldSwapWithRight) {
      if (this.compare(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0) {
        return leftChildIndex;
      } else {
        return rightChildIndex;
      }
    } else if (shouldSwapWithLeft) {
      return leftChildIndex;
    } else if (shouldSwapWithRight) {
      return rightChildIndex;
    }
  }

  poll() {
    /* base consition  */
    if (this.size == 0 || this.size == 1) return this.storage.pop();

    this._swap(0, this.size - 1);
    let item = this.storage.pop();

    let index = 0;
    while (index < this.size) {
      let child = this.getChild(index);

      if (!child) break;

      this._swap(index, child);
      index = child;
    }


    return item;
  }
}

class Meeting {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

/* Steps:
1. Maintain an array to calculate minimum endtime for all conflicting meetings endTime =[]
2. Sort meetings by start time
3. Add first meeting end time into endTime array
4. Compare next meeting start time with min end time
    a. If meeting conflict then add end time of the meeting into endTime array
    b. If meeting is not conflict, then we can have next meeting in the same room, after the minim entime meeting is finished, update min end time with next meeting endtime array.
    c. Sort the meeting endtime to find the minimum endtime 
5. endtime array is the total rooms required for meeting

eg 
 */

function min_meeting_rooms(intervals) {
  if (intervals == null || intervals == undefined || intervals.length < 1) return 0;
  if (intervals.length == 1) return 1;

  intervals.sort((a, b) => (a.start == b.start) ? (a.end - b.end) : (a.start - b.start));

  let comparator = (a, b) => a - b;

  let pq = new PriorityQueue(comparator);

  //add 1st meeting
  pq.add(intervals[0].end);

  for (let i = 1; i < intervals.length; i++) {
    let nextMeeting = intervals[i];
    if (nextMeeting.start >= pq.storage[0]) {
      pq.poll();
      pq.add(nextMeeting.end);
    } else {
      //conflict with next meeting start and minimum end time in the heap then room is required
      pq.add(nextMeeting.end);
    }
  }

  return pq.size;
}

/* Q. Determine how many rooms required for all meeting */
//Problem 2: Given a list of intervals representing the arrival and departure times of trains to a train station, our goal is to find the minimum number of platforms required for the train station so that no train has to wait.

console.log(min_meeting_rooms([new Meeting(4, 5), new Meeting(2, 3), new Meeting(2, 4), new Meeting(3, 5)]));
/* eg: [2, 3], [2, 4], [3, 5], [4, 5]
endTime = [3]
[3, 4],
  [5, 4] = [4, 5]
  [5, 5]
2 Rooms required */
console.log(min_meeting_rooms([new Meeting(1, 4), new Meeting(2, 5), new Meeting(7, 9)]));
console.log(min_meeting_rooms([new Meeting(6, 7), new Meeting(2, 4), new Meeting(8, 12)]));
console.log(min_meeting_rooms([new Meeting(1, 4), new Meeting(2, 3), new Meeting(3, 6)]));
console.log(min_meeting_rooms([new Meeting(4, 5), new Meeting(2, 3), new Meeting(2, 4), new Meeting(3, 5)]));