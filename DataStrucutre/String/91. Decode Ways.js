//https://www.youtube.com/watch?v=cQX3yHS0cLo&list=PLi9RQVmJD2favxCtUriAN3VQtOwbl4izA&index=11

var numDecodings = function (s) {
  let dp = Array(s.length + 1);

  //base case
  dp[0] = 1;
  dp[1] = s.charAt(0) == "0" ? 0 : 1;

  for (let i = 2; i <= s.length; i++) {
    let oneDigit = Number(s.substring(i - 1, i));
    let twoDigit = NUmber(s.substring(i - 2, i));

    if (oneDigit >= 1){
        dp[i] = dp[i] + dp[i-1];
    }

    if(twoDigit >= 10 && twoDigit <= 26){
        dp[i] = dp[i] + dp[i-2]
    }
  }

  return dp[s.length];
};

console.log(numDecodings("12"));

/* 
A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
Given a non-empty string containing only digits, determine the total number of ways to decode it.

Example 1:

Input: "12"
Output: 2
Explanation: It could be decoded as "AB" (1 2) or "L" (12).
Example 2:

Input: "226"
Output: 3
Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).*/
