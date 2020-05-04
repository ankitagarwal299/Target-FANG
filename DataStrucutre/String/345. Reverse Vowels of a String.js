//https://www.youtube.com/watch?v=xu37BTWjzGA&t=86s

var reverseVowels = function (str) {
    let vowels = new Set();
    vowels.add("a");
    vowels.add("A");
    vowels.add("e");
    vowels.add("E");
    vowels.add("i");
    vowels.add("I");
    vowels.add("O");
    vowels.add("o");
    vowels.add("U");
    vowels.add("u");
  
    let i = 0;
    let j = str.length - 1;
    let arr = str.split('');
  
    while (i < j) {
      while (i < j && !vowels.has(arr[i])) {
        i++; //if letter is not vowel increment index
      }
  
      while (i < j && !vowels.has(arr[j])) {
        j--; //if letter is not vowel decrement index
      }
  
      
      //case when both index are set to vowel , swap and increment/decrement indexes
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--
      
    }
  
  
    return arr.join('');
  };
  
  console.log(reverseVowels("leetcode"));
  