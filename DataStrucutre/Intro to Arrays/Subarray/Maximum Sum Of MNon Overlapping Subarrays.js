//Both Question 10 times practice on papper- Very easy


/* First Question:
One approach/ Dynamic Solution - to SOLVE "Maximum Sum Of M Non Overlapping Subarrays of fixed size K" */
//https://www.youtube.com/watch?v=Nkgylsa5DY8&t=53s



//Second Question Variant: Maximum Sum Of 2 Non Overlapping Subarrays of DIFFERENT size- Excellent solution
// Slide the L and M windows separately. 
function maxSumTwoNoOverlap(A, L, M) {
    if (A == null || A.length == 0) return 0;
    let preSums = new Array(A.length);      // preSums[i] is the sum of the first i+1 elements: sum(A[0, i])
    preSums[0] = A[0];
    for (let i = 1; i < A.length; ++i) preSums[i] = preSums[i - 1] + A[i];

    let result = preSums[M + L - 1];
    // Try out all possible L windows, add each L window sum with the greatest M window sum to its left and maintain the maximum sum.
    let maxM = preSums[M - 1];
    for (let i = L + M; i < A.length; ++i) {
        // L + M window == M window, L window
        // i is the end of the window of size L + M
        // i - L - M + 1 is the start of the window of size L + M
        // i - L is the end of the M subwindow
        // i - L + 1 is the start of the L subwindow
        maxM = Math.max(maxM, preSums[i - L] - preSums[i - L - M]);
        result = Math.max(result, maxM + preSums[i] - preSums[i - L]);
    }

    // Try out all possible M windows, add each M window sum with the greatest L window sum to its left and maintain the maximum sum.
    let maxL = preSums[L - 1];
    for (let i = L + M; i < A.length; ++i) {
        maxL = Math.max(maxL, preSums[i - M] - preSums[i - L - M]);
        result = Math.max(result, maxL + preSums[i] - preSums[i - M]);
    }
    return result;
}

//https://leetcode.com/problems/maximum-sum-of-two-non-overlapping-subarrays/discuss/278251/JavaC%2B%2BPython-O(N)Time-O(1)-Space
//please check comments section

//Pepcoding Explanation to understand https://www.youtube.com/watch?v=8e6U4O5VUx0