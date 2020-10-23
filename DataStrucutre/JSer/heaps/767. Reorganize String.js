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

var reorganizeString = function (S) {
    const hashMap = new Map();


    for (let str of S) {
        hashMap.set(str, hashMap.get(str) + 1 || 1);
    }

    let comparator = (a, b) => b - a;

    let pq = new PriorityQueue(comparator);


    for (let char of hashMap.keys()) {
        pq.add(char);
    }

    let result = "";
    while (pq.size > 1) {
        let current = pq.poll();
        let next = pq.poll();
        result += current + next;

        /* decrease the count in map */
        hashMap.set(current, hashMap.get(current) - 1);
        hashMap.set(next, hashMap.get(next) - 1);

        /* add again to heap */
        if (hashMap.get(current) > 0) {
            pq.add(current);
        }
        if (hashMap.get(next) > 0) {
            pq.add(next);
        }

    }

    if (pq.size != 0) {
        let last = pq.poll();
        /* count of last is more than 1 then retunr "" */
        if (hashMap.get(last) > 1) return "empty";

        /* only last char is left then append */
        result += last;
    }

    return result;
};

console.log(reorganizeString("aab"));
console.log(reorganizeString("aaab"));

