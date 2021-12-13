

var kClosest = function (points, k) {

    if (points == null || points.length == 1) return points;
    //(x2-x1)^2 but x1 is 0 so only consider x2 
    let comparator = ((a, b) => ((b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1])));


    let maxHeap = new PriorityQueue(comparator);//we want max to be removed, so max at the top

    let i = 0;
    for (let i = 0; i < points.length; i++) {
        maxHeap.add(points[i]);

        while (maxHeap.size() > k) {
            maxHeap.poll();
        }
    }

    let result = [];
    while (k > 0) {
        result.push(maxHeap.poll());
        k--;
    }

    return result;
};

//Kevin
//https://www.youtube.com/watch?v=1rEUgAG7f_c&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=57