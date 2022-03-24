function findSumMaxSubarrayOfSizeK(arr, k) {
    if (arr == null || arr.length == 0 || k == null || k == 0) return 0;

    let maxSum = -Infinity;
    let windowSum = 0;
    let start = 0;
    let end = 0;

    while (end < arr.length) {
        windowSum += arr[end];

        if (end - start + 1 == k) {
            maxSum = Math.max(windowSum, maxSum);

            windowSum -= arr[start];
            start++;

        }
        end++;
    }
    return maxSum;
}
console.log(findSumMaxSubarrayOfSizeK([4, 2, 3, 5, 1, 2], 3));