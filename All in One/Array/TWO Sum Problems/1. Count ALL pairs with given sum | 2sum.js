//Given an array of integers, and a number ‘sum’, find the number of pairs of integers in the array whose sum is equal to ‘sum’.

/*
    Input  :  arr[] = {1, 1, 1, 1},
            sum = 2
    Output :  6
    There are 3! pairs with sum 2.

    Input  :  arr[] = {10, 12, 10, 15, -1, 7, 6,
                    5, 4, 2, 1, 1, 1},
            sum = 11
    Output :  9

*/

function getPairsCount(arr, target) {
    let count = 0; // Initialize result

    let freCountMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        let char = arr[i];

        if (freCountMap.has(target - char)) {
            count = count + freCountMap.get(target - char);
            freCountMap.set(char, freCountMap.get(target - char) + 1);
        } else {
            freCountMap.set(char, 1);
        }
    }
    return count;
}
//https://www.youtube.com/watch?v=5L9Jrehvoew
//https://www.geeksforgeeks.org/count-pairs-with-given-sum/