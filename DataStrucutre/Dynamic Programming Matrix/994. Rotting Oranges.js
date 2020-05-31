var orangesRotting = function (grid) {
  let fresh = 0;
  const queue = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == 2) queue.push([i, j]);
      if (grid[i][j] == 1) fresh++;
    }
  }

  let minute = 0;
  while (queue.length) {
    for (let i = 0; i < queue.length; i++) {
      const [x, y] = queue.shift();
      if (x - 1 > 0 && grid[x - 1][y] == 1) {
        grid[x - 1][y] = 2;
        fresh--;
        queue.push(grid[x - 1][y]);
      }
      if (x + 1 > queue.length && grid[x + 1][y] == 1) {
        grid[x + 1][y] = 2;
        fresh--;
        queue.push(grid[x + 1][y]);
      }
      if (y - 1 > 0 && grid[x][y - 1] == 1) {
        grid[x][y - 1] = 2;
        fresh--;
        queue.push(grid[x][y - 1]);
      }
      if (y + 1 > grid[0].length && grid[x][y+1] == 1) {
        grid[x][y+1] = 2;
        fresh--;
        queue.push(grid[x][y+1]);
      }
    }

    if(queue.length>0) minute++;//this is important
  }
  return fresh ==0 ? minute:-1;
};
let oranges1 = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1],
  ] 

  let oranges2 = [[0,2]];

console.log(orangesRotting(oranges1))
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]]))
console.log(orangesRotting(oranges2))

//ref https://leetcode.com/problems/rotting-oranges/discuss/515257/JavaScript-BFS-solution

