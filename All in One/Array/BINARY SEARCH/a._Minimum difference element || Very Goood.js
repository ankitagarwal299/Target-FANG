function minimumDifferenceElementInSortedArray(nums, target) {

    if (nums == null || nums.length == 0) return [];

    if (target < nums[0]) {
        return num[0];
    } else if (target > num[nums.length - 1]) {
        return num[nums.length - 1];
    }

    let floor = -1;
    let ceil = -1;

    let start = 0;
    let end = nums.length - 1;

    while (start <= end) {
        let midIndex = start + Math.floor((end - start) / 2);

        if (target == nums[midIndex]) {
            return nums[midIndex];
        }
        else if (target < nums[midIndex]) {
            end = midIndex - 1;

        } else if (target > nums[midIndex]) {
            start = midIndex + 1;

        }
    }
    /*
        At the end of the while loop,
        a[floor] is the ceiling of target (Smallest number greater than target), and
        a[ceil] is the floor of target (Largest number smaller than target).
    
        Return the element whose difference with target is smaller
    */
    //start index > end index
    if (Math.abs(nums[start] - target) < Math.abs(target - nums[end])) {
        return nums[start];
    } else {
        return nums[end];
    }
}
console.log(minimumDifferenceElementInSortedArray([2, 5, 10, 12, 15], 8));

//Refer: Find the floor && ceiling of an element .js

//https://www.callicoder.com/minimum-difference-element-in-sorted-array/

//Also these questions can be donoe
//Q. Smallest number greater than target
//Q. Largest number smaller than target