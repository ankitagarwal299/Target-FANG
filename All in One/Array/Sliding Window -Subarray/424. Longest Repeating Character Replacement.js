////Do this after

var characterReplacement = function (s, k) {
    if (s == null || s.length == 0) return 0;

    let longSubstr = -1;
    let maxrepeat = 0;

    let charMap = new Map();
    let start = 0;

    for (let end = 0; end < s.length; end++) {
        let char = s.charAt(end);
        charMap.set(char, charMap.get(char) + 1 || 1);

        maxrepeat = Math.max(maxrepeat, charMap.get(char));

        while (end - start + 1 - maxrepeat > k) {
            let char = s.charAt(start);

            charMap.set(char, charMap.get(char) - 1);

            if (charMap.get(char) == 0) {
                charMap.delete(char);
            }
            start++;
        }

        longSubstr = Math.max(longSubstr, end - start + 1);

    }
    return longSubstr;
};




/*
340. Longest Substring with At Most K Distinct Characters.js
3. Longest Substring Without Repeating Characters.js
*/

//https://www.callicoder.com/longest-substring-without-repeating-characters/