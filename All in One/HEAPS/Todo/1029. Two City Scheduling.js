//nlogn
var twoCitySchedCost = function (costs) {

    let minCost = 0;

    /* 1. How much profitable to go to A rather than B */
    /* 2.  Bigger the difference than we need to choose lesser value*/
    costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));

    for (let i = 0; i < costs.length; i++) {
        minCost += (i < costs.length / 2) ? costs[i][0] : costs[i][1];
    }

    return minCost;

};

console.log(twoCitySchedCost([[10, 20], [30, 200], [400, 50], [30, 20]]));
console.log(twoCitySchedCost([[259, 770], [448, 54], [926, 667], [184, 139], [840, 118], [577, 469]]));
console.log(twoCitySchedCost([[515, 563], [451, 713], [537, 709], [343, 819], [855, 779], [457, 60], [650, 359], [631, 42]]));

//https://www.youtube.com/watch?v=vtNoP43hGJA


//can be done by Heap

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


var twoCitySchedCost = function (costs) {
    let minCost = 0;

    /* 1. How much profitable to go to A rather than B */
    /* 2.  Bigger the difference than we need to choose lesser value*/
    /* create Priority Queue */
    let comparator = (a, b) => {
        return (a[0] - a[1]) - (b[0] - b[1]);
    }

    let pq = new PriorityQueue(comparator);

    for (let i = 0; i < costs.length; i++) {
        pq.add(costs[i]);
    }

    for (let i = 0; i < costs.length; i++) {
        const [toA, toB] = pq.poll()
        if (i < costs.length / 2) {

            minCost += toA;
        } else {
            minCost += toB;
        }
        // minCost +=  (i < costs.length / 2) ? pq.poll() : costs[i][1];
    }

    return minCost;

};

console.log(twoCitySchedCost([[10, 20], [30, 200], [400, 50], [30, 20]]));
console.log(twoCitySchedCost([[259, 770], [448, 54], [926, 667], [184, 139], [840, 118], [577, 469]]));
console.log(twoCitySchedCost([[515, 563], [451, 713], [537, 709], [343, 819], [855, 779], [457, 60], [650, 359], [631, 42]]));


















