//https://www.youtube.com/watch?v=j3VMLDg7Tp4

var reverse = function (num) {
  let negative = false;
  if (num < 0) negative = true;

  let reverse = 0;
  while (nums > 0) {
    reverse = reverse * 10 + (num % 10);
    num = num / 10;
  }

  var maxInteger = Math.pow(2, 31) - 1;
  var minInteger = -Math.pow(2, 31);

  if (reverse > maxInteger){
      return 0;
  }

  return negative ? -1 * reverse : reverse;
};

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120));

//This is confusing , return to this question again and search better option to do in javascript
