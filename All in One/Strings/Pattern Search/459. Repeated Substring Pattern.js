//KMP IMplementation
var repeatedSubstringPattern = function (s) {
    const lps = [0];
    let i = 1, len = 0;

    while (i < s.length) {
        if (s[i] === s[len]) {
            i++; len++;
            lps.push(len);
        } else if (len > 0) len = lps[len - 1];
        else {
            i++;
            lps.push(0);
        }
    }

    console.log(lps);

    const lastLPS = lps[lps.length - 1];//last 
    const prefixLen = s.length - lastLPS;//total repeated last index

    if (!lastLPS) return false;
    return s.length % prefixLen === 0;
};

console.log(repeatedSubstringPattern("abab"));
console.log(repeatedSubstringPattern("aba"));

console.log(repeatedSubstringPattern("abcabcabcabc"));

