    // <button id="btn">Click me fast!</button>


const btn = document.getElementById('btn');

function onClick() {
  console.log('Handled at', new Date().toLocaleTimeString());
}

function throttle(callback, wait) {
  let shouldthrottle = false;

  return function fn(...args) {
    if (shouldthrottle) {
      return;
    }

    shouldthrottle = true;


    callback.apply(this, args)

    setTimeout(function () {
      shouldthrottle = false;
    }, wait)


  }
}

const throttledClick = throttle(onClick, 10000);
btn.addEventListener('click', throttledClick);
