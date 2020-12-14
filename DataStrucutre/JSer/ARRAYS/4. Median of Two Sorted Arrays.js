//Approach 1 : O(log (m+n))
var findMedianSortedArrays = function (nums1, nums2) {
    let result = [];

    if (!nums1 && !nums2) return [];

    nums1 = nums1.concat(nums2);

    nums1.sort((a, b) => a - b);  // O(nlog n)

    if (nums1.length % 2 != 0) {
        //odd
        return nums1[Math.floor(nums1.length / 2)];
    } else {
        //even
        return (nums1[(nums1.length / 2) - 1] + nums1[nums1.length / 2]) / 2;
    }
};


//Approach 2 : O(m+n) - Faster than above
var findMedianSortedArrays = function (nums1, nums2) {
    const result = [];

    let i = 0, j = 0;
    while (i < nums1.length || j < nums2.length) {
        if (i == nums1.length) {
            let number = nums[j];
            result.push(number);
            j++;
            continue;
        }

        if (j == nums2.length) {
            result.push(nums1[i++]);
            continue;
        }

        if (nums1[i] <= nums2[j]) {
            result.push(nums1[i++]);
        } else {
            result.push(nums2[j++]);
        }
    }

    if (result.length % 2 == 0) {
        //even
        return (result[(result.length / 2) - 1] + result[(result.length / 2)]) / 2
    } else {
        return result[(result.length - 1) / 2];
    }


};


//Approach 3 : Olog(m+n) - Faster than above
//Tushar
//https://www.youtube.com/watch?v=LPFhl65R7ww&t=1265s
var findMedianSortedArrays = function (nums1, nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);

    const x = nums1.length;
    const y = nums2.length;

    let low = 0;
    let high = nums1.length;

    while (low <= hi) {
        let partitionX = (low + high) / 2;
        let partitionY = (x + y + 1) / 2 - partitionX;

        let maxLeftX = partitionX == 0 ? -Infinity : nums1[partitionX - 1];
        let minRightX = partitionX == x ? -Infinity : nums1[partitionX];

        let maxLeftY = partitionY == 0 ? Infinity : nums2[partitionY - 1];
        let minRightY = partitionY == y ? Infinity : nums2[partitionY];

        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {//partitioned correctly
            if ((x + y) % 2 == 0) {//total elems is even
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;

            } else if (maxLeftX > minRightY) {
                high = partitionX - 1;//we are too far on right side for partitionX. Go on left side

            } else {
                low = partitionX + 1;//we are too far on left side for partitionX. Go on left right
            }
        }
    }
};
console.log(findMedianSortedArrays([1, 3], [2]))