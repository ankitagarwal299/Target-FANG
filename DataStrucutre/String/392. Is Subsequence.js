var isSubsequence = function (s, t) {
  if (s === "") return true;

  let index = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] == s[index]) {
      index++;
    }

    if (index >= s.length) {
        return true;
    }
  }
  return false;
};

console.log(isSubsequence("abc", "ahbgdc"));
console.log(isSubsequence("axc", "ahbgdc"));
