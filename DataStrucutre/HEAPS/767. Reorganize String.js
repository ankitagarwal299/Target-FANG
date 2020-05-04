//https://www.youtube.com/watch?v=zaM_GLLvysw&t=70s



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
    if (parent < 0) { return; }


    while (this.storage[child].values > this.storage[parent].values) {
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
    let remove = this.storage.pop();
    this.bubbleDown();
    return remove;
  }

  getChild(parent) {
    let rightChildIndex = (2 * parent) + 2;
    let leftChildIndex = (2 * parent) + 1;

    if (this.storage[leftChildIndex] != undefined) {
      if (this.storage[rightChildIndex] != undefined) {

        if (this.storage[leftChildIndex].values > this.storage[rightChildIndex].values) {
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

  bubbleDown() {
    let parent = 0;
    let child = this.getChild(parent);
    if (child == null) return;

    while (this.storage[parent].values < this.storage[child].values) {
      this.swap(parent, child);
      parent = child;
      child = this.getChild(parent);
      if (child == null) {
        break;
      }
    }
  }
}

var reorganizeString = function (str) {
  let counts = new Map();

  for (let char of str) {
    counts.set(char, counts.get(char) == undefined ? 1 : counts.get(char) + 1);
  }

  var maxHeap = new MaxHeap();

  for (let [char, values] of counts.entries()) {
    maxHeap.insert({ char, values });
  }

  let resultStr = "";
  while (maxHeap.storage.length > 1) {
    //greedy part 
    let mostFrquentlyChar = maxHeap.remove();
    let secondMostFrequentChar = maxHeap.remove();
    
    console.log(mostFrquentlyChar, secondMostFrequentChar);
    resultStr += mostFrquentlyChar.char + secondMostFrequentChar.char;

    counts.set(mostFrquentlyChar.char, counts.get(mostFrquentlyChar.char) - 1);
    counts.set(secondMostFrequentChar.char, counts.get(secondMostFrequentChar.char) - 1);

    console.log(counts);

    if (counts.get(mostFrquentlyChar.char) > 0) {
      maxHeap.insert(mostFrquentlyChar)
    }
    if (counts.get(secondMostFrequentChar.char) > 0) {
      maxHeap.insert(secondMostFrequentChar)
    }
  }

  //last char in heap
  if (maxHeap.storage.length != 0) {

    let lastChar = maxHeap.remove();
    if (counts.get(lastChar.char) > 1) {
      return "";//we dont have anything to isnert in between so return ""
    }
    resultStr += lastChar.char;
  }

  console.log(maxHeap.storage)
  return resultStr;
};
//reorganizeString("aabcccccdfeeeeeee")
console.log(reorganizeString("aab"));

























