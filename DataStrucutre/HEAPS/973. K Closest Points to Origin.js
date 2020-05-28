// Min Comparator
Heap.minComparator = (a, b) => { return a - b; }

// Max Comparator
Heap.maxComparator = (a, b) => { return b - a; }

class MaxHeap {
    constructor(comparator) {
      this.storage = [];
      this.comparator = comparator || Heap.minComparator;
    }
    insert(val) {
      this.storage.push(val);
      this.bubbleUp();
    }
    peek() {
		return this.storage[0] || null;
	}
  
    getParent(child) {
      let parent;
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
  
      while (distance(this.storage[child]) > distance(this.storage[parent])) {
        this.swap(child, parent);
        child = parent;
        parent = this.getParent(child);
      }
    }
    swap(i, j) { [this.storage[i], this.storage[j]] = [this.storage[j], this.storage[i]]; }
  
    //below whoel process for removal
    remove() {
      this.swap(this.storage.length - 1, 0);
      let item =this.storage.pop();  
      this.bubbleDown();
      return item;
    }
  
    getChild(parent) {
      let leftChild = 2 * parent + 1;
      let rightChild = 2 * parent + 2;
  
      return distance(this.storage[leftChild]) > distance(this.storage[rightChild]) ? leftChild : rightChild;
    }
  
    bubbleDown() {
      let parent = 0;
      let child = this.getChild(parent);
  
      while (distance(this.storage[child]) > distance(this.storage[parent])) {
        this.swap(parent, child);
        parent = child;
        child = this.getChild(parent);
      }
    }
  }


/*   const comparator = (b, a) => {
    if (!a) return 1;
    if (!b) return -1;
    if (!a && !b) return 0;
    return a[0] * a[0] + a[1] * a[1] - (b[0] * b[0] + b[1] * b[1]);
  }; */

let distance = ([x,y]) => (x**2 + y**2);

var kClosest = function (points, K) {

  let res = [];
  //let heap = new Heap(comparator);
  let maxHeap = new MaxHeap(comparator);

  points.forEach((p) => {
    maxHeap.insert(p);
    while (maxHeap.storage.length > K) maxHeap.remove();
  });

  /* while (K-- > 0) res.push(heap.remove());
  return res; */
 return maxHeap.storage;
};



//References:
//https://leetcode.com/problems/k-closest-points-to-origin/discuss/642830/Javascript-easy-to-understand-MaxHeap
//https://leetcode.com/problems/k-closest-points-to-origin/discuss/234694/javascript-1-line-beats-80-easily-readable
//https://www.youtube.com/watch?v=1rEUgAG7f_c&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=57