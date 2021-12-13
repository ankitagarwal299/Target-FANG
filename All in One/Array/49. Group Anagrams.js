var groupAnagrams = function (strs) {
    if (strs == null || strs.length < 2) return [strs];

    let result = [];

    let charMap = assignMap();

    let storeCommonWords = new Map();

    for (let i = 0; i < strs.length; i++) {
        let prime = computePrime(strs[i], charMap);

        if (storeCommonWords.has(prime)) {
            storeCommonWords.get(prime).push(strs[i]);//here don't need to set just push
        } else {
            storeCommonWords.set(prime, [strs[i]]);
        }
    }

    for (let [key, values] of storeCommonWords.entries()) {
        result.push(values);
    }

    return result;
};

function computePrime(word, charMap) {
    let product = 1;

    for (let char of word) {
        product *= charMap[char];
    }
    return product;
}

function assignMap() {
    let zip = {};
    let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
    let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    for (let [idx, char] of chars.entries()) {
        zip[char] = primes[idx];
    }
    return zip;
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log(groupAnagrams([""]));

console.log(groupAnagrams(["a"]));

//-------------------------------------------------------------242. Valid Anagram.js
//242. Valid Anagram.js
var isAnagram = function (s, t) {
    if (s == null || t == null || s.length != t.length) return false;

    let smap = new Map();
    for (let char of s) {
        smap.set(char, smap.get(char) + 1 || 1);
    }


    for (let char of t) {
        if (smap.has(char)) smap.set(char, smap.get(char) - 1);////here need to set just push
        //if (smap.has(char)) smap.get(char) - 1;Not working
    }

    console.log(smap)

    for (let [key, value] of smap.entries()) {
        if (value != 0) return false;
    }
    return true;
};

