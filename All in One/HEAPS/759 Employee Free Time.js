// /* Naive Approach - First Approach*/
function employeeFreeTime(employees) {
  let result = [];
  if (employees == null || employees.length < 2) return employees;

  let scehdules = [];
  for (let i = 0; i < employees.length; i++) {
    //scehdules = scehdules.concat(employees[i]);Best method to merge array
    for (j = 0; j < employees[i].length; j++) {
      scehdules.push(employees[i][j]);
    }
  }
  console.log(scehdules);

  scehdules.sort((a, b) => a.start - b.start);

  let prevInt = scehdules[0];
  for (let i = 1; i < scehdules.length; i++) {
    if (prevInt.end < scehdules[i].start) {
      result.push([prevInt.end, scehdules[i].start]);
      prevInt = scehdules[i];
    } else {
      prevInt.end = Math.max(prevInt.end, scehdules[i].end);
    }
  }
  return result;
}



/* Priority Queue Approach - Second Approach*/
//https://www.youtube.com/watch?v=1-A2aMl4I68&t=1309s
function employeeFreeTime(employees) {

  let comparator = ((a, b) => a.interval.start - b.interval.start);
  let minHeap = new PriorityQueue(comparator);

  let result = [];
  if (employees == null || employees.length < 2) return employees;

  for (let i = 0; i < employees.length; i++) {
    minHeap.add(new Emp(i, employees[i][0], 0));
  }

  let prevInterval = minHeap.peek();
  while (minHeap.size() > 0) {
    let topItem = minHeap.poll();

    if (prevInterval.interval.end < topItem.interval.start) {
      //no overlap
      result.push([prevInterval.interval.end, topItem.interval.start]);
      prevInterval = topItem;

    } else {
      //Overlap
      prevInterval.interval.end = Math.max(prevInterval.interval.end, topItem.interval.end);
    }

    //add next interval
    let empSchedule = employees[topItem.empIndex];
    if (topItem.intIndex + 1 < empSchedule.length) {
      minHeap.add(new Emp(topItem.empIndex, empSchedule[topItem.intIndex + 1], topItem.intIndex + 1));
    }

  }

  return result;
}

class Emp {
  constructor(empIndex, interval, intIndex) {
    this.empIndex = empIndex;
    this.interval = interval;
    this.intIndex = intIndex;
  }
}


class PriorityQueue {
  storage = [];

  constructor(comparator) {
    this.compare = comparator;
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
    let index = this.storage.length - 1;
    while (index > 0) {
      let parent = this.getParent(index);
      if (this.compare(this.storage[index], this.storage[parent]) < 0) {
        this._swap(index, parent);
        index = parent;
      } else {
        //no need to further require parent
        break;
      }
    }
  }

  _exist(index) {
    return this.storage[index] != undefined;
  }

  getChild(index) {
    let leftChildIndex = 2 * index + 1;
    let rightChildIndex = 2 * index + 2;

    let leftchildStatus = this._exist(leftChildIndex) && this.compare(this.storage[leftChildIndex], this.storage[index]) < 0;
    let rightChildStatus = this._exist(rightChildIndex) && this.compare(this.storage[rightChildIndex], this.storage[index]) < 0;

    if (!leftchildStatus && !rightChildStatus) return undefined;

    if (leftchildStatus && rightChildStatus) {
      if (this.compare(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0) {
        return leftChildIndex;
      } else {
        return rightChildIndex;
      }
    } else if (leftchildStatus) {
      return leftChildIndex;
    } else {
      return rightChildIndex;
    }
  }

  poll() {

    if (this.storage.length < 2) return this.storage.pop();

    //remove 0 index but array pop  from end , so swap
    let lastIndex = this.storage.length - 1;
    this._swap(0, lastIndex);

    let item = this.storage.pop();
    let index = 0;

    //bubble down
    while (index < this.storage.length) {
      let child = this.getChild(index);

      if (child == null) break;
      this._swap(index, child);
      index = child;
    }


    return item;
  }

  size() {
    return this.storage.length;
  }

  peek() {
    return this.storage[0];
  }
}



class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

//let input = [[[1, 3], [5, 6]],[[2, 3]],[[6, 8]]];
let input = [[new Interval(1, 3), new Interval(5, 6)], [new Interval(2, 3)], [new Interval(6, 8)]];
console.log(employeeFreeTime(input)); //ans: [3, 5]

//input = [[[1, 3], [9, 12]], [[2, 4]], [[6, 8]]];
input = [[new Interval(1, 3), new Interval(9, 12)], [new Interval(2, 4)], [new Interval(6, 8)]];
console.log(employeeFreeTime(input));//ans: [4, 6],[8, 9]

//input = [[[1, 3]], [[2, 4]], [[3, 5], [7, 9]]];
input = [[new Interval(1, 3)], [new Interval(2, 4)], [new Interval(3, 5), new Interval(7, 9)]];
console.log(employeeFreeTime(input));//ans: [5, 7]

//input = [[[1, 3], [6, 7]],[[1, 3]],[[4, 10]],];
input = [[new Interval(1, 3), new Interval(6, 7)], [new Interval(1, 3)], [new Interval(4, 10)]];
console.log(employeeFreeTime(input));//ans: [3, 4]

//input = [[[1, 3], [6, 7]], [[2, 4]], [[2, 5], [9, 12]]];
input = [[new Interval(1, 3), new Interval(6, 7)], [new Interval(2, 4)], [new Interval(2, 5), new Interval(9, 12)]];
console.log(employeeFreeTime(input));//ans: [5, 6],[7, 9]