  /* helper function for MinHeap */
  class MinHeap {
    constructor() {
      this.storage = [];
    }
  
    insert(itemObj) {
      this.storage.push(itemObj);
      this.bubbleUp();
    }
  
    bubbleUp() {
      let childIndex = this.storage.length - 1;
      let parentIndex = this.getParent(childIndex);
      if (parentIndex < 0) { return; }
  
      while (this.storage[childIndex].val < this.storage[parentIndex].val) {
        this.swap(childIndex, parentIndex);
        childIndex = parentIndex;
        parentIndex = this.getParent(childIndex);
        if (parentIndex < 0) {
          break;
        }
      }
    }
  
    getParent(childIndex) {
      if (childIndex % 2 == 0) {
        return (childIndex - 2) / 2
      } else {
        return (childIndex - 1) / 2
      }
    }
  
    swap(i1, i2) {
      [this.storage[i1], this.storage[i2]] = [this.storage[i2], this.storage[i1]]
    }
  
  
    remove() {
      this.swap(0, this.storage.length - 1);
      let minObj = this.storage.pop();
      this.bubbleDown();
      return minObj;
    }
  
    bubbleDown() {
      let parent = 0;
      let child = this.getChild(parent);
  
      if (child == null) return;
  
      while (this.storage[child].val < this.storage[parent].val) {
        this.swap(parent, child)
        parent = child;
        child = this.getChild(parent)
        if (child == null) {
          break;
        }
      }
    }
  
    getChild(parent) {
      let rightChildIndex = (2 * parent) + 2;
      let leftChildIndex = (2 * parent) + 1;
  
      if (this.storage[leftChildIndex] != undefined) {
        if (this.storage[rightChildIndex] != undefined) {
  
          if (this.storage[leftChildIndex].val < this.storage[rightChildIndex].val) {
            return leftChildIndex;
          }
          else {
            return rightChildIndex;
          }
        }
        return leftChildIndex;
      }
      return null;
    }
  }

  function kSortedArrayFunction(kSortedArray) {
    let result = [];
  
    for (let i = 0; i < kSortedArray.length; i++) {
      minHeap.insert({
        "val": kSortedArray[i][0],
        "arrIndex": i,
        "elementIndex": 0
      });
    }
  
    while (minHeap.storage[0].val != Infinity) {
      let removeItemObj = minHeap.remove();
      result.push(removeItemObj.val);
      removeItemObj["elementIndex"] = removeItemObj["elementIndex"] + 1;
      if (removeItemObj["elementIndex"] < kSortedArray[removeItemObj["arrIndex"]].length) {
        removeItemObj["val"] = kSortedArray[removeItemObj["arrIndex"]][removeItemObj["elementIndex"]]
  
      }
      else {
        removeItemObj["val"] = Infinity;
      }
      minHeap.insert(removeItemObj);
    }
    
    console.log("Final MinHeap", minHeap.storage)
    return result;
  }
  
  /* calling functions */
  var minHeap = new MinHeap();
  
  let kSortedArray = [[5, 6, 8, 16], [3, 7, 12, 13], [1, 10, 11, 15], [2, 4, 9, 14]];
  console.log("Original Array\n", kSortedArray);
  console.log("MinHeap", minHeap.storage);
  console.log("Final Sorting\n", kSortedArrayFunction(kSortedArray));
  
  
  