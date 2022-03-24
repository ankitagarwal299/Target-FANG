var maxBitonicArray = function (arr) {
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

console.log(maxBitonicArray([2, 4, 6, 8, 10, 3, 1]));//10
console.log(maxBitonicArray([3, 23, 10, 8, 7, 6]));//20
console.log(maxBitonicArray([10, 20, 30, 40, 50]));//50
console.log(maxBitonicArray([100, 80, 60, 40, 20, 0]));//100


//Same
/*
162. Find Peak Element.js
852. Peak Index in a Mountain Array.js
852._Maximum Element in a Bitonic Array
*/