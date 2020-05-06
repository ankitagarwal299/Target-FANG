//https://www.youtube.com/watch?v=gWqbmAS3uxg
var canConstruct = function (ransomNote, magazine) {
  let magazineHash = new Map();

  for (let letter of magazine) {
    magazine.set(letter, magazine.has(letter) ? magazine.get(letter) + 1 : 1);
  }

  for (let letter of ransomNote) {
    if (!magazine.has(letter) || magazine.get(letter) <= 0) return false;

    magazine.set(letter, magazine.get(letter) - 1);
  }

  return true;
};

console.log(canConstruct("aa", "aab"));
