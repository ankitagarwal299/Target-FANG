var peakIndexInMountainArray = function (arr) {
    if (arr == null || arr.length == 0) return -1;

    let start = 0;
    let end = arr.length - 1;

    while (start < end) {//should only try till start less than end , and not <=
        let midIndex = start + Math.floor((end - start) / 2);

        if (arr[midIndex] < arr[midIndex + 1]) {
            start = midIndex + 1;
        } else {
            end = midIndex;
        }
    }
    return start;

};

//Same
/*
162. Find Peak Element.js
852. Peak Index in a Mountain Array.js

*/