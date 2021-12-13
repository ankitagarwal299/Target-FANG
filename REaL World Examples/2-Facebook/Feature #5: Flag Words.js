//DIY: Expressive words
var expressiveWords = function (s, words) {
    if (s == null || s.length == 0 || words.length == 0) return false;


    function count(index, word) {
        let currIndex = index;

        while (currIndex < word.length) {
            if (word[index] != word[currIndex]) break;

            currIndex++;
        }
        return currIndex - index;
    }

    function isStretchy(morphed, word) {
        let i = 0;
        let j = 0;

        while (i < morphed.length && j < word.length) {
            if (morphed[i] != word[j]) return false;
            let morphedCountA = count(i, morphed);
            let originalCountB = count(j, word);
            if (morphedCountA < originalCountB || (morphedCountA < 3 && morphedCountA > originalCountB)) return false;//only this condition important

            i = i + morphedCountA;
            j = j + originalCountB;


        }
        return i == morphed.length && j == word.length;


    }



    let noQueryStrStretchy = 0;
    for (let i = 0; i < words.length; i++) {
        if (isStretchy(s, words[i])) {
            noQueryStrStretchy++;
        }
    }
    return noQueryStrStretchy;
};

console.log(expressiveWords("heeellooo", ["hello", "hi", "helo"]));
console.log(expressiveWords("zzzzzyyyyy", ["zzyy", "zy", "zyy"]));