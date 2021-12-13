//https://www.youtube.com/watch?v=ry7p7o6GhFk&t=5s
//https://www.youtube.com/watch?v=ZIPirZhUxmQ
var nextPermutation = function (nums) {
    if (!nums || nums.length == 0) return [];

    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {//>= required otherwise failing in [1,1]
        i--;
    }

    if (i < 0) {
        reverse(i + 1, nums.length - 1, nums);//all are increasing [4,3,2,1] index reached -1
        return nums
    }

    let j = nums.length - 1;
    while (j >= 0 && nums[i] >= nums[j]) {//find number greater than i, 6>4 is false, 6>7 is false
        j--;//here >= is required otherwise failing in [1,5,1]
    }

    //swap when found number greater
    [nums[i], nums[j]] = [nums[j], nums[i]];

    reverse(i + 1, nums.length - 1, nums);

    return nums;
};

function reverse(i, j, nums) {
    while (i < j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
        j--;
    }
};

console.log(nextPermutation([1, 2, 3]));
console.log(nextPermutation([5, 8, 2, 6, 9, 7, 4]));
console.log(nextPermutation([1, 5, 1]));
console.log(nextPermutation([1, 1]));
//1. check the increasing order fromo right/end and stop where it is breaking, catch is it can be 2 digits
//2. Find next greater number eg 6974 , next greater is 7469 than 6974 --IMP

//88. Merge Sorted Array -Easy - 3 pointers strategy
var merge = function (nums1, m, nums2, n) {
    //base conditions
    if (nums1 == null && nums2 == null && nums1.length == 0 && nums2.length == 0) return []
    if (nums2 == null && nums2.length == 0) return nums1;
    if (nums1 == null && nums1.length == 0) return nums2;

    //initialize to last index of nums1, nums2
    m-- , n--;
    let index = nums1.length - 1;

    while (index >= 0) {

        if (m < 0) {
            nums1[index] = nums2[n--];//m--
        } else if (n < 0) {
            nums1[index] = nums1[m--];//m--
        }
        else if (nums1[m] > nums2[n]) {
            nums1[index] = nums1[m--];//m--
        } else {
            nums1[index] = nums2[n--];//m--
        }
        index--;
    }


    return nums1;

};
//strategy to insert greater at the end 
console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));



//88. Merge Sorted Array -Easy - 3 pointers strategy - Variation if size not given initially
var merge = function (nums1, nums2) {
    //base conditions
    if (nums1 == null && nums2 == null && nums1.length == 0 && nums2.length == 0) return []
    if (nums2 == null && nums2.length == 0) return nums1;
    if (nums1 == null && nums1.length == 0) return nums2;

    //pointers to track nums1 and nums2 indexes
    let m = nums1.length;
    let n = nums2.length;

    //extend nums1 equal to size nums1 + nums2
    for (let i = 0; i < nums2.length; i++) {
        nums1.push(0);
    }


    //initialize to last index of nums1, nums2
    m-- , n--;
    console.log(m, n)


    let index = nums1.length - 1;

    while (index >= 0) {

        if (m < 0) {
            nums1[index] = nums2[n--];//m--
        } else if (n < 0) {
            nums1[index] = nums1[m--];//m--
        }
        else if (nums1[m] > nums2[n]) {
            nums1[index] = nums1[m--];//m--
        } else {
            nums1[index] = nums2[n--];//m--
        }
        index--;
    }


    return nums1;

};
//strategy to insert greater at the end 
console.log(merge([1, 2, 3], [2, 5, 6]));



var sortedSquares = function (nums) {
    //two pointer strategy
    let result = Array(nums.length).fill(0);
    let left = 0;
    let right = nums.length - 1;
    let index = nums.length - 1;

    while (left <= right) {
        if (nums[left] ** 2 <= (nums[right] ** 2)) {

            result[index] = nums[right] ** 2;
            right--;

        } else {

            result[index] = nums[left] ** 2;
            left++
        }

        index--;
    }
    return result;
};
console.log(merge([-4, -1, 0, 3, 10]));
console.log(merge([-7, -3, 2, 3, 11]));


//https://www.youtube.com/watch?v=q2v5nik5vwU
//Use of regex
var mostCommonWord = function (paragraph, banned) {
    if (paragraph == null || paragraph.length == 0) return "";
    let wordMap = new Map();
    let bannedMap = new Map();

    for (let ban of banned) {
        bannedMap.set(ban, true);
    }

    let arr = paragraph.replaceAll(/[^a-zA-Z]+/gi, ' ').trim().toLowerCase().split(' ')
    //After--> bob hit a ball the hit ball flew far after it was hit
    console.log(arr)

    console.log(arr)
    for (let word of arr) {
        wordMap.set(word, wordMap.get(word) + 1 || 1);
    }

    console.log(wordMap)

    let max = -Infinity;
    let ans = "";
    for (let [word] of wordMap.entries()) {

        if (bannedMap.has(word)) continue;
        if (wordMap.get(word) > max) {
            ans = word;
            max = wordMap.get(word);
        }
    }



    return ans;
};


//1344. Angle Between Hands of a Clock
var angleClock = function (hour, minutes) {
    const hourAngle = 360 / 12 * (hour % 12);
    const minAngle = 360 / 60 * minutes;

    const surpassAngle = 30 / 60 * minutes;

    const angleBetween = Math.abs((hourAngle + surpassAngle) - minAngle);

    return (angleBetween > 180) ? 360 - angleBetween : angleBetween;
};