var reverseVowels = function (arr) {
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i++;
    j--;
  }

  return arr;
};

console.log(reverseVowels(["H", "a", "n", "n", "a", "h"]));
