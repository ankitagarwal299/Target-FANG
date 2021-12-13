

//56. Merge Intervals
//Only question is about Merge overlapping  Meetings -- leetcode 56 (Thiis is final approach/good)-
var merge = function (meetingsA) {
    if (meetingsA?.length < 2) return meetingsA;

    meetingsA.sort((a, b) => a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

    let intersectionArray = [];

    function getIntersection(meetingsA, meetingsB) {
        return meetingsA[1] >= meetingsB[0];
    }

    let i = 1;
    while (i < meetingsA.length) {
        if (intersectionArray.length == 0) {
            intersectionArray.push(meetingsA[0]);
        } else {
            let prevInterval = intersectionArray[intersectionArray.length - 1];
            let intersection = getIntersection(prevInterval, meetingsA[i]);
            if (intersection) {
                prevInterval[1] = Math.max(prevInterval[1], meetingsA[i][1]);//Very strange,array updating eventhough we get it inito another variable
            } else {
                intersectionArray.push(meetingsA[i]);
            }
            i++;
        }
    }
    return intersectionArray;
};

// Driver code
var meetingsA = [[0, 2], [5, 10], [13, 23], [24, 25]];
console.log(meetingsIntersection(meetingsA))//[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

//Pepcoding - Easy
//https://www.youtube.com/watch?v=_FkR5zMwHQ0