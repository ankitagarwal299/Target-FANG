class Queue {
    enqueue(element) { }
    dequeue() { }
    size() { }
    peek() { }
}

class Stack {
    constructor() {
        this.queue1 = new Queue();
        this.queueResult = new Queue();
    }

    push(element) {
        if (this.queue1.size() == 0) return undefined;

        this.queue1.enqueue(element);
        while (this.queue1.size() > 1) {
            this.queueResult.enqueue(this.queue1.dequeue());
        }
    }

    pop() {
        if (this.queue1.size() == 0) return undefined;

        const element = this.queue1.dequeue();
        //swap if other queue is not empty
        if (this.queueResult.size() > 0) {
            [this.queue1, this.queueResult] = [this.queueResult, this.queue1];

            while (this.queue1.size > 1) {
                this.queueResult.enqueue(this.queue1.dequeue());
            }
        }

        return element;
    }
    size() {
        return this.queue1.size() + this.queueResult.size();
    }
    peek() {
        if (this.queue1.size() == 0) return undefined;

        return this.queue1.peek();
    }
}

