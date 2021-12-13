//DIY: Find Median from a Data Stream
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

    peek() {
        return this.storage[0];
    }
}




class MedianofAge {
    left
    right
    constructor() {
        this.left = new PriorityQueue((a, b) => b - a);
        this.right = new PriorityQueue((a, b) => a - b);
    }

    getMedian() {
        if (this.left.size + this.right.size == 0) return "no median";

        //if even number
        if (this.left.size == this.right.size) {
            return (this.left.peek() + this.right.peek()) / 2; //average of both middle in case of even
        } else {
            //if odd number, // because max-heap will have one more element than the min-heap
            return this.left.peek();
        }



    }

    removefromStream() {
        if (this.left.size + this.right.size == 0) return "nothing to remove";

        if (this.left.size >= this.right.size) return this.left.poll();
        return this.right.poll();
    }

    addToStream(val) {
        if (this.right.size > 0 && this.right.peek() < val) {
            this.right.add(val);
        } else {
            this.left.add(val);
        }

        //now balancing if left and right are unbalanced(diff equal 2)
        if (this.left.size - this.right.size == 2) {
            this.right.add(this.left.poll());
        } else if (this.left.size < this.right.size) {
            this.left.add(this.right.poll());
        }
    }
}

//https://www.youtube.com/watch?v=dshWERdcAdg
//Pepcoding explanation
let medianofAge = new MedianofAge();

/* medianofAge.addToStream(10);
console.log(medianofAge.getMedian())//10

medianofAge.addToStream(20);
console.log(medianofAge.getMedian())//15 avg not given in vedio

medianofAge.addToStream(30);
console.log(medianofAge.getMedian())//20

medianofAge.addToStream(5);
console.log(medianofAge.getMedian())//15 avg not given in vedio

medianofAge.addToStream(50);
console.log(medianofAge.getMedian())//20    

medianofAge.addToStream(70);
console.log(medianofAge.getMedian())//25    avg not given in vedio */

medianofAge.addToStream(-1);
console.log(medianofAge.getMedian());

medianofAge.addToStream(-2);
console.log(medianofAge.getMedian());

medianofAge.addToStream(-3);
console.log(medianofAge.getMedian());

medianofAge.addToStream(-4);
console.log(medianofAge.getMedian());

medianofAge.addToStream(-5);
console.log(medianofAge.getMedian());
