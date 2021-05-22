/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    if (n == null || n == 0) return [];

    let result = [];

    function traverse(currStr, open, close) {
        if (open == 0 && close == 0) {
            result.push(currStr);
            return;
        }

        if (open > 0) {
            traverse(currStr + "(", open - 1, close);
        }
        if (open < close) {
            traverse(currStr + ")", open, close - 1);
        }
    }

    traverse("", n, n);
    return result;
};
//22. Generate Parentheses
//https://www.youtube.com/watch?v=sz1qaKt0KGQ
console.log(generateParenthesis(3));


//20. Valid Parentheses
var isValid = function (s) {
    if (s == null || s.length < 2) return false;

    let stack = [];

    for (let bracket of s) {
        if (bracket == '(' || bracket == '[' || bracket == '{') {
            stack.push(bracket);
        } else if (bracket == ')' && stack[stack.length - 1] == '(' ||
            bracket == ']' && stack[stack.length - 1] == '[' ||
            bracket == '}' && stack[stack.length - 1] == '{') {
            stack.pop();
        } else {
            return false
        }
    }
    return stack.length == 0;

};

//----------------1249. Minimum Remove to Make Valid Parentheses
var minRemoveToMakeValid = function (str) {

    /* 1. insert all open bracket indexes into stack */
    /* 2. insert "" for all extra close brackets or starting with close brackets  */
    /* 3. insert  " again for all extra open brackets leftout in stack" */

    str = str.split('');
    console.log(str)

    let stack = [];//to track indexes
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '(') {
            stack.push(i)
        } else if (str[i] == ')') {
            if (stack.length > 0) {
                stack.pop();
            } else {
                str[i] = "";//if close is more than open bracket
            }
        }
    }

    //if stack is not empty, means open brackets are more
    for (let i = 0; i < stack.length; i++) {
        str[stack[i]] = "";//if close is more than open bracket
    }
    return str.join('');
}
console.log(minRemoveToMakeValid("lee(t(c)o)de)"));
console.log(minRemoveToMakeValid("a)b(c)d"));
console.log(minRemoveToMakeValid("))(("));
console.log(minRemoveToMakeValid("(a(b(c)d)"));


//301. Remove Invalid Parentheses- Hard
/* Below approach is failing for long test case- Checking all permutations */
function getMinParenToRemove(str) {
    let minBracketToRemove = 0;
    let open = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '(') {
            open++;
        } else if (str[i] == ')') {
            if (open == 0) {
                minBracketToRemove++;
            } else {
                open--;
            }
        }
    }
    minBracketToRemove += open;

    return minBracketToRemove;
}

var removeInvalidParentheses = function (s) {
    if (s == null || s.length == 0) return "";

    let min = getMinParenToRemove(s);

    if (min == 0) return [s];

    let result = new Set();



    function traverse(s, mra) {
        if (mra == 0) {
            let minRemoveqlNow = getMinParenToRemove(s);//checking everytime valid/invalid- Eats memory

            if (minRemoveqlNow == 0) {
                result.add(s);
            }

            return;
        }

        for (let i = 0; i < s.length; i++) {//everytime remove bracket and check recursion
            let left = s.slice(0, i);
            let right = s.slice(i + 1);

            traverse(left + right, mra - 1);
        }
    }
    traverse(s, min);

    //return [...result];
    return Array.from(result);
};

console.log(removeInvalidParentheses("())v)(()(((((())"));// Time Limit Exceeded



var removeInvalidParentheses = function (s) {
    let [open, close] = getMinParenToRemove(s);

    let set = new Set();

    function dfs(index, rmOpen, rmClose, currStr, open) {
        if (open < 0 || close < 0 || open < 0) return; //last param open is required for cases ))(( - no use of further recusrion
        if (index == s.length) {
            if (rmOpen == 0 && rmClose == 0 && open == 0) {
                set.add(currStr);
            }
            return;
        }

        if (s[index] == '(') {
            dfs(index + 1, rmOpen - 1, rmClose, currStr, open);//not use, last param open is required for cases ))((
            dfs(index + 1, rmOpen, rmClose, currStr + s[index], open + 1);//use

        } else if (s[index] == ')') {

            dfs(index + 1, rmOpen, rmClose - 1, currStr, open);//not use
            dfs(index + 1, rmOpen, rmClose, currStr + s[index], open - 1);//use

        } else {
            dfs(index + 1, rmOpen, rmClose, currStr + s[index], open);//use
        }
    }

    dfs(0, open, close, "", 0);

    return Array.from(set);
};
function getMinParenToRemove(str) {
    let close = 0;
    let open = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == '(') {
            ++open;
        } else if (str[i] == ')') {
            if (open == 0) {
                close++;
            } else {
                open--;
            }
        }
    }


    return [open, close];
}

//https://leetcode.com/problems/remove-invalid-parentheses/discuss/1196773/DFS-oror-Runtime%3A-128-ms-Memory-Usage%3A-44.5-MB-oror-2-Approaches
console.log(removeInvalidParentheses("lee(t(c)o)de)"));
console.log(removeInvalidParentheses("a)b(c)d"));
console.log(removeInvalidParentheses("))(("));
console.log(removeInvalidParentheses("(a(b(c)d)"));

console.log(removeInvalidParentheses("()())()"));
console.log(removeInvalidParentheses("())v)(()(((((())"));// Time Limit Exceeded
/* ['lee(t(co)de)', 'lee(t(c)ode)', 'lee(t(c)o)de']
['ab(c)d']
['']
['a(b(c)d)', '(ab(c)d)', '(a(bc)d)']
['(())()', '()()()']
['(v)()(())', '(v)(()())', '()v()(())', '()v(()())'] */

