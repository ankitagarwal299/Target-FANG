//rmove in place, return first k elements
//remember
var removeElement = function (nums, val) {
    if (nums == null || nums.length == 0) [];

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {//imp <=
        if (nums[left] == val) {
            nums[left] = nums[right];
            right--;
        } else {
            left++;
        }

    }
    return left;
};

console.log(removeElement([3, 2, 2, 3]));//Output: 2, nums = [2,2,_,_]
console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2]));//Output: 5,nums =[0,1,4,0,3,_,_,_]
