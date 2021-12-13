//DIY: Merge K Sorted Lists
class ListNode {
    constructor(val) {
        this.val = val != undefined ? val : null;
        this.next = null;
    }
}

class PriorityQueue {
    storage = [];

    constructor(comparator) {
        this.compare = comparator;
    }

    get size() {
        return this.storage.length;
    }



    getParent(index) {
        if (index % 2 == 0) {
            return (index - 2) / 2;
        } else {
            return (index - 1) / 2;
        }
    }

    //add item into pq bubble up
    add(val) {
        this.storage.push(val);

        let index = this.size - 1;

        while (index > 0) {
            let parent = this.getParent(index);

            if (this.compare(this.storage[index], this.storage[parent]) < 0) {
                this._swap(index, parent);
                index = parent;
            } else {
                break;//no need to bubbleup
            }
        }


    }



    //delete item from pq bubble down
    poll() {
        if (this.size == 0 || this.size == 1) return this.storage.pop();

        this._swap(0, this.size - 1);
        let item = this.storage.pop();

        let index = 0;
        while (index < this.size - 1) {
            let child = this.getChild(index);

            if (!child) break;//Important if parent is correct index , then dont need change
            this._swap(child, index);//doesnot matter
            index = child;
        }

        return item;
    }


    _exists(index) {
        return this.storage[index] != undefined;
    }

    getChild(index) {
        let leftChild = 2 * index + 1;
        let rightChild = 2 * index + 2;

        let shouldSwapLeft = this._exists(leftChild) && this.compare(this.storage[leftChild], this.storage[index]) < 0;
        let shouldSwapRight = this._exists(rightChild) && this.compare(this.storage[rightChild], this.storage[index]) < 0;

        if (!shouldSwapLeft && !shouldSwapRight) return undefined; //no swapping required, parent node is at correct place

        if (shouldSwapLeft && shouldSwapRight) {
            /* if both left and right children are smaller that parent, then compare childrens */
            if (this.compare(this.storage[leftChild, rightChild]) < 0) return leftChild;
            return rightChild;
        } else {
            if (shouldSwapLeft) return leftChild;
            return rightChild;
        }
    }

    _swap(a, b) {
        [this.storage[a], this.storage[b]] = [this.storage[b], this.storage[a]];
    }



}

/* 23. Merge k Sorted Lists */
function mergeKSorted(lists) {
    if (lists == null || lists.length == 0) return null;

    if (lists.length == 1) return lists[0];

    let dummy = ListNode(-1000);
    let curr = dummy;
    let queue = new PriorityQueue((a, b) => a[1] - b[1]);

    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
            queue.push([i, lists[i].val]);
            lists[i] = lists[i].next;//point next node
        }
    }

    while (queue.size) {
        let [smallestIndex, smallestValue] = queue.poll();
        // lists[smallestIndex] = lists[smallestIndex].next//it is worng in this , as list is already pointing to 2nd node at Line24
        //Calculate next node pointed by List
        if (lists[smallestIndex]) {
            queue.push([smallestIndex, lists[smallestIndex].val]);
            lists[smallestIndex] = lists[smallestIndex].next
        }
        curr.next = new ListNode(smallestValue);
        curr = curr.next;
    }

    dummy.next;

}

let arr = [];
let ll1 = new ListNode(-1000);
for (let i = 0; i < 5; i += 2) {
    ll1.next = new ListNode(i);
}


let ll2 = new ListNode(-2000);
for (let i = 1; i < 5; i += 2) {
    ll2.next = new ListNode(i);
}
arr.push(ll1);
arr.push(ll2);



console.log(mergeKSorted(arr));


