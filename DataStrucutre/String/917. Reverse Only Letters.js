//https://www.youtube.com/watch?v=qVADz0khbH0&t=110s

/// Below is the best solution
/**
 * @param {string} S
 * @return {string}
 */
var reverseOnlyLetters = function (S) {

  if (!S && S.length) return "";

  let str = S.split('');//IMP conversion string into an array is required; to swap chars

  let i = 0;
  let j = str.length - 1;


  function isLetter(char) {
    if (!char) return;
    if ((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)) {
      return true;
    }
    return false;
  }

  while (i < j) {

    if (!isLetter(str[i])) {
      i++;
      continue;
    }

    if (!isLetter(str[j])) {
      j--;
      continue;
    }

    [str[i], str[j]] = [str[j], str[i]];//here array can swap
    i++;
    j--;

  }

  return str.join('');//conversion back to string

};
