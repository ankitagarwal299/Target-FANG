/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {

    let i = 0;
    let isNegative = false;
    let resultNum = 0;

    const MAX_INT = 2 ** 31 - 1;//2147483647
    const MIN_INT = -(2 ** 31);//2147483648

    while (i < s.length && s[i] == ' ') i++;

    if (s[i] == '+' || s[i] == '-') {
        isNegative = s[i] == '+' ? false : true;
        i++;
    }

    while (i < s.length && s[i] == '0') i++;

    while (i < s.length && isNum(s[i])) {

        const digit = s[i].charCodeAt() - "0".charCodeAt();

        if (resultNum > Math.floor(MAX_INT / 10) || (resultNum == Math.floor(MAX_INT / 10) && digit > 7)) {
            console.log(resultNum)
            return isNegative ? MIN_INT : MAX_INT;
            //result is more than 214748364
            //or equal to 214748364 and coming char is more than 7, ie going to exceed 2147483647

            //s ="2147483648" => 2147483647
        }

        resultNum = resultNum * 10 + digit;

        i++;
    }

    return isNegative ? resultNum * -1 : resultNum;
}

function isNum(char) {

    const curNumCharCode = char.charCodeAt(0);

    if (curNumCharCode >= "0".charCodeAt(0) && curNumCharCode <= "9".charCodeAt(0)) {

        return true
    }

    return false;
}

//https://www.youtube.com/watch?v=zwZXiutgrUE
console.log(myAtoi("4193 with words"));
console.log(myAtoi("words and 987"));
console.log(myAtoi("-91283472332"));
console.log(myAtoi("-42"));
console.log(myAtoi("   -42"))
console.log(myAtoi("2147483648"));//2147483647
console.log(myAtoi("+-+2"));//0