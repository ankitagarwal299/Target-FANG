class Stack {
    push(elem) //add elem to stack
    pop()// remove top elem in stack
    peek()// get top elem in stsack
    size()// length of stack
}
//[] [4,3,2,1]
class Queue {
    constructor() {
        this.pushStack = new Stack();
        this.popStack = new Stack();
    }

    _move() {
        while (this.pushStack.size() > 0) {
            this.popStack.push(this.pushStack.pop());
        }
    }
    enqueue(element) {
        this.pushStack.push(element);
    }
    peek() {
        if (this.popStack.size() > 0) {
            return this.popStack.peek();
        }

        if (this.pushStack.size() > 0) {
            this._move();
            return this.popStack.peek();
        }

        return null;
    }
    size() {
        return this.pushStack.size() + this.popStack.size();
    }
    dequeue() {
        if (this.popStack.size() > 0) {
            return this.popStack.pop();
        }

        if (this.pushStack.size() > 0) {
            this._move();
            return this.popStack.pop();
        }
        return null;
    }
}