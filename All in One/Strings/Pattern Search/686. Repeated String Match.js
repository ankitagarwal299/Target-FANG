//686. Repeated String Match

//An efficient way to build the algorithm checking only wen minimum requirement is satisfied
var repeatedStringMatch = function (a, b) {
    let originStr = a;
    let times = 1;
    while (a.length < b.length) {
        a += originStr;
        times += 1;
    }

    //check here if a is of length b , otherwise add 1more time till a.length + b.length
    //Max its length can be 

    /*  Let's take this example:
     a = abc, len(3)
     b = cabcabca, len(8)
     so we need our string a of length between(8 and 11) max length allowed abcabcabcab
 
     [abc][abc][abc], len(9) min lenght needed, but not match
     [abc][abc][abc][abc], len(12), if this string doesn't have B we can say never will. */


    if (a.indexOf(b)) {
        return times;
    } else {
        a += origin;
        times++;
        return a.indexOf(b) ? times : -1;
    }

};

console.log(repeatedStringMatch("abcd", "cdabcdab"));
console.log(repeatedStringMatch("a", "aa"));
console.log(repeatedStringMatch("a", "a"));
console.log(repeatedStringMatch("abc", "wxyz"));

//https://www.youtube.com/watch?v=g69RRfSWFxM
