/* Binary Search Approach */
/*
Given a sorted integer array arr, two integers k and x, 
return the 
k closest integers to x in the array. 
The result should also be sorted in ascending order.Given a sorted integer array arr
 */

var findClosestElements = function (arr, k, x) {

    // corner cases
    if (x < arr[0]) {
        return arr.splice(0, k);
    }
    if (arr[arr.length - 1] < x) {
        return arr.splice(arr.length - k, k);
    }

    let low = 0;
    let high = arr.length - 1;
    let mid = 0;

    while (low <= high) {
        mid = Math.floor((low + high) / 2);

        if (arr[mid] == x) {
            break;//found x
        }
        else if (x > arr[mid]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    // let left = mid - 1;
    // let right = mid;

    let left = 0;
    let right = 0;
    /* VVVVVIMP scenario */ //[1, 5, 10]  k=1 and x = 4 is the example of such
    if (mid > 0) {
        left = mid - 1;
        right = mid;
    } else {
        left = mid;
        right = mid + 1;
    }

    let ans = [];
    while (left >= 0 && right < arr.length && k > 0) {
        if (Math.abs(arr[left] - x) <= Math.abs(arr[right] - x)) {
            ans.push(arr[left])
            left--;

        } else {
            ans.push(arr[right])
            right++;

        }
        k--;
    }

    while (left >= 0 && k > 0) {
        ans.push(arr[left]);
        left--;
        k--;
    }

    while (right < arr.length && k > 0) {
        ans.push(arr[right]);
        right++;
        k--;
    }

    return ans.sort((a, b) => a - b);
};
//https://www.youtube.com/watch?v=6AackEaa0Qs&list=PL-Jc9J83PIiHhXKonZxk7gbEWsmSYP5kq&index=8
console.log(findClosestElements([1, 2, 3, 4, 5], 4, 3));//array is sorted is given
