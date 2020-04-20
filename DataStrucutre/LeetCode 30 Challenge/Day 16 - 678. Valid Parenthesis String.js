//https://www.youtube.com/watch?v=KuE_Cn3xhxI&t=5s

var checkValidString = function(s) {
    const openStack = [];
    const starStack = [];
    
    for(let i = 0; i < s.length; i++) {
        
        if(s[i] === '(') {
            openStack.push(i);
        } else if (s[i] === '*') {
            starStack.push(i);
        } else {
            if(openStack.length > 0) {
                openStack.pop();
            } else if(starStack.length > 0) {
                starStack.pop();
            } else {
                return false;
            }
        }
    }

    let i = openStack.length - 1;
    let j = starStack.length - 1;
    //process leftover opening brackets
    while(openStack[i] < starStack[j]) {
        openStack.pop();
        starStack.pop();
        i--;
        j--;
    }

    if(openStack.length === 0) {
        return true;
    } else {
        return false;
    }
};

console.log(checkValidString("()"));


/* 
Given a string containing only three types of characters: '(', ')' and '*', write a function to check whether this string is valid. We define the validity of a string by these rules:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string.
An empty string is also valid.


Example 1:
Input: "()"
Output: True

Example 2:
Input: "(*)"
Output: True

Example 3:
Input: "(*))"
Output: True

*/