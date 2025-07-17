let count = 0;
function sayHello(name) {
  console.log(`Hello, ${name}! Count: ${++count}`);
}


function debounce(callback, delay) {
  let timeoutId = null;

  return function fn(...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      callback.apply(this, args);
    }, delay);
  }
}

let debounced = debounce(sayHello, 1000);

debounced("1st call")
setTimeout(() => debounced("2nd call"), 200)
setTimeout(() => debounced("3rd call"), 400)
setTimeout(() => debounced("4th call"), 600);//Hello, 4th call! Count: 1
