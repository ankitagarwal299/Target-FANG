/* Most asked question, TWO POINTER STARTEGY, EASY*/


var intervalIntersection = function (meetingsA, meetingsB) {
    if (meetingsA?.length == 0 || meetingsB?.length == 0) return [];

    let intersectionArray = [];
    let i = 0;
    let j = 0;

    function getIintersection(meetingsA, meetingsB) {
        console.log(`${meetingsA[1]} <= ${meetingsB[0]}, ${meetingsA[0]} >= ${meetingsB[1]}`)
        if (meetingsA[1] < meetingsB[0] || meetingsA[0] > meetingsB[1]) return false;
        let start = Math.max(meetingsA[0], meetingsB[0]);//bigger in timeline
        let end = Math.min(meetingsA[1], meetingsB[1]);//smaller in timeline
        return [start, end];
    }


    while (i < meetingsA.length && j < meetingsB.length) {

        let intersection = getIintersection(meetingsA[i], meetingsB[j]);
        console.log(intersection)
        if (intersection) {
            intersectionArray.push(intersection);
        }

        //decision to increment indexes
        if (meetingsA[i][1] < meetingsB[j][1]) {
            i++;
        } else {
            j++;
        }
    }
    return intersectionArray;
};

// Driver code
var meetingsA = [[0, 2], [5, 10], [13, 23], [24, 25]];
var meetingsB = [[1, 5], [8, 12], [15, 24], [25, 26]]
console.log(meetingsIntersection(meetingsA, meetingsB))//[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

//TEch Dose - Do on paper all 3 cases
//https://www.youtube.com/watch?v=Qh8ZjL1RpLI&t=45s