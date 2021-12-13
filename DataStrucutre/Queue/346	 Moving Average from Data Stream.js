/* Given a stream of inteers and a window size, calculate the moving average of all integers in the sliding window 

Example: 
Movingverage  m = new Movingverage(3);
m.next(1) = 1
m.next(10) = (1 + 10) /2
m.next(3) = (1 + 10 + 3) /3
m.next(5) = (10 + 3 + 5) /3
*/

class Movingverage {
  maxSize
  queue = [];
  sum = 0;
  Movingverage(size) {
    this.maxSize = size;
  }

  next(value) {
    if (queue.length == this.maxSize) {
      let remove = this.queue.unshift();
      this.sum = this.sum - remove;
    }
    this.queue.push(value);
    this.sum = this.sum + value;
    return this.sum / this.queue.length;
  }
}
