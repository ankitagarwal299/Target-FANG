var removeCoveredIntervals = function (intervals) {
    if (intervals == null || intervals.length == 0) return;

    if (intervals.length == 1) return 1;

    intervals.sort((a, b) => (a[0] != b[0]) ? (a[0] - b[0]) : (a[1] - b[1]));

    let curr = [-1, -1];
    let result = 0;
    for (let int of intervals) {
        //only condition if both are greater than count +1 else take max end 
        if ((int[0] > curr[0]) && (int[1] > curr[1])) {
            curr[0] = int[0];
            result += 1;
        }
        curr[1] = Math.max(curr[1], int[1]);
    }

    return result;
};

console.log(removeCoveredIntervals([[1, 4], [3, 6], [2, 8]]));
console.log(removeCoveredIntervals([[1, 4], [2, 3]]));

console.log(removeCoveredIntervals([[0, 10], [5, 12]]));
console.log(removeCoveredIntervals([[3, 10], [4, 10], [5, 11]]));

console.log(removeCoveredIntervals([[1, 2], [1, 4], [3, 4]]));