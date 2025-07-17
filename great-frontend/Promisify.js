// Original promisify function
/**
 * @callback func
 * @returns Function
 */
export default function promisify(func) {
  return function fn(...args) {
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  };
}

// Example callback-style function
function addAsync(a, b, callback) {
  setTimeout(() => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return callback(new Error('Invalid input'));
    }
    callback(null, a + b);
  }, 100);
}

// Test the promisify function
const addPromise = promisify(addAsync);

// Run the test
addPromise(2, 3)
  .then(result => {
    console.log('Success:', result); // Should log: Success: 5
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Test with invalid input
addPromise(2, 'x')
  .then(result => {
    console.log('This should not log');
  })
  .catch(error => {
    console.error('Caught expected error:', error.message); // Should log an error message
  });
