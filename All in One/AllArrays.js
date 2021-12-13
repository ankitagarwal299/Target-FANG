//Very Easy T: logN if all unique otherwise ON for duplicates
function searchRotatedSortedArray(arr, target) {
    if (arr == null || arr.length == 0) return "not found";

    if (arr.length == 1) return arr[0];

    let left = 0;
    let right = arr.length - 1;

    //start binary search
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] == target) {
            return arr[mid] == target;//found at mid point

        } else if (arr[mid] >= arr[left]) {//means left is sorted, then find in sorted first

            //does target lies between sorted left part
            if (arr[left] <= target && arr[mid] >= target) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {//means right is sorted, then find in sorted first

            //does target lies in the range of right sorted branch
            if (arr[mid] <= target && target <= right) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }

        }

    }
    return false;//if not found at mid then false

}

//https://www.youtube.com/watch?v=oTfPJKGEHcc&t=680s
console.log(searchRotatedSortedArray([2, 5, 6, 0, 0, 1, 2], 0));
console.log(searchRotatedSortedArray([2, 2, 2, 2, 2, 0, 2, 2], 0));



//---------------------------------------
//Very Easy- https://www.youtube.com/watch?v=gW4hSbRoQoY&t=321s
function happyNumber(num) {
    if (num == 0 || num == null) return false;

    if (num == 1) return true;

    let seen = new Set();
    while (num != 1) {
        num = findSquareSum(num);
        if (!seen.has(num)) {
            seen.add(num)
        } else {
            return false;//already seen going in cycles
        }
    }
    return true;
}

function findSquareSum(current) {//89
    let sum = 0;
    while (current != 0) {
        let remainder = current % 10;//89%10
        sum = sum + remainder * remainder;
        current = Math.floor(current / 10);//8
    }
    return sum;

}
console.log(happyNumber(19));
console.log(happyNumber(29));
//---------------------------------------


//128. Longest Consecutive Sequence - Very Easy
var longestConsecutive = function (nums) {
    let set = new Set();
    let max_seqLen = 0;

    for (const item of nums) {
        set.add(item);
    }

    for (const item of nums) {
        let currItemLength = 1;
        let currItem = item;

        if (!set.has(currItem - 1)) {

            while (set.has(currItem + 1)) {
                currItem = currItem + 1;
                currItemLength++;
            }
            max_seqLen = Math.max(max_seqLen, currItemLength);
        }
    }
    return max_seqLen;
};
//https://www.youtube.com/watch?v=YWXbu5uyGXs
//https://www.youtube.com/watch?v=sHrb6phW3IA&t=495s
