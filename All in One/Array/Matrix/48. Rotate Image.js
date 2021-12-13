//Very Easy
var rotate = function (matrix) {
  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return [];

  function transpose() {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = i; j < matrix.length; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }
  }

  function reverse() {
    for (let i = 0; i < matrix.length; i++) {
      let start = 0;
      let end = matrix.length - 1;
      while (start < end) {
        [matrix[i][start], matrix[i][end]] = [matrix[i][end], matrix[i][start]];
        start++;
        end--;
      }
    }
  }

  transpose();
  reverse();

  return matrix;
};
//https://www.youtube.com/watch?v=pqDZdKd1uLQ