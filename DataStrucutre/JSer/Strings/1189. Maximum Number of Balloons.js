var maxNumberOfBalloons = function (text) {
    const target = "balloon";


    let count = Infinity;

    // const wordDict = {};

    const dict = {};

    // Use a 26 length array to keep track of character counts
    let countByCharArr = Array(26).fill(0);

    for (let char of target) {
        dict[char] = dict[char] ? dict[char] + 1 : 1;
    }

    // Load character counts into arr
    for (let char of text) {
        countByCharArr[char.charCodeAt(0) - 97]++;
    }

    for (let i = 0; i < countByCharArr.length; i++) {
        let char = String.fromCharCode(i + 97);

        if (dict[char]) {

            let currCharCount = Math.floor(countByCharArr[i] / dict[char]);
            count = Math.min(count, currCharCount);
        }
    }

    return count;
};

console.log("COUNT ----", maxNumberOfBalloons("loonbalxballpoon"));