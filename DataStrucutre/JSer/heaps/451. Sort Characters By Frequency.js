

// Min Comparator
//Heap.minComparator = (a, b) => { return a - b; }

// Max Comparator
//Heap.maxComparator = (a, b) => { return b - a; }


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
   if (parent < 0) {
      return;
    }
      while ( this.storage[child][1] > this.storage[parent][1]) {
        this.swap(child, parent);
        child = parent;
        parent = this.getParent(child);
        if (parent < 0) {
        break;
      }
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
      let rightChildIndex = 2 * parent + 2;
      let leftChildIndex = 2 * parent + 1;
  
      if (this.storage[leftChildIndex] != undefined) {
        if (this.storage[rightChildIndex] != undefined) {
          if (
            this.storage[leftChildIndex].interval.start < this.storage[rightChildIndex].interval.start
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
      while (this.storage[child][1] > this.storage[parent][1]) {
        this.swap(parent, child);
        parent = child;
        child = this.getChild(parent);
        if (child == null) break;
      }
    }
    
     
  }


  //reference :https://leetcode.com/problems/sort-characters-by-frequency/discuss/645585/javascript-solution-priority-queue
  //https://www.youtube.com/watch?v=trFw8IDw2Vg&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=59









var frequencySort = function (s) {
  let hashMap = new Map();

//learning below let char in s will print index not char, therefore 'of' is used 
  for (let char of s) {
    hashMap.set(char, (hashMap.get(char) || 0) + 1);//best way to fill hash map
  }
  
  console.log(hashMap)
  

  const comparator = (a, b) => {
    return hashMap.get(b) - hashMap.get(a);
  };

  let maxHeap = new MaxHeap(comparator);

  for (let obj of hashMap){
      maxHeap.insert(obj);
  }

  let result="";
  console.log(maxHeap.storage)
  while (maxHeap.storage.length > 0 ){
   let current = maxHeap.remove();
    for (let i=0; i < current[1] ; i++){
        result+=current[0];
    }
  }
    
return result;
}

//{e:3,t:1} --- how to get key and value----require iterator

console.log(frequencySort("tree"));

