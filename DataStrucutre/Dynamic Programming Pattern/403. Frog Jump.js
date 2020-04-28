//https://www.youtube.com/watch?v=4LvYp_d6Ydg&t=290s
//Not able to understand fully, this problem is similar to staircase.

var canCross = function (stones) {
  for (let i = 3; i < stones.length; i++) {
    if (stones[i] > stones[i - 1] * 2) {
      return false;
    }
  }

  let stonePositions = new Set();
  stones.forEach((stone) => stonePositions.add(stone));

  let lastStone = stones[stones.length - 1];

  let positionsStack = [];
  let jumpStack = [];

  positionsStack.push(0);
  jumpStack.push(0);

  while (positionsStack.length > 0) {
    let position = positionsStack.pop();
    let jumpDistance = jumpStack.pop();

    for (let i = jumpDistance - 1; i <= jumpDistance + 1; i++) {
      if (i <= 0) continue;

      let nextPosition = position + i;
      if (nextPosition == lastStone) {
        return true;
      } else if (stonePositions.has(nextPosition)) {
        positionsStack.push(nextPosition);
        jumpStack.push(i);
      }
    }
  }

  return false;
};
console.log(canCross([0,1,3,5,6,8,12,17]));

/* https://leetcode.com/problems/frog-jump/ */
