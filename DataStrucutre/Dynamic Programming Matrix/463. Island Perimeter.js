//https://www.youtube.com/watch?v=FkjFlNtTzc8

var islandPerimeter = function (grid) {
  if (grid == null || grid.length == 0) return;

  let perimeter = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 1) {
        perimeter += 4;

        if (i > 0 && grid[i - 1][j] == 1) {
          perimeter -= 2;
        }
        if (j > 0 && grid[i][j - 1] == 1) {
          perimeter -= 2;
        }
      }
    }
  }

  return perimeter;
};

var island = [
  [0, 1, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 0, 0],
  [1, 1, 0, 0],
];

var arr = [
  [0, 1, 0, 0, 0],
  [1, 1, 1, 0, 0],
  [1, 0, 0, 0, 1],
];
console.log(islandPerimeter(island));

/* 

https://leetcode.com/problems/island-perimeter/
Input:
[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]

Output: 16

Explanation: The perimeter is the 16 yellow stripes in the image below:
 */
