//https://leetcode.com/problems/letter-combinations-of-a-phone-number/



var letterCombinations = function (digits) {
  let result = new Array();
  if (digits == null || digits.length == 0) return result;
  let mapping = ["0","1","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"];


  function letterCombinationsRecursive(result, digits, currentCombination, currIndex, mapping){
    if (currIndex == digits.length){
      result.push(currentCombination);
    }

    let letters = mapping[parseInt(digits.charAt(currIndex))];
    for (let i=0 ; i< letters.length;i++){
      letterCombinationsRecursive(result, digits, currentCombination + letters.charAt(currIndex), currIndex +1, mapping)
    }

  }


  letterCombinationsRecursive(result, digits, "",0 ,  mapping);
  return result;
};

console.log(letterCombinations(23));
