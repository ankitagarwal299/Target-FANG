//https://www.youtube.com/watch?v=20v8zSo2v18
function CountSubarraySumEqualsK(subarr, target) {
  let map = { 0: 1 };
  let count = 0;
  let sum = 0;

  for (let i = 0; i < subarr.length; i++) {
    sum = sum + subarr[i];

    let remSum = sum - target;

    if (map[remSum] != null) {
      count = count + map[remSum];
    }

    //subarray frequency
    if (map[sum] != null) {
      map[sum] = map[sum] + 1;
    } else {
      map[sum] = 1;
    }
  }
  return count;
}

console.log(CountSubarraySumEqualsK([3, 9, -2, 4, 1, -7, 2, 6, -5, 8, -3, -7, 6, 2, 1]));


//Good Understanding about prefix sum
//https://www.youtube.com/watch?v=tzDI7X8voT4
