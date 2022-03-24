function findElementInSortedInfiniteArray(stream, target) {
    let start = 0;
    let end = 1;

    while (target < stream[end]) {
        start = end;
        end *= 2;
    }

    //Aplly binary search
    while (start <= end) {
        let mid = start + Math.floor((end - start) / 2);
        if (target == stream[mid]) {
            return mid;
        } else if (target < stream[mid]) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return -1;

}
console.log(findElementInSortedInfiniteArray([2, 5, 7, 9, 10, 12, 15, 16, 18, 20, 24, 28, 35, Infinity], 16));
/*
    Infinity means values will continue
    https://www.youtube.com/watch?v=FzvK5uuaki8

    https://www.callicoder.com/search-in-sorted-infinite-array/
*/