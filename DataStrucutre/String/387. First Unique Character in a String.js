//https://www.youtube.com/watch?v=St47WCbQa9M&list=PLi9RQVmJD2fZgRyOunLyt94uVbJL43pZ_

//Variant:1
//387. First Unique Character in a String
var firstUniqChar = function (s) {
  if (s && s.length == 0) return -1;

  let charsMap = new Map();

  for (let i = 0; i < s.length; i++) {
    if (charsMap.has(s[i])) {
      charsMap.set(s[i], charsMap.get(s[i]) + 1);
    }
    else {
      charsMap.set(s[i], 1);
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (charsMap.get(s[i]) == 1) return i;
  }

  return -1;
};

console.log(firstUniqChar("loveleetcode"));//[9, 2, 3, 6, 6, 9, 12, 3]
console.log(firstUniqChar([9, 2, 3, 6, 6, 9, 12, 3]));


//Variant:2
//387 First non_repeating character in a Stream(length unknown), no second round
var firstUniqChar = function (s) {
  if (s && s.length == 0) return -1;

  let charsMap = new Map();
  let queue = [];

  for (let i = 0; i < s.length; i++) {
    if (charsMap.has(s[i])) {
      charsMap.set(s[i], charsMap.get(s[i]) + 1);
      queue.push(s[i]);
    }
    else {
      charsMap.set(s[i], 1);
      queue.push(s[i]);
    }
  }

  function showFirstUnique() {
    while (queue.length > 0 && charsMap[queue[0]] > 1) {
      queue.shift();
    }

    if (queue.length == 0) return -1;

    return queue[0];
  }

  function add(char) {
    charsMap.set(char, charsMap.get(char) ? charsMap.get(char) + 1 : 1);
    if (charsMap.get(char) == 1) {
      queue.push(char);
    }
  }
};

console.log(firstUniqChar("loveleetcode"));//[9, 2, 3, 6, 6, 9, 12, 3]
console.log(firstUniqChar([9, 2, 3, 6, 6, 9, 12, 3]));

//https://www.youtube.com/watch?v=_y0FiPJXgZk


