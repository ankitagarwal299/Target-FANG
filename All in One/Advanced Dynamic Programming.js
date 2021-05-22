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



