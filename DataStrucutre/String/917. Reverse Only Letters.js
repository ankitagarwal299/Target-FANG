//https://www.youtube.com/watch?v=qVADz0khbH0&t=110s

function isLetter(charCode) {
  if (
    (charCode >= 65 && charCode <= 90) ||
    (charCode >= 97 && charCode <= 122)
  ) {
    return true;
  }
}

var reverseOnlyLetters = function (str) {
  if (str == null || str.length == 0) return "";

  let char = str.split("");

  let i = 0;
  let j = char.length - 1;

  while (i < j) {
    while (i < j && !isLetter(char[i].charCodeAt())) {
      i++;
    }

    while (i < j && !isLetter(char[j].charCodeAt())) {
      j--;
    }

    [char[i], char[j]] = [char[j], char[i]];
    i++;
    j--;
  }

  return char.join("");
};

console.log(reverseOnlyLetters("Test1ng-Leet=code-Q!"));
