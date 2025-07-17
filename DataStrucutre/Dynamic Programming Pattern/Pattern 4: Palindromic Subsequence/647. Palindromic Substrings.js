
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


//Another method Way 2

var countSubstrings = function (s) {
  let count = 0
  for (let i = 0; i < s.length; i++) {
     count  = count + expandOutwards(i, i, s);
     count  = count + expandOutwards(i, i + 1, s);
  }
  return count;
};

function expandOutwards(left, right, s){
  let count = 0;
  while(left >=0 && right< s.length && s[left] == s[right]){
      count++;

      left--
      right++
  }
  return count;
}