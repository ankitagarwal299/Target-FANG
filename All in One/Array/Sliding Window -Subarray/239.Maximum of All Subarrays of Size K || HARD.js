//239. Sliding Window Maximum
//Guide Monotonic - VVVVVVVVVVVIMP

var maxSlidingWindow = function (nums, k) {
    if (nums == null || nums.length == 0) return [];

    const result = []


    // Decreasing monotonic queue so the maximum value is at the front
    /*
    * The goal is to maintain a decreasing monotonic queue and register 
    * max value as the window shifts.
    * 
    * nums = [1,3,-1,-3,5,3,6,7], k = 3
    * 
    * i        queue           output
    * 0        [1]             []
    * 1        [3]             []
    * 2        [3, -1]         [3]
    * 3        [3, -1, -3]     [3, 3]
    * 4        [5]             [3, 3, 5]
    * 5        [5, 3]          [3, 3, 5, 5]
    * 6        [6]             [3, 3, 5, 5, 6]
    * 7        [7]             [3, 3, 5, 5, 6, 7]
    */


    const dequeue = [];
    let start = 0;
    for (let end = 0; end < nums.length; end++) {
        // add the number from the right
        while (nums[end] > dequeue[dequeue.length - 1]) {
            dequeue.pop();
        }
        dequeue.push(nums[end]);

        // We've hit the window size. Find the maximum in the current window and Slide the window ahead
        if (end - start + 1 == k) {
            result.push(dequeue[0]);

            // eliminate the greatest num if it's the left-most window
            if (nums[start] == dequeue[0]) dequeue.shift();
            start++;
        }

    }
    return result;

};
//https://medium.com/algorithms-and-leetcode/monotonic-queue-explained-with-leetcode-problems-7db7c530c1d6
//https://algo.monster/problems/sliding_window_maximum (Animation)