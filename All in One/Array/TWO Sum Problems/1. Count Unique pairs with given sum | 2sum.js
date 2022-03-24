

function getPairsCount(arr, target) {
    arr.sort((a, b) => a - b);

    let pairs = [];

    let start = 0;
    let end = arr.length - 1;

    while (start < end) {

        if (start != 0 && arr[start] == arr[start - 1]) {//IMP
            start++;
            continue;
        }

        let sum = arr[start] + arr[end];
        if (sum == target) {
            pairs.push(arr[start], arr[end]);
            start++;
            end--;
        } else if (sum > target) {
            end--
        } else {
            start++;
        }

    }
    return pairs;
}
//https://www.youtube.com/watch?v=l5Ruk_Ub8B4
//Pepcoding
//https://www.geeksforgeeks.org/count-distinct-pairs-with-given-sum/
