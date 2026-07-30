

 <input type="text" name="search" id="search"></input>

let count = 0;

// function sayHello(name) {
//   console.log(`Hello, ${name}! Count: ${++count}`);
// }

function sayHello(e) {
  console.log(`Hello, ${e.target.value}! Count: ${++count}`);
}

function debounce(callback, delay) {
  let timeoutId = null;

  return function debouncedFn(...args) {
    // preserve `this` for methods called via obj.method()
    const context = this;

    // cancel any pending execution
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // schedule a new execution
    timeoutId = setTimeout(() => {
      // run with original `this` and args
      callback.apply(context, args);
      // optional: set to null so you can detect "no pending"
      timeoutId = null;
    }, delay);
  };
}

const debounced = debounce(sayHello, 1000);

const search = document.getElementById('search')
search.addEventListener('input', debounce(sayHello, 1000))
