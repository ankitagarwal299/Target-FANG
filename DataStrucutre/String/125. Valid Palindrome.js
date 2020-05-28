
//https://www.youtube.com/watch?v=3RQ5ADUKHsY&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=40
//Solution3:128ms 100% JavaScript solution----> Best Solution
var isPalindrome = function (input) {
  var start = 0;
  var end = input.length - 1;
  while (start < end) {
    var s = input.charCodeAt(start);
    var e = input.charCodeAt(end);

    if (!isLetter(s)) {
      start++;
      continue;
    }
    if (!isLetter(e)) {
      end--;
      continue;
    }

    if (toLowerCase(s) !== toLowerCase(e)) {
      return false;
    }
    start++;
    end--;
  }
  return true;
};

var isLetter = function (code) {
  if (
    (code >= 48 && code <= 57) || // numbers
    (code >= 65 && code <= 90) || // uppercase
    (code >= 97 && code <= 122)
  ) {
    // lowercase
    return true;
  } else {
    return false;
  }
};

var toLowerCase = function (code) {
  if (code >= 65 && code <= 90) {
    return code + 32;
  } else {
    return code;
  }
};



//Using regex:shortest
var isPalindrome = function (s) {
  var strippedString = s.replace(/\W/g, "");
  var reversedString = strippedString.split("").reverse().join("");

  return strippedString.toLowerCase() == reversedString.toLowerCase();
};

console.log(`Length of LPS ---> ${isPalindrome("A man, a plan, a canal: Panama")}`);
console.log(`Length of LPS ---> ${isPalindrome("race a car")}`);






//Solution2: Only for 
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
console.log(isPalindrome("A man, a plan, a canal: Panama"));//this case will fail in this way



  