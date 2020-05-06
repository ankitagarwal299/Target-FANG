//https://www.youtube.com/watch?v=St47WCbQa9M&list=PLi9RQVmJD2fZgRyOunLyt94uVbJL43pZ_
var firstUniqChar = function (str) {
    let charMap = new Map();
  
    for (let i = 0; i < str.length; i++) {
      charMap.set(str[i], charMap.has(str[i]) ? -1 : i)
    }
  
  
  
    let minimumIndex = Number.MAX_SAFE_INTEGER;
    for (let char of charMap.keys()) {
  
      if (charMap.get(char) > -1 && minimumIndex > charMap.get(char)) {
        minimumIndex = charMap.get(char);
      }
    }
  
    return minimumIndex;
  }
  
  console.log(firstUniqChar("loveleetcode"));
  