//https://www.youtube.com/watch?v=f7Zd8hEbCz0

var robotMoves = function (moves) {
  let UD = 0;
  let RL = 0;

  for (let i = 0; i < moves.length; i++) {
    let currentMove = moves.charAt(i);
    if (currentMove == "U") {
      UD++;
    } else if (currentMove == "D") {
      UD--;
    } else if (currentMove == "R") {
      RL++;
    } else if (currentMove == "L") {
      RL--;
    }
  }

  return (UD == 0) & (RL == 0);
};

console.log(robotMoves("UD"));

/* 
https://leetcode.com/problems/robot-return-to-origin/


Example 1:

Input: "UD"
Output: true 
Explanation: The robot moves up once, and then down once. All moves have the same magnitude, so it ended up at the origin where it started. Therefore, we return true.
 

Example 2:

Input: "LL"
Output: false
Explanation: The robot moves left twice. It ends up two "moves" to the left of the origin. We return false because it is not at the origin at the end of its moves.

*/
