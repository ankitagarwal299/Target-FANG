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
function validPalindrome(s) {
  let n = s.length();
  for (let i = 0; i < n / 2; ++i) {
    let left = i,
      right = n - i - 1;
    if (s.charAt(left) != s.charAt(right)) {// give a last chance
      // delete char at left
      if (validSubPalindrome(s, left + 1, right)) return true;
      // delete char at right
      return validSubPalindrome(s, left, right - 1);
    }
  }
  return true;
}

function validSubPalindrome(st, lo, hi) {
  let x = lo;
  let y = hi;
  while (x <= y) {
    if (st[x++] != st[y--]) {
      return false;
    }
  }
  return true;
}
/*   Time: O(N) since there are at most ~ 2N operations.
  Space: O(1) */
  
  