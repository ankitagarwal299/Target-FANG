//DIY: Validate Stack Sequences
//946. Validate Stack Sequences
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
    if (pushed.length != popped.length) return false;

    let stack = new Stack();

    let j = 0;
    for (let i = 0; i < pushed.length; i++) {
        stack.push(pushed[i]);

        while (stack.top() == popped[j] && stack.size() > 0) {//size check important to break going infinte loop
            stack.pop();
            j++
        }
    }

    return stack.size() == 0 ? true : false;
};

class Stack {
    constructor() {
        this.stack = [];
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

    push(value) {
        this.stack.push(value);
    }

    pop() {
        return this.stack.pop();
    }

    size() {
        return this.stack.length;
    }
}
