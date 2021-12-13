//https://www.youtube.com/watch?v=oBt53YbR9Kk&t=13s

/*
    n = array
    m = target Sum
    General :
    Num of nodes in tree == branching factor to the height (n^m)
*/
//Fibonacci of nth num
function fib(nth) {
    if (nth == null || nth == 0 || nth == 1) return nth;

    function recurse(nth) {
        //remember base case
        if (nth == 0 || nth == 1) return nth;
        return recurse(nth - 1) + recurse(nth - 2);
    }
    return recurse(nth);
}

/* memoization */
function fib(nth) {
    let cache = {};
    if (nth == 0 || nth == 1) return nth;

    function recurse(nth) {
        if (nth == 0 || nth == 1) return nth;

        if (cache[nth]) return cache[nth];
        cache[nth] = recurse(nth - 1) + recurse(nth - 2);
        return cache[nth];
    }

    recurse(nth);
    return cache[nth];
}

//Fibonacci of nth num
function fib(nth, cache = {}) {
    if (cache[nth]) return cache[nth];
    if (nth == 0 || nth == 1) return nth;
    cache[nth] = fib(nth - 1, cache) + fib(nth - 2, cache);

    return cache[nth];
}

/* 
    Bruteforce: T: O(2^ m+n), S: O(m * n)
    Memoized: T: O(m * n), S: O(m + n)
*/
function gridTraveler(m, n) {
    if (m == 1 || n == 1) return 1;//if it is grid (1,1) return 1
    //out of bounds
    if (m == 0 || n == 0) return 0;

    let cache = {};

    function traverse(m, n) {

        if (m == 1 || n == 1) return 1;//if it is grid (1,1) return 1
        //out of bounds
        if (m == 0 || n == 0) return 0;
        let key = m + '_' + n;
        if (key in cache) return cache[key];

        cache[key] = traverse(m - 1, n) + traverse(m, n - 1);

        return cache[key];
    }

    traverse(m, n);

    return cache[m + '_' + n];
}

console.log(gridTraveler(1, 1));
console.log(gridTraveler(2, 3));
console.log(gridTraveler(3, 2));
console.log(gridTraveler(3, 3));
console.log(gridTraveler(18, 18));


//Question: TargetSum/Two Sum (Given an array, Is is possible to add those and acheive target sum).
function canSum(targetSum, nums) {
    if (nums == null || nums.length == 0) return true;

    function traverse(currSum) {
        if (currSum == 0) return true;

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > currSum) return false;

            //return  traverse(currSum - nums[i]); this is wrong , only return when true otherwise dont rturn
            //if (traverse(currSum - nums[i]) == true) return true;

            if (traverse(currSum - nums[i])) return true;
        }
        return false;
    }
    return traverse(targetSum, nums);
}

/*
    Bruteforce: T: O(n^m), S: O(m)
    Memoized: T: O(m * n), S: O(m)
*/
/* memoization */
//target SUM , number can be used multiple times.
function canSum(targetSum, nums) {
    if (nums == null || nums.length == 0) return true;
    let cache = {};

    function traverse(currSum) {
        if (currSum in cache) return cache[currSum];

        if (currSum == 0) return true;

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > currSum) return false;

            if (traverse(currSum - nums[i]) == true) {
                cache[currSum] = true;
                return true;//imp to return
            }
        }
        cache[currSum] = false;//intentionally kept after for loop, wait till for loop finish then return false
        return false;//imp to return
    }
    traverse(targetSum, nums);//imp to call

    return cache[targetSum];//imp to return
}




//Question: TargetSum/Two Sum (Given an array, Return one the combination of  numbers which  add to  target sum).
function canSum(targetSum, nums) {
    if (!nums || !nums.length) return nums;

    function traverse(currSum) {
        if (currSum == 0) return [];
        if (currSum < 0) return false;

        for (let i = 0; i < nums.length; i++) {
            let remainderResult = traverse(currSum - nums[i]);
            if (remainderResult) {
                return [...remainderResult, nums[i]]
            }
        }
        return false;
    }

    return traverse(targetSum) ? traverse(targetSum) : [];
}

/*
    Bruteforce: T: O(n^m), S: O(m)
    Memoized: T: O(n * m^2), S: O(m*m)
*/

function canSum(targetSum, nums) {
    if (!nums || !nums.length) return nums;
    let cache = {};

    function traverse(currSum) {
        if (cache[currSum]) return cache[currSum];

        if (currSum == 0) return [];
        if (currSum < 0) return false;

        for (let i = 0; i < nums.length; i++) {
            let remainderResult = traverse(currSum - nums[i]);
            if (remainderResult) {
                cache[currSum] = [...remainderResult, nums[i]];
                return cache[currSum];
            }
        }
        cache[currSum] = false;
        return false;
    }

    traverse(targetSum);

    return cache[targetSum] ? cache[targetSum] : [];
}



//Question: TargetSum/Two Sum (Given an array, Best/shortest combination of  numbers which  add to  target sum).
function canSum(targetSum, nums) {
    if (!nums || !nums.length || targetSum == 0) return [];
    //let shortestCombination = null;

    function traverse(currSum) {
        //base case
        if (currSum == 0) return [];
        if (currSum < 0) return false;

        let shortestCombination = null;

        for (let i = 0; i < nums.length; i++) {
            let remainderResult = traverse(currSum - nums[i]);
            if (remainderResult) {
                let combination = [...remainderResult, nums[i]];
                if (shortestCombination == null || shortestCombination.length > combination.length) {
                    shortestCombination = combination;
                }
                //return shortestCombination;---wrong do not return , check all comb
            }
        }
        return shortestCombination;
    }

    return traverse(targetSum) ? traverse(targetSum) : [];
}


/*
n = array
m = target Sum
    Bruteforce: T: O(n^m * m),  forming new array by copying arr+add new number , in worst case this could go to m length(targetSum) [1,1,1,1,1....]
                S: O(m^2)
    Memoized: T: O(m * n * m), 
              S: O(m * m) (cache keys * and each value is equal to m length)
*/
/* memoization */
function canSum(targetSum, nums) {
    if (!nums || !nums.length || targetSum == 0) return [];
    let cache = {};

    function traverse(currSum) {
        //base case
        if (currSum == 0) return [];
        if (currSum < 0) return false;

        let shortestCombination = null;

        for (let i = 0; i < nums.length; i++) {
            let remainderResult = traverse(currSum - nums[i]);
            if (remainderResult) {
                let combination = [...remainderResult, nums[i]];
                if (shortestCombination == null || shortestCombination.length > combination.length) {
                    shortestCombination = combination;
                }
                //return shortestCombination;---wrong do not return , check all comb
            }
        }
        cache[currSum] = shortestCombination;
        return shortestCombination;
    }

    //return traverse(targetSum) ? traverse(targetSum) : [];
    traverse(targetSum);
    return cache[targetSum];
}

console.log(canSum(7, [2, 3]));//[3, 2, 2]
console.log(canSum(7, [5, 3, 4, 7]));//[7]
console.log(canSum(7, [2, 4]));//[]
console.log(canSum(8, [2, 3, 5]));//[5, 3]
console.log(canSum(8, [1, 4, 5]));//[ 4, 4 ]
console.log(canSum(100, [1, 2, 5, 25]));


//LeetCode 139. Word Break
//Question: Target Word, (Given an array of letters, return if word can be construct).
function canConstruct(target, wordBank) {
    if (target == null || target.length == 0 || wordBank == null || wordBank.length == 0) return true;

    function traverse(currWord) {
        if (currWord == '') return true;

        for (let i = 0; i < wordBank.length; i++) {
            //if (currWord.indexOf(wordBank[i]) == 0) return traverse(currWord.slice(wordBank[i].length)); //returning false also therefore incorrect
            /* 
                indexOf matches exact substring and then return starting index
                slice  cuts and returns new string, considering start index and not consider end index. Also endIndex optional.
                        wordBank[i].length means include that index while returning
            */
            if (currWord.indexOf(wordBank[i]) == 0) {
                let suffix = currWord.slice(wordBank[i].length);
                if (traverse(suffix)) return true;
            }
        }
        return false;
    }
    return traverse(target);
}



/*
    n = array, m = target Sum
    General : Num of nodes in tree == branching factor to the height (n^m)
     Brute Force:
        T = O(n^m * m)   (slice coping over)
        S = O(m * m)  (conside slice retur  new array)

     Memoize :
        T = O(n * m^2)   (slice coping over)
        S = O(m * m)  (conside slice retur  new array)
*/

//MEMOIZATION
function canConstruct(target, wordBank) {
    if (target == null || target.length == 0 || wordBank == null || wordBank.length == 0) return true;
    let cache = {};

    function traverse(currWord) {
        if (currWord in cache) return cache[currWord];
        if (currWord == '') return true;

        for (let i = 0; i < wordBank.length; i++) {
            if (currWord.indexOf(wordBank[i]) == 0) {
                let suffix = currWord.slice(wordBank[i].length);
                if (traverse(suffix)) {
                    cache[currWord] = true;
                    return true;
                }
            }
        }
        cache[currWord] = false;
        return false;
    }
    return traverse(target);
}


//Question: Target Word, (return number of ways the word can be coonstructed).
function countConstruct(target, wordBank) {
    if (target == null || target.length == 0 || wordBank == null || wordBank.length == 0) return true;

    function traverse(currWord) {
        if (currWord == '') return 1;
        let totalWays = 0;

        for (let i = 0; i < wordBank.length; i++) {
            if (currWord.indexOf(wordBank[i]) == 0) {
                let suffix = currWord.slice(wordBank[i].length);
                //if (traverse(suffix)) {
                let numWaysForRest = traverse(suffix);
                totalWays += numWaysForRest;
                //}

            }
        }
        return totalWays;
    }
    return traverse(target);
}

console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));//1
console.log(countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));//0
console.log(countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));//4

/*
    n = array, m = target Sum
    General : Num of nodes in tree == branching factor to the height (n^m)
     Brute Force:
        T = O(n^m * m)   (slice coping over)
        S = O(m * m)  (conside slice retur  new array)

     Memoize :
        T = O(n * m^2)   (slice coping over)
        S = O(m * m)  (conside slice retur  new array)
*/

//Memoizatgion
function countConstruct(target, wordBank) {
    if (target == null || target.length == 0 || wordBank == null || wordBank.length == 0) return true;
    let cache = {};

    function traverse(currWord) {
        if (currWord in cache) return cache[currWord];

        if (currWord == '') return 1;
        let totalWays = 0;

        for (let i = 0; i < wordBank.length; i++) {
            if (currWord.indexOf(wordBank[i]) == 0) {
                let suffix = currWord.slice(wordBank[i].length);
                //if (traverse(suffix)) {
                let numWaysForRest = traverse(suffix);
                totalWays += numWaysForRest;
                //}

            }
        }
        cache[currWord] = totalWays;
        return totalWays;
    }
    return traverse(target);
}

console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));//1
console.log(countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));//0
console.log(countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));//4



//140. Word Break II
//Question: Target Word, (return all the combinations the word can be coonstructed).
function canConstruct(target, wordBank) {
    if (target == null || target.length == 0 || wordBank == null || wordBank.length == 0) return true;
    //let allCombinations = [];

    function traverse(currWord) {
        if (currWord == '') return [[]];
        let allCombinations = [];
        //let combinations = null;

        for (let i = 0; i < wordBank.length; i++) {
            if (currWord.indexOf(wordBank[i]) == 0) {
                let suffix = currWord.slice(wordBank[i].length);
                let remainderCombination = traverse(suffix);
                let combinations = remainderCombination.map((ways) => [wordBank[i], ...ways]);
                // combinations = [wordBank[i], ...remainderCombination];
                allCombinations.push(...combinations);
            }
        }
        return allCombinations;
    }
    return traverse(target);
}

/*
    n = array, m = target Sum
    General : Num of nodes in tree == branching factor to the height (n^m)
     Brute Force:
        T = O(n ^ m)
        S = O(m )

     Memoize :
        T = O(n ^ m)   
        S = O(m )  
*/

/* Memoization */
function canConstruct(target, wordBank) {
    if (target == null || target.length == 0 || wordBank == null || wordBank.length == 0) return true;
    let cache = {};

    function traverse(currWord) {
        if (currWord in cache) return cache[currWord];

        if (currWord == '') return [[]];
        let allCombinations = [];

        for (let i = 0; i < wordBank.length; i++) {
            if (currWord.indexOf(wordBank[i]) == 0) {
                let suffix = currWord.slice(wordBank[i].length);
                let remainderCombination = traverse(suffix);
                let combinations = remainderCombination.map((ways) => [wordBank[i], ...ways]);
                allCombinations.push(...combinations);
            }
        }
        cache[currWord] = allCombinations;
        return allCombinations;
    }

    traverse(target);
    return cache[target];
}
/* [  [ab,cd,ef],[ab,c,def],[abc,def],[abcd,ef] ] */
console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]));

/* [  [purp,le],[p,ur,p,le] ] */
console.log(canConstruct("purple", ["purp", "p", "ur", "le", "purpl"]));

console.log(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));
//console.log(canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));

//140 https://leetcode.com/problems/word-break-ii/
var wordBreak = function (s, wordDict) {
    if (s == null || s.length == 0) return [];
    if (wordDict == null || wordDict.length == 0) return [];

    let result = [];
    function traverse(targetStr) {
        if (targetStr.length == 0 || targetStr == "") return [[]];
        if (targetStr.length < 0) return false;

        let allCombinations = [];
        for (let i = 0; i < wordDict.length; i++) {
            if (targetStr.slice(0, wordDict[i].length) == wordDict[i]) {
                let remainderCombination = traverse(targetStr.slice(wordDict[i].length));
                //if(remainderCombination){
                let combination = remainderCombination.map((subarr) => [wordDict[i], ...subarr]);
                allCombinations.push(...combination)
                // }
            }
        }

        return allCombinations;
    }
    return traverse(s).map((sub) => sub.join(' '));
}
//https://www.youtube.com/watch?v=2NaaM_z_Jig&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=50
//https://leetcode.com/problems/word-break-ii/discuss/764151/JavaScript-75-80ms-Heavily-Commented-DP
console.log(wordBreak("pepcodinglovesmangoicecream", ["loves", "pep", "coding", "pepcoding", "icecream", "ice", "cream", "man", "go", "mango"]))


//Leetcode 322. Coin Change ->>Best Way and what are the coins to form best ways
//BruteForce
var coinChange = function (coins, amount) {
    if (amount == null || amount == 0) return 0;
    if (coins == null || coins.length == 0) return -1;

    function traverse(currSum) {
        if (currSum == 0) return [];
        if (currSum < 0) return false;

        let shortestWay = null;//cannot initialize with [] , it will always be shortest

        for (let i = 0; i < coins.length; i++) {
            let remainderResult = traverse(currSum - coins[i]);
            if (remainderResult) {
                let combination = [...remainderResult, coins[i]];

                if (shortestWay == null || shortestWay.length > combination.length) {
                    shortestWay = combination;
                }
            }
        }
        return shortestWay;
    }
    let bestWay = traverse(amount);

    return bestWay?.length ? bestWay.length : -1;
};

//Memoization
var coinChange = function (coins, amount) {
    if (amount == null || amount == 0) return 0;
    if (coins == null || coins.length == 0) return -1;

    let cache = {};

    function traverse(currSum) {
        if (currSum in cache) return cache[currSum];

        if (currSum == 0) return [];
        if (currSum < 0) return false;

        let shortestWay = null;//cannot initialize with [] , it will always be shortest

        for (let i = 0; i < coins.length; i++) {
            let remainderResult = traverse(currSum - coins[i]);
            if (remainderResult) {
                let combination = [...remainderResult, coins[i]];

                if (shortestWay == null || shortestWay.length > combination.length) {
                    shortestWay = combination;
                }
            }
        }
        cache[currSum] = shortestWay;
        return shortestWay;
    }
    traverse(amount);
    return cache[amount] ? cache[amount].length : -1;
};



//Leetcode 518. Coin Change ->>Compute the number of combinations that make up that amount
//BruteForce
////All combinations and permutations count
var change = function (amount, coins) {
    if (amount == null || amount == 0) return 0;
    if (coins == null || coins.length == 0) return -1;

    let cache = {};

    function traverse(currSum) {
        if (currSum in cache) return cache[currSum];

        if (currSum == 0) return 1;
        if (currSum < 0) return false;

        let allWays = 0;

        for (let i = 0; i < coins.length; i++) {
            if (coins[i] <= currSum) {
                let remainderResult = traverse(currSum - coins[i]);
                if (remainderResult) {
                    allWays += remainderResult;
                }
            }
        }
        cache[currSum] = allWays;
        return allWays;
    }

    traverse(amount);
    return cache[amount];
};

console.log(change(5, [1, 2, 5]));//9


//All combinations and permutations
var change = function (amount, coins) {
    if (amount == null || amount == 0) return 0;
    if (coins == null || coins.length == 0) return -1;

    function traverse(currSum) {
        if (currSum == 0) return [[]];

        let allCombinations = [];

        for (let i = 0; i < coins.length; i++) {
            if (currSum >= coins[i]) {
                let remainderResult = traverse(currSum - coins[i]);
                let combination = remainderResult.map((ways) => [coins[i], ...ways]);
                allCombinations.push(...combination);
            }
        }
        return allCombinations;
    }

    return traverse(amount);
};

/*
There are 9 cases not 4, but
5 =  1, 1, 1, 1, 1
5 =  1, 1, 1, 2
5 =  1, 1, 2, 1 --this is just different permutation of same combination
5 = 1, 2, 1, 1 --this is just different permutation of same combination
5 = 1, 2, 2
5 =  2, 1, 1, 1 --this is just different permutation of same combination
5 = 2, 1, 2 --this is just different permutation of same combination
5 =  2, 2, 1 --this is just different permutation of same combination
5 = 5

So 4 are left
*/
console.log(change(5, [1, 2, 5]));//1


//518. Coin Change 2
//For big scenarios failing - out of memory---unique combinations 
var change = function (amount, coins) {
    let result = []

    function traverse(currSum, currArr, idx) {
        if (currSum == amount) {
            result.push(currArr);
        }

        for (let i = idx; i < coins.length; i++) {
            if (currSum + coins[i] <= amount) {
                traverse(currSum + coins[i], [...currArr, coins[i]], i);
            }
        }
    }

    traverse(0, [], 0);
    return result;
}
console.log(change(5, [1, 2, 5]));//4
//So 4 are left
//[ [ 1, 1, 1, 1, 1 ], [ 1, 1, 1, 2 ], [ 1, 2, 2 ], [ 5 ] ]

//For big scenarios Working - unique combinations 
var change = function (amount, coins) {
    if (amount == 0) return 1;
    if (amount > 0 && coins.length == 0) return 0;

    let cache = {};

    function traverse(currSum, idx) {
        if (`${currSum}-${idx}` in cache) return cache[`${currSum}-${idx}`];

        if (currSum == 0) return 1;
        let total = 0;

        for (let i = idx; i < coins.length; i++) {

            if (coins[i] <= currSum) {
                total += traverse(currSum - coins[i], i);
            }
        }

        cache[`${currSum}-${idx}`] = total;
        return total;
    }

    traverse(amount, 0);
    return cache[`${amount}-0`];
};
console.log(change(5, [1, 2, 5]));//4


//leetcode 39
var combinationSum = function (candidates, target) {
    if (target == 0) return [[1]];
    if (target > 0 && candidates.length == 0) return 0;

    let result = [];

    function traverse(currSum, currArr, idx) {

        if (currSum == target) {
            result.push(currArr);
        }

        for (let i = idx; i < candidates.length; i++) {

            if (currSum + candidates[i] <= target) {
                traverse(currSum + candidates[i], [...currArr, candidates[i]], i);
            }
        }
    }

    traverse(0, [], 0);
    return result;
};

//leetcode 40
var combinationSum2 = function (candidates, target) {
    if (target == 0) return [[1]];
    if (target > 0 && candidates.length == 0) return 0;

    let result = {};

    candidates.sort((a, b) => a - b);

    function traverse(currSum, currArr, idx) {

        if (currSum == target) {
            if (!result[currArr]) {
                result[currArr] = true;
                /* Arrays elements becomes string after inserting into HashMap */
            }
        }

        for (let i = idx; i < candidates.length; i++) {

            if (currSum + candidates[i] <= target) {
                traverse(currSum + candidates[i], [...currArr, candidates[i]], i + 1);
            }
        }
    }

    traverse(0, [], 0);
    return Object.keys(result).map((subarray) => subarray.split(',').map((num) => +num));
    //    return Object.keys({ '1,1,6': true, '1,2,5': true, '1,7': true, '2,6': true }).map((subarray)=> subarray.split(',').map((num)=>  +num))
    /* To return array elements as nums we need to
      -iterate each subarray,
      -iterate again and convert subarray elemets into number  */
};

//leetcode 40- Not optimized
//https://www.youtube.com/watch?v=G1fRTGRxXU8
var combinationSum2 = function (candidates, target) {
    if (target == 0) return [[1]];
    if (target > 0 && candidates.length == 0) return 0;

    let result = new Set();

    candidates.sort((a, b) => a - b);// sprt is necessary to make sure we avoid duplicate elems

    function traverse(currSum, currArr, idx) {

        if (currSum == target) {
            result.add(currArr.join(','))
        }

        for (let i = idx; i < candidates.length; i++) {
            if (currSum + candidates[i] <= target) {
                traverse(currSum + candidates[i], [...currArr, candidates[i]], i + 1);//this is imp i+1..becoz we cannot repeat same elem twice(given in question)
            }
        }
    }

    traverse(0, [], 0);
    return [...result].map((subarray) => subarray.split(',').map((num) => +num));
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));


////leetcode 40 -- without sets, good solution
var combinationSum2 = function (candidates, target) {
    if (target == 0) return [[1]];
    if (target > 0 && candidates.length == 0) return 0;

    let result = [];

    candidates.sort((a, b) => a - b);// sprt is necessary to make sure we avoid duplicate elems

    function traverse(currSum, currArr, idx) {

        if (currSum == target) {
            result.push(currArr);
        }

        for (let i = idx; i < candidates.length; i++) {
            if (i > idx && candidates[i] == candidates[i - 1]) continue;//--this is imp becoz we avoid duplicate elements(given in question)

            if (currSum + candidates[i] <= target) {
                traverse(currSum + candidates[i], [...currArr, candidates[i]], i + 1);//this is imp i+1..becoz we cannot repeat same elem twice(given in question)
            }
        }
    }

    traverse(0, [], 0);
    return result;
};

//IN this example we dont need SET or MAP extra memory., we handled in recursion
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));//4



//leetcode 216
var combinationSum3 = function (k, n) {
    let result = [];

    function traverse(currSum, currArr, idx) {
        if (currSum == n && currArr.length == k) {
            result.push(currArr);
            return;
        }

        if (currSum > n) return;

        for (let i = idx; i < 10; i++) {//only numbers 1 to 9  and i=idx unique comobinations
            traverse(currSum + i, [...currArr, i], i + 1);//using number only once idx + 1
        }
    }
    traverse(0, [], 1);

    return result;
};
console.log(combinationSum3(4, 2));



//leetcode 77
var combine = function (n, k) {
    let result = [];

    function traverse(currArr, idx) {
        if (currArr.length == k) {
            result.push(currArr);
            return;
        }

        // if (currSum > n) return;

        for (let i = idx; i <= n; i++) {//only numbers 1 to 9  and i=idx unique comobinations
            traverse([...currArr, i], i + 1);//using number only once idx + 1
        }
    }
    traverse([], 1);

    return result;
};

//[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
console.log(combine(4, 2));//combination doesnot contain same numbers exclude [1,1], [2,2], [3,3], [4,4]

//leetcode 46. Permutations
var permute = function (nums) {
    if (nums == null || nums.length == 0 || nums.length > 6) return [[]];

    let result = [];

    function traversal(currArr, numsLeftinAnArray) {
        if (numsLeftinAnArray.length == 0) {
            result.push(currArr);
            return;
        }

        for (let i = 0; i < numsLeftinAnArray.length; i++) {
            let numsLeftinAnArray1 = numsLeftinAnArray.slice(0);
            numsLeftinAnArray1.splice(i, 1);
            traversal([...currArr, numsLeftinAnArray[i]], numsLeftinAnArray1);
        }

    }
    traversal([], nums);
    return result
};
//[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permute([1, 2, 3]));

//[ [ 'a', 'b', 'c' ],['a', 'c', 'b'],['b', 'a', 'c'],['b', 'c', 'a'],['c', 'a', 'b'],['c', 'b', 'a'] ]
console.log(permute(['a', 'b', 'c']));

//Solution 1
var permuteUnique = function (nums) {
    if (nums == null || nums.length == 0) return [[]];

    nums.sort((a, b) => a - b);//sort to identify duplicate integers

    let result = [];

    function traversal(currArr, numsLeftinAnArray) {
        if (numsLeftinAnArray.length == 0) {
            result.push(currArr);
            return;
        }

        for (let i = 0; i < numsLeftinAnArray.length; i++) {
            if (numsLeftinAnArray[i] == numsLeftinAnArray[i - 1]) continue;//duplicate integers


            let numsLeftinAnArray1 = numsLeftinAnArray.slice(0);
            numsLeftinAnArray1.splice(i, 1);
            traversal([...currArr, numsLeftinAnArray[i]], numsLeftinAnArray1);
        }

    }
    traversal([], nums);
    return result;
};
//[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
console.log(permute([1, 2, 3]));

//[[1,1,2],[1, 2, 1],[2, 1, 1]]
console.log(permute([1, 1, 2]));

/* 
Try Permute with 
https://www.youtube.com/watch?v=QKkHCS5bq0I&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=19
 */
//Solution 2
var permute = function (nums) {
    const output = [];
    const dfs = (curr, rest) => {
        if (rest.length === 0) {
            output.push(curr);
            return;
        }
        for (let i = 0; i < rest.length; i++) {
            dfs([...curr, rest[i]], [...rest.slice(0, i), ...rest.slice(i + 1)]);
        }
    }
    dfs([], nums);

    return output;
};

//Solution 3
var permute = function (nums) {
    let res = [], used = new Array(nums.length).fill(false);
    function permuteHelper(depth, used, cur) {
        if (depth == nums.length) {
            res.push(cur.slice());
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i] == false) { // nums[i] is already being used
                cur.push(nums[i]);
                used[i] = true;

                // move to the next depth
                permuteHelper(depth + 1, used, cur);

                // backtrack to previous state
                cur.pop();
                used[i] = false; // nums[i] is no more being used
            }
        }
    }
    permuteHelper(0, used, []);
    return res;
    // Time Complexity: O(N!)
    // Space Complexity: O(N); our function call stack will go as deep as the number of elements to permute, and since
    // in this question we use all elements (N) to permute, the space complexity is O(N)
};

//Solution 4 - Actual Permutation if boxes given more
//https://www.youtube.com/watch?v=QKkHCS5bq0I&list=PL-Jc9J83PIiHO9SQ6lxGuDsZNt2mkHEn0&index=19
var permute = function (nums) {
    let res = [], used = new Array(nums.length + 2).fill(false);
    function permuteHelper(depth, used, cur) {
        if (depth == nums.length) {
            res.push(Array.from(used));
            return;
        }
        for (let i = 0; i < used.length; i++) {
            if (used[i] == false) { // nums[i] is already being used
                //cur.push(nums[i]!=undefined? nums[i]:0);
                used[i] = nums[depth] != undefined ? nums[depth] : false

                // move to the next depth
                permuteHelper(depth + 1, used, [...cur]);

                // backtrack to previous state
                //cur.pop();
                used[i] = false; // nums[i] is no more being used
            }
        }
    }
    permuteHelper(0, used, []);
    return res;
    // Time Complexity: O(N!)
    // Space Complexity: O(N); our function call stack will go as deep as the number of elements to permute, and since
    // in this question we use all elements (N) to permute, the space complexity is O(N)
};

console.log(permute(['a', 'b']));
console.log(permute([1, 2]))




//----------------------------------------------------------------------------------------------------------------------------



/*
    canSum = Decision problem
    howSum = Combinatorial problem
    bestSum = Optimization problem
*/

/*
  
    m = number
    T = O(m)
    S = O(m)
    
*/

/* Tabulation */
function fib(n) {
    const table = Array(n + 1).fill(0);

    table[1] = 1;
    for (let i = 0; i <= n; i++) {
        table[i + 1] += table[i];
        table[i + 2] += table[i];
    }

    return table[n];
}

console.log(fib(6));
console.log(fib(7));
console.log(fib(8));
console.log(fib(50));



/*
    m = number
    T = O(m)
    S = O(m)
*/
function gridTraveler(m, n) {
    const table = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0));

    table[1][1] = 1;

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            let current = table[i][j];
            if (i + 1 <= m) table[i + 1][j] += current;
            if (j + 1 <= n) table[i][j + 1] += current;

        }
    }
    return table[m][n]
}

console.log(gridTraveler(1, 1));
console.log(gridTraveler(2, 3));
console.log(gridTraveler(3, 2));
console.log(gridTraveler(3, 3));
console.log(gridTraveler(18, 18));


/* Is it possible to generate */
function canSum(targetSum, nums) {
    const table = Array(targetSum + 1).fill(false);

    //seed value
    table[0] = true;


    for (let i = 0; i < targetSum; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (table[i] == true) {
                table[i + nums[j]] = true;
            }
        }
    }

    return table[targetSum];
}

/*
    T = O(n*m)
    S = O(m)
*/

console.log(canSum(7, [2, 3]));//true
console.log(canSum(7, [5, 3, 4, 7]));//true
console.log(canSum(7, [2, 4]));//false
console.log(canSum(8, [2, 3, 5]));//true
console.log(canSum(300, [7, 14]));//false




/* howSum tabulation,  */
/*
    T = O(n*m)
    S = O(m)
*/
function howSum(targetSum, nums) {
    if (!nums || !nums.length) return nums;
    let table = Array(targetSum + 1).fill(null);

    table[0] = [];
    for (let i = 0; i < targetSum; i++) {

        if (table[i] != null) {
            for (let j = 0; j < nums.length; j++) {
                table[i + nums[j]] = [...table[i], nums[j]];
            }
        }
    }

    return table[targetSum];
}
console.log(howSum(7, [2, 3]));//[3,2,2]
console.log(howSum(7, [5, 3, 4, 7]));//[4,3]
console.log(howSum(7, [2, 4]));//null
console.log(howSum(8, [2, 3, 5]));//[2,2,2,2]
console.log(howSum(300, [7, 14]));//null


/* howSum tabulation,  */
/*
    T = O(m^2* n)
    S = O(m*m)
*/
function bestSum(targetSum, nums) {
    if (!nums || !nums.length || targetSum == 0) return [];
    let table = Array(targetSum + 1).fill(null);
    table[0] = [];//base case; For Zero Sum we need empty array

    for (let i = 0; i <= targetSum; i++) {
        if (table[i] != null) {//base case , we cannot reach that step directly
            for (let num of nums) {
                let combination = [...table[i], num];
                if (!table[i + num] || table[i + num].length > combination.length) {//.length is null. So if expression is null or undefined do that expresseion
                    table[i + num] = combination;
                }
            }
        }
    }
    return table[targetSum];
}
console.log(bestSum(7, [5, 3, 4, 7]));//[ 7 ]

console.log(bestSum(8, [2, 3, 5]));//[ 3, 5 ]
console.log(bestSum(8, [1, 4, 5]));//[ 4, 4 ]
console.log(bestSum(100, [1, 2, 5, 25]));//[ 25, 25, 25, 25 ]



function canConstruct(target, wordBank) {
    const table = Array(target.length + 1).fill(false);
    table[0] = true;

    for (let i = 0; i <= target.length; i++) {
        if (table[i] == true) {
            for (let word of wordBank) {
                if (target.slice(i, i + word.length) == word) {
                    table[i + word.length] = true;
                }
            }
        }
    }
    return table[target.length];
}

console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));//1
console.log(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));//0
console.log(canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));//4


//Question: Target Word, (return number of ways the word can be coonstructed).
function countConstruct(targetString, wordBank) {
    if (wordBank == null || wordBank.length == 0) return true;
    const table = Array(targetString.length + 1).fill(0);
    table[0] = 1;

    for (let i = 0; i <= target.length; i++) {
        for (let word of wordBank) {
            if (targetString.slice(i, i + word.length) == word) {
                table[i + word.length] += table[i];
            }
        }
    }
    return table[targetString.length];
}


//print all arrays which make targetString
function canConstruct(targetString, wordBank) {

    const table = Array(targetString.length + 1).fill().map(() => []);
    table[0] = [[]];

    for (let i = 0; i <= targetString.length; i++) {
        for (let word of wordBank) {
            if (targetString.slice(i, i + word.length) === word) {
                const newCombination = table[i].map((subarray) => [...subarray, word]);
                table[i + word.length].push(...newCombination);
            }
        }
    }

    return table[targetString.length];
}

/* [  [ab,cd,ef],[ab,c,def],[abc,def],[abcd,ef] ] */
console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]));

/* [  [purp,le],[p,ur,p,le] ] */
console.log(canConstruct("purple", ["purp", "p", "ur", "le", "purpl"]));
console.log(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));//[[]]
console.log(canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));//4



//Bruteforce
let solveKnapsack = function (profits, weights, capacity) {
    let maxProfit = 0;
    let result = [];


    function traverse(currSum, index, currWeight, currProfit) {

        if (currSum == 0) {
            console.log(currWeight, currProfit);
            if (maxProfit < currProfit) {
                result = currWeight.map((item) => item);
                maxProfit = currProfit;
            }
            return;
        }
        if (currSum < 0) return;


        for (let i = index; i < weights.length; i++) {
            traverse(currSum - weights[i], i + 1, [...currWeight, weights[i]], currProfit + profits[i]);
        }

    }
    traverse(capacity, 0, [], 0);
    return result;
    //return maxProfit;

};


var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

/* Memoization - Not able to calculate weight of highest profit*/
let solveKnapsack = function (profits, weights, capacity) {
    let memory = {};

    function traverse(currSum, index, currWeight, currProfit) {
        if (`${currSum}-${index}` in memory) return memory[`${currSum}-${index}`];

        if (currSum == 0) {
            return 0;
        }

        if (currSum < 0) return null;
        let maxProfitComobination = 0;

        for (let i = index; i < weights.length; i++) {
            let remainder = traverse(currSum - weights[i], i + 1, [...currWeight, weights[i]], currProfit + profits[i]);
            if (remainder != null) {
                if (remainder + profits[i] >= maxProfitComobination) {
                    memory[`${currSum}-${index}`] = remainder + profits[i];
                    maxProfitComobination = remainder + profits[i];
                }
            }
        }
        return memory[`${currSum}-${index}`];
    }
    memory[capacity] = traverse(capacity, 0, [], 0);
    return memory[capacity];

};




var profits = [15, 14, 10, 45, 30];
var weights = [2, 5, 1, 3, 4];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

//Tabulation - 
let solveKnapsack = function (profits, weights, capacity) {
    let dp = Array(weights.length + 1).fill(0).map(_ => Array(capacity + 1).fill(0));

    //fill 0th row and colmn
    for (let i = 1; i < dp.length; i++) {
        for (let j = 1; j < dp[0].length; j++) {
            dp[i][j] = dp[i - 1][j];

            if (j >= weights[i - 1]) {

                //including
                let includeScore = profits[i - 1] + dp[i - 1][j - weights[i - 1]];

                //excluding
                let excludeScore = dp[i - 1][j];

                if (includeScore > excludeScore) {
                    dp[i][j] = includeScore;
                }
            }
        }
    }
    return dp[weights.length][capacity];

};
//inbouond
let solveKnapsack = function (profits, weights, capacity) {
    let dp = Array(weights.length + 1).fill(0).map(row => Array(capacity + 1).fill(0));
    //console.log(dp)

    for (let wghIndex = 1; wghIndex < dp.length; wghIndex++) {
        for (let capIndex = 1; capIndex < dp[0].length; capIndex++) {


            dp[wghIndex][capIndex] = dp[wghIndex - 1][capIndex];  //Excluded

            if (weights[wghIndex - 1] <= capIndex) { //wghIndex-1= actual positiooon in weights

                // excluded
                let excluded = dp[wghIndex - 1][capIndex];


                // included including + remainding 
                let included = profits[wghIndex - 1] + dp[wghIndex - 1][capIndex - weights[wghIndex - 1]];

                //decision
                if (excluded > included) {
                    dp[wghIndex][capIndex] = excluded; // excluded
                } else {
                    dp[wghIndex][capIndex] = included;// included including + remainding 
                }

            }
        }
    }

    return dp[weights.length][capacity];
}
var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

var profits = [15, 14, 10, 45, 30];
var weights = [2, 5, 1, 3, 4];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);



let solveKnapsack = function (profits, weights, capacity) {
    let dp = Array(weights.length + 1).fill(0).map(row => Array(capacity + 1).fill(0));
    //console.log(dp)

    for (let wghIndex = 1; wghIndex < dp.length; wghIndex++) {
        for (let capIndex = 1; capIndex < dp[0].length; capIndex++) {


            dp[wghIndex][capIndex] = dp[wghIndex - 1][capIndex];  //Excluded

            if (weights[wghIndex - 1] <= capIndex) { //wghIndex-1= actual positiooon in weights

                // excluded
                let excluded = dp[wghIndex - 1][capIndex];


                // included including + remainding 
                let included = profits[wghIndex - 1] + dp[wghIndex - 1][capIndex - weights[wghIndex - 1]];

                //decision
                if (excluded > included) {
                    dp[wghIndex][capIndex] = excluded; // excluded
                } else {
                    dp[wghIndex][capIndex] = included;// included including + remainding 
                }

            }
        }
    }

    let ans = dp[weights.length][capacity];
    console.log(ans);


    function Pair(i, j, psf) {
        this.i = i;
        this.j = j;
        this.pathsofar = psf;
    }

    let queue = [new Pair(weights.length, capacity, "")];

    while (queue.length > 0) {
        let node = queue.shift();

        //insert neighbors
        if (node.i == 0 || node.j == 0) {
            return node.pathsofar;

        } else {
            let exclude = dp[node.i - 1][node.j];
            if (dp[node.i][node.j] == exclude) {
                queue.push(new Pair(node.i - 1, node.j, node.pathsofar + ""));
            }

            if (weights[node.i - 1] <= node.j) { //wghIndex-1=
                let include = profits[node.i - 1] + dp[node.i - 1][node.j - weights[node.i - 1]];

                if (dp[node.i][node.j] == include) {

                    queue.push(new Pair(node.i - 1, node.j - weights[node.i - 1], node.pathsofar + "" + node.i - 1));
                }
            }
        }
    }
}

//Tabulation - https://www.youtube.com/watch?v=YH6M9WFp02g&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=16

var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

var profits = [15, 14, 10, 45, 30];
var weights = [2, 5, 1, 3, 4];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);




//Tabulation - OutBound knapsack -  no limitation, can repeat , simlar to coin change
let solveKnapsack = function (profits, weights, capacity) {
    let dp = new Array(capacity + 1).fill(0);
    dp[0] = 0;

    for (let bcap = 1; bcap <= capacity; bcap++) {
        let maximum = 0;
        for (let wghtIndex = 0; wghtIndex < weights.length; wghtIndex++) {
            if (bcap >= weights[wghtIndex]) {

                if (profits[wghtIndex] + dp[bcap - weights[wghtIndex]] >= maximum) {
                    maximum = profits[wghtIndex] + dp[bcap - weights[wghtIndex]];
                }
            }
        }
        dp[bcap] = maximum;
    }
    return dp[capacity];
}

//https://www.youtube.com/watch?v=jgps7MXtKRQ
var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);

var profits = [15, 14, 10, 45, 30];
var weights = [2, 5, 1, 3, 4];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);



//1st Approach print there - Very Easy- Basics -
//print all paths
function printStairCasePaths(finalStep) {


    function climbStairs(currStep, pathSofar) {
        if (currStep == 0) console.log(pathSofar);

        if (currStep < 0) return null;

        climbStairs(currStep - 1, pathSofar + "1");
        climbStairs(currStep - 2, pathSofar + "2");
        climbStairs(currStep - 3, pathSofar + "3");

    }
    climbStairs(4, "");

}
//https://www.youtube.com/watch?v=NEuYcztalew
console.log(printStairCasePaths(4));



//2nd Approach return all paths in Array -  Backtracking
//print all paths
function printStairCasePaths(finalStep) {

    function climbStairs(currStep) {

        if (currStep == 0) return [""];
        if (currStep < 0) return [];

        let path1 = climbStairs(currStep - 1);
        let path2 = climbStairs(currStep - 2);
        let path3 = climbStairs(currStep - 3);

        //Post Order Traversal
        let currPath = [];
        console.log(path1, path2, path3)
        for (let i = 0; i < path1.length; i++) {
            currPath.push("1" + path1[i]);
        }


        for (let i = 0; i < path2.length; i++) {
            currPath.push("2" + path2[i]);
        }

        for (let i = 0; i < path3.length; i++) {
            currPath.push("3" + path3[i]);
        }

        return currPath;

    }
    return climbStairs(finalStep);

}
//https://www.youtube.com/watch?v=hMJAlbJIS7E
console.log(printStairCasePaths(4));


//70. Climbing Stairs
var climbStairs = function (n) {
    if (!n || n <= 1) return n;
    let cache = {}; //MEMOIZATION

    function climb(step) {
        if (step in cache) return cache[step];

        if (step == n) return 1;
        if (step > n) return 0;

        cache[step] = climb(step + 1) + climb(step + 2);
        return cache[step];
    }

    //return climb(0);
    cache[n] = climb(0);
    return cache[n]
};


//https://www.youtube.com/watch?v=A6mOASLl2Dg&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=3
var climbStairs = function (n) {
    if (!n || n <= 1) return n;

    let dp = new Array(n + 1).fill(0); //TABULATION
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        if (i == 1) {
            dp[i] = dp[i - 1];
        } else if (i == 2) {
            dp[i] = dp[i - 1] + dp[i - 2];
        } else {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
    }
    return dp[n];
};


//Climb Stirs with Variable Jumps -- Very IMP
var climbStairs = function (n, arr) {

    let dp = new Array(n + 1).fill(0); //TABULATION
    dp[n] = 1;

    for (let i = n - 1; i >= 0; i--) {
        for (let j = 1; j <= arr[i] && i + j < dp.length; j++) {
            dp[i] += dp[i + j];
        }
    }
    console.log(dp)
    return dp[0];
};
//https://www.youtube.com/watch?v=uNqoQ0sNZCM&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=5
console.log(climbStairs(6, [3, 3, 0, 2, 2, 3]));


// Climbing Stairs with Minimum Moves - VVIMP
function climbStairsMinMoves(jumpSteps) {
    let dp = new Array(jumpSteps).fill(null);

    //base condition
    dp[jumpSteps.length - 1] = 0;

    for (let i = dp.length - 2; i >= 0; i--) {

        let min = Number.MAX_SAFE_INTEGER;

        for (let j = 1; j <= jumpSteps[i] && i + j < dp.length; j++) {
            if (dp[i + j] != null) {
                min = Math.min(min, dp[i + j]);
            }
        }
        //dp[i] = min+ 1;
        if (min != Number.MAX_SAFE_INTEGER) {
            dp[i] = min + 1;
        }
    }

    //return dp[0];
    console.log(dp[0]);

    //print all paths
    return printPaths(dp, jumpSteps);
}


function Pair(i, size, jump, psf) {
    this.i = i;
    this.size = size;
    this.jump = jump;
    this.psf = psf;
}

function printPaths(dp, arr) {
    let queue = [new Pair(0, arr[0], dp[0], 0 + "")];
    let allPaths = [];

    while (queue.length > 0) {
        let node = queue.shift();

        if (node.i == dp.length - 1) {
            allPaths.push(node.psf);
        }

        //for( i=0; i< dp.length-1; i++){
        for (let j = 1; j <= node.size && node.i + j < dp.length; j++) {
            let currIndex = node.i + j;
            let min = Number.MAX_SAFE_INTEGER;

            if (dp[currIndex] != null && dp[currIndex] == node.jump - 1) {
                queue.push(new Pair(currIndex, arr[currIndex], dp[currIndex], node.psf + "," + currIndex))
            }
        }
        //}

    }
    return allPaths;

}

//Print all Paths with Minimum Jumps Dynamic Programming | Jump Game - II Solution
//https://www.youtube.com/watch?v=phgjL7SbsWs&list=PL-Jc9J83PIiEZvXCn-c5UIBvfT8dA-8EG&index=10
console.log(climbStairsMinMoves([3, 3, 0, 2, 1, 2, 4, 2, 0, 0]));




//https://www.youtube.com/watch?v=Zobz9BXpwYE&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=6
console.log(climbStairsMinMoves(10, [3, 2, 4, 2, 0, 2, 3, 1, 2, 2]));

//746. Min Cost Climbing Stairs
var climbStairs = function (cost) {
    let dp = new Array(cost.length).fill(0);
    let step1 = 0;
    let step2 = 0;

    for (let i = cost.length - 1; i >= 0; i--) {
        dp[i] = cost[i] + Math.min(step1, step2);
        step2 = step1;
        step1 = dp[i];

    }
    return Math.min(dp[0], dp[1])
};

//https://leetcode.com/problems/min-cost-climbing-stairs/discuss/1104053/JavaScript-O(1)-Space-DP-Solution
//https://leetcode.com/problems/min-cost-climbing-stairs/discuss/1256642/JS-Python-Java-C%2B%2B-or-Simple-DP-Solution-w-Explanation
console.log(climbStairs([10, 15, 20]));
console.log(climbStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));













