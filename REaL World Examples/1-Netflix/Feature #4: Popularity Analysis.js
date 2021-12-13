//DIY: Monotonic Array
function identifyTitles(scores) {
    let increasing = true;
    let decreasing = true;

    for (let i = 0; i < scores.length - 1; i++) {
        if (scores[i] < scores[i + 1]) {
            decreasing = false;
        }
        if (scores[i] > scores[i + 1]) {
            increasing = false;
        }
    }

    return (increasing || decreasing);

}

// Driver code
var movieRatings = [
    [1, 2, 2, 3],
    [4, 5, 6, 3, 4],
    [8, 8, 7, 6, 5, 4, 4, 1]
]

//very easy
for (let i = 0; i < movieRatings.length; i++) {
    if (identifyTitles(movieRatings[i])) {
        console.log("Title Identified and Separated, it is either increasing or decreasing");
    } else {
        console.log("Title Score Fluctuating");
    }
}

/*
Time complexity	    Space complexity
O(k*n)    	        O(1)

where k  is the totat list and n is the scores in each list
 */
