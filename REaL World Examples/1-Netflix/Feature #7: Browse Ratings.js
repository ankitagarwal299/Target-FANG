//DIY: Min Stack vs DIY: Max Stack
/* 
1. Save Browsing history 
2. Back Button
3. Get Max from history
*/

//https://leetcode.com/problems/min-stack/discuss/1442907/Two-Methods-oror-Using-2-stacks-vs-Using-1-stack-oror-T%3A-O(1)-S%3A-O(N)

/* To get Maximum from current browsing history */
//SPACE : O(2N), TIME : O(1) - USING 2 Stacks
//716. Max Stack (leetcode)
class MyStack {
    constructor() {
        this.mainstack = new Stack();
        this.maxstack = new Stack();
    }

    push(value) {
        this.mainstack.push(value);
        if (this.maxstack.size() == 0 || this.maxstack.top() <= value) {// catch duplicate values
            this.maxstack.push(value);
        }
    }

    back() {
        if (this.mainstack.top() == this.maxstack.top()) {
            this.maxstack.pop();
        }
        return this.mainstack.pop();
    }

    getMax() {
        if (!this.maxstack.size() == 0) {
            return this.maxstack.top();
        }
    }
}

class Stack {
    constructor() {
        this.stack = [];
    }

    pop() {
        if (this.stack.length == 0) return;
        return this.stack.pop();
    }

    push(value) {
        this.stack.push(value);
    }

    size() {
        return this.stack.length - 1;
    }

    top() {
        return this.stack[this.stack.length - 1];
    }

}

//SPACE : O(2N), TIME : O(1) - USING 2 Stacks
//155. Min Stack (leetcode)
/* To get Minimum from current browsing history */
class MyStack {
    constructor() {
        this.mainstack = new Stack();
        this.minstack = new Stack();
    }

    push(value) {
        this.mainstack.push(value);
        if (this.minstack.size() == 0 || this.minstack.top() >= value) {//for duplicate values
            this.minstack.push(value);
        }
    }

    back() {
        if (this.minstack.top() == this.mainstack.top()) {
            this.minstack.pop();
        }
        return this.mainstack.pop();
    }

    getMin() {//TIME : O(1)
        return this.minstack.top();
    }
}



//OPTIMIZATION- //SPACE : O(N), TIME : O(1) - USING 1 Stacks
class MyStack {
    constructor() {
        this.mainstack = new Stack();
    }

    push(value) {
        if (this.mainstack.size() == 0) {
            this.mainstack.push({ min: value, value: value });
            return;
        }

        this.mainstack.push({
            min: (this.mainstack.top().min >= value) ? value : this.mainstack.top().min,
            value: value
        });
    }

    back() {
        return this.mainstack.pop().value;
    }

    getMin() {
        return this.mainstack.top().min;
    }
}

