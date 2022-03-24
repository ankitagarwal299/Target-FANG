

//METHOD 2. Use a HashMap (Most efficient)
var twoSum = function (nums, target) {
    if (nums == null || nums.length < 2) return [];

    let map = new Map();

    //Do not fill before otherwise it will count itself
    // for(let i=0; i< nums.length;i++) {
    //     let char = nums[i];
    //     map.set(char, i);
    // }

    for (let i = 0; i < nums.length; i++) {
        let char = nums[i];

        if (map.has(target - char)) {
            let index = map.get(target - char);
            return [i, index];
        } else {
            map.set(char, i);
        }
    }
    return [];
};


//METHOD 1. Use Sorting along with the two-pointer approach----This methos doesnot work if asked to return indexes, after sorting indexs are changed therefore Map approach is used
var twoSum = function (nums, target) {
    if (nums == null || nums.length < 2) return [];

    nums.sort((a, b) => a - b);
    console.log(nums)

    let start = 0;
    let end = nums.length - 1;
    while (start < end) {
        if (nums[start] + nums[end] == target) return [start, end]
        else if (nums[start] + nums[end] < target) {
            start++;
        } else {
            end--;
        }
    }
    return [];
};