
//Above is not in place , below is the in place and best solution
//https://www.youtube.com/watch?v=d6OHsYfHZpM

var compress = function (chars) {

  if (!(chars && chars.length)) return "";
  if (chars.length == 1) return chars[0];

  let index = 0;
  let start = 0;

  while (start < chars.length) {
    let end = start;

    while (end < chars.length && chars[end] == chars[start]) {
      end++;
    }

    //inplace
    chars[index] = chars[start];
    index++;

    if (end - start > 1) {
      //102 - 3 digits ; 2 - 1 digit
      let count = (end - start).toString();
      for (let i = 0; i < count.length; i++) {
        chars[index] = count[i];
        index++;
      }
    }

    start = end;
  }

  return chars.slice(0, index);//originally index
};

console.log(compress(["a", "a", "b", "b", "c", "c", "c"]));
console.log(compress(["a", "b"]));

console.log(compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]));
console.log(compress(["a"]));
console.log(compress(["a", "a", "b", "b", "c", "c", "c"]));
console.log(compress(["a", "a", "b", "b", "c"]));
