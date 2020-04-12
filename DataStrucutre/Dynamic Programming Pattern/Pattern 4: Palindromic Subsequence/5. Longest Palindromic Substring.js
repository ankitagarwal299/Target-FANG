/* 
Problem Statement #
Given a string, find the length of its Longest Palindromic Substring (LPS). In a palindromic string, elements read the same backward and forward.

Example 1:

Input: "abdbca"
Output: 3
Explanation: LPS is "bdb".
Example 2:

Input: = "cddpd"
Output: 3
Explanation: LPS is "dpd".
Example 3:

Input: = "pqr"
Output: 1
Explanation: LPS could be "p", "q" or "r".

This problem follows the Longest Palindromic Subsequence pattern. The only difference is that in a palindromic subsequence characters can be non-adjacent, 
whereas in a substring all characters should form a palindrome. 
 */

let findLPSLength = function (st) {
  const dp = [];

  function findLPSLengthRecursive(st, startIndex, endIndex) {
    if (startIndex > endIndex) return 0;

    // every string with one character is a palindrome
    if (startIndex === endIndex) return 1;

    dp[startIndex] = dp[startIndex] || [];

    if (typeof dp[startIndex][endIndex] === "undefined") {
      // case 1: elements at the beginning and the end are the same
      if (st[startIndex] == st[endIndex]) {
        //check if remaining string is also palindrome
        const remaining = endIndex - startIndex - 1;
        if ( remaining == findLPSLengthRecursive(st, startIndex + 1, endIndex - 1) ) {
          dp[startIndex][endIndex] = 2 + remaining;
          return dp[startIndex][endIndex];
        }
      }

      let sequence1 = findLPSLengthRecursive(st, startIndex + 1, endIndex);
      let sequence2 = findLPSLengthRecursive(st, startIndex, endIndex - 1);

      dp[startIndex][endIndex] = Math.max(sequence1, sequence2);
    }

    return dp[startIndex][endIndex];
  }

  return findLPSLengthRecursive(st, 0, st.length - 1);
};

console.log(`Length of LPS ---> ${findLPSLength("abdbca")}`);
console.log(`Length of LPS ---> ${findLPSLength("cddpd")}`);
console.log(`Length of LPS ---> ${findLPSLength("pqr")}`);

console.log(`Length of LPS ---> ${findLPSLength("abdbca")}`);
console.log(`Length of LPS ---> ${findLPSLength("cddpd")}`);
console.log(`Length of LPS ---> ${findLPSLength("pqr")}`);








//Bottom-up Dynamic Programming #

let findLPSLength = function (st) {

  // dp[i][j] will be 'true' if the string from index 'i' to index 'j' is a palindrome
  const dp = Array(st.length).fill(0).map(() => Array(st.length).fill(0));



  // every string with one character is a palindrome
  for (let i = 0; i < st.length; i++)  dp[i][i] = true;
  

  let maxLength = 1;
  for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
    for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
      
      if (st.charAt(startIndex) == st.charAt(endIndex)) {
        //if its a two character string or if the remaining string is palindrome
        if (endIndex - startIndex == 1 || dp[startIndex + 1][endIndex - 1]) {
            dp[startIndex ][endIndex ] = true;
            maxLength = Math.max(maxLength, endIndex-startIndex+1)
        }
      }
    }
  }

  return maxLength;
};

console.log(`Length of LPS ---> ${findLPSLength("abdbca")}`);
console.log(`Length of LPS ---> ${findLPSLength("cddpd")}`);
console.log(`Length of LPS ---> ${findLPSLength("pqr")}`);
