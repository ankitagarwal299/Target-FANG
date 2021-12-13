//https://www.youtube.com/watch?v=q2v5nik5vwU
//Use of regex
var mostCommonWord = function (paragraph, banned) {
    if (paragraph == null || paragraph.length == 0) return "";
    let wordMap = new Map();
    let bannedMap = new Map();

    for (let ban of banned) {
        bannedMap.set(ban, true);
    }

    let arr = paragraph.replaceAll(/[^a-zA-Z]+/gi, ' ').trim().toLowerCase().split(' ')
    //After--> bob hit a ball the hit ball flew far after it was hit
    console.log(arr)

    console.log(arr)
    for (let word of arr) {
        wordMap.set(word, wordMap.get(word) + 1 || 1);
    }

    console.log(wordMap)

    let max = -Infinity;
    let ans = "";
    for (let [word] of wordMap.entries()) {

        if (bannedMap.has(word)) continue;
        if (wordMap.get(word) > max) {
            ans = word;
            max = wordMap.get(word);
        }
    }



    return ans;
};