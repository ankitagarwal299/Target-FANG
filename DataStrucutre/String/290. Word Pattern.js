/* var wordPattern = function(pattern, s) {
  let words = s.split(' ');
  if(pattern.length != words.length) return false;
  if(new Set(pattern).size != new Set(words).size) return false;//1st method
  
  
  let patternMap = new Map();
  
  
  for(let i=0; i< pattern.length;i++){
    if (patternMap.has(pattern[i])){
      if(patternMap.get(pattern[i]) == words[i]){
        continue;
      }else{
        return false;
      }
    }else{
      patternMap.set(pattern[i] , words[i]);
    }
  }
    return true;
}; */



//-----------------------------------------------------------------------------------------------------------------------------------
/* var wordPattern = function(pattern, s) {
  let words = s.split(' ');
  if(pattern.length != words.length) return false;
  //if(new Set(pattern).size != new Set(words).size) return false;//1st method
  
  let patternMap = new Map();
  
  for(let i=0; i< pattern.length;i++){
    if (patternMap.has(pattern[i])){
      if(patternMap.get(pattern[i]) == words[i]){
        continue;
      }else{
        return false;
      }
    }else{
      for (let item of patternMap.values()){
        if (item == words[i] ) return false;
      }
      patternMap.set(pattern[i] , words[i]);//2nd Method before inserting check
    }
  }
    return true;
}; */




//-----------------------------------------------------------------------------------------------------------------------------------
var wordPattern = function (pattern, s) {
    let words = s.split(' ');
    if (pattern.length != words.length) return false;
    //if(new Set(pattern).size != new Set(words).size) return false;//1st method

    let patternMap = new Map();
    let wordMap = new Map();
    for (let i = 0; i < pattern.length; i++) {
        if ((patternMap.has(pattern[i]) && patternMap.get(pattern[i]) != words[i]) ||
            (wordMap.has(words[i]) && wordMap.get(words[i]) != pattern[i])) {
            return false;
        }
        patternMap.set(pattern[i], words[i]);
        wordMap.set(words[i], pattern[i]);
    }
    return true;
};

console.log(wordPattern('abba', "dog cat cat dog"))//true
console.log(wordPattern('abba', "dog cat cat fish"))//false
console.log(wordPattern('aaaa', "dog cat cat dog"))//false
console.log(wordPattern('aaaa', "dog dog dog dog"))//true

console.log(wordPattern('abba', "dog dog dog dog"))//false----tricky

//3 ways to resolve issue
// 1. Insert both in Sets pattern and words...both size not equal then issue