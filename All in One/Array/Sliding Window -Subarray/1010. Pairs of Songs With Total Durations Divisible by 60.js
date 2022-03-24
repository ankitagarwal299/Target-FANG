var numPairsDivisibleBy60 = function (arr) {
    if (arr == null || arr.length == 0) return 0;

    let remFreq = {};
    for (let i = 0; i < arr.length; i++) {

        let rem = arr[i] % 60;

        //if (rem < 0) rem += k;//Imp

        if (remFreq[rem]) {
            remFreq[rem] += 1;
        } else {

            remFreq[rem] = 1;
        }
    }

    let pairCount = 0;
    for (let prop in remFreq) {

        if (prop == 0) {//eg 10/10
            // special case, count every possible pair: (x * (x - 1)) / 2
            pairCount += (remFreq[prop] * (remFreq[prop] - 1)) / 2;

        } else if (2 * prop == 60) { //eg 10/2

            pairCount += (remFreq[prop] * (remFreq[prop] - 1)) / 2;

        }
        else if (remFreq[60 - prop]) {
            pairCount += remFreq[prop] * remFreq[60 - prop];
            remFreq[60 - prop] = 0;
        }
    }


    return pairCount;
};
//similar to 1497. Check If Array Pairs Are Divisible by k || Tricky Easy.js
//https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60/discuss/964990/Heavily-commented-JavaScript-solution