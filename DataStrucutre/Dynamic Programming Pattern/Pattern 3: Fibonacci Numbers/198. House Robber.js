/* 

Problem Statement #
Given a number array representing the wealth of ‘n’ houses, 
determine the maximum amount of money the thief can steal without alerting the security system.

Example 1:

Input: {2, 5, 1, 3, 6, 2, 4}
Output: 15
Explanation: The thief should steal from houses 5 + 6 + 4
Example 2:

Input: {2, 10, 14, 8, 1}
Output: 18
Explanation: The thief should steal from houses 10 + 8
*/

/* Recursive

For every house ‘i’, we have two options:

Step 1: Steal from the current house (‘i’), skip one and steal from (‘i+2’).
Step 2: Skip the current house (‘i’), and steal from the adjacent house (‘i+1’)
 */

//Basic Solution #
const findMaxSteal = function (wealth) {
  function findMaxStealRecursive(wealth, currentIndex) {
    if (currentIndex >= wealth.length) return 0;

    // steal from current house and skip one to steal from the next house
    const stealCurrent =
      wealth[currentIndex] + findMaxStealRecursive(wealth, currentIndex + 2);
    // skip current house to steel from the adjacent house
    const skipCurrent = findMaxStealRecursive(wealth, currentIndex + 1);

    return Math.max(stealCurrent, skipCurrent);
  }
  return findMaxStealRecursive(wealth, 0);
};

console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);






//Top-down Dynamic Programming with Memoization 

function findMaxSteal(wealth) {
    const dp = [];
  
    function findMaxStealRecursively(wealth, currentIndex) {
      //base case
      if (currentIndex >= wealth.length) return 0;
  
      if (typeof dp[currentIndex] == "undefined") {
        //step1: steal from the current house and skip one to steel from the next house
        const stealCurrent = wealth[currentIndex] + findMaxStealRecursively(wealth,currentIndex + 2);
  
        //Step2: skip the current house and steal from the adjacent house
        const skipCurrent = findMaxStealRecursively(wealth, currentIndex + 1);
  
        dp[currentIndex] = Math.max(stealCurrent, skipCurrent);
      }
  
      return dp[currentIndex];
    }
  
    return findMaxStealRecursively(wealth, 0);
  }
  
  console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
  console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);
