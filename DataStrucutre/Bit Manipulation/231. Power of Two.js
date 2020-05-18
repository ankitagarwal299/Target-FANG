var isPowerOfTwo = function (n) {
  if (n == null || n == 0) return false;

  let i = 1;
  while (i < n) {
    i = i * 2;
  }

  return i == n 
};

console.log(isPowerOfTwo(16));
