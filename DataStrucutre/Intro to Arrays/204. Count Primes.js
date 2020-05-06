//https://www.youtube.com/watch?v=UMVa5fRKC8I

var countPrimes = function (n) {
  if (n == 0 || n == 1) return 0;

  let primes = new Array(n).fill(true);
  for (let i = 0; i < n; i++) {
    primes[i] = true;
  }

  for (let i = 2; i * i < n; i++) {
    if (primes[i]) {
      for (let j = i; j * i < n; j++) {
        primes[j * i] = false;
      }
    }
  }

  let primeCount = 0;
  for (let i = 2; i < n; i++) {
    if (!primes[i]) primeCount++;
  }
};

console.log(countPrimes(10));
