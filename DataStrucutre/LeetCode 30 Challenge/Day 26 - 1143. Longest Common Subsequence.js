/* 
Problem Statement #
Given two strings ‘s1’ and ‘s2’, find the length of the longest subsequence which is common in both the strings.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.
Example 1:

Input: s1 = "abdca"
       s2 = "cbda"
Output: 3
Explanation: The longest common subsequence is "bda".
Example 2:

Input: s1 = "passport"
       s2 = "ppsspt"
Output: 5
Explanation: The longest common subsequence is "psspt".
 */

const findLCSLength = function(s1, s2) {
    const dp = Array(s1.length + 1)
      .fill(0)
      .map(() => Array(s2.length + 1).fill(0));
  
    let maxLength = 0;
    for (let i = 1; i <= s1.length; i++) {
      for (let j = 1; j <= s2.length; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
  
        maxLength = Math.max(maxLength, dp[i][j]);
      }
    }
    return maxLength;
  };
  
  console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('abdca', 'cbda')}`);
  console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('passport', 'ppsspt')}`);
  