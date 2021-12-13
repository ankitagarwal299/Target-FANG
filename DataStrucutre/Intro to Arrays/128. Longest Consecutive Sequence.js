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