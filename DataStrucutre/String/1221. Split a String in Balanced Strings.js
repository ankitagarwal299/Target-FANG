var balancedStringSplit = function (s) {
  if (s == null || s.length == 0 || s.length == 1) return 0;

  let balancedCount = 0;
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] == "L") count++;
    if (s[i] == "R") count--;

    if (count == 0) balancedCount++;
  }
  return balancedCount;
};

console.log(balancedStringSplit("RLRRLLRLRL"));

console.log(balancedStringSplit("RLLLLRRRLR"));

console.log(balancedStringSplit("LLLLRRRR"));

console.log(balancedStringSplit("RLRRRLLRLL"));

//Return the maximum amount of splitted balanced strings.

//https://www.youtube.com/watch?v=rnwmE9m9EMM&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=102
