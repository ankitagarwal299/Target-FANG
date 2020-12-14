var groupAnagrams = function (words) {
    let result = [];
    let anagramMap = {};
    let chars = assignCharsToPrimes();

    function computeAnagramNumber(str) {
        let result = 1;
        for (let i = 0; i < str.length; i++) {
            let letter = str[i];
            result *= chars[str[letter]];
        }
        return result;
    }

    for (let i = 0; i < words.length; i++) {
        let anagramNum = computeAnagramNumber(word);

        if (anagramMap[anagramNum]) {
            anagramMap[anagramNum].push(word);
        } else {
            anagramMap[anagramNum] = [word];//initialize with []
        }
    }

    for (let num in anagramMap) {
        result.push(anagramMap[num])
    }
    return result;



};

function assignCharsToPrimes() {
    let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
    let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let zip = {};
    for (let i = 0; i < chars.length; i++) {
        let char = chars[i];
        zip[char] = primes[i];
    }
    return zip;
}

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log(groupAnagrams([""]));

console.log(groupAnagrams(["a"]));




//ES6


function groupAnagrams(words) {
    let anagramMap = new Map();
    let charMap = assignCharsToPrime();

    function computeAnagramNum(word) {
        let result = 1;
        for (let i = 0; i < word.length; i++) {

            result *= charMap.get(word[i]);
        }
        // console.log(result);
        return result;
    }

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        //get prime
        let anagramNum = computeAnagramNum(word);
        if (anagramMap.has(anagramNum)) {
            anagramMap.get(anagramNum).push(word);
        } else {
            anagramMap.set(anagramNum, [word]);
        }
    }

    //  console.log(anagramMap);
    let result = [];
    for (let [key, value] of anagramMap) {
        result.push(anagramMap.get(key));
    }

    return result;

}

function assignCharsToPrime() {
    let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
    let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; let zip = new Map();
    for (let i = 0; i < chars.length; i++) {
        zip.set(chars[i], primes[i]);
    }

    return zip;
}



console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log(groupAnagrams([""]));

console.log(groupAnagrams(["a"]));

