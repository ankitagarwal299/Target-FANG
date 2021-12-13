function minSumOfLengths(arr, target) {
    let hmap = new Map();
    let sum = 0, lsize = Number.MAX_VALUE, result = Number.MAX_VALUE;
    hmap.set(0, -1);
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        hmap.set(sum, i); // stores key as sum upto index i, and value as i.
    }
    sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (hmap.get(sum - target) != null) {
            lsize = Math.min(lsize, i - hmap.get(sum - target));      // stores minimum length of sub-array ending with index<= i with sum target. This ensures non- overlapping property.
        }
        //hmap.get(sum+target) searches for any sub-array starting with index i+1 with sum target.
        if (hmap.get(sum + target) != null && lsize < Number.MAX_VALUE) {
            result = Math.min(result, hmap.get(sum + target) - i + lsize); // updates the result only if both left and right sub-array exists.
        }
    }
    return result == Number.MAX_VALUE ? -1 : result;
}
//Froom Educative- Easy DO It on Paper
//https://leetcode.com/problems/find-two-non-overlapping-sub-arrays-each-with-target-sum/discuss/766171/Javascript-O(n)-with-Hashmap-and-sliding-window