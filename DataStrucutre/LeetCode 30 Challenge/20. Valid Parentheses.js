//https://www.youtube.com/watch?v=f8Jq8Ibg2Ys
var isValid = function (s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {

    //insert all open backets into stack
    if (s[i]== "(" || s[i]== "[" || s[i]== "{") {
        stack.push(s[i]);
    }
    else if (s[i]== ")" && stack.length > 0 && stack[stack.length-1] == "("){
        stack.pop();
    }else if (s[i]==  "}" && stack.length>0 && stack[stack.length-1] =="{"){
        stack.pop();
    }else if (s[i]==  "]" && stack.length>0 && stack[stack.length-1] =="["){
        stack.pop();
    }else{
         return false;
    }
  }

  return stack.length>0;
};

console.log(isValid("()[]{}"));

/* 
Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true
 */