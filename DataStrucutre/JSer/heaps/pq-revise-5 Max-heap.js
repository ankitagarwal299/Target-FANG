/* this is perfect and latest */

class PriorityQueue {
  storage = [];

  constructor(comparator) {
    this.compare = comparator;
  }
  get size() { return this.storage.length; }

  _swap(i, j) {
    let item = this.storage;
    [item[i], item[j]] = [item[j], item[i]];
  }


  _exists(index) { return this.storage[index] != undefined; }

  getParent(index) {
    if (index % 2 == 0) {
      return (index - 2) / 2;
    } else {
      return (index - 1) / 2;
    }
  }

  add(item) {
    this.storage.push(item);
    let index = this.storage.length - 1;

    while (index > 0) {
      let parent = this.getParent(index);

      if (this.compare(this.storage[index], this.storage[parent]) < 0) {
        this._swap(parent, index);
        index = parent;
      } else {
        break;
      }
    }
  }

  getChild(index) {
    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;
    let shouldSwapWithLeft = this._exists(leftIndex) && this.compare(this.storage[leftIndex], this.storage[index]) < 0;
    let shouldSwapWithRight = this._exists(rightIndex) && this.compare(this.storage[rightIndex], this.storage[index]) < 0;

    if (!shouldSwapWithLeft && !shouldSwapWithRight) return undefined;

    if (shouldSwapWithLeft && shouldSwapWithRight) {
      if (this.compare(this.storage[leftIndex], this.storage[rightIndex]) < 0) {
        return leftIndex;
      } else {
        return rightIndex;
      }
    } else if (shouldSwapWithLeft) {
      return leftIndex;
    } else if (shouldSwapWithRight) {
      return rightIndex;
    }
  }

  poll() {
    if (this.storage.length == 1 || this.storage.length == 0) return this.storage.pop();

    this._swap(0, this.size - 1);

    let result = this.storage.pop();
    let index = 0;
    while (index < this.size) {
      let child = this.getChild(index);
      if (!child) break;
      this._swap(child, index);
      index = child;
    }
    return result;
  }


}

let comparator = function (a, b) {
  if (a > b) {
    return -1;
  } else if (a < b) {
    return 1;
  } else {
    return 1;
  }
}

const pq = new PriorityQueue(comparator);

pq.add(0);
pq.add(1);
pq.add(2);
pq.add(3);
pq.add(4);
pq.add(5);
pq.add(6);
console.log(pq)

console.log(pq.poll())
console.log(pq.poll())



