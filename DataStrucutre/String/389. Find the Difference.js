var findTheDifference = function (s, t) {
  let hashMap = new Map();

  for (let char in s) {
    if (hashMap.has(char)) {
      hashMap.set(char, hashMap.get(char) + 1);
    } else {
      hashMap.set(char, 1);
    }
  }

  for (let char in t) {
    if ((hashMap.has(char) && hashMap.get(char) == 0) || !hashMap.has(char)) {
      return char;
    } else {
      hashMap.set(char, hashMap.get(char) - 1);
    }
  }

  return "!";
}

console.log(findTheDifference("abcd", "abcde"));
