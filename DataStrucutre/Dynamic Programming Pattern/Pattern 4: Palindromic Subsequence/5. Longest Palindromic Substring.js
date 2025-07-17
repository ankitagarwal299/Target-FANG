var longestPalindrome = function (s) {

  let longest = "";

  for (let i = 0; i < s.length; i++) {
      let current1 = expandFromCenter(i, i, s);//odd case
      let current2 = expandFromCenter(i, i + 1, s);//even case

      let longestParindrome = "";
      if (current1.length > current2.length) {
          longestParindrome = current1;
      } else {
          longestParindrome = current2;
      }

      if (longestParindrome.length > longest.length) {
          longest = longestParindrome;
      }
  }

  return longest;
}

function expandFromCenter(left, right, s) {
  while (left >= 0 && right < s.length && s[left] == s[right]) {
      //expand from center
      left--;
      right++
  }
  // slice the qualified substring from the second last iteration
  return s.substring(left + 1, right);
  //loop break after left and right pointer conditions are not matched
  //setting left pointer to previous one
  //right is correct as in javascript one less than right is considered
}