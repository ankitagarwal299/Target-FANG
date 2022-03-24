class Movingverage {
    constructor(size) {
        this.queue = [];
        this.windowSize = size;
        this.sum = 0.0;
    }

    add(num) {
        if (this.windowSize == this.queue.length) {
            this.sum -= this.queue.unshift();
        }
        this.queue.push(num);
        sum += num;

        return this.sum / this.windowSize;
    }

}


/*
    Example:
    Movingverage  m = new Movingverage(3);
    m.next(1) = 1
    m.next(10) = (1 + 10) /2
    m.next(3) = (1 + 10 + 3) /3
    m.next(5) = (10 + 3 + 5) /3
*/