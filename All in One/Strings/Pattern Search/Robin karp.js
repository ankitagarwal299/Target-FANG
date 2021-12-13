/*
Rabin - Karp is dependent on the choice of the hash function
maximum sub-palindrome
longest sub string
O(m.n) - worst case, if hash is not strong
O(m + n)

KMP


The most important difference between them is how reliable they are in finding a match.
KMP guarantees 100% reliability. You cannot guarantee 100% with Rabin Karp because of a chance
 of collision during hash table lookup. But with good hash generation algorithms that do exist today,
 it is possible that Rabin Karp can yield very close to 100% reliability in finding a match.

 And both have complexity of O(n). Also Rabin Karp is easier to implement than KMP it works based on a rolling hash whereas KMP works based on a failure function.
 */


//https://www.youtube.com/watch?v=H4VrKHVG5qI&t=176s
//https://github.com/mission-peace/interview/blob/master/src/com/interview/string/RabinKarpSearch.java
function createHash(str, len) {
    let prime = 101;
    let hash = 0;
    for (let i = 0; i < len; i++) {
        // hash = hash + ((str.charCodeAt(i) - 'a'.charCodeAt(0) + 1) * Math.pow(prime, i));
        hash = hash + (str[i] * Math.pow(prime, i));

    }
    return hash;
}

function checkEqual(str, pattern, start, len) {
    for (let j = 0; j < len; j++) {
        if (str[start + j] != pattern[j]) {
            return false;
        }
    }
    return true;
}

function recalculateHash(str, oldHash, oldIndex, pattern) {
    let prime = 101;
    // let newHash = oldHash - (str.charCodeAt(oldIndex) - 'a'.charCodeAt(0) + 1);
    let newHash = oldHash - str[oldIndex];
    newHash = newHash / prime;
    // newHash = newHash + ((str.charCodeAt(oldIndex + pattern.length) - 'a'.charCodeAt(0) + 1) * Math.pow(prime, pattern.length - 1));
    newHash = newHash + (str[oldIndex + pattern.length] * Math.pow(prime, pattern.length - 1));

    return newHash;

}


function RabinKarpSearch(text, pattern) {
    // convert string to char code array
    const charArr = [...text].map(x => (x.charCodeAt() - 'a'.charCodeAt()) + 1);
    const patternArr = [...pattern].map(x => (x.charCodeAt() - 'a'.charCodeAt()) + 1);

    console.log(charArr);


    let m = pattern.length;
    let n = charArr.length;
    let patternHash = createHash(patternArr, pattern.length);
    let textHash = createHash(charArr, pattern.length);


    for (let i = 0; i <= charArr.length - pattern.length; i++) {
        if (patternHash == textHash && checkEqual(charArr, patternArr, i, pattern.length)) {
            console.log("Pattern found at index " + i);
            return i;
        }

        if (i < n - m) {
            textHash = recalculateHash(charArr, textHash, i, pattern);
        }
    }
    return -1;
}

console.log(RabinKarpSearch("abedabc", "abc"));
console.log(RabinKarpSearch("tusharroy", "sharroy"));
console.log(RabinKarpSearch("tusharroy", "roy"));
console.log(RabinKarpSearch("tusharroy", "shas"));
console.log(RabinKarpSearch("tusharroy", "usha"));
console.log(RabinKarpSearch("tusharroy", "tus"));