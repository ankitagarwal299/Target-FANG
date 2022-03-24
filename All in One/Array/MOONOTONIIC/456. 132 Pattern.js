var find132pattern = function (nums) {
    if (nums == null || nums.length < 3) return false;

    let maxfromright = -Infinity;

    let stack = [];
    for (let i = nums.length - 1; i >= 0; i--) {
        while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
            maxfromright = stack.pop();
        }
        if (nums[i] > maxfromright) {
            stack.push(nums[i]);

            /* 
            Case1: we found 3 in patetrn 132, if number is greater than stack and second max
            Case2: if num is not greater than stackpeek and is greater than second max (start again 132 pattern)
                   this means 312 1 being greater than 2 
            */
        } else if (nums[i] < maxfromright) {
            return true;

            /*Case 3: [-2,1,-2]  should not be equal*/
        }
    }
    return false;
};

//Edge cases
//[-2,1,-2] - false
//[5, 7 ,6 , 10 ,4 , 9, 3, 2]- 576 true