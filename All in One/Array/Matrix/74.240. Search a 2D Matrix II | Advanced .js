
//https://www.callicoder.com/binary-search-row-wise-column-wise-sorted-matrix/
//https://www.youtube.com/watch?v=iZ4xURJa0oQ
//Pepcoding

var searchMatrix = function (matrix, target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;

    let row = 0;
    let col = matrix[0].length - 1;

    while (row <= matrix.length - 1 && col >= 0) {
        if (target == matrix[row][col]) return true;
        else if (target > matrix[row][col]) {
            row++;
        } else {
            col--;
        }
    }

    return false;
};