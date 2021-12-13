var findAnagrams = function (s, p) {
    let s1 = p;
    let s2 = s;
    if (s1 == null || s2 == null || s1.length == 0 || s2.length == 0 || s1.length > s2.length) return [];
    let result = [];

    let s1Hash = new Array(26).fill(0);
    let s2Hash = new Array(26).fill(0);


    for (let i = 0; i < s1.length; i++) {
        s1Hash[s1[i].charCodeAt() - 'a'.charCodeAt()]++;
    }

    let start = 0;
    for (let end = 0; end < s2.length; end++) {
        s2Hash[s2[end].charCodeAt() - 'a'.charCodeAt()]++;

        if (end - start + 1 == s1.length) {
            if (s1Hash.join('') == s2Hash.join('')) result.push(start);

            s2Hash[s2[start].charCodeAt() - 'a'.charCodeAt()]--;
            start++
        }
    }
    return result;
};
//same as 567. Permutation in String.js (no change)

//8.Count Occurrences of Anagram (similar) -- https://www.callicoder.com/count-occurrences-of-anagram/

