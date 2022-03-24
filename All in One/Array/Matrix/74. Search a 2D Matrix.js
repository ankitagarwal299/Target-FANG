var searchMatrix = function (matrix, target) {
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return false;

    function findRowBinarySearch() {
        let start = 0;
        let end = matrix.length - 1;

        while (start <= end) {
            let mid = start + Math.floor((end - start) / 2);

            if (matrix[mid][0] <= target && target <= matrix[mid][matrix[0].length - 1]) {
                return mid;
            } else if (target < matrix[mid][0]) {
                end = mid - 1;
            } else if (target > matrix[mid][0]) {
                start = mid + 1;
            }
        }
        return -1;
    }

    let row = findRowBinarySearch();
    console.log(row)
    if (row == -1) return false;

    let start = 0;
    let end = matrix[row].length - 1;
    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);

        if (matrix[row][mid] == target) {
            return true;
        } else if (matrix[row][mid] < target) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return false;
};
//https://www.youtube.com/watch?v=EmpwQ4C6WJs
//Pepcoding