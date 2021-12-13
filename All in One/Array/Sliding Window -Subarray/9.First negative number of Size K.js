function findFirstNegativeNumberInSubarrayOfSizeK(arr, k) {
    if (arr == null || arr.length == 0 || k == null || k == 0) return 0;

    let queue = [];
    let firstNegativeNumbers = [];

    let start = 0;
    let end = 0;
    while (end < arr.length) {

        if (arr[end] < 0) {
            queue.push(arr[end]);
        }

        if (end - start + 1 == k) {
            if (queue.length == 0) {
                firstNegativeNumbers.push(0);
            } else if (arr[start] == queue[0]) {
                queue[0].unshit();
                firstNegativeNumbers.push(arr[start]);
            }
            start++;

        }
        end++;
    }

}
//https://www.youtube.com/watch?v=Z5NHoo-KdxA
console.log(findFirstNegativeNumberInSubarrayOfSizeK([12, -1, -7, 8, -15, 30, 16, 28], 3));

Queue: [-1, -7]
final: [-1]