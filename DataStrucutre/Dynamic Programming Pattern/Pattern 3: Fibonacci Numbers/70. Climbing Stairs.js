/* 
Problem Statement #
Given a stair with ‘n’ steps, implement a method to count how many possible ways are there to reach the top of the staircase, given that,
 at every step you can either take 1 step, 2 steps, or 3 steps.

Example 1:

Number of stairs (n) : 3
Number of ways = 4
Explanation: Following are the four ways we can climb : {1,1,1}, {1,2}, {2,1}, {3} 
Example 2:

Number of stairs (n) : 4
Number of ways = 7
Explanation: Following are the seven ways we can climb : {1,1,1,1}, {1,1,2}, {1,2,1}, {2,1,1}, 
{2,2}, {1,3}, {3,1}
 */

const CountWays = function (n) {
  const dp = [];

  function CountWaysRecursive(n) {
    if (n === 0) return 1; // base case, we don't need to take any step, so there is only one way

    if (n === 1) return 1; // we can take one step to reach the end, and that is the only way

    if (n === 2) return 2; // we can take one step twice or jump two steps to reach at the top

    if (typeof dp[n] == "undefined") {
      const step1 = CountWaysRecursive(n - 1);
      const step2 = CountWaysRecursive(n - 2);
      const step3 = CountWaysRecursive(n - 3);
      dp[n] = step1 + step2 + step3;
    }

    return dp[n];
  }

  return CountWaysRecursive(n);
};
console.log(`Number of ways: ---> ${CountWays(3)}`);
console.log(`Number of ways: ---> ${CountWays(4)}`);
console.log(`Number of ways: ---> ${CountWays(5)}`);
