

//https://leetcode.com/problems/add-binary/discuss/1017596/Detail-Explanation-EASY-Single-Line-97-faster
//https://www.youtube.com/watch?v=YVpTjZRShqo

//Any base addition | Solution
//67. Add Binary - EASY
var addBinary = function (a, b) {
    let base = 2;
    if (a == null || a.length == 0 || b == null || b.length == 0) return a?.length ? a : b;

    let ans = 0;

    //convert string to number
    a = parseInt(a);
    b = parseInt(b);

    let carry = 0;
    let digits = 1;
    while (a > 0 || b > 0 || carry > 0) {

        let r1 = a % 10;//first take remainder then next step carry/quotient
        let r2 = b % 10;//first take remainder then next step carry/quotient

        //new number of next iteration/ quotient
        a = Math.floor(a / 10);
        b = Math.floor(b / 10);

        let finalRemainder = (r1 + r2 + carry) % base;//first take remainder then next step carry
        carry = Math.floor((r1 + r2 + carry) / base);

        ans = (finalRemainder * digits) + ans;
        digits = digits * 10;

        console.log("ans", ans)

    }
    return ans.toString();

};

//Any base subtraction | Solution
//https://www.youtube.com/watch?v=TJtXba11yNU
var substractBinary = function (a, b) {

    let base = 2;
    if (a == null || a.length == 0 || b == null || b.length == 0) return a?.length ? a : b;

    //find bigger number, we need b as bigger number
    if (a < b) {
        let temp = a;
        a = b;
        b = temp;
    }

    let ans = 0;

    //convert string to number
    a = parseInt(a);
    b = parseInt(b);

    let carry = 0;
    let digits = 1;
    while (a > 0 || b > 0 || carry > 0) {

        let r1 = a % 10;//first take remainder then next step carry/quotient
        let r2 = b % 10;//first take remainder then next step carry/quotient

        //new number of next iteration/ quotient
        a = Math.floor(a / 10);
        b = Math.floor(b / 10);

        let finalRemainder = 0;
        r1 = r1 + carry;
        if (r1 > r2) {
            carry = 0;
            finalRemainder = r1 - r2;
        } else {
            carry = carry - 1;
            finalRemainder = r1 + base - r2;
        }

        ans = (finalRemainder * digits) + ans;
        digits = digits * 10;

    }
    return ans.toString();

};

//https://www.youtube.com/watch?v=jKyuWD8XKjw
// Difference of two arrays | Solution | same as above


//125. Valid Palindrome - Easy
//https://www.youtube.com/watch?v=3RQ5ADUKHsY&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=41
var isPalindrome = function (s) {
    if (s == null || s.length < 2) return true;

    function isLetterOrNumber(char) {
        let charCode = char.charCodeAt();
        if ((charCode >= "0".charCodeAt() && charCode <= "9".charCodeAt()) ||
            (charCode >= "a".charCodeAt() && charCode <= "z".charCodeAt()) ||
            (charCode >= "A".charCodeAt() && charCode <= "Z".charCodeAt())
        ) {
            return true;
        }
        return false;
    }


    let i = 0;
    let j = s.length - 1;

    while (i < j) {

        while (i < j && !isLetterOrNumber(s.charAt(i))) {
            i++;
        }


        while (i < j && !isLetterOrNumber(s.charAt(j))) {
            j--;
        }

        if (i < j && s.charAt(i).toLowerCase() != s.charAt(j).toLowerCase()) {
            return false;
        }

        i++;
        j--;
    }

    return true; //if there is no retun or failing condition that means everything is good
};





//680. Valid Palindrome II | if the s can be palindrome after DELETING at most ONE character from it.(Easyyy)
//https://www.youtube.com/watch?v=L_74qbyPHXE
var validPalindrome = function (s) {
    if (s == null || s.length < 3) return true;//after deleting  1char

    function isPalindrome(i, j) {
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                return false;
            }
            i++;
            j--;
        }
        return true
    }

    let i = 0;
    let j = s.length - 1;

    while (i < j) {

        if (s.charAt(i) != s.charAt(j)) {
            return isPalindrome(i + 1, j) || isPalindrome(i, j - 1);
        }
        i++;
        j--

    }
    return true;

};




//https://www.youtube.com/watch?v=THPvg1wLPdw&t=533s
//9. Palindrome Number (Google Engineer Explains) - VVVVVVVIMP questioon - I did my self after watching video
var isPalindrome = function (num) {
    if (num == null || num == 0) return true;
    if (num < 0 || num % 10 == 0) return false; //(provided in contraints)

    //this solution will handle 2**31, -2**31

    let b = 0;
    //traverse half numbers
    while (num > b) {
        let rem = num % 10;
        num = Math.floor(num / 10);

        b = b * 10 + rem;
    }
    return num == b || num == Math.floor(b / 10);
};

/*Even*/
// add.   num.  b
// 1221 ->122.  1
// 122  -> 12  12  true

//1231. -> 123. 1
//123.  -> 12.  13. false

//10.   -> 1.   0/10
//1.    -> 0.   1/10 (code doesnot work , so verify any number ending with 0 is not a palindrom)

/*Odd*/
//121.  -> 12.  1/10  0
//12.   -> 1   12/10  1 true

//110.  -> 11.  0/10  0
//11    ->.1.   1/10. 0 false


Constraints:
-231 <= x <= 231 - 1

Input: x = -121
Output: false
//Explanation: From left to right, it reads - 121. From right to left, it becomes 121 -.Therefore it is not a palindrome.



/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (num) {
    if (num == null) return num;

    let MAX_INT = 2 ** 31 - 1;//2147483647
    let MIN_INT = -(2 ** 31);//-2147483648

    function divide(num) {
        if (num < 0) {
            return Math.ceil(num / 10);
        } else {
            return Math.floor(num / 10);
        }

    }

    let result = 0;
    while (num != 0) {
        let remainder = num % 10;
        num = divide(num);

        if (result > divide(MAX_INT) || result == divide(MAX_INT) && remainder == 7) return 0;
        if (result < divide(MIN_INT) || result == divide(MIN_INT) && remainder == 8) return 0;

        result = result * 10 + remainder;
    }
    return result;
};
//https://www.youtube.com/watch?v=Io9ujnnR4sI&list=PLfAsuXGlNEFX3zfJyCzC0xmda2JlV-vpH


//reverse(123) 
//reverse(-120) 
//reverse(-2147483648) 

/* Caution Negative number division behave weird in javascript */
//eg. -123/10 = -12.3
//eg. Math.floor(-123/10) = -13
//eg. Math.ceil(-123/10 )= -12


//443. String Compression
//https://www.youtube.com/watch?v=IhJgguNiYYk&t=10s
var compress = function (chars) {/* Time Complexity On and Space: O(1) - inplace*/
    /* inplace : asking to modify the input array & return the new length*/
    if (chars == null || chars.length < 2) return 1;

    let index = 0;
    let i = 0;
    while (i < chars.length) {
        let j = i;

        while (j < chars.length && chars[i] == chars[j]) {
            j++;
        }

        chars[index] = chars[i];
        index++;
        if (j - i > 1) {
            let count = (j - i).toString();
            for (let i = 0; i < count.length; i++) {
                chars[index] = count.charAt(i);
                index++;
            }
        }
        i = j;
    }

    console.log(chars.slice(0, index));

    return index
};

//https://www.youtube.com/watch?v=-V_uz9BDud8
//541. Reverse String II - Tricky Do it again - IMP
var reverseStr = function (s, k) {
    if (s == null || s.length < 2) return s;

    let arr = s.split('');//strings are immutable in javascript

    function reverse(i, j, arr) {
        while (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }


    //If there are fewer than k characters left, reverse all of them
    if (k > s.length) {
        reverse(0, s.length - 1, arr);
        return arr.join('');
    }


    for (let i = 0; i < arr.length; i += 2 * k) {
        let start = i; let end = Math.min(i + k - 1, arr.length - 1);

        reverse(start, end, arr);
        console.log(arr)
    }


    return arr.join('');

};




//557. Reverse Words in a String III || Tricky Do it again - IMP
//https://www.youtube.com/watch?v=RgYLxtlkKo8
var reverseWords = function (s) {
    if (s == null || s.length < 2) return s;


    function reverse(i, j) {
        while (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }

    let arr = s.split('');



    let start = 0;
    let end = 0;
    while (end <= arr.length) {
        if (arr[end] == ' ' || end == arr.length) {
            reverse(start, end - 1);
            start = end + 1
        }

        end++;
    }

    return arr.join('');
};
console.log(reverseWoords("the sky is blue"));//"eht yks si eulb"


//186. Reverse Words in a String II | same as above only 1 line added
//https://www.youtube.com/watch?v=RgYLxtlkKo8
var reverseWords = function (s) {
    if (s == null || s.length < 2) return s;


    function reverse(i, j) {
        while (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }

    let arr = s.split('');


    reverse(0, arr.length - 1);//-- This line is added
    let start = 0;
    let end = 0;
    while (end <= arr.length) {
        if (arr[end] == ' ' || end == arr.length) {
            reverse(start, end - 1);
            start = end + 1
        }

        end++;
    }

    return arr.join('');
};
console.log(reverseWoords("the sky is blue"));//"blue is sky the"



//151. Reverse Words in a String | Different Approach || question is same as above, now input string has many spaces and we need to skip spaces
//https://www.youtube.com/watch?v=RgYLxtlkKo8 (not able to do with this method)
//https://www.youtube.com/watch?v=vhnRAaJybpA
var reverseWords = function (s) {
    if (s == null || s.length < 2) return s;

    let result = "";
    let i = 0; let j = 0;

    while (i < s.length) {
        if (s.charAt(i) == ' ') {
            i++;
            continue;
        }
        j = i + 1;

        while (s.charAt(j) != ' ' && j < s.length) j++;

        if (result.length != 0) {
            result = s.substring(i, j) + " " + result;
        } else {
            result = s.substring(i, j)
        }

        i = j + 1;
        console.log(result)
    }
    return result;

};
console.log(reverseWoords("   the sky is blue   "));//"blue is sky the"
console.log(reverseWoords("a good   example"));//"example good a"


//345. Reverse Vowels of a String
var reverseVowels = function (s) {
    if (s == null || s.length < 2) return s;

    function reverse(i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    function isVowel(char) {
        return char.toLowerCase() == "a" || char.toLowerCase() == "e" || char.toLowerCase() == "i"
            || char.toLowerCase() == "o" || char.toLowerCase() == "u";
    }

    let arr = s.split('');

    let i = 0; let j = s.length - 1;
    while (i < j) {
        while (!isVowel(s.charAt(i)) && i < j) i++;
        while (!isVowel(s.charAt(j)) && i < j) j--;

        reverse(i, j);
        console.log(arr)
        i++;
        j--;
    }
    return arr.join('');
}
console.log(reverseVowels("leetcode"));//"leotcede"


//917. Reverse Only Letters
var reverseOnlyLetters = function (S) {
    if (S == null || S.length < 2) return S;

    function isLetter(char) {
        if (char.charCodeAt() >= "A".charCodeAt() && char.charCodeAt() <= "Z".charCodeAt()
            || char.charCodeAt() >= "a".charCodeAt() && char.charCodeAt() <= "z".charCodeAt()) {
            return true;
        }
        return false;
    }

    function reverse(i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    let arr = S.split('');

    let i = 0; let j = arr.length - 1;
    while (i < j) {
        while (i < j && !isLetter(S.charAt(i))) i++;
        while (i < j && !isLetter(S.charAt(j))) j--;

        reverse(i, j);
        i++;
        j--

    }
    return arr.join('');

};

console.log(reverseOnlyLetters("ab-cd"));//"dc-ba"
console.log(reverseOnlyLetters("Test1ng-Leet=code-Q!"));//"Qedo1ct-eeLg=ntse-T!"

//392. Is Subsequence - Very Easy
var isSubsequence = function (s, t) {
    if (s == null || s.length == 0) return true;

    if (s.length > 0 && (t == null || t.length == 0)) return false;


    let i = 0; let j = 0;
    while (j < s.length && i < t.length) {

        if (t.charAt(i) == s.charAt(j)) {
            i++; j++;
        } else {
            i++;
        }

    }
    return j == s.length;

};

//389. Find the Difference - I did myself on 1st try - what a good brain
var findTheDifference = function (s, t) {
    if ((s == null || t == null) || (s.length == 0 && t.length == 0)) return "";

    if (s.length > 0 && t.length == 0) return "";
    if (s.length == 0 && t.length > 0) return t;

    let tFreqArr = new Array(26).fill(0);

    for (let i = 0; i < t.length; i++) {
        let str = t.toLowerCase();
        let index = str.charCodeAt(i) - "a".charCodeAt(0);
        tFreqArr[index]++;
    }
    console.log(tFreqArr);

    for (let i = 0; i < s.length; i++) {
        let str = s.toLowerCase();
        let index = str.charCodeAt(i) - "a".charCodeAt(0);
        tFreqArr[index]--;
    }
    console.log(tFreqArr);

    for (let i = 0; i < tFreqArr.length; i++) {
        if (tFreqArr[i] > 0) {
            return String.fromCharCode(i + "a".charCodeAt(0));
        }
    }
    return "";
};

//383. Ransom Note - contains special chars || Can string be formed another string chars?- VVIMP 
//many use cases - EASY - Visit it again
var canConstructRansomeNote = function (ransomNote, magazine) {
    if (magazine == null || magazine.length == 0) return false;
    if (ransomNote == null || ransomNote.length == 0) return false;

    function isLetter(char) {
        if (char.charCodeAt() >= "a".charCodeAt(0) && char.charCodeAt() <= "z".charCodeAt(0)) return true;
        return false;
    }

    let arr = new Array(26).fill(0);
    for (let i = 0; i < magazine.length; i++) {
        if (!isLetter(magazine.charAt(i))) continue;
        let index = magazine.charCodeAt(i) - "a".charCodeAt(0);
        arr[index]++;
    }

    console.log(arr);
    for (let i = 0; i < ransomNote.length; i++) {
        if (!isLetter(ransomNote.charAt(i))) continue;
        let index = ransomNote.charCodeAt(i) - "a".charCodeAt(0);

        if (arr[index] == 0) return false;
        arr[index]--;
    }
    console.log(arr);
    return true;
};
//https://www.youtube.com/watch?v=bYzvVCfbwXM
console.log(canConstructRansomeNote("give me money", "given the fact, memorize it yen"));//true 
console.log(canConstructRansomeNote("a", "b"));//false 
console.log(canConstructRansomeNote("aa", "bb"));//false 
console.log(canConstructRansomeNote("aa", "aab"));//true (ransome note each char should match message and ransomenote cannot be greater) 


//-----------------------------------------387. First Unique Character/NonRepeating, in a String/Stream----------------------------
//https://www.youtube.com/watch?v=St47WCbQa9M&list=PLi9RQVmJD2fZgRyOunLyt94uVbJL43pZ_ (Kevin) Goood Idea
//This approach is Good, it iterates only keys and it is 26 , even if string is 1million or stream of data
//constant space and constant time
var firstUniqChar = function (s) {
    if (s == null || s.length < 2) return 0;

    let charMap = new Map();

    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);
        if (charMap.has(char)) {
            charMap.set(char, -1);//repeated
        } else {
            charMap.set(char, i);//unique
        }
    }

    //iterate all keys and find min index 
    let minIndex = Number.MAX_SAFE_INTEGER;
    for (let [key, value] of charMap.entries()) {
        if (value > -1 && value < minIndex) minIndex = value;//find and store min index
    }

    //find if all are duplicates? if not then return Unique minimum Index;
    return minIndex == Number.MAX_SAFE_INTEGER ? -1 : minIndex;
};

//This approach is not good, it iterates whole string again suppose 1million chars in string again
var firstUniqChar = function (s) {
    if (s == null || s.length < 2) return 0;

    let charMap = new Map();

    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);
        if (charMap.has(char)) {
            charMap.set(char, -1);//repeated
        } else {
            charMap.set(char, i);//unique
        }
    }

    //iterate again input give and find index >-1 that will be 1st index;

    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);
        if (charMap.get(s.charAt(i)) > -1) return i; //traverse along string and the 1st char with > -1 will be "First Unique Character in a String"
    }

    return -1;
};
console.log(firstUniqChar("loveleetcode"));//2


/* -Stream is of fixed 10 length and everytime
   -New entry will remove 0th index to fit next stream [a,b,c] -> [b,c,d] -> [c,d,e]
   -Also, if deleted 1st unique then what is the next unique
 */
//1429. First Unique Number
class firstUniqNumber {
    charsMap = new Map();
    queue = [];

    constructor(s) {
        for (let i = 0; i < s.length; i++) {
            this.add(s.charAt(i));
        }
    }

    showFirstUnique() {
        let char = this.queue[0];
        while (this.queue.length > 0 && this.charsMap[char] > 1) {
            this.queue.shift();
        }

        if (this.queue.length == 0) return -1;

        return char;
    }

    add(char) {
        this.charsMap.set(char, charsMap.get(char) ? charsMap.get(char) + 1 : 1);
        if (this.charsMap.get(char) == 1) {//add all unique, if it is duplicate then it will be removed while showFirstUnique () method
            this.queue.push(char);
        }

    }

    //if we have delete also then same thing to shrink queue
};


//482. License Key Formatting - Do it again , Easy - start from end and make pair
var licenseKeyFormatting = function (S, K) {
    if (S == null || K == null || K == 0) return S.toUpperCase();

    let i = S.length - 1;
    let reformatted = "";

    let count = 0;
    while (i >= 0) {
        if (S.charAt(i) == "-") {
            i--
            continue;
        }

        if (count != 0 && count % K == 0) {
            reformatted = "-" + reformatted;
            count = 0;
        } else {
            reformatted = S.charAt(i).toUpperCase() + reformatted;
            count++;
            i--;
        }



    }
    return reformatted;

};
//https://www.youtube.com/watch?v=v0Cof91iWIk (Kevin)
console.log(licenseKeyFormatting("2-5g-3-J", 2));
console.log(licenseKeyFormatting("5F3Z-2e-9-w", 4));

//https://www.youtube.com/watch?v=x_m69OeOHN8&t=1s (Best solution)
console.log(firstUniqNumber([9, 2, 3, 6, 6, 9, 12, 3]));//adding in a stream., above question return index , 
//here return Number/character, can be donoe witrh KEVIN approach but if we need to keep stream length limited then it will overwrite index



//1108. Defanging an IP Address - Ignore too easy just adding brackets
var defangIPaddr = function (address) {
    if (address == null || address.length < 7) return address;

    let defangedIPaddress = "";

    for (let i = 0; i < address.length; i++) {

        if (address.charAt(i) == ".") {

            defangedIPaddress = defangedIPaddress + '[.]';
            continue;
        }
        defangedIPaddress = defangedIPaddress + address.charAt(i);
    }
    return defangedIPaddress;
};


//520. Detect Capital || Uppercase and lowercase rule - I did myself no help
var detectCapitalUse = function (word) {
    if (word == null || word.length < 2) return word;

    function isUpperCase(char) {
        return char.charCodeAt(0) >= "A".charCodeAt(0) && char.charCodeAt(0) <= "Z".charCodeAt(0);
    }



    let char = word.charAt(0);
    let firstCharStatus = isUpperCase(char);

    //Rule1:if lowercase then rest should be lowercase
    let i = 1;
    if (firstCharStatus == false) {
        while (i < word.length) {
            if (isUpperCase(word.charAt(i)) != false) return false;
            i++;
        }
        return true;
    }

    //Rule2&&3: Here 2 case, either rest of them should be upper or lower
    let count = 1;
    if (firstCharStatus == true) {
        while (i < word.length) {
            if (isUpperCase(word.charAt(i))) count++;
            i++;
        }
        return word.length == count || count == 1;//all are uppercase
    }

};



//468. Validate IP Address | Very Easy
var validIPAddress = function (IP) {
    if (IP == null || IP.length == 0 || IP.includes('::') || (IP.includes(':') && IP.includes('.'))) return "Neither";

    if (IP.includes('.')) {
        //IPv4

        let groups = IP.split('.');
        if (groups.length != 4) return "Neither";//1   //"172.16.254.1."

        for (let grp of groups) {
            if (grp.length == 0 || grp.length > 3) return "Neither";//2  //"172..1234.1"

            if (grp.charAt(0) == 0 && grp.length > 1) return "Neither";//3   //"172.06.254.1",,"018.16.254.1"

            if (grp < 0 || grp > 255) return "Neither";//4  //"172.-6.999.1"

            for (let char of grp) {
                if (isNaN(char)) return "Neither";//5  //"172.a.254.1"
            }
        }

        return "IPv4";
    }

    else if (IP.includes(':')) {
        //IPv6
        let validChar = new Set('0123456789abcdefABCDEF');

        let groups = IP.split(':');
        if (groups.length != 8) return "Neither";//1

        for (let grp of groups) {
            if (grp.length == 0 || grp.length > 4) return "Neither";//2

            for (let char of grp) {
                if (!validChar.has(char)) return "Neither";//3
            }
        }

        return "IPv6";
    }


};



//Very Easy -//Regex: //https://www.youtube.com/watch?v=EB5FAwHqpm4
var validIPAddress = function (IP) {


    if (!IP?.length) return "Neither";


    var vaildateIpv4 = function (str) {
        let pattern = "^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$";
        let regex = new RegExp(pattern);
        return regex.test(str);
    }

    if (vaildateIpv4(IP)) return "IPv4";

    var vaildateIpv6 = function (str) {
        let pattern = "^((([0-9a-fA-F]){1,4})\\:){7}(([0-9a-fA-F]){1,4})$";
        let regex = new RegExp(pattern);
        return regex.test(str);
    }

    if (vaildateIpv6(IP)) return "IPv6";

    return "Neither";


};
//93. Restore IP Addresses || Generate All Valid IP Addresses from given string - Easy 
//https://www.youtube.com/watch?v=qu4W3idglP4
var restoreIpAddresses = function (s) {
    if (s == null || s.length < 4 || s.length > 12) return [];

    let arrlist = [];

    function helper(origStr, i, pair, currStr) {
        //base case
        if (pair == 4 || i == origStr.length) {
            if (pair == 4 && i == origStr.length) {
                arrlist.push(currStr.substring(0, currStr.length - 1));//["255.255.11.135.","255.255.111.35."]
            }
            return;
        }

        helper(origStr, i + 1, pair + 1, currStr + origStr.charAt(i) + ".");

        if (i + 2 <= origStr.length && isValid(origStr.substring(i, i + 2))) {
            helper(origStr, i + 2, pair + 1, currStr + origStr.substring(i, i + 2) + ".");
        }

        if (i + 3 <= origStr.length && isValid(origStr.substring(i, i + 3))) {
            helper(origStr, i + 3, pair + 1, currStr + origStr.substring(i, i + 3) + ".");
        }

    }

    helper(s, 0, 0, "");

    return arrlist;
}

function isValid(str) {
    if (str.charAt(0) == 0 && str.length > 1) return false;
    if (str > 255) return false;

    return true;
}

//796. Rotate String - KMP Approach


//1427	Perform String Shifts leetcode - Very Easy good question (Locked in leetcode) || Very impoortant I did it myself
function rotateString(string, shifts) {
    if (string == null || string.length < 2 || shifts == null || shifts.length == 0) return string;

    let totaAbsRotation = 0;
    for (let i = 0; i < shifts.length; i++) {
        if (shifts[i][0] == 1) totaAbsRotation = totaAbsRotation + shifts[i][1]
        else totaAbsRotation = totaAbsRotation - shifts[i][1];
    }

    if (totaAbsRotation < 0) totaAbsRotation = totaAbsRotation + string.length;

    totaAbsRotation = totaAbsRotation % string.length;


    return string.substring(string.length - totaAbsRotation, string.length) + string.substring(0, string.length - totaAbsRotation)
}
//https://www.youtube.com/watch?v=sNH-f_5Gm0I
console.log(rotateString("abcdefg", [[0, 3], [1, 10], [0, 50], [1, 70]]));//bcdefga || //bcdefga 0/1 means L/R rotation
console.log(rotateString("abc", [[0, 1], [1, 2]]));//cab
console.log(rotateString("abcdefg", [[1, 1], [1, 1], [0, 2], [1, 3]]));//efgabcd






//187. Repeated DNA Sequences
var findRepeatedDnaSequences = function (s) {
    if (s == null || s.length == 0) return [];
    let repeatedDNA = [];

    let hashMap = new Map();
    for (let i = 0; i < s.length; i++) {
        //hashMap.set( s.substring(i, i+10), hashMap.get(s.substring(i, i+10)) ? hashMap.get(s.substring(i, i+10))  + 1 : 1);//this also works
        hashMap.set(s.substring(i, i + 10), hashMap.get(s.substring(i, i + 10)) + 1 || 1);// this works null check and addition

        if (hashMap.get(s.substring(i, i + 10)) == 2) repeatedDNA.push(s.substring(i, i + 10));
    }


    return repeatedDNA;
};

//Bruteforce way T: M.N and S: M.N
//Solution is Rolling Hash to reduce space complexity and Avg time complexity in long run
//TODO with Rolling Hash

//https://leetcode.com/problems/repeated-dna-sequences/discuss/899317/JavaScript-Rolling-Hash-Solutions
//https://leetcode.com/problems/repeated-dna-sequences/discuss/1228538/HashSet-Rolling-Hash-Two-JS-Solutions
//https://www.youtube.com/watch?v=BQ9E-2umSWc
console.log(findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"));//["AAAAACCCCC","CCCCCAAAAA"]
console.log(findRepeatedDnaSequences("AAAAAAAAAA"));["AAAAAAAAAA"]





//Isomorphic
//205. Isomorphic Strings

var isIsomorphic = function (s, t) {
    if (s == null || t == null || s.length == 0 || t.length == 0) return false;

    if (s.length != t.length) return false;

    let map1 = new Map();
    let map2 = new Map();

    for (let i = 0; i < s.length; i++) {
        let char1 = s.charAt(i);
        let char2 = t.charAt(i);

        if (map1.has(char1)) {
            if (map1.get(char1) != char2) return false;
        } else {
            if (map2.has(char2)) return false;//char2 is already mapped, but char2 not matching any value with char1 till now
            map1.set(char1, char2);
            map2.set(char2, true);
        }


    }
    return true;
};
//https://www.youtube.com/watch?v=6Qkail843d8&t=25s (Sumit Sir)

//290. Word Pattern
var wordPattern = function (pattern, s) {
    if (pattern == null || s == null) return false;

    let arr = s.split(' ');
    if (pattern.length == 0 || s.length == 0 || pattern.length != arr.length) return false;

    let map1 = new Map();
    let map2 = new Map();

    for (let i = 0; i < pattern.length; i++) {
        let char1 = pattern.charAt(i);
        let char2 = arr[i];

        if (map1.has(char)) {
            if (map1.get(char1) != char2) return false;
        } else {
            if (map2.has(char2)) return false;
            map1.set(char1, char2);
            map2.set(char2, true);
        }
    }
    return true;
};



//291. Word Pattern II (locked) (Trie already did )
//https://www.youtube.com/watch?v=aVMyXDuSLNM&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=15 -- Sumeet Malik




//1221. Split a String in Balanced Strings - Easy - I did myself
//Find equal R and L combination continuos
var balancedStringSplit = function (s) {
    if (s == null || s.length < 2) return 0;

    let output = [];//pairs

    let balancedLR = 0; let start = 0;
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) == 'R') balancedLR++;
        else if (s.charAt(i) == 'L') balancedLR--

        if (balancedLR == 0) {
            output.push(s.substring(start, i + 1))
            start = i;

        }
    }
    return output.length;
};
console.log(balancedStringSplit("RLRRLLRLRL"));//"RL", "RRLL", "RL", "RL"





//953. Verifying an Alien Dictionary - Very Easy
//https://www.youtube.com/watch?v=i3B5RYe0J0E
var isAlienSorted = function (words, order) {
    if (words == null || words.length < 2 || order == null || order.length < 2) return false;

    function isBefore(str1, str2, charMap) {
        let len = Math.min(str1.length, str2.length);
        for (let i = 0; i < len; i++) {
            let char1 = str1.charAt(i);
            let char2 = str2.charAt(i);

            if (char1 != char2) {
                if (charMap.get(char1) > charMap.get(char2)) return false;

                return true
            }
        }
        return str1.length > str2.length ? false : true
    }


    let charMap = new Map();
    for (let i = 0; i < order.length; i++) {
        let char = order.charAt(i);
        charMap.set(char, i);
    }

    for (let i = 1; i < words.length; i++) {
        let word1 = words[i - 1];
        let word2 = words[i];

        if (!isBefore(word1, word2, charMap)) return false;
    }
    return true;
};

//791. Custom Sort String
var customSortString = function (order, s) {
    let charMap = {};

    for (let i = 0; i < order.length; i++) {
        charMap[order[i]] = i;
    }

    console.log(charMap);

    for (let i = 0; i < s.length; i++) {
        if (charMap[s[i]] == undefined) charMap[s[i]] = Infinity;//words which are not mapped assign infinity is important
    }

    let arr = s.split('');

    arr.sort((a, b) => charMap[a] - charMap[b]);
    console.log(arr);

    return arr.join('');
};



//Kevin way //https://www.youtube.com/watch?v=cQX3yHS0cLo&list=PLi9RQVmJD2favxCtUriAN3VQtOwbl4izA&index=11
//Pepcoding way - Good Way of understanding which interviewer will see (Learn how to Generate)
var numDecodings = function (s) {
    let dp = Array(s.length + 1);

    //base case
    dp[0] = 1;
    dp[1] = s.charAt(0) == "0" ? 0 : 1;

    for (let i = 2; i <= s.length; i++) {
        let oneDigit = Number(s.substring(i - 1, i));
        let twoDigit = NUmber(s.substring(i - 2, i));

        if (oneDigit >= 1) {
            dp[i] = dp[i] + dp[i - 1];
        }

        if (twoDigit >= 10 && twoDigit <= 26) {
            dp[i] = dp[i] + dp[i - 2]
        }
    }

    return dp[s.length];
};

console.log(numDecodings("12"));

//639. Decode Ways II - Hard but it is very easy.
//https://www.youtube.com/watch?v=8KGSnEQ9s8Q&t=47s (After 14min)
var numDecodings = function (s) {

    if (s == null || s.charAt(0) == '0') return 0;

    if (s.length == 1 && s.charAt(0) == "*") return 9;

    let dp = new Array(s.length + 1).fill(0);

    dp[0] = 1;//no string

    if (s.charAt(0) == '0') {
        dp[1] = 0;
    } else if (s.charAt(0) == "*") {
        dp[1] = 9;
    } else {
        dp[1] = 1;
    }


    //i will be 1 indx ahead, we start from "06", 2nd index after 6 then we will see i-1 and i-2
    for (let i = 2; i <= s.length; i++) {
        let oneDigit = s.substring(i - 1, i);
        let twoDigit = s.substring(i - 2, i);

        if (oneDigit == '*') {
            dp[i] = dp[i] + 9 * dp[i - 1];
        } else if (oneDigit != '*' && oneDigit >= 1) {
            dp[i] = dp[i] + dp[i - 1];
        }

        if (twoDigit.charAt(1) == "*" && twoDigit.charAt(0) == "*") {//** 15 possible cases 9 + 6
            dp[i] = dp[i] + 15 * dp[i - 2];
        } else if ((twoDigit.charAt(0) != "*" && twoDigit.charAt(0) == 1 && twoDigit.charAt(1) == "*")) {//1*
            dp[i] = dp[i] + 9 * dp[i - 2];

        } else if ((twoDigit.charAt(0) != "*" && twoDigit.charAt(0) == 2 && twoDigit.charAt(1) == "*")) {//2*
            dp[i] = dp[i] + 6 * dp[i - 2];

        } else if ((twoDigit.charAt(0) == "*" && twoDigit.charAt(1) != "*" && twoDigit.charAt(1) <= 6)) {//*6 2 ways 16,26
            dp[i] = dp[i] + 2 * dp[i - 2];

        } else if ((twoDigit.charAt(0) == "*" && twoDigit.charAt(1) != "*" && twoDigit.charAt(1) > 6)) {//*7 ,1 ways, 17
            dp[i] = dp[i] + 1 * dp[i - 2];

        } else if (twoDigit >= 10 && twoDigit <= 26) {//10 - 26
            dp[i] = dp[i] + dp[i - 2];
        }
    }

    return dp[dp.length - 1];
};
console.log(numDecodings("1*"));
console.log(numDecodings("*6"));
console.log(numDecodings("*9"));
console.log(numDecodings("****"));//10431







//KMP
//28. Implement strStr() - Good Questioon - Implement IndexOf in string
//796. Rotate String - KMP Approach