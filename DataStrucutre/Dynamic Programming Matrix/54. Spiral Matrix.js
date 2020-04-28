var spiralOrder = function (grid) {
  let rowBegin = 0;
  let rowEnd = grid.length - 1;
  let colBegin = 0;
  let columnEnd = grid[0].length - 1;

  let result = [];

  while (rowBegin <= rowEnd && colBegin <= columnEnd) {
      
    for (let i = colBegin; i < columnEnd; colBegin++) {
      result.push(grid[rowBegin][i]);
    }
    rowBegin++;

    for (let i = rowBegin; i <= rowEnd; i++) {
      result.push(grid[i][columnEnd]);
    }
    columnEnd--;

    for (let i = columnEnd; i >= colBegin; columnEnd--) {
      result.push(grid[rowEnd][i]);
    }
    rowEnd--;

    for (let i = rowEnd; i >= rowBegin; i--) {
      result.push(grid[i][colBegin]);
    }
    colBegin++;
  }
};

var arr = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(spiralOrder(arr));

/* 
Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

Example 1:

Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:

Input:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 */
