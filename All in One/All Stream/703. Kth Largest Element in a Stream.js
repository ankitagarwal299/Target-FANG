var KthLargest = function (k, nums) {
    this.k = k;

    let comparator = ((a, b) => a - b);
    this.minHeap = new PriorityQueue(comparator);

    for (let i = 0; i < nums.length; i++) {
        this.minHeap.add(nums[i]);

        if (this.minHeap.size() > this.k) {
            this.minHeap.poll();
        }
    }
};

KthLargest.prototype.add = function (val) {
    this.minHeap.add(val);

    if (this.minHeap.size() > this.k) {
        this.minHeap.poll();
    }

    return this.minHeap.peek();
};