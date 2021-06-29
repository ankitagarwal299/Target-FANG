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

const findMinOperations = function (s1, s2) {
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


/**
* @param {string} word1
* @param {string} word2
* @return {number}
*/
var editDistance = function (word1, word2) {
  let dp = new Array(word1.length + 1).fill(0).map(_ => new Array(word2.length + 1).fill(0));
  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = i
  }

  for (let i = 0; i < dp[0].length; i++) {
    dp[0][i] = i
  }

  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]);
      }
    }
  }
  console.log(dp);
  printActualEdits(dp, word1, word2)
  return dp[word1.length][word2.length];

};
console.log(editDistance("horse", "ros"));//3



function printActualEdits(dp, str1, str2) {
  let i = dp.length - 1;
  let j = dp[0].length - 1;

  while (true) {
    if (i == 0 || j == 0) {
      break;
    }
    if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
      i = i - 1;
      j = j - 1;
    } else if (dp[i][j] == dp[i - 1][j - 1] + 1) {
      console.log("Edit " + str2.charAt(j - 1) + " in string2 to " + str1.charAt(i - 1) + " in string1");
      i = i - 1;
      j = j - 1;
    } else if (dp[i][j] == dp[i - 1][j] + 1) {
      console.log("Delete in string1 " + str1.charAt(i - 1));
      i = i - 1;
    } else if (dp[i][j] == dp[i][j - 1] + 1) {
      System.out.println("Delete in string2 " + str2.charAt(j - 1));
      j = j - 1;
    }
  }
}

