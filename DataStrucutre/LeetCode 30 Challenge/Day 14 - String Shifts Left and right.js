var rotateString = function (str, direction) {
  let sum = 0;
  let result ;
  for (let i = 0; i < direction.length; i++) {
    sum = sum + (direction[i][0] == 1 ? direction[i][1] : -direction[i][1]);
  }

  sum = sum % str.length;

  

  if (sum < 0) result = str.slice(sum).concat(str.slice(0,sum));
  else result = str.slice(str.length- sum).concat(str.slice(0,str.length- sum));
};

console.log(rotateString('abcdefg',[[1,1],[1,1],[0,2],[1,3]]));


/* 
You are given a string S containing lowercase letter and  a matrix SHIFT, where SHIFT[i] = [DIRECTION,AMOUNT]
a. direction: can be 0 or 1
b. amount : amount by which it is shifted

Example 1:
Input: S = 'abc', shift = [[0,1],[1,2]]
Output: cab

Example 2:
Input: A = 'abcdefg', Shift = [[1,1],[1,1],[0,2],[1,3]]
Output: efgabcd
 */