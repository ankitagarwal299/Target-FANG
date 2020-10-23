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
var leastInterval = function (tasks, n) {
    let map = {};

    for (let char of tasks) {
        map[char] = map[char] ? map[char] + 1 : 1;
    }


    let pq = new PriorityQueue((a, b) => b - a);

    pq.add(Object.values(map));

    let cycles = 0;

    while (pq.size != 0) {
        let temp = [];
        for (let i = 0; i < n + 1; i++) {
            if (pq.size != 0) temp.push(pq.poll());
        }

        for (let i of temp) {
            if (--i > 0) pq.add(i);
        }

        cycles += (pq.size == 0) ? temp.length : n + 1;
    }
    return cycles;

};

/* Intuition behind solution: Count the number of times each type of tasks occurs with a hash map. 
From the values in the hash map create a max heap. While the max heap is not empty, at every "cycle" in the cpu cooldown time of n, 
try to run the task that occurs the most adding these tasks to a temporary list. After iterating through the cooldown time 
(given as n in the problem) iterate through the temporary list checking for which tasks still need to be run 
(if the value in the list is greater than zero add it back to the max heap). Then, increment our return value by either t
he size of the temporary list (i.e. all the tasks you were able to run) or by the cooldown time (if you ran out of tasks 
    to run you have to wait the full cooldown). Finally, once the max heap is empty, return cycles. 
    */

console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2));
console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 0));
console.log(leastInterval(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2));



