/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {

    if (points == null || points.length == 0) return points;

    if (points.length < 2) return 1;

    //sort with end point
    points.sort((a, b) => a[1] - b[1]);

    let arrow = 1;
    let end = points[0][1];

    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            //need another arrow
            arrow++;
            end = points[i][1];
        }
    }

    return arrow;
};
//https://www.youtube.com/watch?v=Z9o-lqwgSWA
console.log(findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]]));
console.log(findMinArrowShots([[1, 2], [3, 4], [5, 6], [7, 8]]));

console.log(findMinArrowShots([[1, 2], [2, 3], [3, 4], [4, 5]]));

console.log(findMinArrowShots([[1, 2]]));
console.log(findMinArrowShots([[2, 3], [2, 3]]));

