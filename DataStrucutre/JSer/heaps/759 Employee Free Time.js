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

class EmployeeInterval {
  constructor(interval, employeeIndex, intervalIndex) {
    this.interval = interval; // interval representing employee's working hours
    this.employeeIndex = employeeIndex;// index of the list containing working hours of this employee
    this.intervalIndex = intervalIndex; // index of the interval in the employee list
  }
}


function employeeFreeTime(schedule) {
  let result = [];
  if (schedule == null || schedule.length < 1) return result;

  let comparator = (a, b) => {
    return a["interval"][0] - b["interval"][0];
  }

  let pq = new PriorityQueue(comparator);

  for (let i = 0; i < schedule.length; i++) {
    pq.add(new EmployeeInterval(schedule[i][0], i, 0));
  }

  //console.log(pq.storage);
  let interval = pq.storage[0].interval;
  while (pq.storage.length > 0) {
    let currentEmployee = pq.poll();

    //console.log(currentEmployee);
    if (interval[1] < currentEmployee["interval"][0]) {
      result.push([interval[1], currentEmployee["interval"][0]]);
      interval = currentEmployee["interval"];
    } else {
      //overlapping condition
      if (interval[1] < currentEmployee["interval"][1]) {
        interval = currentEmployee["interval"]
      }
      // interval[1] = Math.max(interval[1], currentEmployee["interval"][1]);
    }

    // if there are more intervals available for the same employee, add their next interval
    if (currentEmployee["intervalIndex"] + 1 < schedule[currentEmployee["employeeIndex"]].length) {
      pq.add(
        new EmployeeInterval(
          schedule[currentEmployee["employeeIndex"]][currentEmployee["intervalIndex"] + 1],
          currentEmployee["employeeIndex"],
          currentEmployee["intervalIndex"] + 1
        )
      )
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

