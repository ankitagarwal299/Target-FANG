var leftMostColumnWithOne = function (grid) {
  let dim = BinaryMatrix.dimensions(); //[n,m]

  let result = -1;
  let row = dim[0] - 1;
  let col = dim[1] - 1;

  //traverse the matrix path
  while (row >= 0 && col >= 0) {
    if (BinaryMatrix.get(row, col) == 1) {
      result = col; //insert column number
      col -= 1;
    } else {
      row -= 1;
    }
  }

  return result;
};

var islands = [
  [0, 0, 0, 0, 1],
  [0, 0, 0, 1, 1],
  [0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 0, 1],
];
console.log(leftMostColumnWithOne(islands));


/* 
(This problem is an interactive problem.)

A binary matrix means that all elements are 0 or 1. For each individual row of the matrix, this row is sorted in non-decreasing order.

Given a row-sorted binary matrix binaryMatrix, return leftmost column index(0-indexed) with at least a 1 in it. If such index doesn't exist, return -1.

You can't access the Binary Matrix directly.  You may only access the matrix using a BinaryMatrix interface:

BinaryMatrix.get(x, y) returns the element of the matrix at index (x, y) (0-indexed).
BinaryMatrix.dimensions() returns a list of 2 elements [n, m], which means the matrix is n * m.

*/
