//https://www.youtube.com/watch?v=D6dCOa_gMoY
//https://github.com/mission-peace/interview/blob/master/src/com/interview/string/SubstringSearch.java

function LPS(pattern) {
    let longPrefixTable = new Array(pattern.length).fill(0);

    let i = 0;
    let j = 1;

    while (j < pattern.length) {
        if (pattern.charAt(i) == pattern.charAt(j)) {
            longPrefixTable[j] = i + 1;
            i += 1;
            j += 1;
        } else {
            if (i != 0) {
                i = longPrefixTable[i - 1];
            } else {
                longPrefixTable[j] = 0;
                j++;
            }
        }
    }
    console.log(longPrefixTable);
    return longPrefixTable;
}


function KMP(word, pattern) {

    let lps = LPS(pattern);
    console.log(lps);

    let i = 0;
    let j = 0;

    while (i < word.length && j < pattern.length) {
        if (word.charAt(i) == pattern.charAt(j)) {
            i++;
            j++;
        } else {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    console.log("sdfsdf", word[0]);

    return j == pattern.length ? true : false;
}



let word = "acbacxabcdabxabcdacbacdabcy";
let pattern = "acbacdabcy";

console.log(KMP(word, pattern));
