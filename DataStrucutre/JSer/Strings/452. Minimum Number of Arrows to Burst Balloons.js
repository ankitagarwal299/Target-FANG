var findMinArrowShots = function (points) {
    if (points == null || points.length == 0) return 0;

    points.sort((a, b) => {
        return a[0] - b[0];
    });

    let arrows = 1;
    let end = points[0][1];
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            arrows += 1;
            end = points[i][1];
        }
    }

    return arrows;
};

console.log(findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]]));
console.log(findMinArrowShots([[1, 2], [3, 4], [5, 6], [7, 8]]));

console.log(findMinArrowShots([[1, 2], [2, 3], [3, 4], [4, 5]]));

console.log(findMinArrowShots([[1, 2]]));
console.log(findMinArrowShots([[2, 3], [2, 3]]));

