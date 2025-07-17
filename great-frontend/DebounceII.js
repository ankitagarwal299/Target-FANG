let count = 0;
function sayHello(name) {
  console.log(`Hello, ${name}! Count: ${++count}`);
}


export default function debounce(func, wait) {
  let timeout = null;
  let args = null;
  let context = null;

  function cancel() {
    clearTimeout(timeout);
    timeout = null;
  }

  function flush() {
    if (timeout != null) {
      clearTimeout(timeout);
      timeout = null;
      func.apply(context, args);
    }
  }

  function fn(...incomingArgs) {
    args = incomingArgs;
    context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  }

  fn.cancel = cancel;
  fn.flush = flush;

  return fn;
}


let debouncedLog = debounce(sayHello, 1000);



// Simulate rapid calls
debouncedLog("first");
setTimeout(() => debouncedLog("second"), 200);
setTimeout(() => debouncedLog("third"), 400);

// Flush manually before timeout
setTimeout(() => {
  debouncedLog.flush(); // Should log "third"
}, 800);



// Cancel any future calls
setTimeout(() => {
  debouncedLog("fourth");
  debouncedLog.cancel(); // Should prevent "fourth" from logging
}, 1200);



