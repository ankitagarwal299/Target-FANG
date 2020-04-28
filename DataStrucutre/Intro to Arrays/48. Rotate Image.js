var rotate = function (matrix) {
    let N = matrix.length;
  
    //Step 1 - Transpose Matrix, turn rows to columns
    for (let i = 0; i < N; i++) {
      for (let j = i; j < N; j++) {
        let temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }
  
    //Step 2 - Flip horizontal colums 1st and last , then inner two
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < (N / 2); j++) {
        let temp = matrix[i][j];
        matrix[i][j] = matrix[i][N - 1 - j];
        matrix[i][N - 1 - j] = temp;
      }
    }
  
    return matrix;
  }
  
  var matrix = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ];
  
  console.log(rotate(matrix));

/* 
Given input matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

rotate the input matrix in-place such that it becomes:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
 */
