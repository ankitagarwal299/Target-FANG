//O(n) O(1)
function validPalindrome(s, left = 0, right = s.length - 1, removedChars = 0) {
  if (removedChars > 1) {
    return false;
  }

  while (left < right) {
    if (s[left] !== s[right]) {
      return (
        validPalindrome(s, left + 1, right, removedChars + 1) ||
        validPalindrome(s, left, right - 1, removedChars + 1)
      );
    }

    left++;
    right--;
  }

  return true;
}

//https://leetcode.com/problems/valid-palindrome-ii/discuss/423191/JavaScript-Solution-without-helper-function-less-memory-than-100-faster-than-70
//https://leetcode.com/problems/valid-palindrome-ii/discuss/391809/Java-Solutions-to-Valid-Palindrome-I-and-II-with-Explanation-(SubPalindrome-Iteration-and-Recursion)
// "abbbca"
/**
 * @param {string} s
 * @return {boolean}
 */
function validPalindrome(s) {
  if (!(s && s.length > 0)) return "";

  function validSub(s, left, right) {
    while (left < right) {
      if (s[left] != s[right]) {
        return false;
      }
      left += 1;
      right -= 1;

    }
    return true;
  }

  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    if (s[i] != s[j]) {
      if (validSub(s, i + 1, j)) return true;
      return validSub(s, i, j - 1);
    }
    i += 1;
    j -= 1;
  }
  return true;



}
/*   Time: O(N) since there are at most ~ 2N operations.
  Space: O(1) */

