//Q. Remove overlap events, purpose is to keep loongest events


//Working, but that if condition doesnot looks goood
var removeCoveredIntervals = function (intervals) {
    let coveredInterval = 1;
    if (intervals == null || intervals.length == 0) return 0;

    intervals.sort((a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

    let prevInterval = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        let curr = intervals[i];

        if (prevInterval[0] <= curr[0] && curr[1] <= prevInterval[1]) {


        } else {
            coveredInterval++;
            prevInterval = intervals[i];
        }
    }
    return coveredInterval;
};
//OR
//1288. Remove Covered Intervals - I like below one simple
var removeCoveredIntervals = function (intervals) {
    let canAttendInterval = 1;
    if (intervals == null || intervals.length == 0) return 0;

    intervals.sort((a, b) => a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);//important sorting if same start point then interested in Greater END time

    let prevInterval = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
        let curr = intervals[i];

        if (prevInterval[1] < curr[1]) {//next event finishing after previous event that means NOT overlapping
            canAttendInterval++;
            prevInterval = intervals[i];

        }

    }
    return canAttendInterval;
};