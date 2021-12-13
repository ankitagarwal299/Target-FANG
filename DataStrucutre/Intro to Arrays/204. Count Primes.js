
//Time : NloglogN - learn
//Sieve of Eratosthenes - Optimized Approach - Kevin
//https://www.youtube.com/watch?v=UMVa5fRKC8I&t=328s
function countPrimes(N) {
  let primes = new Array(N + 1).fill(true);//initially assuming all are primes

  primes[0] = false;//prime number starts from 2
  primes[1] = false;
  for (let i = 2; i <= Math.sqrt(N); i++) {
    if (primes[i]) {
      //starting from 2 all the multiples of primes numbers are not prime; settiing all nonprimes to false
      for (let j = i; i * j <= N; j++) {
        primes[i * j] = false;
      }
    }
  }
  console.log(primes);


  let final = primes.map((val, index) => {
    if (val) {
      return index;//modify arr from boolean to actual indexes to find out what numbers are prime //[undefined, undefined, 2, 3, undefined, 5, undefined, 7, undefined, undefined, undefined, 11, undefined, 13, undefined, undefined]
    }
  }).filter(val => val);

  return final;//[2, 3, 5, 7, 11, 13]
}
console.log(countPrimes(15));