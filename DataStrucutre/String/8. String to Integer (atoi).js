/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
    if (!(0 <= str.length <= 200)) return;

    let MAX_INT = (2 ** 31) - 1;
    let MIN_INT = -(2 ** 31);

    let i = 0;
    let res = 0;
    let negative = 1;

    //whitespace check
    while (i < str.length && str[i] == ' ') {
        i++;
    }

    // check symbol +,-
    if (i < str.length && str[i] == '-') {
        i++;
        negative = -1;
    } else if (i < str.length && str[i] == '+') {
        i++;
        negative = 1;
    }

    //check number
    let checker = new Set('0123456789');
    while (i < str.length && checker.has(str[i])) {
        if (res > Math.floor(MAX_INT / 10) || (res == Math.floor(MAX_INT / 10) && Number(str[i]) > 7)) {
            console.log("sfsf", str[i]);
            return (negative == 1) ? MAX_INT : MIN_INT;
        }
        res = res * 10 + +str[i];
        i += 1;
    }

    return res * negative;
};

console.log(myAtoi("4193 with words"));
console.log(myAtoi("words and 987"));
console.log(myAtoi("-91283472332"));
console.log(myAtoi("-42"));
console.log(myAtoi("   -42"))
console.log(myAtoi("2147483648"));//2147483647