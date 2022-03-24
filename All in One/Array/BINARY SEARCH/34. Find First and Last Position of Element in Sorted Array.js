var searchRange = function (nums, target) {

    function getfirstposition() {
        let start = 0;
        let end = nums.length - 1;
        while (start <= end) {
            let midIndex = start + Math.floor((end - start) / 2);
            if (nums[midIndex] == target) {
                // Found target, update firstPosition and move to the left
                end = midIndex - 1;
                firstpoistion = midIndex;
            } else if (target < nums[midIndex]) {
                end = midIndex - 1;
            } else {
                start = midIndex + 1;
            }
        }
        return firstpoistion;
    }

    function getlastposition() {
        let start = 0;
        let end = nums.length - 1;

        while (start <= end) {
            let midIndex = start + Math.floor((end - start) / 2);

            if (nums[midIndex] == target) {

                // Found target, update lastPosition and move to the right
                start = midIndex + 1;
                lastposition = midIndex;

            } else if (target < nums[midIndex]) {
                end = midIndex - 1;
            } else {
                start = midIndex + 1;
            }
        }
        return lastposition;
    }

    if (nums == null || nums.length == 0) return [-1, -1];

    let firstpoistion = -1;
    let lastposition = -1;
    firstpoistion = getfirstposition();
    lastposition = getlastposition();

    return [firstpoistion, lastposition]
};