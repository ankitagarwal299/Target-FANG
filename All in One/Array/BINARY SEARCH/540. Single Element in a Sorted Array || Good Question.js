//https://www.youtube.com/watch?v=WFNa5o-dHGo
//Pepcoding

//VVVIMP
var singleNonDuplicate = function (nums) {
    if (nums == null || nums.length == 0) return -1;

    //base case, one element which appears exactly once.
    if (nums[0] != nums[1]) return nums[0];
    if (nums[nums.length - 1] != nums[nums.length - 2]) return nums[nums.length - 1];

    let start = 0;
    let end = nums.length - 1;
    while (start <= end) {
        let midIndex = start + Math.floor((end - start) / 2);

        if (nums[midIndex] != nums[midIndex - 1] && nums[midIndex] != nums[midIndex + 1]) {

            return nums[midIndex]; //then result, not equal both sides

        } else if (nums[midIndex] == nums[midIndex - 1]) {

            let count = midIndex - start + 1;

            if (count % 2 == 0) {//even elements then search right

                start = midIndex + 1;
            } else {

                end = midIndex - 2;
            }
        } else if (nums[midIndex] == nums[midIndex + 1]) {
            let count = end - midIndex + 1;
            if (count % 2 == 0) {//even elements then search right

                end = midIndex - 1;
            } else {

                start = midIndex + 2;
            }
        }
    }

};