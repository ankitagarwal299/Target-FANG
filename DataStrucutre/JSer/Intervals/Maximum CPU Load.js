class MinHeap {
    constructor() {
      this.storage = [];
    }
  
    insert(val) {
      this.storage.push(val);
      this.bubbleUp();
    }
  
    swap(index1, index2) {
      [this.storage[index1], this.storage[index2]] = [
        this.storage[index2],
        this.storage[index1],
      ];
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
  
  class Job {
    constructor(start, end, cpuLoad) {
      this.start = start;
      this.end = end;
      this.cpuLoad = cpuLoad;
    }
  }
  
  function find_max_cpu_load(jobs) {
    // sort the jobs by start time
    jobs.sort((a, b) => a.start - b.start);
  
    let maxCPULoad = 0;
    let currentCPULoad = 0;
    let minHeap = new MinHeap();
  
  
    for (let j = 0; j < jobs.length; j++) {
      // remove all the jobs that have ended
      while (minHeap.storage.length > 0 && jobs[j].start >= minHeap.storage[0].end) {
        currentCPULoad -= minHeap.remove().cpuLoad;
      }
      // add the current job into min_heap
      minHeap.insert(jobs[j]);
      currentCPULoad += jobs[j].cpuLoad;
      maxCPULoad = Math.max(maxCPULoad, currentCPULoad);
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
  