/* 
Problem Statement #
Given a string, find the total number of palindromic substrings in it. Please note we need to find the total number of substrings and not subsequences.

Example 1:
Input: "abdbca"
Output: 7
Explanation: Here are the palindromic substrings, "a", "b", "d", "b", "c", "a", "bdb".

Example 2:
Input: = "cddpd"
Output: 7
Explanation: Here are the palindromic substrings, "c", "d", "d", "p", "d", "dd", "dpd".

Example 3:
Input: = "pqr"
Output: 3
Explanation: Here are the palindromic substrings,"p", "q", "r".


Example 4:
Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

*/

let findCPS = function (st) {
  // dp[i][j] will be 'true' if the string from index 'i' to index 'j' is a palindrome
  var dp = Array(st.length).fill(false).map(() => Array(st.length).fill(false));

  let count = 0;

  // every string with one character is a palindrome
  for (let i = 0; i < st.length; i++) {
    dp[i][i] = true;
    count++;
  }

  for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
    for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
      if (st.charAt(startIndex) == st.charAt(endIndex)) {
        // if it's a two character string or if the remaining string is a palindrome too
        if (endIndex - startIndex == 1 || dp[startIndex + 1][endIndex - 1]) {
          dp[startIndex][endIndex] = true;
          count++;
        }
      }
    }
  }

  return count;
};

console.log('Length of LPS: ---> ' + findCPS('abdbca'));
console.log('Length of LPS: ---> ' + findCPS('cddpd'));
console.log('Length of LPS: ---> ' + findCPS('pqr'));
//https://www.youtube.com/watch?v=XmSOWnL6T_I&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=7



//647. Palindromic Substrings
//https://www.youtube.com/watch?v=XmSOWnL6T_I&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=16
var countSubstrings = function (s) {
  let count = 0;

  let dp = new Array(s.length).fill(false).map(_ => new Array(s.length).fill(false));


  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
    count++;
  }

  for (let starIndex = s.length - 1; starIndex >= 0; starIndex--) {
    for (let endIndex = starIndex + 1; endIndex <= s.length; endIndex++) {
      //check chars star and end 
      if (s[starIndex] == s[endIndex]) {

        //if same then check rest of the string if it is more than 2
        if (endIndex - starIndex == 1 || dp[starIndex + 1][endIndex - 1] == true) {
          dp[starIndex][endIndex] = true;
          count++;
        }

      }
    }
  }
  return count;
};
