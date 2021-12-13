var rotate180 = function (A) {
  let matrix = A;

  if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return [];

  //Step1 : Swap row-wise
  for (let i = 0; i < matrix.length - 1 - i; i++) {
    let start = i;
    let end = matrix.length - 1 - i;

    //swap 1st row to last row
    for (let j = 0; j < matrix[0].length; j++) {
      [matrix[start][j], matrix[end][j]] = [matrix[end][j], matrix[start][j]];
    }

  }

  //Step2: Swap col-wise
  for (let i = 0; i < matrix.length; i++) {
    let start = 0;
    let end = matrix[0].length - 1;

    while (start < end) {
      [matrix[i][start], matrix[i][end]] = [matrix[i][end], matrix[i][start]];
      start++;
      end--;
    }
  }



  return matrix;

};
//did self and correct answer - Do it again
console.log(rotate180([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));//[[1,2,3],[4,5,6],[7,8,9]]
/*
  [9, 8, 7]
  [6, 5, 4]
  [3, 2, 1]
*/