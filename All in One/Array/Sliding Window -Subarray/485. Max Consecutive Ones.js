var findMaxConsecutiveOnes = function (nums) {
    if (nums == null || nums.length == 0) return 0;

    let longSubstr = 0;
    let count1 = 0;

    let start = 0;
    for (let end = 0; end < nums.length; end++) {
        let char = nums[end];

        if (char == 1) {
            count1++;
        } else {
            count1 = 0;
        }

        longSubstr = Math.max(longSubstr, count1);
    }

    return longSubstr;
};

//similar to 1446. Max Consecutive Characters || Easy.js 
//but same techinique will not apply eg input [0] or [0,0,0]