
let count = 0;

function sayHello(name) {
  console.log(`Hello, ${name}! Count: ${++count}`);
}

function debounce(callback, delay) {
  let timeoutId = null;

  return function fn(...args) {

    // cancel any pending execution
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }


    timeoutId = setTimeout(() => {

      callback.apply(this, args)

      // optional: set to null so you can detect "no pending"
      timeoutId = null;

    }, delay)

  }
}

const debounced = debounce(sayHello, 1000)

debounced("1st call")

setTimeout(() => {
  debounced("2nd call")
}, 200);

setTimeout(() => {
  debounced("3 call")
}, 300);

setTimeout(() => {
  debounced("4 call")
}, 600);//Hello, 4th call! Count: 1