/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function(s) {
  if (s.length < 2) return s.length; // A string with one or no characters is always a palindrome.

  const cache = {};

  // Helper function to compute LPS using memoization
  function lps(i, j) {
      if (i > j) return 0; // Base case: No valid range

      if (i === j) return 1; // Base case: A single character is a palindrome of length 1

      const key = `${i}-${j}`; // Unique key for the substring (i, j)

      if (key in cache) return cache[key]; // Return cached result if available

      if (s[i] === s[j]) {
          // Characters match, so include them in the LPS
          cache[key] = 2 + lps(i + 1, j - 1);
      } else {
          // Characters do not match, try excluding one character and take the maximum LPS
          cache[key] = Math.max(lps(i + 1, j), lps(i, j - 1));
      }

      return cache[key];
  }

  // Total length of string minus LPS gives the minimum deletions required
  return lps(0, s.length - 1) ;
};