//Very Easy in place reverse 180 degree
var flipAndInvertImage = function (A) {
  let matrix = A;

  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return [];

  for (let i = 0; i < matrix.length; i++) {
    //Two pointers (start and end)

    let start = 0;
    let end = matrix[i].length - 1;

    while (start <= end) {
      [matrix[i][start], matrix[i][end]] = [matrix[i][end], matrix[i][start]];
      start++;
      end--
    }

    start = 0;//assign again

    while (start <= matrix[i].length - 1) {
      matrix[i][start] = matrix[i][start] == 1 ? 0 : 1;
      start++;
    }

  }
  return matrix;

};