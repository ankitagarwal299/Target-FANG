
//https://www.callicoder.com/minimum-difference-element-in-sorted-array/
1.Order - agnostic Binary Search
2.Find the First and Last Position of an Element in a Sorted Array
3.Count the number of occurrences(frequency) of an element in a sorted array
4.Count the number of occurrences(frequency) of an element in a sorted array
5.Find the floor of an element in a sorted array
6.Find the ceiling of an element in a sorted array
7.Find the smallest letter greater than target in a sorted array of letters
8.Find the minimum difference element in a sorted array
9.Search an element in a nearly(almost) sorted array
10.Search an element in a Rotated Sorted Array
11.Find the Minimum element in a Rotated Sorted Array
12.Find the Rotation Count in a Rotated Sorted array
13.Search an element in a sorted 2d Matrix
14.Find the Rotation Count in a Rotated Sorted array
15.Search an Element in a Row - wise Column - wise sorted matrix
16.Find the position of an element in a sorted infinite array
17.Find Maximum Element in a Bitonic Array
18.Search in Bitonic Array



///https://www.callicoder.com/two-sum-problem/



//https://www.callicoder.com/minimum-window-substring/
1.Minimum Window Substring
2.Longest Subarray with Ones after Replacement
3.Longest Substring with Same Letters after Replacement
4.Longest substring without repeating characters
5.Longest Substring with K distinct Characters
6.Minimum Size Subarray Sum
7.Maximum of All Subarrays of Size K
8.Count Occurrences of Anagram
9.First negative number
10.Maximum Sum Subarray of Size K


//Monotonic Increasing Queue and Monotonic Decreasing Queue
581. Shortest Unsorted Continuous Subarray
496. Next Greater Element I
503.Next Greater Element II
84. Largest Rectangle in Histogram
122. Best Time to Buy and Sell Stock II
862. Shortest Subarray with Sum at Least K


//896. Monotonic Array.js
var isMonotonic = function (A) {

    if (A == null || A.length < 1) return false;
    if (A.length == 1) return true;

    let increasing = true;
    let decreasing = true;
    for (let i = 0; i < A.length - 1; i++) {
        if (A[i] > A[i + 1]) {
            increasing = false;
        }

        if (A[i] < A[i + 1]) {
            decreasing = false;
        }
    }
    return increasing || decreasing;
};

console.log(isMonotonic([1, 3, 2]));

