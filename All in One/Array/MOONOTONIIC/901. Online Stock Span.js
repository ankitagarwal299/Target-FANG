//https://www.youtube.com/watch?v=m4hvxzLoN_I
//find greater to left

//https://leetcode.com/problems/online-stock-span/discuss/1223721/Stack-JS-Solution
var StockSpanner = function () {
    this.stack = []
};

StockSpanner.prototype.next = function (price) {
    let currSpan = 1;
    while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
        currSpan = this.stack.pop()[1] + currSpan;
    }
    this.stack.push([price, currSpan]);
    return currSpan;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */