//https://www.youtube.com/watch?v=eT0UqrYuqbg

var searchMatrix = function (matrix, target) {
  if (matrix == null || matrix.length == 0) return false;

  let rows = matrix.length;
  let cols = matrix[0].length;

  let left = 0;
  let right = rows * cols - 1;

  while (left <= right) {

    let mid = left + (right - left) / 2;
    //important point to calculate midpoint in matrix
    let midpoint_elem = matrix[mid/cols][mid%cols];

    if (midpoint_elem == target) return true;
    else if (target < midpoint_elem) {
      right = mid - 1;
    } else if (target > midpoint_elem) {
      left = mid + 1;
    }
  }

  return false;
};

let matrix = [
  [1, 3, 5, 7],
  [10, 11, 16, 20],
  [23, 30, 34, 50],
];

console.log(searchMatrix());

/* 

Example 1:

Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 3
Output: true
Example 2:

Input:
matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 50]
]
target = 13
Output: false

*/
