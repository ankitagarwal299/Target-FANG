//Many questions can be solved with similar approach
// Q1.1332. Remove Palindromic Subsequences to make it empty
// Q2. Given a string, find the minimum number of characters that we can remove to make it a palindrome.
// Q3. 1312. Minimum-Deletions Insertion Steps to Make a String Palindrome
// Q4. Minimum-Insertions Insertion Steps to Make a String Palindrome
/* Q5. 2. Find if a string is K-Palindromic 
Any string will be called K-palindromic if it can be transformed into a palindrome by removing at most ‘K’ characters from it.

This problem can easily be converted to our base problem of finding the minimum deletions in a string to make it a palindrome. 
If the “minimum deletion count” is not more than ‘K’, the string will be K-Palindromic. */





/* 
Problem Statement #
Given a string, find the minimum number of characters that we can remove to make it a palindrome.

Example 1:

Input: "abdbca"
Output: 1
Explanation: By removing "c", we get a palindrome "abdba".
Example 2:

Input: = "cddpd"
Output: 2
Explanation: Deleting "cp", we get a palindrome "ddd".
Example 3:

Input: = "pqr"
Output: 2
Explanation: We have to remove any two characters to get a palindrome, e.g. if we 
remove "pq", we get palindrome "r".
 */


/* 
Solution #
This problem can be easily converted to the Longest Palindromic Subsequence (LPS) problem. 
We can use the fact that LPS is the best subsequence we can have, so any character that is not part of LPS must be removed. 
Please note that it is ‘Longest Palindromic SubSequence’ and not ‘Longest Palindrome Substring’.
 FORMULA :  Minimum_deletions_to_make_palindrome = Length(st) - LPS(st)
 FORMULA :  Minimum_insertions_to_make_palindrome = Length(st) + LPS(st) */


 let findMinimumDeletions = function(st) {

    function findLPSLength(st) {
      // dp[i][j] stores the length of LPS from index 'i' to index 'j'
      var dp = Array(st.length).fill(0).map(() => Array(st.length).fill(0));
  
      // every sequence with one element is a palindrome of length 1
      for (let i = 0; i < st.length; i++)  dp[i][i] = 1;
      
  
      for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {

          // case 1: elements at the beginning and the end are the same
          if (st.charAt(startIndex) == st.charAt(endIndex)) {
            dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1];
          } else {
            // case 2: skip one element either from the beginning or the end
            dp[startIndex][endIndex] = Math.max( dp[startIndex + 1][endIndex], dp[startIndex][endIndex - 1] );
          }
        }
      }
      return dp[0][st.length - 1];
    }
  
    // subtracting the length of Longest Palindromic Subsequence from the length of
    // the input string to get minimum number of deletions
    return st.length - findLPSLength(st);
  };
  
  console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('abdbca'));
  console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('cddpd'));
  console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('pqr'));
  