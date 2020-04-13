/* 
Problem Statement #
Given two sequences ‘s1’ and ‘s2’, write a method to find the length of the shortest sequence which has ‘s1’ and ‘s2’ as subsequences.

Example 2:

Input: s1: "abcf" s2:"bdcf" 
Output: 5
Explanation: The shortest common super-sequence (SCS) is "abdcf". 
Example 2:

Input: s1: "dynamic" s2:"programming" 
Output: 15
Explanation: The SCS is "dynprogrammicng". 
 */



/* 
 We can process both of the sequences one character at a time, so at any step we must choose between:

1. If the sequences have a matching character, we can skip one character from both the sequences and make a recursive call for the
 remaining lengths to get SCS.
2. If the strings don’t match, we start two new recursive calls by skipping one character separately from each string. 
The minimum of these two recursive calls will have our answer.
 */


const findSCSLength = function(s1, s2) {
    function findSCSLengthRecursive(s1, s2, i1, i2) {
      // if we have reached the end of a string, return the remaining length of the other string, as in
      // this case we have to take all of the remaing other string
      if (i1 === s1.length) return s2.length - i2;
      if (i2 === s2.length) return s1.length - i1;
  
      if (s1[i1] === s2[i2]) return 1 + findSCSLengthRecursive(s1, s2, i1 + 1, i2 + 1);
  
      let length1 = 1 + findSCSLengthRecursive(s1, s2, i1, i2 + 1);
      let length2 = 1 + findSCSLengthRecursive(s1, s2, i1 + 1, i2);
  
      return Math.min(length1, length2);
    }
    return findSCSLengthRecursive(s1, s2, 0, 0);
  };
  
  console.log( `Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('abcf', 'bdcf')}`);
  console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('dynamic','programming')}`);
  