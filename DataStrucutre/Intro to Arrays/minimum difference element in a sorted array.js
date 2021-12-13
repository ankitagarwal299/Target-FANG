//https://www.youtube.com/watch?v=3RhGdmoF_ac
var minimumAbsDifference = function (arr, target) {
    if (arr != null && arr.length == 0) return null;

    let low = 0;
    let high = arr.length - 1;
    let mid = 0;

    while (low <= high) {
        mid = Math.floor(low + (high - low) / 2);

        if (arr[mid] == target) return arr[mid];//find min diff element

        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    if (Math.abs(arr[low] - target) < Math.abs(arr[high] - target)) {
        return arr[low];
    } else {
        return arr[high];
    }
};


/*

Example 1:

Input: a[] = [2, 5, 10, 12, 15], target = 6
Output: 5
Explanation: The difference between the target value '6' and '5' is the minimum.
Example 2:

Input: a[] = [2, 5, 10, 12, 15], target = 5
Output: 5
Example 3:

Input: a[] = [2, 5, 10, 12, 15], target = 8
Output: 10
Example 4:

Input: a[] = [2, 5, 10, 12, 15], target = 11
Output: 10
Example 5:

Input: a[] = [2, 5, 10, 12, 15], target = 20
Output: 15

*/


//https://www.callicoder.com/minimum-difference-element-in-sorted-array/