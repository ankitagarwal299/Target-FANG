/* Given a stream of inteers and a window size, calculate the moving average of all integers in the sliding window 

Example: 
Movingverage  m = new Movingverage(3);
m.next(1) = 1
m.next(10) = (1 + 10) /2
m.next(3) = (1 + 10 + 3) /3
m.next(5) = (10 + 3 + 5) /3
*/

class Movingverage {
  Movingverage(size) {
    const maxSize = size;
    let queue = [];
    let sum = 0;
  }

  next(value) {
    if (queue.length == maxSize) {
      let remove = queue.unshift();
      sum = sum - remove;
    }
    queue.push(value);
    sum = sum + value;
    return  sum / queue.length;
  }
}
