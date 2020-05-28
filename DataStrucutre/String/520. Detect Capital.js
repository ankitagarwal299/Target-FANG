function isCapital(char) {
    if ( char >= 65 && char <= 90) {
     // console.log("ksdjnfdsf")
        return true;
    }else {
        return false;
    }
}

var detectCapitalUse = function (word) {
  
   
  if (word == null || word.length == 0) return "";

  let count = 0;
  for (let i = 0; i < word.length; i++) {
    if (isCapital(word[i].charCodeAt())) {
        count+=1;
    }
  }
  
 

  //check all 3 conditions
  console.log(count,word.length)
  return count == word.length || count==0 || (count == 1 && isCapital(word[0].charCodeAt()));
};

console.log(detectCapitalUse("USA"));
console.log(detectCapitalUse("FlaG"));
console.log(detectCapitalUse("Arjun"));


