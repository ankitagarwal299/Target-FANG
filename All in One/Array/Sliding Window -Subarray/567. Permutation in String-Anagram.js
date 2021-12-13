//Easy https://www.youtube.com/watch?v=XFh_AoEdOTw
var checkInclusion = function (s1, s2) {
    if (s1 == null || s2 == null || s1.length == 0 || s2.length == 0 || s1.length > s2.length) return false;

    let s1Hash = new Array(26).fill(0);
    let s2Hash = new Array(26).fill(0);


    for (let i = 0; i < s1.length; i++) {
        s1Hash[s1[i].charCodeAt() - 'a'.charCodeAt()]++;
    }

    let start = 0;

    for (let end = 0; end < s2.length; end++) {
        s2Hash[s2[end].charCodeAt() - 'a'.charCodeAt()]++;

        if (end - start + 1 == s1.length) {
            if (s1Hash.join('') == s2Hash.join('')) return true;

            s2Hash[s2[start].charCodeAt() - 'a'.charCodeAt()]--;
            start++
        }
    }
    return false;
};





//Below one doesnot work for longer strings
var checkInclusion = function (s1, s2) {
    if (s1 == null || s2 == null || s1.length == 0 || s2.length == 0 || s1.length > s2.length) return false;

    function charMapping() {
        let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
        let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

        let zip = {};
        for (let i = 0; i < primes.length; i++) {
            zip[chars[i]] = primes[i];
        }
        return zip;
    }



    function computeAnagram(word, charMap) {
        let product = 1;
        for (let i = 0; i < word.length; i++) {
            product *= charMap[word.charAt(i)];
        }
        console.log(product);

        return product;
    }

    let charMap = charMapping();

    let s1prime = computeAnagram(s1, charMap);//original word

    let found = false;
    let end = s1.length - 1;
    for (let start = 0; start < s2.length; start++) {
        // console.log(s1prime, computeAnagram(s2.substring(start, end + 1), charMap));

        if (s1prime == computeAnagram(s2.substring(start, start + end + 1), charMap)) {
            found = true;
        }
    }

    return found === true;
};




//console.log(checkInclusion("ab", "eidbaooo"));
//console.log(checkInclusion("a", "ab"));

/* If it is a really long word then it will throw error product is infinity */
console.log(
    checkInclusion("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdef", "bcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg"));
