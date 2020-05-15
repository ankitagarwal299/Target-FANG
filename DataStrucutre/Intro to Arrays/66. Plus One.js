//https://www.youtube.com/watch?v=_sls9AdBymI
var plusOne = function (digits) {
  console.log(digits.length);

  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }

    digits[i] = 0;
  }
  console.log(digits);

  digits.unshift(1);
  return digits;
};

//console.log(plusOne([4, 3, 2, 1]));
console.log(plusOne([9, 9]));
