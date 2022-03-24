


//896. Monotonic Array.js
var isMonotonic = function (A) {

    if (A == null || A.length < 1) return false;
    if (A.length == 1) return true;

    let increasing = true;
    let decreasing = true;
    for (let i = 0; i < A.length - 1; i++) {
        if (A[i] > A[i + 1]) increasing = false;

        if (A[i] < A[i + 1]) decreasing = false;
    }
    return increasing || decreasing;
};

console.log(isMonotonic([1, 3, 2]));

//---------------------------------------------------------------Monotonic Increasing Queue
var incMonotonic = function (nums) {
    let dequeue = [];

    for (let i = 0; i < nums.length; i++) {
        while (nums[i] < dequeue[dequeue.length - 1]) {//if next elem is smaller than end of queue then remove end of queue till next elem finds correct place
            dequeue.pop();
        }
        dequeue.push(nums[i]);

    }
    return dequeue;
};

//-----------------------------------------------------------------Monotonic decreasing Queue
var decMonotonic = function (nums) {
    let dequeue = [];

    for (let i = 0; i < nums.length; i++) {
        while (nums[i] > dequeue[dequeue.length - 1]) {
            dequeue.pop();
        }
        dequeue.push(nums[i]);

    }
    return dequeue;
};
console.log(incMonotonic([5, 3, 1, 2, 4]));
console.log(decMonotonic([5, 3, 1, 2, 4]));

