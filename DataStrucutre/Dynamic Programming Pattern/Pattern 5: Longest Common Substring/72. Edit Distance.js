/* 
Problem Statement #
Given strings s1 and s2, we need to transform s1 into s2 by deleting, inserting, or replacing characters. Write a function to calculate the count of the minimum number of edit operations.

Example 1:

Input: s1 = "bat"
       s2 = "but"
Output: 1
Explanation: We just need to replace 'a' with 'u' to transform s1 to s2.
Example 2:

Input: s1 = "abdca"
       s2 = "cbda"
Output: 2
Explanation: We can replace first 'a' with 'c' and delete second 'c'.
Example 3:

Input: s1 = "passpot"
       s2 = "ppsspqrt"
Output: 3 
Explanation: Replace 'a' with 'p', 'o' with 'q', and insert 'r'.
 */


 /* 
 A basic brute-force solution could be to try all operations (one by one) on each character of s1. 
 We can iterate through s1 and s2 together. 
 Let’s assume index1 and index2 point to the current indexes of s1 and s2 respectively, so we have two options at every step:

STEP1:  If the strings have a matching character, we can recursively match for the remaining lengths.
STEP2:  If the strings don’t match, we start three new recursive calls representing the three edit operations. 
        Whichever recursive call returns the minimum count of operations will be our answer.
 */

const findMinOperations = function(s1, s2) {
    const dp = [];
  
    function findMinOperationsRecursive(s1, s2, i1, i2) {
      dp[i1] = dp[i1] || [];
      if (typeof dp[i1][i2] === 'undefined') {
        // if we have reached the end of s1, then we have to insert all the remaining characters of s2
        if (i1 === s1.length) dp[i1][i2] = s2.length - i2;
        // if we have reached the end of s2, then we have to delete all the remaining characters of s1
        else if (i2 === s2.length) dp[i1][i2] = s1.length - i1;
        // If the strings have a matching character, we can recursively match for the remaining lengths
        else if (s1[i1] === s2[i2]) dp[i1][i2] = findMinOperationsRecursive(s1, s2, i1 + 1, i2 + 1);
        else {
          const c1 = findMinOperationsRecursive(s1, s2, i1 + 1, i2); // delete
          const c2 = findMinOperationsRecursive(s1, s2, i1, i2 + 1); // insert
          const c3 = findMinOperationsRecursive(s1, s2, i1 + 1, i2 + 1); // replace
          dp[i1][i2] = 1 + Math.min(c1, Math.min(c2, c3));
        }
      }
  
      return dp[i1][i2];
    }
    return findMinOperationsRecursive(s1, s2, 0, 0);
  };
  
  console.log(`Minimum Edit Distance: ---> ${findMinOperations('bat', 'but')}`);
  console.log(`Minimum Edit Distance: ---> ${findMinOperations('abdca', 'cbda')}`);
  console.log(`Minimum Edit Distance: ---> ${findMinOperations('passpot', 'ppsspqrt')}`);
  
  