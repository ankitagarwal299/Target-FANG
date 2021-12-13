class Node {
    constructor(val, arrInd, elmInd) {
        this.val = val;
        this.arrInd = arrInd;
        this.elmInd = elmInd;
    }
}


///Most efficient
//Solution 3: pout only 1 element from each lists and then heapify , then remove one and add another from the removed item
//O (n * K log K )
//we need to make use of list is sorted
var mergeKLists = function (arrays) {
    let result = [];
    if (arrays == null || arrays.length < 2) return arrays;

    let comparator = ((a, b) => a.val - b.val);
    let minHeap = new PriorityQueue(comparator);

    for (let i = 0; i < arrays.length; i++) {
        minHeap.add(new Node(arrays[i][0], i, 0));
    }

    while (minHeap.size() > 0) {
        let topItem = minHeap.poll();
        result.push(topItem);

        let currArray = arrays[topItem.arrInd];
        if (topItem.elmInd + 1 < currArray.length) {
            minHeap.add(new Node(currArray[topItem.elmInd + 1], topItem.arrInd, topItem.elmInd + 1));
        }
    }

}

console.log(mergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]]));
