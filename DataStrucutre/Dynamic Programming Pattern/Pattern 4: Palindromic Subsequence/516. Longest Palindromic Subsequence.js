/* 

Given a sequence, find the length of its Longest Palindromic Subsequence (LPS). In a palindromic subsequence, elements read the same backward and forward.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

Example 1:

Input: "abdbca"
Output: 5
Explanation: LPS is "abdba".
Example 2:

Input: = "cddpd"
Output: 3
Explanation: LPS is "ddd".
Example 3:

Input: = "pqr"
Output: 1
Explanation: LPS could be "p", "q" or "r".

*/

//Top-down Dynamic Programming with Memoization #

let findLPSLength = function (st) {
  var dp = [];

  function findLPSLengthRecursive(st, startIndex, endIndex) {
    /* Base condition to stop */
    if (startIndex > endIndex) return 0;

    dp[startIndex] = dp[startIndex] || [];

    /* Sequence left with one element return 1 */
    if (startIndex === endIndex) return 1;

    /* Actial condition */
    if (typeof dp[startIndex][endIndex] == "undefined") {
      //step1: if element at start and end are same, add 2 and wait for next subsequence start+1 and end-1
      if (st[startIndex] == st[endIndex]) {
        dp[startIndex][endIndex] = 2 + findLPSLengthRecursive(st, startIndex + 1, endIndex - 1);
      } else {
        //step2: if element at start != end then recursively find  start+1 || end -1 and take maximum
        let sequence1 = findLPSLengthRecursive(st, startIndex + 1, endIndex);
        let sequence2 = findLPSLengthRecursive(st, startIndex, endIndex - 1);

        dp[startIndex][endIndex] = Math.max(sequence1, sequence2);
      }
    }

    return dp[startIndex][endIndex];
  }

  return findLPSLengthRecursive(st, 0, st.length - 1);
};

console.log("Length of LPS ---> " + findLPSLength("abdbca"));
console.log("Length of LPS ---> " + findLPSLength("cddpd"));
console.log("Length of LPS ---> " + findLPSLength("pqr"));

//Bottom-up Dynamic Programming #
let findLPSLength = function (st) {
  // dp[i][j] stores the length of LPS from index 'i' to index 'j'
  var dp = Array(st.length)
    .fill(0)
    .map(() => Array(st.length).fill(0));

  // every sequence with one element is a palindrome of length 1
  for (let i = 0; i < st.length; i++) {
    dp[i][i] = 1;
  }

  for (let startIndex = st.length - 1; startIndex >= 0; startIndex++) {
    for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
      // case 1: elements at the beginning and the end are the same
      if (st.charAt(startIndex) == st.charAt(endIndex)) {
        dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1];
      } else {
        // case 2: skip one element either from the beginning or the end
        dp[startIndex][endIndex] = Math.max( dp[startIndex + 1][endIndex],dp[startIndex][endIndex - 1]
        );
      }
    }
  }

  return dp[0][st.length - 1];
};

console.log("Length of LPS ---> " + findLPSLength("abdbca"));
console.log("Length of LPS ---> " + findLPSLength("cddpd"));
console.log("Length of LPS ---> " + findLPSLength("pqr"));
