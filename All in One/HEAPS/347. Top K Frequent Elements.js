

var topKFrequent = function (nums, k) {
    if (nums == null || nums.length < 2) return nums;

    let countmap = new Map();
    for (let i = 0; i < nums.length; i++) {
        countmap.set(nums[i], countmap.get(nums[i]) + 1 || 1)
    }

    console.log(countmap)

    let keys = [];
    for (let [key, value] of countmap.entries()) {
        keys.push(key);
    }

    //This is not correct , here key will give coomplete object at index
    // for (let key of countmap.entries()) {
    //     keys.push(key);
    // }


    let comparator = ((a, b) => countmap.get(a) - countmap.get(b));

    let minHeap = new PriorityQueue(comparator);

    for (let i = 0; i < keys.length; i++) {
        minHeap.add(keys[i]);

        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }


    let result = [];
    while (k > 0) {
        result.push(minHeap.poll());
        k--;
    }

    return result;
};



class PriorityQueue {
    storage = [];

    constructor(comparator) {
        this.compare = comparator;
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
        let index = this.storage.length - 1;
        while (index > 0) {
            let parent = this.getParent(index);
            if (this.compare(this.storage[index], this.storage[parent]) < 0) {
                this._swap(index, parent);
                index = parent;
            } else {
                //no need to further require parent
                break;
            }
        }
    }

    _exist(index) {
        return this.storage[index] != undefined;
    }

    getChild(index) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;

        let leftchildStatus = this._exist(leftChildIndex) && this.compare(this.storage[leftChildIndex], this.storage[index]) < 0;
        let rightChildStatus = this._exist(rightChildIndex) && this.compare(this.storage[rightChildIndex], this.storage[index]) < 0;

        if (!leftchildStatus && !rightChildStatus) return undefined;

        if (leftchildStatus && rightChildStatus) {
            if (this.compare(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0) {
                return leftChildIndex;
            } else {
                return rightChildIndex;
            }
        } else if (leftchildStatus) {
            return leftChildIndex;
        } else {
            return rightChildIndex;
        }
    }

    poll() {

        if (this.storage.length < 2) return this.storage.pop();

        //remove 0 index but array pop  from end , so swap
        let lastIndex = this.storage.length - 1;
        this._swap(0, lastIndex);

        let item = this.storage.pop();
        let index = 0;

        //bubble down
        while (index < this.storage.length) {
            let child = this.getChild(index);

            if (child == null) break;
            this._swap(index, child);
            index = child;
        }


        return item;
    }

    size() {
        return this.storage.length;
    }
}
