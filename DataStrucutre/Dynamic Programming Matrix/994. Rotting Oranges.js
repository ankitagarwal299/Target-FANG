var orangesRotting = function (grid) {
  /*Collect all rotten oranges put it into queue*/
  /*Collect all Fresh oranges  put it into set*/
  /*Perform Level Order Traversal and count levels */
  let queue = [];
  let fresh = new Set();
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
          if (grid[i][j] == 2) queue.push([i, j]);
          if (grid[i][j] == 1) fresh.add(`${i}-${j}`);
      }
  }

  // If there are no fresh oranges, then return 0. 
  //Either all are rotten or there are none.
  if (fresh.size === 0) return 0;


  function outBound(r, c) {
      return r < 0 || c < 0 || r >= grid.length || c >= grid[0].length;
  }

  // Now do a BFS by level, counting the levels as we go.
  let level = 0;
  while (queue.length) {

      let curSize = queue.length;
      let nextLevel = [];//gther next queue items

      for (let i = 0; i < curSize; i++) {
          let [x, y] = queue.shift();

          // Add each adjacent FRESH orange that has not already got bad.
          for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
              const [r, c] = [dx + x, dy + y];
              if (outBound(r, c)) continue;


              if (grid[r][c] == 1) {
                  grid[r][c] = 2;

                  nextLevel.push([r, c]);

                  fresh.delete(`${r}-${c}`);

              }
          }
      }

      queue = nextLevel;

      if (queue.length) level = level + 1;//Very Important condition
  }


  if (fresh.size > 0) return -1;// Impossible to rotten all oranges 



  return level;
};





console.log(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]))//FORMATIION