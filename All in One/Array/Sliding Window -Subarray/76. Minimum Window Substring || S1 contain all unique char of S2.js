

//-----Related------
//438. Find All Anagrams in a String.js
//8.Count Occurrences of Anagram (similar)

//https://www.youtube.com/watch?v=pbUNTDdxomI&list=PL-Jc9J83PIiEp9DKNiaQyjuDeg3XSoVMR&index=10

var minWindow = function (s, t) {
    if (s == null || t == null || s.length == 0 || t.length == 0) return "";

    let windowMap = new Map();
    let targetMap = new Map();

    let minLeng = Infinity;


    // start index of the minimum window substring
    let minWindowSubstrStart = 0;

    for (let i = 0; i < t.length; i++) {
        let char = t.charAt(i);
        targetMap.set(char, targetMap.get(char) + 1 || 1);
    }


    function compare(windowMap, tMap) {
        //if(windowMap.size != tMap.size) return false;//should not check size

        for (let [key, value] of tMap.entries()) {
            if (!(windowMap.has(key))) return false;
            //if (value > windowMap.get(key)) return false;
        }
        return true;
    }

    let start = 0;
    for (let end = 0; end < s.length; end++) {

        let char = s.charAt(end);
        windowMap.set(char, windowMap.get(char) + 1 || 1);

        // Keep looking for a smaller window
        // while the current window substring contains all the characters of t
        while (compare(windowMap, targetMap)) {
            if (end - start + 1 < minLeng) {
                minLeng = end - start + 1;
                minWindowSubstrStart = start;//this is important
            }

            let char1 = s.charAt(start);
            windowMap.set(char1, windowMap.get(char1) - 1);

            if (windowMap.get(char1) == 0) {
                windowMap.delete(char1);
            }
            start++;
        }
    }
    if (minLeng == Infinity) return "";
    return s.substring(minWindowSubstrStart, minWindowSubstrStart + minLeng);
};
//You have to find the smallest window length that contains all the unique characters of the given string.
console.log(minWindow("bbacacdcbbcaadcdca", "abcd"));//acdcb
