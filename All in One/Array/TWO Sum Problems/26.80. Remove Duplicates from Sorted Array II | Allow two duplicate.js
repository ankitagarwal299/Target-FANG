var removeDuplicates = function (nums) {
    if (nums == null || nums.length < 3) return nums.length;

    let index = 2;

    for (let i = 2; i < nums.length; i++) {

        if (nums[i] != nums[index - 2]) {
            nums[index] = nums[i];
            index++;
        }
    }
    return index;
};

//https://www.youtube.com/watch?v=OZaADxYTfD4
//Easy