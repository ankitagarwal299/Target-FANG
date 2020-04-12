/* 
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
Output: false
 */

var isPalindrome = function(s) {
    var strippedString = s.replace(/\W/g, '');
    var reversedString = strippedString.split('').reverse().join('');
    
    return strippedString.toLowerCase() == reversedString.toLowerCase();
};

console.log(`Length of LPS ---> ${isPalindrome("A man, a plan, a canal: Panama")}`);
console.log(`Length of LPS ---> ${isPalindrome("race a car")}`);
//-------------------To Find Palindrome any string ------------------------------

function isPalindrome(st, x, y) {
    while (x <= y) {
      if (st[x++] != st[y--]) {
        return false;
      }
    }
    return true;
  }

console.log(`Length of LPS ---> ${isPalindrome("abdbca", 0, "abdbca".length-1)}`);
console.log(`Length of LPS ---> ${isPalindrome("cddpd", 0, "cddpd".length-1)}`);
console.log(`Length of LPS ---> ${isPalindrome("pqr", 0, "pqr".length-1)}`);
console.log(`Length of LPS ---> ${isPalindrome("aba", 0, "aba".length-1)}`);

  