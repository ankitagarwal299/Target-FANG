//https://www.callicoder.com/longest-substring-with-k-distinct-characters/
//https://www.youtube.com/watch?v=SIh3RfFPQwU

//https://www.callicoder.com/longest-substring-with-k-distinct-characters/
//https://www.youtube.com/watch?v=SIh3RfFPQwU

function findLengthOfLongestSubstringWithKUniqueCharacters(str, k) {
    if (str == null || str.length == 0) return "";

    let longestSubStr = -1;

    let charMap = new Map();

    let windowSize = k;

    let start = 0;
    for (let end = 0; end < str.length; end++) {
        let char = str.charAt(end);
        charMap.set(char, charMap.get(char) + 1 || 1);

        while (charMap.size > windowSize) {
            let char = str.charAt(start);

            charMap.set(char, charMap.get(char) - 1);

            if (charMap.get(char) == 0) {
                charMap.delete(char);
            }
            start++;// Shrink the window 
        }

        if (charMap.size == windowSize) {
            longestSubStr = Math.max(longestSubStr, end - start + 1);
        }

    }
    return longestSubStr;
}
console.log(findLengthOfLongestSubstringWithKUniqueCharacters("aabacbebebe", 3));
console.log(findLengthOfLongestSubstringWithKUniqueCharacters("aaaa", 2));



