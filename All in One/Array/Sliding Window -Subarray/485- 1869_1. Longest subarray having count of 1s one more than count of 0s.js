//The problem is to find the length of the longest subarray having count of 1’s one more than count of 0’s.
var checkZeroOnes = function (s) {
    if (s == null || s.length == 0) return false;

    let charMap = new Map();
    let longSub = 0;

    let prefixSum = 0;

    for (let end = 0; end < s.length; end++) {
        let num = s[end];

        if (num == 0) {
            prefixSum -= 1;
        } else {
            prefixSum += 1;
        }

        if (!charMap.has(prefixSum)) {
            charMap.set(prefixSum, end);
        } else if (charMap.has(prefixSum - 1)) {
            longSub = Math.max(longSub, end - charMap.get(prefixSum - 1));
        }
    }
    return longSub;
};

console.log(checkZeroOnes([0, 1, 1, 0, 0, 1]));
// Input: arr = { 0, 1, 1, 0, 0, 1}
// Output: 5
// From index 1 to 5.


console.log(checkZeroOnes([1, 0, 0, 1, 0]));
// Input: arr[] = { 1, 0, 0, 1, 0}
// Output: 1


//https://www.geeksforgeeks.org/longest-subarray-count-1s-one-count-0s/
//https://www.youtube.com/watch?v=sUsojorcNDA