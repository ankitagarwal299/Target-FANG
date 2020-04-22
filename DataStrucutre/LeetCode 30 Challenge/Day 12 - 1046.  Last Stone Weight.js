var lastStoneWeight = function (stones) {
  var maxHeap = new MaxHeap();

  for (let i = 0; i < stones.length; i++) {
    maxHeap.insert(stones[i]);
  }

  let firstMax, secondMax;

  while (maxHeap.storage.length > 1) {
    firstMax = maxHeap.remove();
    secondMax = maxHeap.remove();

    if (firstMax != secondMax) {
      maxHeap.insert(firstMax - secondMax);
    }
  }
  if (maxHeap.storage.length == 1 && maxHeap.storage[0] == 1) {
    return maxHeap.storage[0];
  }
};

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1]));

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
  
      while (this.storage[child] > this.storage[parent]) {
        this.swap(child, parent);
        child = parent;
        parent = this.getParent(child);
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
  
      return this.storage[leftChild] > this.storage[rightChild] ? leftChild : rightChild;
    }
  
    bubbleDown() {
      let parent = 0;
      let child = this.getChild(parent);
  
      while (this.storage[parent] < this.storage[child]) {
        this.swap(parent, child);
        parent = child;
        child = this.getChild(parent);
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
/* 

We have a collection of stones, each stone has a positive integer weight.

Each turn, we choose the two heaviest stones and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:

If x == y, both stones are totally destroyed;
If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)

Example 1:

Input: [2,7,4,1,8,1]
Output: 1
Explanation: 
We combine 7 and 8 to get 1 so the array converts to [2,4,1,1,1] then,
we combine 2 and 4 to get 2 so the array converts to [2,1,1,1] then,
we combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we combine 1 and 1 to get 0 so the array converts to [1] then that's the value of last stone.

*/
