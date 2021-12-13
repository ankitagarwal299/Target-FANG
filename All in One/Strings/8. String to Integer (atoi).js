/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function (str) {
    if (str == null || str.length == 0 || str.length > 200) {
        //given validation
        return 0;
    }

    let MAX_INT = 2 ** 31 - 1;
    let MIN_INT = -(2 ** 31);

    function divide(num) {
        if (num < 0) {
            return Math.ceil(num / 10);
        } else {
            return Math.floor(num / 10);
        }
    }

    let i = 0;
    let sign = 1;
    let result = 0;
    //1st loop
    while (i < str.length && str[i] == ' ') {
        i++;
    }

    if (str[i] == '-' || str[i] == '+') {
        sign = (str[i] == '-') ? -1 : 1;
        i++;

    }
    //2nd loop
    while (i < str.length && (str[i].charCodeAt() - "0".charCodeAt() >= 0) && (str[i].charCodeAt() - "0".charCodeAt() <= 9)) {

        //always positive
        if (result > divide(MAX_INT) || ((result == divide(MAX_INT) && Number(str[i]) > 7))) {
            return (sign == 1) ? 2147483647 : -2147483648;
        }

        result = result * 10 + Number(str[i]);
        i++;//impoortant
    }



    return result * sign;
};

//Time : O(n)
//Space: O(1)
//Time : O(n)
//Space: O(1)

//https://www.youtube.com/watch?v=zwZXiutgrUE
console.log(myAtoi("4193 with words"));
console.log(myAtoi("words and 987"));
console.log(myAtoi("-91283472332"));
console.log(myAtoi("-42"));
console.log(myAtoi("   -42"))
console.log(myAtoi("2147483648"));//2147483647
console.log(myAtoi("+-+2"));//0