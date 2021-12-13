//https://www.youtube.com/watch?v=1YQmI7F9dJ0

var longestCommonPrefix = function (arr) {
  let longestCommonPrefix = "";
  if (arr == null || arr.length == 0 || arr.length == 1)
    return longestCommonPrefix;

  let index = 0;
  for (let char of arr[0]) {
    for (let i = 1; i < arr.length; i++) {
      //out of bound
      if (index > arr[i].length || char != arr[i][index]) {
        return longestCommonPrefix;
      }
    }

    longestCommonPrefix += char;
    index++;
  }
  return longestCommonPrefix;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
