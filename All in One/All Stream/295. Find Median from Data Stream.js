var MedianFinder = function () {
    this.left = new PriorityQueue((a, b) => b - a);
    this.right = new PriorityQueue((a, b) => a - b);
};

MedianFinder.prototype.addNum = function (num) {
    if (this.right != 0 && num > this.right.peek()) {
        this.right.add(num);
    } else {
        this.left.add(num);
    }

    //balancing
    if (this.left.size() - this.right.size() == 2) {
        this.right.add(this.left.poll());
    } else if (this.left.size() < this.right.size()) {
        this.left.add(this.right.poll());
    }
};

MedianFinder.prototype.findMedian = function () {
    if (this.left.size() + this.right.size() == 0) return null;

    //even numbers in both containers
    if (this.left.size() == this.right.size()) {
        return (this.left.peek() + this.right.peek()) / 2;
    } else {
        return this.left.peek();
    }

};

MedianFinder.prototype.remove = function () {
    if (this.left.size() + this.right.size() == 0) return null;

    if (this.left.size() >= this.right.size()) {
        return this.left.poll();
    } else {
        return this.right.poll();
    }

};
//https://www.youtube.com/watch?v=dshWERdcAdg
//Pepcoding
//DIY: Find Median from a Data Stream