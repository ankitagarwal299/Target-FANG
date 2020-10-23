function filterRange(arr, start, end) {
    return arr.filter(item => {
        return item >= start && item <= end;
    });
}

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert(filtered); // 3,1 (matching values)

alert(arr); // 5,3,8,1 (not modified)