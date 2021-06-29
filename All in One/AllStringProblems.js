/*
    Words K Selection - 1 | Select K Distinct Characters without Repetition using Backtracking
    https://www.youtube.com/watch?v=PiwttDa5FMA&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=27
 */
//2approaches i chose second one
function selectKDistinctChar(str, k) {
    let set = new Set();
    for (let char of str) {
        set.add(char);
    }
    var uniqStr = [...set];

    let result = [];
    function generate(lcno, selectSofar) {
        if (selectSofar.length == k) {
            result.push(selectSofar);
            return;
        }

        for (let i = lcno; i < uniqStr.length; i++) {
            generate(i + 1, selectSofar + uniqStr[i]);
        }
    }
    generate(0, "");
    return result;
}
//Similar to Select 2box out of 3 box
console.log(selectKDistinctChar('aabbbccdde', 2));//How many ways to Select k distinct chars eg. abc, abd, abe, acd....



//K Length Words - 2 | K Length Words of Distinct Characters | Backtracking Interview Questions
//https://www.youtube.com/watch?v=_geihPcxPag&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=29
function kLengthWords(str, k) {
    let set = new Set();
    let used = new Set();

    for (let char of str) {
        set.add(char);
    }
    var uniqStr = [...set];

    let result = [];
    function generate(currSlot, selectSofar) {
        if (currSlot > k) {
            result.push(selectSofar);
            return;
        }

        for (let i = 0; i < uniqStr.length; i++) {
            if (used.has(uniqStr[i]) == false) {
                used.add(uniqStr[i]);
                generate(currSlot + 1, selectSofar + uniqStr[i]);
                used.delete(uniqStr[i]);
            }

        }
    }
    generate(1, "");
    return result;
}
//Items more and slots less - Permutatioons in this questions, not asking distinct
console.log(kLengthWords('aabbbcc', 2));//[ 'ab', 'ac', 'ba', 'bc', 'ca', 'cb' ]


//leetcode- 78. Subsets- all possible subsets (the power set).
var subsets = function (nums) {
    let result = [];

    function traverse(locno, currArr) {
        result.push(currArr);//simple coombination question

        for (let i = locno; i < nums.length; i++) {
            traverse(i + 1, [...currArr, nums[i]]);
        }

    }
    traverse(0, []);
    return result;
};
//All combinations questioons, 
console.log(subsets([1, 2, 3]));//[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

//leetcode- 90. Subsets- all possible subsets (the power set).
var subsetsWithDup = function (nums) {
    let result = [];
    nums.sort((a, b) => a - b);// sprt is necessary to make sure we avoid duplicate elems

    function traverse(locno, currArr) {
        result.push(currArr);

        for (let i = locno; i < nums.length; i++) {
            if (i > locno && nums[i] == nums[i - 1]) continue;

            traverse(i + 1, [...currArr, nums[i]]);
        }
    }
    traverse(0, []);
    return result;
};


//leetcode 139. Word Break
var wordBreak = function (s, wordDict) {

    function traverse(idx, currString) {
        for (let i = 0; i < wordDict.length; i++) {
            if (currString.slice(0, idx) == wordDict[i]) {
                traverse(idx + 1, currString.slice(idx));
            }
        }
    }
    traverse(0, s);

    return false;
};
let s = "leetcode";
let wordDict = ["leet", "code"];

console.log(wordBreak(s, wordDict));



//291 Word Pattern II --Hard
//https://www.youtube.com/watch?v=aVMyXDuSLNM&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=15 -- Sumeet Malik
function wordPattern(pattern, str) {
    let map = {};

    function traverse(currPattern, currString) {
        if (currPattern.length == 0 && currString.length == 0) {
            let set = new Set();
            for (let i = 0; i < pattern.length; i++) {
                if (set.has(pattern[i]) == false) {
                    console.log(pattern[i] + " --> " + map[char]);
                    set.add(pattern[i])
                }
            }
            return;
        }

        let char = currPattern.charAt(0);

        if (map[char]) {
            //if already mapped get and compare
            let left = currString.slice(0, map[char].length);
            let right = currString.slice(map[char].length);

            if (map[char] == left) {
                traverse(currPattern.slice(1), right);
            }

        } else {
            for (let i = 1; i < currString.length; i++) {
                let left = currString.slice(0, i);
                let right = currString.slice(i);

                map[char] = left;
                traverse(currPattern.slice(1), right);
                delete map[char];
            }

        }
    }
    traverse(pattern, str);
}
console.log(wordPattern("pep", "graphtreesgraph"));


var wordPattern = function (pattern, s) {
    let words = s.split(' ');
    if (pattern.length != words.length) return false;
    //if(new Set(pattern).size != new Set(words).size) return false;//1st method

    let patternMap = new Map();
    let wordMap = new Map();
    for (let i = 0; i < pattern.length; i++) {
        if ((patternMap.has(pattern[i]) && patternMap.get(pattern[i]) != words[i]) ||
            (wordMap.has(words[i]) && wordMap.get(words[i]) != pattern[i])) {
            return false;
        }
        patternMap.set(pattern[i], words[i]);
        wordMap.set(words[i], pattern[i]);
    }
    return true;
};

console.log(wordPattern('abba', "dog cat cat dog"))//true
console.log(wordPattern('abba', "dog cat cat fish"))//false
console.log(wordPattern('aaaa', "dog cat cat dog"))//false
console.log(wordPattern('aaaa', "dog dog dog dog"))//true

console.log(wordPattern('abba', "dog dog dog dog"))//false----tricky


//392. Is Subsequence -Very Easy
var isSubsequence = function (s, t) {
    if (s == null || s.length == 0) return true;

    let sIndex = 0;
    for (let i = 0; i < t.length; i++) {
        if (s[sIndex] == t[i]) {
            //if matches then match next index until s is complete
            sIndex++;
        }
    }

    return sIndex == s.length;
};

let result = [];

let s = ["axc", "abc"];
for (let i = 0; i < s.length; i++) {
    result.push([isSubsequence(s[i], "ahbgdc"), s[i]]);
}
console.log(result);



//674. Longest Continuous Increasing Subsequence - Easy
var findLengthOfLCIS = function (nums) {
    if (nums == null || nums.length < 2) return nums;

    let left = 0;
    let right = 1;
    let length = 0;

    while (right < nums.length) {
        if (nums[right - 1] < nums[right]) {
            right++;
        } else {
            left = right;
            right++;
        }
        length = Math.max(right - left, length);
    }

    return length;
}
console.log(findLengthOfLCIS([1, 3, 5, 4, 7]));
console.log(findLengthOfLCIS([2, 2, 2, 2, 2]));


//1800. Maximum Ascending Subarray Sum - Sliding Window problem
var maxAscendingSum = function (nums) {
    if (nums == null || nums.length < 2) return nums;

    let left = 0;
    let right = 1;

    let maxSum = 0;
    let sum = 0

    while (right <= nums.length) {//<= required to consider last index, 7 < undefined >> false and then add
        if (nums[right - 1] < nums[right]) {
            sum += nums[right - 1];
            right++;

        } else {
            sum += nums[right - 1];
            maxSum = Math.max(sum, maxSum);

            left = left + 1;
            right = left + 1;
            sum = 0;
        }
    }

    return maxSum;
}
console.log(maxAscendingSum([1, 3, 5, 4, 7]));
console.log(maxAscendingSum([2, 2, 2, 2, 2]));
console.log(maxAscendingSum([12, 17, 15, 13, 10, 11, 12]));


//300. Longest Increasing Subsequence
var lengthOfLIS = function (nums) {
    if (nums == null || nums.length == 0) return 0;

    let dp = [];
    dp[0] = 1;
    let omax = 0;

    for (let i = 0; i < nums.length; i++) {
        let max = 0;

        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                max = Math.max(max, dp[j]);
            }
        }

        dp[i] = max + 1;

        omax = Math.max(omax, dp[i]);
    }
    return omax;

};
//O(n^2 solution with tabulation)
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7]));


// Maximum Sum Increasing Subsequence - Variation of above , can't find in leetcode
var maxSumLIS = function (nums) {
    if (nums == null || nums.length == 0) return 0;

    let dp = [];
    dp[0] = nums[0];
    let omaxSum = 0;

    for (let i = 1; i < nums.length; i++) {
        let maxSum = 0;

        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                maxSum = Math.max(maxSum, nums[i] + dp[j]);//need to tackle 1st num in an array
            }
        }

        dp[i] = maxSum;

        omaxSum = Math.max(omaxSum, maxSum);
    }
    return omaxSum;

};
// console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
// console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));
// console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7]));
console.log(maxSumLIS([10, 22, 9, 33, 21, 50, 41, 60, 80, 1]));
console.log(maxSumLIS([10, 22, 9, 33]));


//https://www.youtube.com/watch?v=9UEHPiK53BA&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=11
//940. Distinct Subsequences II
var distinctSubseqII = function (S) {
    if (S == null || S.length == 0) return 0;

    let dp = Array(S.length + 1).fill(0);//fill 1 extra for '.'
    dp[0] = 1;//1 way for empty subsequence

    console.log(dp)

    let hashMap = {};
    /*if string  contain duplicates, then multiple previous by 2*/
    for (let i = 1; i < dp.length; i++) {

        let char = S.charAt(i - 1);//Imp

        if (hashMap[char] == null) {
            dp[i] = dp[i - 1] * 2;

        } else {
            let index = hashMap[char];
            dp[i] = (dp[i - 1] * 2) - dp[index - 1];
        }
        hashMap[char] = i;//insert index
    }
    console.log(dp, hashMap)


    // return  dp[S.length] -1; //print non-empty , remove 1st
    let res = dp[S.length] - 1
    return res % (10 ** 9 + 7); //print non-empty , remove 1st
    //res % (10**9 + 7)

};

//Longest Common Substring Dynamic Programming
function LCSubString(str1, str2) {
    let dp = new Array(str1.length + 1).fill(0).map(row => new Array(str2.length + 1).fill(0));

    let maximum = 0;
    for (let row = 1; row < dp.length; row++) {


        for (let col = 1; col < dp[0].length; col++) {
            // str1.charAt(row - 1);
            // str2.charAt(col - 1);
            let char1 = str1[row - 1];
            let char2 = str2[col - 1];



            if (char1 == char2) {
                dp[row][col] = dp[row - 1][col - 1] + 1;
            }

            if (dp[row][col] > maximum) {
                maximum = dp[row][col]
            }
        }
    }
    return maximum;
}
// /https://www.youtube.com/watch?v=NvmJBCn4eQI&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=38
console.log(LCSubString("pqabcxy", "xyzabcp"));


var longestCommonSubsequence = function (text1, text2) {
    let dp = new Array(text1.length + 1).fill(0).map(_ => new Array(text2.length + 1).fill(0));

    for (let row = 1; row < dp.length; row++) {
        for (let col = 1; col < dp[0].length; col++) {
            let char1 = text1[row - 1];
            let char2 = text2[col - 1];

            if (char1 == char2) {
                dp[row][col] = dp[row - 1][col - 1] + 1;
            } else {
                dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
            }
        }
    }

    return dp[text1.length][text2.length];
    //https://www.youtube.com/watch?v=0Ql40Llp09E&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=17
};
console.log(longestCommonSubsequence("leetcode", "etco"));



//583. Delete Operation for Two Strings - strategy to find LCSubsequnce - Very Easy
var minDistance = function (word1, word2) {


    let dp = new Array(word1.length + 1).fill(0).map(_ => new Array(word2.length + 1).fill(0));

    for (let row = 1; row < dp.length; row++) {
        for (let col = 1; col < dp[0].length; col++) {
            let char1 = word1[row - 1];
            let char2 = word2[col - 1];

            if (char1 == char2) {
                dp[row][col] = dp[row - 1][col - 1] + 1;
            } else {
                dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
            }
        }
    }

    let lcs = dp[word1.length][word2.length];
    let minDelText1 = word1.length - lcs;
    let minDelText2 = word2.length - lcs;

    return minDelText1 + minDelText2;
};


//Leetcode 1143. Longest Common Subsequence
//https://www.youtube.com/watch?v=0Ql40Llp09E&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=17
//https://www.youtube.com/watch?v=a1bWbgt5geU&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=47
console.log(minDistance("leetcode", "etco"));


//161:	One Edit Distance - Very Easy
/* 
    You have the following three operations permitted on a word:
    Insert a character
    Delete a character
    Replace a character
 */
var oneEditDistance = function (word1, word2) {
    let dp = new Array(word1.length + 1).fill(0).map(_ => new Array(word2.length + 1).fill(0));

    for (let row = 1; row < dp.length; row++) {
        for (let col = 1; col < dp[0].length; col++) {
            let char1 = word1[row - 1];
            let char2 = word2[col - 1];

            if (char1 == char2) {
                dp[row][col] = dp[row - 1][col - 1] + 1;
            } else {
                dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
            }
        }
    }
    let lcs = dp[word1.length][word2.length];
    let minDelText1 = word1.length - lcs;
    let minDelText2 = word2.length - lcs;

    return (minDelText1 + minDelText2) == 1 ? true : false;
};
console.log(oneEditDistance("ab", "acb"));
console.log(oneEditDistance("", ""));



//72. Edit Distance - How many minimum operations, Is is possible to count the operations also
/*
    You have the following three operations permitted on a word:
    Insert a character
    Delete a character
    Replace a character
 */
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var editDistance = function (word1, word2) {
    let dp = new Array(word1.length + 1).fill(0).map(_ => new Array(word2.length + 1).fill(0));
    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = i
    }

    for (let i = 0; i < dp[0].length; i++) {
        dp[0][i] = i
    }

    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]);
            }
        }
    }

    return dp[word1.length][word2.length];

};
console.log(editDistance("horse", "ros"));//3
/* Explanation:
horse -> rorse(replace 'h' with 'r')
rorse -> rose(remove 'r')
rose -> ros(remove 'e') */


var editDistance = function (word1, word2) {
    let dp = new Array(word1.length + 1).fill(0).map(_ => new Array(word2.length + 1).fill(0));
    for (let i = 0; i < dp.length; i++) {
        dp[i][0] = i
    }

    for (let i = 0; i < dp[0].length; i++) {
        dp[0][i] = i
    }

    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]);
            }
        }
    }
    console.log(dp);
    printActualEdits(dp, word1, word2)
    return dp[word1.length][word2.length];

};
console.log(editDistance("horse", "ros"));//3



function printActualEdits(dp, str1, str2) {
    let i = dp.length - 1;
    let j = dp[0].length - 1;

    while (true) {
        if (i == 0 || j == 0) {
            break;
        }
        if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
            i = i - 1;
            j = j - 1;
        } else if (dp[i][j] == dp[i - 1][j - 1] + 1) {
            console.log("Edit " + str2.charAt(j - 1) + " in string2 to " + str1.charAt(i - 1) + " in string1");
            i = i - 1;
            j = j - 1;
        } else if (dp[i][j] == dp[i - 1][j] + 1) {
            console.log("Delete in string1 " + str1.charAt(i - 1));
            i = i - 1;
        } else if (dp[i][j] == dp[i][j - 1] + 1) {
            System.out.println("Delete in string2 " + str2.charAt(j - 1));
            j = j - 1;
        }
    }
}

///Leetcode 1143. Longest Common Subsequence  - {Print those chars}
var shortestCommonSupersequence = function (text1, text2) {
    let dp = new Array(text1.length + 1).fill(0).map(_ => new Array(text2.length + 1).fill(0));

    for (let row = 1; row < dp.length; row++) {
        for (let col = 1; col < dp[0].length; col++) {
            let char1 = text1[row - 1];
            let char2 = text2[col - 1];

            if (char1 == char2) {
                dp[row][col] = dp[row - 1][col - 1] + 1;
            } else {
                dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
            }
        }
    }
    //return dp[text1.length][text2.length];
    let superSequence = "";
    let row = text1.length;
    let col = text2.length;

    while (row > 0 && col > 0) {
        if (text1[row - 1] == text2[col - 1]) {
            superSequence = text1[row - 1] + superSequence;//when move diagonal add char Longest Common Subsequence
            row--;
            col--;

        }
        else if (dp[row - 1][col] >= dp[row][col - 1]) {
            //superSequence = text1[row - 1] + superSequence; //for SuperSequence add chars
            row--;

        }
        else if (dp[row - 1][col] < dp[row][col - 1]) {
            //superSequence = text2[col - 1] + superSequence;//for SuperSequence add chars
            col--;
        }
    }
    /*  while (row > 0) {
         superSequence = text1[row - 1] + superSequence;
         row--;
     }
     while (col > 0) {
         superSequence = text2[col - 1] + superSequence;
         col--;
     } */
    return superSequence;
};


console.log(shortestCommonSupersequence("abcdaf", "acbcf"));




///1092. Shortest Common Supersequence  - {Print those chars} - HARD , same as above
var shortestCommonSupersequence = function (text1, text2) {
    let dp = new Array(text1.length + 1).fill(0).map(_ => new Array(text2.length + 1).fill(0));

    for (let row = 1; row < dp.length; row++) {
        for (let col = 1; col < dp[0].length; col++) {
            let char1 = text1[row - 1];
            let char2 = text2[col - 1];

            if (char1 == char2) {
                dp[row][col] = dp[row - 1][col - 1] + 1;
            } else {
                dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
            }
        }
    }
    //return dp[text1.length][text2.length];
    let superSequence = "";
    let row = text1.length;
    let col = text2.length;

    while (row > 0 && col > 0) {
        if (text1[row - 1] == text2[col - 1]) {
            superSequence = text1[row - 1] + superSequence;//when move diagonal add char Longest Common Subsequence
            row--;
            col--;

        }
        else if (dp[row - 1][col] >= dp[row][col - 1]) {
            superSequence = text1[row - 1] + superSequence; //for SuperSequence add chars
            row--;

        }
        else if (dp[row - 1][col] < dp[row][col - 1]) {
            superSequence = text2[col - 1] + superSequence;//for SuperSequence add chars
            col--;
        }
    }
    while (row > 0) {
        superSequence = text1[row - 1] + superSequence;
        row--;
    }
    while (col > 0) {
        superSequence = text2[col - 1] + superSequence;
        col--;
    }
    return superSequence;
};

//https://www.youtube.com/watch?v=0Ql40Llp09E&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=19
console.log(shortestCommonSupersequence("abac", "cab"));//"cabac"


//5. Longest Palindromic Substring
//https://www.youtube.com/watch?v=WpYHNHofwjc&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=8
var longestPalindrome = function (s) {
    if (s == null || s.length < 2) return s
    let longestSubString = "";

    let dp = new Array(s.length).fill(false).map(_ => new Array(s.length).fill(false));


    for (let i = 0; i < s.length; i++) {
        dp[i][i] = true;
        longestSubString = s[i];//assign any string as inital length
    }

    for (let starIndex = s.length - 1; starIndex >= 0; starIndex--) {
        for (let endIndex = starIndex + 1; endIndex <= s.length; endIndex++) {
            //check chars star and end 
            if (s[starIndex] == s[endIndex]) {

                //if same then check rest of the string if it is more than 2
                if (endIndex - starIndex == 1 || dp[starIndex + 1][endIndex - 1] == true) {
                    dp[starIndex][endIndex] = true;
                    //maxLength = Math.max(maxLength, endIndex-starIndex +1)
                    if (longestSubString.length < endIndex - starIndex + 1) {
                        longestSubString = s.substring(starIndex, endIndex + 1)
                    }
                }

            }
        }
    }
    return longestSubString;
    /* Formula */
    /*
    Traverse from bottom to top
        1. If same 
                a. Check the length of string by end - start == 1, then  compare length
                b. Check bottom Diagonal is true, then compare length
            end - start + 1 is total length of current string
        2. Not Same continue loop
    */
};

//647. Palindromic Substrings
var countPalindromicSubstrings = function (s) {
    let count = 0;

    let dp = new Array(s.length).fill(false).map(_ => new Array(s.length).fill(false));


    for (let i = 0; i < s.length; i++) {
        dp[i][i] = true;
        count++;
    }

    for (let starIndex = s.length - 1; starIndex >= 0; starIndex--) {
        for (let endIndex = starIndex + 1; endIndex <= s.length; endIndex++) {
            //check chars star and end 
            if (s[starIndex] == s[endIndex]) {

                //if same then check rest of the string if it is more than 2
                if (endIndex - starIndex == 1 || dp[starIndex + 1][endIndex - 1] == true) {
                    dp[starIndex][endIndex] = true;
                    count++;
                }

            }
        }
    }
    return count;
    /* Formula */
    /*
    Traverse from bottom to top
        1a. Count each single as 1 palindrome
        1. If same
                a. Check the length of string by end - start == 1, then  increase counter
                b. Check bottom Diagonal is true, then increase counter
           
        2. Not Same continue loop
    */

};


//409. Longest Palindrome that can be made from existing letters and leaving rest-- Very Easy
//https://www.youtube.com/watch?v=noaGOtGmCzs
var longestPalindrome = function (s) {
    if (s == null || s.length < 2) return 1;

    let maxLen = 0;
    let set = new Set();

    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);

        if (set.has(char)) {
            maxLen = maxLen + 2;
            set.delete(char);
        } else {
            set.add(char);
        }
    }

    return set.size == 0 ? maxLen : maxLen + 1;

};

//Leetcode 266 - Palindrome Permutation 
//Ques - Given a string, determine if a permutation of the string could form a palindrome ?? - Interresting question

var palindromePermutation = function (s) {
    if (s == null || s.length < 2) return true;

    //count all ASCII 1 to 128 chars
    let charCount = new Array(128).fill(0);

    for (let i = 0; i < s.length; i++) {
        charCount[s.charCodeAt(i)]++;
    }

    let count = 0;
    for (let i = 0; i < charCount.length; i++) {
        count = count + charCount[i] % 2; //remainder should be 0 else collect all the chars odd number
    }

    return count <= 1;

};
//https://www.youtube.com/watch?v=Pp5hdsNdqOU
console.log(palindromePermutation("aaab"));


//https://www.youtube.com/watch?v=RiNzHfoA2Lo&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=18
var longestPalindromeSubsequence = function (s) {
    if (s == null || s.length < 2) return 1;

    let dp = new Array(s.length).fill(0).map(_ => new Array(s.length).fill(0));

    for (let i = 0; i < dp.length; i++) {
        dp[i][i] = 1;
    }

    for (let starIndex = s.length - 1; starIndex >= 0; starIndex--) {
        for (let endIndex = starIndex + 1; endIndex < s.length; endIndex++) {
            //check chars star and end 
            if (s[starIndex] == s[endIndex]) {
                dp[starIndex][endIndex] = 2 + dp[starIndex + 1][endIndex - 1];
            } else {
                dp[starIndex][endIndex] = Math.max(dp[starIndex][endIndex - 1], dp[starIndex + 1][endIndex])
            }
        }
    }

    return dp[0][s.length - 1];

};

/* Formula */
/* 
Traverse from bottom to top
    1. If same, add +2 from bottom diagonal
    2. Not Same take max of left and bottom
*/
console.log(longestPalindromeSubsequence("abkccbc"));
console.log(longestPalindromeSubsequence("abdbca"));
console.log(longestPalindromeSubsequence("cddpd"));
console.log(longestPalindromeSubsequence("pqr"));




//Count Palindromic Subsequences Dynamic Programming -- It will contains duplicates.
var countPalindromeSubsequence = function (str) {
    if (str == null || str.length < 2) return 1;

    let dp = new Array(str.length).fill(0).map(_ => new Array(str.length).fill(0));

    for (let i = 0; i < dp.length; i++) {
        dp[i][i] = 1;
    }

    for (let startIndex = str.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < str.length; endIndex++) {
            if (str[startIndex] == str[endIndex]) {
                dp[startIndex][endIndex] = dp[startIndex][endIndex - 1] + dp[startIndex + 1][endIndex] + 1;
            } else {
                dp[startIndex][endIndex] = dp[startIndex][endIndex - 1] + dp[startIndex + 1][endIndex] - dp[startIndex + 1][endIndex - 1]

            }
        }
    }



    return dp[0][str.length - 1];

    /* Formula */
    /*
    Traverse from bottom to top
        1. If same,
                 (add left + add bottom + 1)
        2. Not Same,
                (add left + add bottom - Diagonal)
    */

};
// //https://www.youtube.com/watch?v=YHSjvswCXC8&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=14
console.log(countPalindromeSubsequence("abkccbc"));
console.log(countPalindromeSubsequence("abdbca"));
console.log(countPalindromeSubsequence("cddpd"));
console.log(countPalindromeSubsequence("pqr"));//3
console.log(countPalindromeSubsequence("abccbc"));//16
console.log(countPalindromeSubsequence("ccbbgd"));//8




//Leetcode 730. Count Different Palindromic Subsequences -- Does not contains Duplicates- DOnt think this will be asked
var countPalindromicSubsequences = function (str) {
};
//https://www.youtube.com/watch?v=fvYlinirmFg&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=22
console.log(countPalindromeSubsequence("abkccbc"));
console.log(countPalindromeSubsequence("abdbca"));
console.log(countPalindromeSubsequence("cddpd"));
console.log(countPalindromeSubsequence("pqr"));//3
console.log(countPalindromeSubsequence("abccbc"));//16
console.log(countPalindromeSubsequence("ccbbgd"));//8



//Longest Increasing Subsequence ImPlementation  - LIS based questions

//1 - Non Overlapping Bridges -- Easy and clear in the vedio
var nonOverlappingBridges = function (num, arr) {

    arr.sort((a, b) => a[0] - b[0]);


    //Below is LIS code ...cramm this
    let dp = new Array(num);
    let omax = 0;
    for (let i = 0; i < dp.length; i++) {
        let max = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j][1] <= arr[i][1]) {
                if (dp[j] > max) {
                    max = dp[j];
                }
            }
        }
        dp[i] = max + 1;

        if (dp[i] > omax) {
            omax = dp[i];
        }
    }
    return omax;

};

//https://www.youtube.com/watch?v=o1h3aoeSTOU&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=4
console.log(nonOverlappingBridges(10, [[10, 20], [2, 7], [8, 15], [17, 3], [21, 40], [50, 4], [41, 57], [60, 80], [80, 90], [1, 30]]));


//2 - Russian Envelop -- Easy and clear in the vedio
var russianEnvelopProblem = function (num, arr) {

    arr.sort((a, b) => a[0] - b[0]);


    //Below is LIS code ...cramm this
    let dp = new Array(num);
    let omax = 0;
    for (let i = 0; i < dp.length; i++) {
        let max = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j][1] < arr[i][1]) {//only difference is <=
                if (dp[j] > max) {
                    max = dp[j];
                }
            }
        }
        dp[i] = max + 1;

        if (dp[i] > omax) {
            omax = dp[i];
        }
    }
    return omax;

};

//https://www.youtube.com/watch?v=Mud_QjUwbw8&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=6
console.log(russianEnvelopProblem(11, [[17, 5], [26, 18], [25, 34], [48, 84], [63, 72], [42, 86], [9, 55], [4, 70], [21, 45], [68, 76], [58.51]]));


//Leetcode 279 Perfect Squares Dynamic Programming

//https://www.youtube.com/watch?v=aZuQXkO0-XA&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=35





//-------------Kadane's Algorithm --------------
//53. Maximum Subarray
var maxSubArray = function (nums) {
    if (nums == null || nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];

    let maxSum = nums[0];//initialize with 1st num [-1,-2]
    let currSum = nums[0];//initialize with 1st num [-1,-2]

    //Kadane's Algorithm - start decision from 2nd elem
    for (let i = 1; i < nums.length; i++) {

        if (currSum + nums[i] > nums[i]) {
            currSum += nums[i];
        } else {

            currSum = nums[i];
        }
        maxSum = Math.max(currSum, maxSum);
    }
    return maxSum;
};
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([-1, -2]));

//Kadane's Algorithm 
//Maximum Difference of Zeros & Ones in Binary String in O(n) Time | Dynamic Programming
var maxSubArray = function (str) {
    let overallSum = 0;
    let currSum = 0;

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == '1') {
            currSum += -1;

            if (currSum < 0) {
                currSum = 0;
            }
        } else {
            currSum += 1;

            if (currSum > overallSum) {
                overallSum = currSum;
            }
        }
    }
    return overallSum;
};
//https://www.youtube.com/watch?v=_k_Codwq1ls&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=41
console.log(maxSubArray("11000010001"));
