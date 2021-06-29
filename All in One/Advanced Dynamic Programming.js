/* 
Q1. 
| Recursion & Backtracking | Code and Implementation
https://www.youtube.com/watch?v=TvvGj1FtHIk&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=11
 */

//Partition in K Subsets 
const canPartition = function (arr, k) {

    //const total = arr.reduce((acc, num) => acc + num, 0);

    // this is the subset sum
    //const target = Math.floor(total / k);

    // if not divisible 
    //if (total % target !== 0) return [];
    let result = [];

    const buckets = new Array(k).fill(0).map((row) => []);

    function traverse(index, ssf) {
        if (index >= arr.length) {
            if (ssf == k) {
                result.push(buckets.map(row => row.map(cell => cell)));
            }
            return;
        }

        // O(K)
        for (let k = 0; k < buckets.length; k++) {
            if (buckets[k].length > 0) {
                buckets[k].push(arr[index]);
                traverse(index + 1, ssf);
                buckets[k].pop();

            } else {
                buckets[k].push(arr[index]);
                traverse(index + 1, ssf + 1);

                buckets[k].pop();
                break;
            }
        }

    }
    traverse(0, 0);
    return result;
};

console.log(canPartition([1, 2, 3, 4], 3));
/* [ [ [ 1, 2, 3 ], [ 4 ] ],
  [ [ 1, 2, 4 ], [ 3 ] ],
  [ [ 1, 2 ], [ 3, 4 ] ],
  [ [ 1, 3, 4 ], [ 2 ] ],
  [ [ 1, 3 ], [ 2, 4 ] ],
  [ [ 1, 4 ], [ 2, 3 ] ],
  [ [ 1 ], [ 2, 3, 4 ] ] ] */


//Equal Sum Subsets Partition || k subsets
const canPartition = function (arr, k) {
    /* if k is equal 1 then whole array is your answer */
    if (k == 1) return arr;


    const total = arr.reduce((acc, num) => acc + num, 0);



    /* if not divisible by or sum of elements lower than partition */
    if (total % k !== 0 || total < k) return [];


    /* this is the subset sum */
    const target = Math.floor(total / k);

    let result = [];
    let subSetSum = new Array(k).fill(0)
    let flag = true;

    const buckets = new Array(k).fill(0).map((row) => []);

    function traverse(index, ssf) {
        if (index >= arr.length) {
            if (ssf == k) {
                console.log(subSetSum, subSetSum.length, target)
                for (let i = 0; i < subSetSum.length - 1; i++) {
                    if (subSetSum[i] != target) {
                        flag = false;
                        break;
                    } else {
                        result.push(buckets.map(row => row.map(cell => cell)));
                    }
                }

                if (flag == true) {
                    console.log(result)
                }

            }
            return;
        }

        // O(K)
        for (let k = 0; k < buckets.length; k++) {

            if (buckets[k].length > 0) {

                buckets[k].push(arr[index]);
                subSetSum[k] += arr[index];
                traverse(index + 1, ssf);
                buckets[k].pop();
                subSetSum[k] -= arr[index];

            } else {

                buckets[k].push(arr[index]);
                subSetSum[k] += arr[index];
                traverse(index + 1, ssf + 1);
                buckets[k].pop();
                subSetSum[k] -= arr[index];

                break;
            }
        }
    }
    traverse(0, 0);
    return result;
};
//https://www.youtube.com/watch?v=rszwy53vaP0&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=15
console.log(canPartition([1, 2, 3, 4], 2));//[ [ [ 1, 4 ], [ 2, 3 ] ] ]



/* Palindrome Partitioning of a String Recursive */
const palindromePartition = function (arr) {
    let result = [];

    function traverse(currString, palindArr) {
        if (currString.length == 0) {
            result.push(palindArr.map(row => row.join('')));
            return;
        }

        for (let i = 0; i < currString.length; i++) {
            let prefix = currString.slice(0, i + 1);
            if (isPalindrome(prefix)) {
                traverse(currString.slice(i + 1), [...palindArr, prefix]);
            }
        }
    }

    function isPalindrome(str) {
        let i = 0;
        let j = str.length - 1;
        while (i < j) {
            if (str[i] != str[j]) {
                return false;
            }
            i++;
            j--;
        }

        return true;
    }

    traverse(arr, []);

    return result;
};
//https://www.youtube.com/watch?v=wvaYrOp94k0&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=13
//console.log(palindromePartition(['p', 'e', 'p']));
console.log(palindromePartition(['a', 'b', 'a', 'a', 'b', 'a']));



//Minimum Subset Sum Difference Explained | Tug Of War | Recursion and Backtracking
function minSubsetSum(inputArr) {
    let minDiff = Number.MAX_SAFE_INTEGER;
    let result = [];


    function traverse(index, arr1, arr2, soarr1, soarr2) {
        if (index == inputArr.length) {
            let delta = Math.abs(soarr1 - soarr2);
            if (delta < minDiff) {
                minDiff = Math.min(delta, minDiff);

                result = [arr1, arr2];
                console.log("dsf", result);
            }
            return;
        }

        traverse(index + 1, [...arr1, inputArr[index]], arr2, soarr1 + inputArr[index], soarr2);
        traverse(index + 1, arr1, [...arr2, inputArr[index]], soarr1, soarr2 + inputArr[index]);
    }
    traverse(0, [], [], 0, 0);
    return result;
}
//https://www.youtube.com/watch?v=Q1fLW_zQr3M&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=19
console.log(minSubsetSum([6, 1, 2, 3, 4, 5]));//[ [ 6, 1, 3 ], [ 2, 4, 5 ] ]
console.log(minSubsetSum([6, 1, 2, 3]));//[ [ 6 ], [ 1, 2, 3 ] ]


//279. Perfect Squares
//https://www.youtube.com/watch?v=aZuQXkO0-XA&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=35
var numSquares = function (n) {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        let minStep = Number.MAX_SAFE_INTEGER;
        for (let j = 1; j * j <= i; j++) {
            minStep = Math.min(minStep, dp[i - j * j]);
        }
        dp[i] = minStep + 1;
    }
    return dp[n]
};




//NPotGold
//https://www.youtube.com/watch?v=UvksR0hR9nA&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=44
//https://leetcode.com/problems/super-egg-drop/discuss/728456/JavaScript-DP-From-O(KN2)-to-O(KN-LogN)
//1st attempt - not handle big numbers - Naive DP [O(KN^2)]
var superEggDrop = function (k, n) {
    let dp = new Array(k + 1).fill(0).map(_ => new Array(n + 1).fill(0));

    for (let egg = 1; egg <= k; egg++) {
        for (let floor = 1; floor <= n; floor++) {
            if (egg == 1) {
                dp[egg][floor] = floor;
            } else if (floor == 1) {
                dp[egg][floor] = 1;
            } else {

                let minDrops = Infinity, notBreak, eggBreak, worstCase;

                for (let i = 1; i <= floor; i++) {
                    notBreak = dp[egg][floor - i];
                    eggBreak = dp[egg - 1][i - 1];
                    worstCase = Math.max(notBreak, eggBreak);
                    minDrops = Math.min(minDrops, worstCase);
                }
                dp[egg][floor] = minDrops + 1;
            }
        }
    }
    return dp[k][n];
};

//2nd attempt - Binary Search Optimization [O(KN LogN)]
//Optimized version of the first solution. Passes all the test cases in time. -- Need to undersand more just code is written
var superEggDrop = function (k, n) {
    let dp = new Array(k + 1).fill(0).map(_ => new Array(n + 1).fill(0));

    for (let egg = 1; egg <= k; egg++) {
        for (let floor = 1; floor <= n; floor++) {
            if (egg == 1) {
                dp[egg][floor] = floor;
            } else if (floor == 1) {
                dp[egg][floor] = 1;
            } else {

                let low = 1, high = floor, result = floor;
                let left, right, mid;

                while (low < high) {
                    mid = low + Math.floor((high - low) / 2);
                    left = dp[egg - 1][mid - 1]; // egg break
                    right = dp[egg][floor - mid]; // egg doesn't break
                    result = Math.min(result, 1 + Math.max(left, right));

                    if (left === right) break;
                    else if (left < right) low = mid + 1;
                    else high = mid;
                }
                dp[egg][floor] = result;
            }
        }
    }
    return dp[k][n];
};
console.log(superEggDrop(9, 10000));



//Optimal Strategy for a Game Dynamic Programming


function OptimalStrategy(arr) {
    let dp = new Array(arr.length).fill(0).map(_ => new Array(arr.length).fill(-1));

    for (let i = 0; i < dp.length; i++) {
        dp[i][i] = arr[i];
    }

    for (let i = arr.length - 2; i >= 0; i--) {
        for (let j = i + 1; j < dp[0].length; j++) {

            if (j - i == 1) {
                dp[i][j] = Math.max(arr[i], arr[j]);
                console.log(dp)
            } else {
                let valueI = arr[i] + Math.min(dp[i + 2][j], dp[i + 1][j - 1]);
                //i -> i+1/j --> i+2/j || i+1/j-1
                //j -> i/j-1 -->   i+1/j-1 || i/j-2
                let valueJ = arr[j] + Math.min(dp[i + 1][j - 1], dp[i][j - 2]);
                dp[i][j] = Math.max(valueI, valueJ);
            }
        }
    }
    return dp[0][arr.length - 1];
}
//https://www.youtube.com/watch?v=VwjKZQCaTC8&t=493s (recursive solution)
//https://www.youtube.com/watch?v=ww4V7vRIzSk&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=43 (iterative solution)
console.log(OptimalStrategy([20, 30, 2, 10]));



//Wine Selling Problem-
//https://www.youtube.com/watch?v=f4jUEEzjEJw
function WineSelling(prices) {
    let cache = {};

    function maxProfit(start, end, year) {
        if (`${start}-${end}` in cache) return cache[`${start}-${end}`];

        if (start == end) {
            return year * prices[start];
        }

        let left = prices[start] * year + maxProfit(start + 1, end, year + 1)
        let right = prices[end] * year + maxProfit(start, end - 1, year + 1)
        //return Math.max(left, right);
        cache[`${start}-${end}`] = Math.max(left, right);
        return cache[`${start}-${end}`];

    }
    return maxProfit(0, prices.length - 1, 1);
}

console.log(WineSelling([2, 4, 6, 2, 5]));
console.log(OptimalStrategy([2, 4, 6, 2, 5]));



//printing sequence also - 2 arrays 
function WineSelling(prices) {
    let dp = new Array(prices.length).fill(0).map(_ => new Array(prices.length).fill(-1));
    let sell = new Array(prices.length).fill(0).map(_ => new Array(prices.length).fill(0));

    function maxProfit(start, end, year) {
        if (dp[start][end] != -1) {
            return dp[start][end];
        }

        if (start == end) {
            return year * prices[start];
        }

        let left = prices[start] * year + maxProfit(start + 1, end, year + 1)
        let right = prices[end] * year + maxProfit(start, end - 1, year + 1)
        console.log(left, right)
        dp[start][end] = Math.max(left, right);
        if (left >= right) {

            sell[start][end] = 0;
        } else {

            sell[start][end] = 1;
        }

        return dp[start][end];

        //cache[`${start}-${end}`] = Math.max(left, right);
        //return cache[`${start}-${end}`];

    }
    let ans = maxProfit(0, prices.length - 1, 1);

    console.log(dp)
    console.log(sell)

    let i = 0, j = prices.length - 1;
    let result = []
    while (i <= j) {

        // sell[i][j]=0 implies selling
        // the wine from beginning will
        // be more profitable in the
        // long run
        if (sell[i][j] == 0) {
            // document.write( "beg ");
            console.log("beg");
            result.push(prices[i]);
            i++;
        }
        else {
            console.log("end")
            result.push(prices[j]);
            j--;
        }
    }
    console.log(result)//[ 2, 5, 2, 4, 6 ]
}

console.log(WineSelling([2, 4, 6, 2, 5]));
//Buy
[
    5, 4, 3, 2, 1 //years
    [-1, 28, 52, 56, 64],//1
    [-1, -1, 46, 52, 62],//2
    [-1, -1, -1, 38, 53],//3
    [-1, -1, -1, -1, 33],//4
    [-1, -1, -1, -1, -1]//5
]
//Sell
[
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]
//https://www.geeksforgeeks.org/maximum-profit-sale-wines/
//https://medium.com/trick-the-interviwer/wine-selling-problem-4f6886d8ed6d
console.log(WineSelling([2, 4, 6, 2, 5]));



//Burst Balloon Dynamic Programming | Leetcode Hard Solutions
function burstBalloon(arr) {
    let dp = new Array(arr.length).fill(0).map(_ => new Array(arr.length).fill(0));

    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = i; j < arr.length; j++) {
            let maxValue = -Infinity;

            for (let k = i; k <= j; k++) {
                let left = i == k ? 0 : dp[i][k - 1];
                let right = j == k ? 0 : dp[k + 1][j];

                let currVal = (arr[i - 1] ? arr[i - 1] : 1) * arr[k] * (arr[j + 1] ? arr[j + 1] : 1);
                let totalValue = left + currVal + right;

                maxValue = Math.max(maxValue, totalValue);
            }
            dp[i][j] = maxValue;
        }
    }
    //console.log(dp)
    return dp[0][arr.length - 1];
}
//https://www.youtube.com/watch?v=YzvF8CqPafI&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=39
console.log(burstBalloon([2, 3, 1, 5, 6, 4]));


//Rod Cutting
const solveRodCutting = function (prices) {
    if (prices == null || prices.length == 0) return 0;

    let nprices = new Array(prices.length + 1).fill(0);

    for (let i = 0; i < prices.length; i++) {
        nprices[i + 1] = prices[i];
    }

    let dp = new Array(nprices.length).fill(0);
    dp[0] = 0;
    dp[1] = nprices[1];

    for (let i = 2; i < dp.length; i++) {
        let maxPrice = 0;
        for (let j = 1; j <= i; j++) {
            if (dp[i - j] + nprices[j] > maxPrice) {
                maxPrice = dp[i - j] + nprices[j]
            }
        }
        dp[i] = maxPrice;
    }
    console.log(dp)
    return dp[prices.length];
};

const prices = [1, 5, 8, 9, 10, 17, 17, 20];
//https://www.youtube.com/watch?v=eQuJb5gBkkc&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=30
console.log(solveRodCutting(prices));


//Rod Cutting
const solveRodCutting = function (prices, lengthArr, rodLength) {

    let dp = new Array(rodLength + 1).fill(0);

    dp[0] = 0;
    for (let i = 1; i < dp.length; i++) {
        let maxPrice = 0;
        for (let j = 0; j <= lengthArr.length; j++) {
            if (lengthArr[j] <= i) {
                if (dp[i - lengthArr[j]] + prices[j] > maxPrice) {
                    maxPrice = dp[i - lengthArr[j]] + prices[j]
                }
            }
        }
        dp[i] = maxPrice;
    }



    console.log(dp)
    return dp[prices.length];
};

const lengths = [2, 4, 6, 4];
const prices = [5, 9, 17, 10];
console.log(solveRodCutting(prices, length, 5));



//10. Regular Expression Matching
var isMatch = function (s, p) {
    let dp = new Array(p.length + 1).fill(false).map(_ => new Array(s.length + 1).fill(false));




    for (let row = 0; row < dp.length; row++) {
        for (let col = 0; col < dp[0].length; col++) {
            //Case1: empty pattern matches with empty string
            if (row == 0 && col == 0) {
                dp[row][col] = true;
            } else if (row == 0) {
                //Case2:1st row
                dp[row][col] = false;
            } else if (col == 0) {
                //Case3:1st col
                let pattern = p.charAt(row - 1);
                if (pattern == '*') {
                    dp[row][col] = dp[row - 2][col];
                } else {
                    dp[row][col] = false;
                }
            } else {
                /* Remember
                    if .* or s*
                        - Assign dp[row-2][col] and
                        - Check if secLastPattern is '.' or secLastPattern == lastCharStr
                        - then compare box to the left dp[row][col-1]
                        - dp[row][col-1] || dp[row-2][col], if any is true.
                */
                let pattern = p.charAt(row - 1);
                let str = s.charAt(col - 1);
                if (pattern == '.') {
                    dp[row][col] = dp[row - 1][col - 1];
                } else if (pattern == str) {
                    dp[row][col] = dp[row - 1][col - 1];
                } else if (pattern == '*') {
                    dp[row][col] = dp[row - 2][col];

                    let slcpattern = p.charAt(row - 2);
                    if (slcpattern == str || slcpattern == '.') {
                        dp[row][col] = dp[row][col] || dp[row][col - 1];
                    }
                }
            }
        }
    }

    return dp[p.length][s.length];
};
//https://www.youtube.com/watch?v=DJvw8jCmxUU&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=20
console.log(isMatch("mississippi", "mis*is*p*."));//false
console.log(isMatch("mississippi", "mis*i.*p*i"));//true

[[true, false, false, false],
[false, false, false, false],
[true, false, false, false],
[false, true, false, false],
[true, true, true, false],
[false, false, false, true]]
console.log(isMatch("aab", "c*a*b"));//true


//44. Wildcard Matching
var isMatch = function (s, p) {
    let dp = new Array(p.length + 1).fill(false).map(_ => new Array(s.length + 1).fill(false));

    for (let i = 0; i < dp.length; i++) {
        for (let j = 0; j < dp[0].length; j++) {
            if (i == 0 && j == 0) {
                dp[i][j] = true;
            } else if (i == 0) {
                dp[i][j] = false;
            } else if (j == 0) {
                //2 conditions
                let pattern = p.charAt(i - 1);
                if (pattern == '*') {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = false;
                }
            } else {
                let pattern = p.charAt(i - 1);
                let str = s.charAt(j - 1);

                if (pattern == '?' || pattern == str) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
                else if (pattern == '*') {
                    /* Remember
                    if * 
                        - we need to check all columns of previous row
                        - In short check dp[row-][col-1] || dp[row][col-1], if any is true.
                */
                    //we need to check all columns of previous row
                    dp[i][j] = dp[i - 1][j] || dp[i][j - 1];
                } else {
                    dp[i][j] = false;
                }
            }
        }
    }
    console.log(dp)
    return dp[p.length][s.length];
};
//https://www.youtube.com/watch?v=NbgUZAoIz3g&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=19
console.log(isMatch("baaabab", "ba*a?"));
console.log(isMatch("adceb", "*a*b"));//true
[[true, false, false, false, false, false],
[true, true, true, true, true, true],
[false, true, false, false, false, false],
[false, true, true, true, true, true],
[false, false, false, false, false, true]]
console.log(isMatch("acdcb", "a*c?b"));//false





