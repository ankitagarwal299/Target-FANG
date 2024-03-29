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

class Job {
  constructor(start, end, cpuLoad) {
    this.start = start;
    this.end = end;
    this.cpuLoad = cpuLoad;
  }
}

function find_max_cpu_load(jobs) {
  // sort the jobs by start time
  if (jobs == null || jobs == undefined || jobs.length < 1) return 0;
  if (jobs.length == 1) return jobs[0].cpuLoad;

  jobs.sort((a, b) => (a.start == b.start) ? (a.end - b.end) : (a.start - b.start));

  let comparator = (a, b) => a.start - b.start;
  let pq = new PriorityQueue(comparator);

  let maxCPULoad = 0;
  let currentLoad = 0;

  for (let i = 0; i < jobs.length; i++) {
    if (pq.storage.length > 0 && jobs[i].start >= pq.storage[0].end) {
      //no overlapping remove previous load
      let previousload = pq.poll();
      currentLoad = currentLoad - previousload.cpuLoad;
      //maxCPULoad = Math.max(currentLoad, maxCPULoad);
    } else {
      //overlapping, cpu is getting loaded, getting lot of jobs ot execute at once
      currentLoad = currentLoad + jobs[i].cpuLoad;
      pq.add(jobs[i]);
      maxCPULoad = Math.max(currentLoad, maxCPULoad);
    }
  }


  return maxCPULoad;
}

console.log(
  `Maximum CPU load at any time: ` +
  `${find_max_cpu_load([
    new Job(1, 4, 3),
    new Job(2, 5, 4),
    new Job(7, 9, 6),
  ])}`
);
console.log(
  `Maximum CPU load at any time: ` +
  `${find_max_cpu_load([
    new Job(6, 7, 10),
    new Job(2, 4, 11),
    new Job(8, 12, 15),
  ])}`
);
console.log(
  `Maximum CPU load at any time: ` +
  `${find_max_cpu_load([
    new Job(1, 4, 2),
    new Job(2, 4, 1),
    new Job(3, 6, 5),
  ])}`
);
