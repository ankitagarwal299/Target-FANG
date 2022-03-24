/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {

    if (nums == null || nums.length == 0) return 0;

    nums.sort((a, b) => a - b);

    let smallestDiff = Infinity;

    //On^2
    for (let i = 0; i < nums.length - 3; i++) {

        //skip duplicates
        if (i != 0 && nums[i] == nums[i - 1]) {
            //i++; for loop will take care
            continue;
        }



        //fix one
        let curr = nums[i];

        let start = i + 1;
        let end = nums.length - 1;

        while (start < end) {
            let currSum = curr + nums[start] + nums[end];
            let currdiff = target - currSum;

            if (currdiff == 0) return currSum;

            if (Math.abs(currdiff) < Math.abs(smallestDiff)) {
                smallestDiff = currdiff;
            }

            if (currdiff > 0) {
                start++
            } else {
                end--;
            }
        }
    }
    return target - smallestDiff;//very very important to find triplet sum
}

//https://www.callicoder.com/triplet-sum-closest-to-target/
//Easy