//https://www.youtube.com/watch?v=RElcqtFYTm0

var maximalSquare = function (matrix) {
  if (matrix == null || matrix.length == 0) return;

  let largestSquare = 0;

  const dp = Array(matrix.length)
    .fill(0)
    .map(() => Array(matrix.length).fill(0));

  for (let i = 0; i < matrix.length; i++) {
    dp[0][i] = matrix[0][i];
  }

  for (let i = 0; i < matrix.length; i++) {
    dp[i][0] = matrix[i][0];
  }

  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[i].length; j++) {
      if (matrix[i][j] == 1) {
        dp[i][j] = 1 + Math.min(matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i][j - 1]);
        largestSquare = largestSquare >= dp[i][j] ? largestSquare : dp[i][j]
      }
    }
  }

  return largestSquare * largestSquare;
};

var island = [
  [1, 0, 1, 0, 0],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0],
];
console.log(maximalSquare(island));
