function setCancellableInterval(callback, delay, ...args) {
  const timerID = setInterval(() => {
    callback(...args);
  }, delay);

  return function cancel() {
    clearInterval(timerID);
  };
}


let count = 0;

function sayHello(name) {
  console.log(`Hello, ${name}! Count: ${++count}`);
}

const cancel = setCancellableInterval(sayHello, 1000, 'Alice');

// Cancel after 3.5 seconds
setTimeout(() => {
  cancel();
  console.log('Interval cancelled.');
}, 3500);

// Expected output:
// Hello, Alice! Count: 1
// Hello, Alice! Count: 2
// Hello, Alice! Count: 3
// Interval cancelled.
