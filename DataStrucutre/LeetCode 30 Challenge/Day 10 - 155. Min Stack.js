/* 
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.
 
*/

var MinStack = function () {
  this.elements = [];
};

MinStack.prototype.push = function (item) {
  this.elements.push({
    value: item,
    min: this.elements.length == 0 ? item : Math.min(item, this.getMin()),
  });
};

MinStack.prototype.pop = function () {
  return this.elements.pop();
};

MinStack.prototype.top = function () {
  return this.elements[this.elements.length - 1].value;
};

MinStack.prototype.getMin = function () {
  return this.elements[this.elements.length - 1].min;
};

// Your MinStack object will be instantiated and called
var minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack);
console.log(minStack.getMin()); //--> Returns - 3.

console.log("popopopo", minStack.pop());
console.log(minStack);

console.log(minStack.top()); //--> Returns 0.
console.log(minStack);

console.log(minStack.getMin()); //--> Returns - 2.


// ES6 code
class MinStack {
  constructor() {
    this.elements = [];
  }

  pop() {
    this.elements.pop();
  }

  push(item) {
    this.elements.push({
      value: item,
      min: this.elements.length == 0 ? item : Math.min(item, this.getMin()),
    });
  }

  top() {
    return this.elements[this.elements.length - 1].value;
  }

  getMin() {
    return this.elements[this.elements.length - 1].min;
  }
}
