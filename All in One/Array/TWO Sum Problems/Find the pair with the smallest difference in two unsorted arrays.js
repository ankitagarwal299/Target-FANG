function findSmallestDifferencePair(nums1, nums2) {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    let smallestDiff = Infinity;
    let diffpair = [0, 0];

    let i = 0;
    let j = 0;
    while (i < nums1.length && j < nums1.length) {
        let currDiff = Math.abs(nums1[i] - nums2[j]);
        if (currDiff < smallestDiff) {
            smallestDiff = currDiff;

            diffpair[0] = nums1[i];
            diffpair[1] = nums2[j];
        }

        if (nums1[i] < nums2[j]) {//important remember
            i++;
        } else {
            j++;
        }
    }
    return diffpair;
}
console.log(findSmallestDifferencePair([1, 3, 15, 11, 2], [23, 127, 235, 19, 8]));//[11, 8]; this pair has the smallest difference.

//https://www.callicoder.com/smallest-difference-pair-two-unsorted-arrays/