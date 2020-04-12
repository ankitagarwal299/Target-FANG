/* 
Problem Statement #
Given a string, we want to cut it into pieces such that each piece is a palindrome. 
Write a function to return the minimum number of cuts needed.

Example 1:
Input: "abdbca"
Output: 3
Explanation: Palindrome pieces are "a", "bdb", "c", "a".

Example 2:
Input: = "cddpd"
Output: 2
Explanation: Palindrome pieces are "c", "d", "dpd".

Example 3:
Input: = "pqr"
Output: 2
Explanation: Palindrome pieces are "p", "q", "r".

Example 4:
Input: = "pp"
Output: 0
Explanation: We do not need to cut, as "pp" is a palindrome.

*/

const findMPPCuts = function(st) {
    // isPalindrome[i][j] will be 'true' if the string from index 'i' to index 'j' is a palindrome
    const isPalindrome = Array(st.length).fill(false).map(() => Array(st.length).fill(false));
  
    // every string with one character is a palindrome
    for (let i = 0; i < st.length; i++)  isPalindrome[i][i] = true;
    
  
    // populate isPalindrome table
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
      for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
        if (st.charAt(startIndex) == st.charAt(endIndex)) {
          // if it's a two character string or if the remaining string is a palindrome too
          if (endIndex - startIndex == 1 || isPalindrome[startIndex + 1][endIndex - 1]) {
            isPalindrome[startIndex][endIndex] = true;
          }
        }
      }
    }
  
    // now lets populate the second table, every index in 'cuts' stores the minimum cuts needed
    // for the substring from that index till the end
    const cuts = Array(st.length).fill(0);
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
      let minCuts = st.length; // maximum cuts
      for (let endIndex = st.length - 1; endIndex >= startIndex; endIndex--) {
        if (isPalindrome[startIndex][endIndex]) {
          // we can cut here as we got a palindrome
          // also we dont need any cut if the whole substring is a palindrome
          minCuts = endIndex == st.length - 1 ? 0 : Math.min(minCuts, 1 + cuts[endIndex + 1]);
        }
      }
      cuts[startIndex] = minCuts;
    }
  
    return cuts[0];
  };
  
  console.log(`Minimum palindrome partitions ---> ${findMPPCuts('abdbca')}`);
  console.log(`Minimum palindrome partitions ---> ${findMPPCuts('cdpdd')}`);
  console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pqr')}`);
  console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pp')}`);
  console.log(`Minimum palindrome partitions ---> ${findMPPCuts('madam')}`);
