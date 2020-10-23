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

//https://codeinterview.io/WSIOBZRBBA

class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

class Employee {
  constructor(interval, arrIndex, intIndex) {
    this.interval = interval;
    this.arrindex = arrIndex;
    this.intIndex = intervalIndex;
  }
}


function employeeFreeTime(schedule) {
  if (schedule == null || schedule.length == 0 || schedule[0].length == 1) return [];

  let comparator = ((a, b) => a["interval"][0] - b["interval"][0]);

  let pq = new PriorityQueue(comparator);

  //add all 0 index of all empl in the heap
  for (let i = 0; i < schedule.length; i++) {
    pq.add(new Employee(schedule[i][0], i, 0));
  }

  let currInterval = pq.storage[0]["interval"];

  //stop condition of heap
  while (pq.size > 0) {
    let employee = pq.poll();

    if (currInterval[1] < employee["interval"][0]) {
      result.push([currInterval[1], employee["interval"][0]]);
      currInterval = employee["interval"];
    } else {
      //interval overlaping
      currInterval[1] = Math.max(currInterval[1], employee["interval"][1]);
    }

    //add into heap next interval index  of an empl
    let employeeIndex = employee["arrindex"];
    let intervalIndex = employee["intIndex"];

    if (employee["intIndex"] + 1 < schedule[employeeIndex].length) {
      pq.add(new Employee(
        schedule[employeeIndex][intervalIndex + 1],
        employeeIndex,
        intervalIndex + 1
      ))
    }
  }
  return result;
}

let input = [
  [[1, 3], [5, 6]],
  [[2, 3]],
  [[6, 8]]
];
console.log(employeeFreeTime(input));

input = [[[1, 3], [9, 12]], [[2, 4]], [[6, 8]]];
console.log(employeeFreeTime(input));

input = [[[1, 3]], [[2, 4]], [[3, 5], [7, 9]]];
console.log(employeeFreeTime(input));

input = [
  [[1, 3], [6, 7]],
  [[1, 3]],
  [[4, 10]],
];
console.log(employeeFreeTime(input));

input = [
  [[1, 3], [6, 7]],
  [[2, 4]],
  [[2, 5], [9, 12]],
];
console.log(employeeFreeTime(input));

