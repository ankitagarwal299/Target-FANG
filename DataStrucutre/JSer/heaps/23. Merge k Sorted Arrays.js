class PriorityQueue {
    storage = [];

    constructor(comparator) {
        this.compare = comparator;
    }

    get size() {
        return this.storage.length;
    }

    _exists(index) {
        return this.storage[index] != undefined;
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
        let index = this.size - 1;

        while (index > 0) {
            let parent = this.getParent(index);
            if (this.compare(this.storage[index], this.storage[parent]) < 0) {
                this._swap(index, parent);
                index = parent;
            } else {
                break;
            }
        }
    }

    getChild(index) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;

        let shouldSwapWithLeft = this._exists(leftChildIndex) && this.compare(this.storage[leftChildIndex], this.storage[index]) < 0;
        let shouldSwapWithRight = this._exists(rightChildIndex) && this.compare(this.storage[rightChildIndex], this.storage[index]) < 0;

        if (!shouldSwapWithLeft && !shouldSwapWithRight) return undefined;

        if (shouldSwapWithLeft && shouldSwapWithRight) {
            if (this.compare(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0) {
                return leftChildIndex;
            } else {
                return rightChildIndex;
            }
        } else if (shouldSwapWithLeft) {
            return leftChildIndex;
        } else if (shouldSwapWithRight) {
            return rightChildIndex;
        }
    }

    poll() {
        /* base consition  */
        if (this.size == 0 || this.size == 1) return this.storage.pop();

        this._swap(0, this.size - 1);
        let item = this.storage.pop();

        let index = 0;
        while (index < this.size) {
            let child = this.getChild(index);

            if (!child) break;

            this._swap(index, child);
            index = child;
        }


        return item;
    }
}

class Node {
    constructor(value, arrIndex, elemIndex) {
        this.value = value;
        this.arrIndex = arrIndex;
        this.elemIndex = elemIndex;
    }
}

var mergeKLists = function (arrays) {

    let result = []

    if (arrays.length == 0) return [];

    let comparator = (a, b) => {
        return a.value - b.value;
    }
    let pq = new PriorityQueue(comparator);

    for (let i = 0; i < arrays.length; i++) {
        pq.add(new Node(arrays[i][0], i, 0));
    }

    /* crux : how to stop? Stop when 0th index is Infinity that means all are empty as we are inserting Infinity if array index ended */
    while (pq.storage[0].value < Infinity) {
        let item = pq.poll();
        result.push(item.value);

        //increment elem index
        item.elemIndex = item["elemIndex"] + 1;

        //check array winthin bounds
        if (item.elemIndex < arrays[item.arrIndex].length) {
            item.value = arrays[item.arrIndex][item.elemIndex];
        } else {
            item.value = Infinity;
        }
        pq.add(item);

    };

    return result;
}

console.log(mergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]]));


//Solution 1: put into an array and then sort in asc, On^2 for sorting n lists

//https://www.youtube.com/watch?v=zLcNwcR6yO4 - Kevin
//Solution 2: put into heap all m elements from k lists then poll , time : O(n * klog n*k), space: On*m

//Most efficient
//Solution 3: pout only 1 element from each lists and then heapify , then remove one and add another from the removed item 
//O (n * K log K )
//we need to make use of list is sorted