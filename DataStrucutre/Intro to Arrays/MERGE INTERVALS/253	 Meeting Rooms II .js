

//Educative
/* Q. Determine how many rooms required for all meeting */

/* 
Similar Problems #
Problem 1: Given a list of intervals, find the point where the maximum number of intervals overlap.

Problem 2: Given a list of intervals representing the arrival and departure times of trains to a train station, our goal is to find the minimum number of platforms required for the train station so that no train has to wait.
 */

class MinHeap {
  constructor() {
    this.storage = [];
  }

  insert(val) {
    this.storage.push(val);
    this.bubbleUp();
  }

  swap(index1, index2) {
    [this.storage[index1], this.storage[index2]] = [this.storage[index2], this.storage[index1]];
  }

  bubbleUp() {
    let child = this.storage.length - 1;
    let parent = this.getParent(child);

    if (parent < 0) {
      return;
    }

    while (this.storage[child].end < this.storage[parent].end) {
      this.swap(child, parent);
      child = parent;
      parent = this.getParent(child);
      if (parent < 0) {
        break;
      }
    }
  }

  getParent(child) {
    let parent;
    if (child % 2 === 0) {
      parent = (child - 2) / 2;
    } else {
      parent = (child - 1) / 2;
    }
    return parent;
  }

  getChild(parent) {
    let rightChildIndex = 2 * parent + 2;
    let leftChildIndex = 2 * parent + 1;

    if (this.storage[leftChildIndex] != undefined) {
      if (this.storage[rightChildIndex] != undefined) {
        if (
          this.storage[leftChildIndex].end < this.storage[rightChildIndex].end
        ) {
          return leftChildIndex;
        } else {
          return rightChildIndex;
        }
      }
      return leftChildIndex;
    }
    return null;
  }

  bubbleDown() {
    let parent = 0;
    let child = this.getChild(parent);
    if (child == null) return;

    while (this.storage[child].end < this.storage[parent].end) {
      this.swap(parent, child);
      parent = child;
      child = this.getChild(parent);

      if (child == null) {
        break;
      }
    }
  }

  remove() {
    this.swap(this.storage.length - 1, 0);

    let item = this.storage.pop();
    this.bubbleDown();

    return item;
  }
}


class Meeting {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`);
  }
}


//Solution1:

function min_meeting_rooms(intervals) {
  if (intervals == null || intervals.length == 0) return 0;
  intervals.sort((a, b) => a.start - b.start);

  let minHeap = new MinHeap();
  minHeap.insert(intervals[0]);

  let minRooms = 0;
  for (let i = 1; i < intervals.length; i++) {
    // remove all the meetings that have ended
    while (minHeap.storage.length > 0 && intervals[i].start >= minHeap.storage[0].end) {
      minHeap.remove();
    }
    // add the current meeting into min_heap
    minHeap.insert(intervals[i]);
    // all active meetings are in the min_heap, so we need rooms for all of them.
    minRooms = Math.max(minRooms, minHeap.storage.length);
  }
  console.log(minHeap.storage)
  return minRooms;
}


console.log(`Minimum meeting rooms required: ` +
  `${min_meeting_rooms([new Meeting(4, 5), new Meeting(2, 3), new Meeting(2, 4), new Meeting(3, 5)])}`);

console.log(`Minimum meeting rooms required: ` +
  `${min_meeting_rooms([new Meeting(1, 4), new Meeting(2, 5), new Meeting(7, 9)])}`);
console.log(`Minimum meeting rooms required: ` +
  `${min_meeting_rooms([new Meeting(6, 7), new Meeting(2, 4), new Meeting(8, 12)])}`);
console.log(`Minimum meeting rooms required: ` +
  `${min_meeting_rooms([new Meeting(1, 4), new Meeting(2, 3), new Meeting(3, 6)])}`);
console.log(`Minimum meeting rooms required: ` +
  `${min_meeting_rooms([new Meeting(4, 5), new Meeting(2, 3), new Meeting(2, 4), new Meeting(3, 5)])}`);






//https://www.youtube.com/watch?v=PWgFnSygweI&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=56
//Solution2:
function min_meeting_rooms(intervals) {
  if (intervals == null || intervals.length == 0) return 0;
  intervals.sort((a, b) => a.start - b.start);

  let minHeap = new MinHeap();
  minHeap.insert(intervals[0]);
  for (let i = 1; i < intervals.length; i++) {
    let current = intervals[i];
    let earliest = minHeap.remove();

    if (current.start >= earliest.end) {
      //no conflict , then same meeting room continued so increase endtime of prev meeting
      earliest.end = current.end;
    } else {
      minHeap.insert(current);
    }

    minHeap.insert(earliest);

    console.log(minHeap.storage)
  }
  return minHeap.storage.length;
}