var isMonotonic = function(A) {

    if (A==null || A.length < 2) return false;

    let increasing = true;
    let decreasing = true;
    for (let i=0 ; i< A.length -1 ; i++){
        if (A[i] > A[i+1]){
            increasing = false;
        }

        if (A[i] < A[i+1]){
            decreasing = false;
        }
    }
};

console.log(isMonotonic([1,3,2]));

//https://www.youtube.com/watch?v=wqgvE8X-2jk&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=43
