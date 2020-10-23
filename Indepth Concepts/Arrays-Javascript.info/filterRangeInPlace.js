function filterRangeInPlace(arr, start, end) {
    for (let i = 0; i < arr.length; i++) {
        if (start > arr[i] || arr[i] > end) {
            arr.splice(i, 1);
        }
    }
}


let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

console.log(arr); // [3, 1]