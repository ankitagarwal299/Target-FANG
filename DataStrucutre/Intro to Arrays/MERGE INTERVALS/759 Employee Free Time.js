//Educative


class MinHeap {
    constructor() {
      this.storage = [];
    }
  
    insert(val) {
      this.storage.push(val);
      this.bubbleUp();
    }
  
    swap(index1, index2) {
      [this.storage[index1], this.storage[index2]] = [this.storage[index2],this.storage[index1]];
    }
  
    bubbleUp() {
      let child = this.storage.length - 1;
      let parent = this.getParent(child);
  
      if (parent < 0) {
        return;
      }
  
      while (this.storage[child].interval.start < this.storage[parent].interval.start) {
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
            this.storage[leftChildIndex].interval.start > this.storage[rightChildIndex].interval.start
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
  
      while (this.storage[child].interval.start < this.storage[parent].interval.start) {
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


class Interval {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`);
  }
}

class EmployeeInterval {
  constructor(interval, employeeIndex, intervalIndex) {
    this.interval = interval; // interval representing employee's working hours
    // index of the list containing working hours of this employee
    this.employeeIndex = employeeIndex;
    this.intervalIndex = intervalIndex; // index of the interval in the employee list
  }
}


function find_employee_free_time(schedule) {
  let result = [];
  if (schedule == null || schedule.length == 0) return result;
  let minHeap = new MinHeap();

  for (let i = 0; i < schedule.length; i++) {
    minHeap.insert(new EmployeeInterval(schedule[i][0], i, 0));
  }
  
  console.log("initial loop",minHeap.storage);

  let previousInterval = minHeap.storage[0].interval;
  console.log("previousInterval",previousInterval);
  while (minHeap.storage.length > 0) {
      console.log("before remove ",minHeap.storage);

    const queueTop = minHeap.remove();
    console.log("outside",queueTop)
    
    // if previousInterval is not overlapping with the next interval, insert a free interval
    if (previousInterval.end < queueTop.interval.start) {
      console.log("if condition")
      result.push(new Interval(previousInterval.end, queueTop.interval.start));
      previousInterval = queueTop.interval;
    } else { // overlapping intervals, update the previousInterval if needed
      if (previousInterval.end < queueTop.interval.end) {
        console.log("else condition")
        previousInterval = queueTop.interval;
        
      }
    }
    // if there are more intervals available for(the same employee, add their next interval
    const employeeSchedule = schedule[queueTop.employeeIndex];
    if (employeeSchedule.length > queueTop.intervalIndex + 1) {
      minHeap.insert(new EmployeeInterval(
        employeeSchedule[queueTop.intervalIndex + 1], queueTop.employeeIndex,
        queueTop.intervalIndex + 1,
      ));
    }
  }
  console.log(result);
  return result;
}




let input = [
    [new Interval(1, 3), new Interval(5, 6)],
    [new Interval(2, 3), new Interval(6, 8)],
  ];
  process.stdout.write('Free intervals: ', end = '');
  let result = find_employee_free_time(input);
  for (i = 0; i < result.length; i++) {
    result[i].print_interval();
  }
  console.log();
  
  input = [
    [new Interval(1, 3), new Interval(9, 12)],
    [new Interval(2, 4)],
    [new Interval(6, 8)],
  ];
  process.stdout.write('Free intervals: ', end = '');
  result = find_employee_free_time(input);
  for (i = 0; i < result.length; i++) {
    result[i].print_interval();
  }
  console.log();
  
  input = [
    [new Interval(1, 3)],
    [new Interval(2, 4)],
    [new Interval(3, 5), new Interval(7, 9)],
  ];
  process.stdout.write('Free intervals: ', end = '');
  result = find_employee_free_time(input);
  for (i = 0; i < result.length; i++) {
    result[i].print_interval();
  }
  console.log();
  