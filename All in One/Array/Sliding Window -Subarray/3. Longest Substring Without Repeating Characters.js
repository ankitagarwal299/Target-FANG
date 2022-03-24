//https://www.callicoder.com/longest-substring-without-repeating-characters/
//https://www.youtube.com/watch?v=9Kc0eZBGL1U


var lengthOfLongestSubstring = function (s) {
    if (s == null || s.length == 0) return 0;

    let longSubstr = -1;

    let charMap = new Map();
    let start = 0;

    for (let end = 0; end < s.length; end++) {
        let char = s.charAt(end);
        charMap.set(char, charMap.get(char) + 1 || 1);

        while (charMap.size < end - start + 1) {
            let char = s.charAt(start);

            charMap.set(char, charMap.get(char) - 1);
            if (charMap.get(char) == 0) {
                charMap.delete(char);
            }
            start++;
        }

        if (charMap.size == end - start + 1) {
            longSubstr = Math.max(longSubstr, end - start + 1);
        }
    }
    return longSubstr;
};

//Do this after 340. Longest Substring with At Most K Distinct Characters.js