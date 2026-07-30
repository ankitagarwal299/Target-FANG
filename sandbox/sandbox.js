/*

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 
Example 1:
Input: s = "()"
Output: true
Example 2:
Input: s = "()[]{}"
Output: true
Example 3:
Input: s = "(]"
Output: false
Example 4:
Input: s = "([])"
Output: true
Example 5:
Input: s = "([)]"
Output: false

))
(((

*/

function bracketMatch(str) {

    let map = {
        ")": "(",
        "]": "[",
        "}": "{"
    }
    let stack = []

    for (let i = 0; i < str.length; i++) {
        const bracket = str[i]

        if (bracket == "(" || bracket == "[" || bracket == "{") {
            stack.push(bracket)
        } else {
            if (stack.length == 0 || stack.pop() != map[bracket]) return false

        }
    }

    return stack.length > 0


    
}

console.log(bracketMatch("()")) ;

/*
 stores thousands 

 events

 POST /orders , sorted in desc
 Pagenumer < 0
 PageSize  100


 orderId. order date
 456
 123
 123
 

*/