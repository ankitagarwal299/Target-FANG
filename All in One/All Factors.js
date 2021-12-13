function factorPairsRecusrsive(n) {
    let result = [];

    function helper(i) {
        //break condition
        if (i > Math.sqrt(n)) return result;

        //base condition
        if (n % i == 0) {
            let quotient = n / i;
            result.push(i + '*' + quotient);
        }
        return helper(i + 1);
    }
    return helper(1);
}//[1*12,2*6,3*4]


function factorAllFactorsRecusrsiveOptimized(n) {
    let result = [1, n];

    function helper(i) {
        //break condition
        if (i > n / 2) return result;

        //base condition
        if (n % i == 0) {
            result.push(i);
        }
        return helper(i + 1);
    }
    return helper(2);
}

console.log(factorAllFactorsRecusrsive(12));//[1,2,3,4,6,12]
console.log(factorAllFactorsRecusrsive(36));


//Time : NloglogN - learn
//Sieve of Eratosthenes - Optimized Approach - Kevin
//https://www.youtube.com/watch?v=UMVa5fRKC8I&t=328s
function primeNumbers(N) {
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
console.log(primeNumbers(15));


//https://www.youtube.com/watch?v=6PDtgHhpCHo
function primeFactorization(number) {
    let primes = [];
    for (let i = 2; i <= number; i++) {
        while (number % i == 0) {
            primes.push(i);
            number = number / i;
        }
    }
    return primes;
}


function primeFactorization(number) {
    let primes = [];

    function helper(i, number) {
        if (i <= number / 2) {
            return primes;
        }

        if (number % i == 0) {
            primes.push(i);
        } else {
            i += 1;
        }

        helper(i, number);
    }
    return helper(2, number);

}
console.log(primeFactorization(17));//[17]
console.log(primeFactorization(44));//[2, 2, 11]


function primeFactorizationRecursive(number) {
    let primes = [];

    function helper(i, number) {
        if (i > number) {
            return primes;
        }

        if (number % i == 0) {
            primes.push(i);
            number = number / i
        } else {
            i += 1;
        }

        return helper(i, number);
    }

    helper(2, number);
    return primes;

}
console.log(primeFactorizationRecursive(17));//[17]
console.log(primeFactorizationRecursive(44));//[2, 2, 11]
