function countTriplet(nums) {
    if (nums == null || nums.length == 0) return [];

    nums.sort((a, b) => a - b);

    let count = 0;
    //On^2 complexity
    for (let i = nums.length - 1; i >= 2; i--) {
        let left = 0;
        let right = i - 1;

        while (left < right) {
            let sum = nums[left] + nums[right];

            if (sum == nums[i]) {
                count += 1;
                left++;
                right--;
            } else if (sum < nums[i]) {
                left++;
            } else {
                right--;
            }
        }
    }
    return count;
}
console.log(countTriplet([1, 2, 3, 4, 5]));//4
console.log(countTriplet([1, 1, 1, 2, 2]));
console.log(countTriplet([1, 2, 3, 4, 7, 5]));//6
//https://www.geeksforgeeks.org/count-triplets-such-that-one-of-the-numbers-can-be-written-as-sum-of-the-other-two/

//https://www.youtube.com/watch?v=YnEHFYwQwyU
//Pepcoding