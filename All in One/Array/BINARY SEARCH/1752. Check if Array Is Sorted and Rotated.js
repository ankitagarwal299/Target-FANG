var check = function (nums) {
    if (nums == null || nums.length == 0) return false;

    let turninigpoint = 0;//only 1 place next num < prev 
    for (let i = 1; i < nums.length; i++) {
        let prev = nums[i - 1];

        if (prev > nums[i]) {
            turninigpoint++
        }
        if (turninigpoint > 1) return false
    }

    if (turninigpoint == 0) return true;//[1,2,3,4] complete sorted can be sid as rotated

    return nums[0] >= nums[nums.length - 1];//[2,1,3,4] check edge case

};

//https://www.youtube.com/watch?v=0nhjhVv1VLs
//JSER