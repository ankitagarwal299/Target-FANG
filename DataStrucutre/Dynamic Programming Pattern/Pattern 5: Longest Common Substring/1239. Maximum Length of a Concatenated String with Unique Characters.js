//https://www.youtube.com/watch?v=pD3cHFNyW2I&t=243s

var maxLength = function (arr) {
    let result = Array(1).fill(0);
  
    //utility fn
    function uniqueCharCount(string) {
      let counts = Array(26).fill(0);
     //console.log(string)
  
      for (let i = 0; i < string.length; i++) {
        if (counts[string[i].charCodeAt() - "a".charCodeAt()]++ > 0) return -1
      }
  
      return string.length;
    }
  
    function maxUnique(arr, index, current, result) {
      //base case
      if (index == arr.length && uniqueCharCount(current) > result[0]) {
        //if current is greater and unique then assign in result
        result[0] = current.length;
        return;
      }
      if(index== arr.length) return;
      maxUnique(arr, index + 1, current, result);
      maxUnique(arr, index + 1, current + arr[index], result);
    }
  
    maxUnique(arr, 0, "", result);
    return result[0];
  };
  
  console.log(maxLength(["un", "iq", "ue"]));
  console.log(maxLength(["cha","r","act","ers"]));
  console.log(maxLength(["abcdefghijklmnopqrstuvwxyz"]));
  
  