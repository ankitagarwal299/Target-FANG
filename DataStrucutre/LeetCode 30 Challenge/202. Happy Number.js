/* Write an algorithm to determine if a number is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

Example: 

Input: 19
Output: true
Explanation: 
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1 


Example 2:

Input: 12   
Output: false (12 is not a happy number)  
Explanations: Here are the steps to find out that 12 is not a happy number:
*/

var isHappy = function (n) {
  var seen = {};
  while (n != 1 && !seen[n]) {
    seen[n] = true;
    n = findSquare(n);
  }
  return n == 1 ? true : false;
};

function findSquare(n) {
  let sum = 0;

  while (n > 0) {
    remainder = n % 10;
    sum = sum + remainder * remainder;
    n = Math.floor(n / 10);
  }

  return sum;
}

console.log(isHappy(12));






//fast and slow pointer not using hash map Ologn

var isHappy = function (n) {
  let slow=
    fast = num;

  while (true) {
     slow = findSquare(slow);
     fast = findSquare(findSquare(fast));

    if (slow==fast) break;// found the cycle
  }

  return slow==1;// see if the cycle is stuck on the number '1'
};

console.log(isHappy(12));






//using reduce function in calculating sum of squares of digits

var isHappy = function (n) {
    var seen = {};
    while (n != 1 && !seen[n]) {
      seen[n] = true;
      n = findSquare(n);
    }
    return n == 1 ? true : false;
  };
  
  function findSquare(n) {
    return numString.toString().split('').reduce(function(sum, num) {
        return sum + Math.pow(num, 2);
    }, 0);
  }
  
  console.log(isHappy(12));
