
/* Sorting */
var getStrongest = function (arr, k) {

    arr.sort((a, b) => b - a);

    let median = arr[Math.floor((arr.length - 1) / 2)];

    arr.sort((a, b) => {
        let diffA = Math.abs(a - median);
        let diffB = Math.abs(b - median);

        if (diffA > diffB) {
            return -1;
        } else if (diffA < diffB) {
            return 1;
        } else {
            return b - a;
        }
    });

    console.log(arr)

    return arr.slice(0, k);

};

console.log(getStrongest([1, 2, 3, 4, 5], 2));


/* HEAPS */
var getStrongest = function (arr, k) {

    arr.sort((a, b) => a - b);

    let median = arr[Math.floor((arr.length - 1) / 2)];

    let comparator = (a, b) => {
        let diffA = Math.abs(a - median);
        let diffB = Math.abs(b - median);

        //sign change
        if (diffA < diffB) {
            return -1;
        } else if (diffA > diffB) {
            return 1;
        } else {
            return b - a;
        }
    }

    let pq = new PriorityQueue(comparator);

    for (let num of arr) {
        pq.add(num);
        if (pq.size > k) {
            pq.poll();
        }
    }
    return pq.storage;
};

console.log(getStrongest([1, 2, 3, 4, 5], 2));

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


