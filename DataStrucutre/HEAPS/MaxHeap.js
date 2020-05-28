class MaxHeap {
  constructor() {
    this.storage = [];
  }
  insert(val) {
    this.storage.push(val);
    this.bubbleUp();
  }

  getParent(child) {
    let parent;
    //P = 2c+1,2c+2 => sp opposite is child
    if (child % 2 == 0) {
      parent = (child - 2) / 2;
    } else {
      parent = (child - 1) / 2;
    }
    return parent;
  }
  bubbleUp() {
    let child = this.storage.length - 1;
    let parent = this.getParent(child);

    if (parent < 0) {
      return;
    }

    while (this.storage[child] > this.storage[parent]) {
      this.swap(child, parent);
      child = parent;
      parent = this.getParent(child);
      if (parent < 0) {
        break;
      }
    }
  }
  swap(i, j) {
    [this.storage[i], this.storage[j]] = [this.storage[j], this.storage[i]];
  }

  //below whoel process for removal
  remove() {
    this.swap(this.storage.length - 1, 0);
    console.log(this.storage.pop());
    this.bubbleDown();
  }

  getChild(parent) {
    let leftChild = 2 * parent + 1;
    let rightChild = 2 * parent + 2;

    return this.storage[leftChild] > this.storage[rightChild]? leftChild: rightChild;
  }

  bubbleDown() {
    let parent = 0;
    let child = this.getChild(parent);
    if (child == null) return;
    while (this.storage[child] > this.storage[parent]) {
      this.swap(parent, child);
      parent = child;
      child = this.getChild(parent);
      if (child == null) break;
    }
  }
}
  
  var maxHeap = new MaxHeap();
  maxHeap.insert(6);
  maxHeap.insert(9)
  maxHeap.insert(3)
  
  maxHeap.insert(4)
  maxHeap.insert(13)
  maxHeap.insert(22)
  maxHeap.insert(1)
  maxHeap.insert(30)
  maxHeap.insert(17)
  
  
  console.log(maxHeap)
  maxHeap.remove()
  console.log(maxHeap)