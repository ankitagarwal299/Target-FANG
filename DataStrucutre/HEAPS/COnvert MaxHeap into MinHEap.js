class MinHeap {
  constructor() {
    this.storage = [];
  }

  insert(val) {
    this.storage.push(val);
    console.log(this.storage);
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

    while (this.storage[child] < this.storage[parent]) {
      this.swap(child, parent);
      child = parent;
      parent = this.getParent(child);
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
    let rightChild = 2 * parent + 1;
    let leftChild = 2 * parent + 2;

    let minChild = null;
    if (this.storage[leftChild] < this.storage[rightChild]) {
      minChild = leftChild;
    } else {
      minChild = rightChild;
    }
    return minChild;
  }

  bubbleDown() {
    let parent = 0;
    let child = this.getChild(parent);

    while (this.storage[child] < this.storage[parent]) {
      this.swap(parent, child);
      parent = child;
      child = this.getChild(parent);
    }
  }

  remove() {
    this.swap(this.storage.length - 1, 0);

    this.storage.pop();
    this.bubbleDown();
  }
}
//[9,4,7,1,-2,6,5]

var maxHeap = [9, 4, 7, 1, -2, 6, 5];

var minHeap = new MinHeap();

for (let i = maxHeap.length - 1; i >= 0; i--) {
  minHeap.insert(maxHeap[i]);
}

console.log(minHeap);
