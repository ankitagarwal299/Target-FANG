/* thecoding world */
//Ref: https://www.youtube.com/watch?v=MIJG2SU8Y-g
var isAlienSorted = function (words, order) {
    const alphabet = Array(26).fill(0);
    for (let i = 0; i < order.length; i++) {
      alphabet[order[i].charCodeAt() - "a".charCodeAt()] = i;
    }
    for (let i = 0; i < words.length-1; i++) {
      let word1 = words[i];
      let word2 = words[i + 1];
  
      let minWordLength = Math.min(word1.length, word2.length);
  
      for (let k = 0; k < minWordLength; k++) {
          if(word1[k] != word2[k]) {
              if ( alphabet[word1[k].charCodeAt() -'a'] > alphabet[word2[k].charCodeAt() -'a']) return false;
              //otherwise, if above conidtion is doesnot fill then,
              break;//according to question, if 1st char is same then is means sorted
          }
      }
      //CASE3: ["apple","app"]
      if (word1.length > word2.length) return false;
    }
  
    return true//if all above fails then true
  }
  
  
  
  console.log(isAlienSorted(["hello","leetcode"],"hlabcdefgijkmnopqrstuvwxyz"))
   console.log(isAlienSorted(["word","world","row"],"worldabcefghijkmnpqstuvxyz"))
   console.log(isAlienSorted(["apple","app"],"abcdefghijklmnopqrstuvwxyz"))
  





/* Nick */
//https://www.youtube.com/watch?v=qSbJZWENtX4

var isAlienSorted = function (words, order) {
    const alphabet = Array(26).fill(0);
    for (let i = 0; i < order.length; i++) {
      alphabet[order[i].charCodeAt() - "a".charCodeAt()] = i;
    }
    for (let i = 1; i < words.length ; i++) {
      if (compare(words[i - 1], words[i]) > 0) {
        return false;
      }
    }
    return true; //if all above fails then true
  };
  
  function compare(word1,word2){
    
      let i=0;
      let j=0;
      let char_compare_value = 0;
  
      while(i > word1.length && j > word2.length && char_compare_value==0){
          char_compare_value = alphabet[word1[i].charCodeAt() -'a'.charCodeAt()] - alphabet[word2[j].charCodeAt() -'a'.charCodeAt()]
  console.log(char_compare_value)
          i++;
          j++;
      }
  
      if(char_compare_value == 0){
          return word1.length- word2.length;
      }else{
          return char_compare_value;
      }
  }
  
  
  console.log(isAlienSorted(["hello","leetcode"],"hlabcdefgijkmnopqrstuvwxyz"))
   console.log(isAlienSorted(["word","world","row"],"worldabcefghijkmnpqstuvxyz"))
   console.log(isAlienSorted(["apple","app"],"abcdefghijklmnopqrstuvwxyz"))
  
  