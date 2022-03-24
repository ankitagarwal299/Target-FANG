function floorCeilOfElement(nums, target) {
    if (nums == null || nums.length == 0) return [];

    let floor = -1;
    let ceil = -1;

    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        let midIndex = start + Math.floor((end - start) / 2);

        if (target < nums[midIndex]) {

            end = midIndex - 1;
            ceil = nums[midIndex];

        } else if (target > nums[midIndex]) {
            start = midIndex + 1;
            floor = nums[midIndex];
        } else {
            ceil = nums[midIndex];
            floor = nums[midIndex];
            break;//imp
        }
    }
    return [floor, ceil]
}
//https://www.youtube.com/watch?v=qaQRRWXgFIQ
//Pepcoding
//https://www.callicoder.com/binary-search-ceiling-of-element-in-sorted-array/
console.log(floorCeilOfElement([1, 3, 9, 15, 15, 18, 21], 0));
