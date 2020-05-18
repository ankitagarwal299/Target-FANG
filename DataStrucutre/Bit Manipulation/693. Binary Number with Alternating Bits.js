var hasAlternatingBits = function (n) {
  let last = n % 2;
  n >>= 1; //shift bit

  while (n > 0) {
    let current = n % 2;
    if (current == last) {
      return false;
    }
    last = current;
    n >>= 1;
  }

  return true;
};

console.log(hasAlternatingBits(5));
console.log(hasAlternatingBits(11));
console.log(hasAlternatingBits(10));
