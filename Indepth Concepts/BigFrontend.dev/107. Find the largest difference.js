function largestDiff(arr) {
    if (arr.length == 0 || arr.length == 1) return 0;
    return Math.abs(Math.max(...arr) - Math.min(...arr));
}



function largestDiff(arr) {
    if (arr.length == 0 || arr.length == 1) return 0;
    let min = Infinity;
    let max = -Infinity;

    for (let item of arr) {
        if (item < min) min = item;

        if (item > max) max = item;
    }

    return max - min;
}

largestDiff([-1, 2, 3, 10, 9])