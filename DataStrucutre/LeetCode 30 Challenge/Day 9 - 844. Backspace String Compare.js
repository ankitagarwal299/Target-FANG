var backspaceCompare = function (S, T) {
    let result1 = "";
    for (let i = 0; i < S.length; i++) {
      if (S[i] == "#") {
        result1 = S.slice(0, i - 1); //-1 becoz endindex not included 
        console.log(result1);
      }
    }
    
    
    let result2 = "";
    for (let i = 0; i < T.length; i++) {
      if (T[i] == "#") {
        result2 = T.slice(0, i - 1); //-1 becoz endindex not included  and we need to delete 2, so one is not included and other i have added-1 to not
        console.log(result2);
      }
    }
    
    return  (result1 == result2) ? true : false;
  };
  
  console.log(backspaceCompare("ab#c", "ad#c"));



/* 
Given two strings S and T, return if they are equal when both are typed into empty text editors. # means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

Example 1:

Input: S = "ab#c", T = "ad#c"
Output: true
Explanation: Both S and T become "ac".
Example 2:

Input: S = "ab##", T = "c#d#"
Output: true
Explanation: Both S and T become "".
Example 3:

Input: S = "a##c", T = "#a#c"
Output: true
Explanation: Both S and T become "c".
Example 4:

Input: S = "a#c", T = "b"
Output: false
Explanation: S becomes "c" while T becomes "b".
 */


 //SECOND APPROACH with STACK
 var backspaceCompare = function (S, T) {
    let stack1 = [];
    for (let i = 0; i < S.length; i++) {
      if (S[i] != "#") {
        stack1.push(S[i]);
      } else if (stack1.length > 0) {
        stack1.pop();
      }
    }
    console.log(stack1)
    
    let stack2 = [];
    for (let i = 0; i < T.length; i++) {
      if (T[i] != "#") {
        stack2.push(T[i]);
      } else if (stack2.length > 0) {
        stack2.pop();
      }
    }
    console.log(stack2)
    
    
    while(stack1.length>0){
      let char = stack1.pop();
      if (stack2.length == 0 || stack2.pop() != char){
        return false;
      }
    }
    return stack1.length == 0 && stack2.length == 0
  };
  
  console.log(backspaceCompare("ab#c", "ad#c"));
  