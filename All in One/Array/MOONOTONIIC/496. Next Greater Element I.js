var nextGreaterElement = function (nums1, nums2) {
    let nextGtrMap = new Map();

    let stack = [];
    for (let i = nums2.length - 1; i >= 0; i--) {

        while (stack.length != 0 && stack[stack.length - 1] < nums2[i]) {//sign change
            stack.pop();
        }
        if (stack.length > 0) {
            nextGtrMap.set(nums2[i], stack[stack.length - 1]);
        }

        stack.push(nums2[i]);
    }

    let result = [];
    for (let i = 0; i < nums1.length; i++) {
        if (nextGtrMap.has(nums1[i])) {
            result.push(nextGtrMap.get(nums1[i]))
        } else {
            result.push(-1)
        }

    }
    return result;
};