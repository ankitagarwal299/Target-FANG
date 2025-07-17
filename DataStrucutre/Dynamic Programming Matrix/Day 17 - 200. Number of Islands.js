var numIslands = function (grid) {
  if (grid == null || grid.length == 0) return 0; // Return 0 if grid is empty

  let visited = new Set();
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
          if (grid[i][j] === '1') { // Check against '1' instead of 1
              if (visited.has(`${i}-${j}`) == false) {
                  count += dfs(i, j, visited, grid);
              }
          }
      }
  }
  return count;
}

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function dfs(i, j, visited, grid) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return 0;
  if (grid[i][j] === '0') return 0; // Check against '0' instead of 0
  if (visited.has(`${i}-${j}`)) return 0;

  visited.add(`${i}-${j}`);

  for (const [dx, dy] of directions) {
      const newX = i + dx; // Use i instead of x
      const newY = j + dy; // Use j instead of y

      dfs(newX, newY, visited, grid);
  }

  return 1; // Return 1 after exploring all directions
}
