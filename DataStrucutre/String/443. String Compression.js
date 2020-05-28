var compress = function (chars) {
    if (chars == null || chars.length == 0) return;
    
    let compressString = "";
    let count = 1;
    for (let i = 0; i < chars.length - 1; i++) {
      //conidtion id -1 because to we are comparing i+1
      if (chars[i] == chars[i + 1]) {
        count++;
      } else {
          compressString = compressString + chars[i] + (count==1 ? "" : count);
          count=1;
      }
    }
    //last char
    compressString = compressString + chars[chars.length-1] + (count==1? "" : count);
    
    return compressString;
  }
  
  console.log(compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]));
  console.log(compress(["a"]));
  console.log(compress(["a","a","b","b","c","c","c"]));
  console.log(compress(["a","a","b","b","c"]));
  






  
//Above is not in place , below is the in place and best solution
//https://www.youtube.com/watch?v=d6OHsYfHZpM

var compress = function (chars) {
    if (chars == null || chars.length == 0) return;
    let indexRes = 0;
    let i = 0;
  
    while (i < chars.length) {
      let count = 1;
      while (i < chars.length && chars[i] == chars[i + 1]) {
        count++;
        i++;
      }
      chars[indexRes++] = chars[i];
      i++;
      if (count == 1) continue;
      //otherwise convert number into string
      let numtostr = count.toString();
      for (let i = 0; i < numtostr.length; i++) {
        console.log(i, count.toString(), numtostr[i])
        chars[indexRes++] = numtostr[i];
      }
    }
  
    //return indexRes;
    return chars.slice(0,indexRes);
  };
  
    console.log(compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]));
    console.log(compress(["a"]));
    console.log(compress(["a","a","b","b","c","c","c"]));
    console.log(compress(["a","a","b","b","c"]));
