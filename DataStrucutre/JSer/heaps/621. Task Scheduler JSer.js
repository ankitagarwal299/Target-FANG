
var leastInterval = function (tasks, n) {

    //count of each task
    const countOfTask = new Array(26).fill(0);

    let maxCount = 0;
    const codeForA = 'A'.charCodeAt(0);

    for (let task of tasks) {
        const index = task.charCodeAt(0) - codeForA;
        countOfTask[index] += 1;

        maxCount = Math.max(countOfTask[index], maxCount);
    }

    //determine how many task are to the maxCount
    let taskCountOfMaxCount = 0;
    for (let count of countOfTask) {
        if (count == maxCount) {
            taskCountOfMaxCount += 1;
        }
    }

    const intervalsRequired = (maxCount - 1) * (n + 1) + taskCountOfMaxCount;

    return Math.max(intervalsRequired, taskCountOfMaxCount);
};





//To return task sequence --PENDING
var leastInterval = function (tasks, n) {

    //count of each task
    const countOfTask = new Array(26).fill(0);

    let maxCount = 0;
    const codeForA = 'A'.charCodeAt(0);

    for (let task of tasks) {
        const index = task.charCodeAt(0) - codeForA;
        countOfTask[index] += 1;

        maxCount = Math.max(countOfTask[index], maxCount);
    }

    //determine how many task are to the maxCount
    let taskCountOfMaxCount = 0;
    for (let count of countOfTask) {
        if (count == maxCount) {
            taskCountOfMaxCount += 1;
        }
    }

    //create maxCount buckets to collect the result
    const buckets = new Array(maxCount).fill(0).map(_ => []);

    let currentBucket = 0;
    for (let i = 0; i < 26; i++) {
        if (countOfTask[i] == 0) continue;
        let count = countOfTask[i];
        const task = String.fromCharCode(i + codeForA);

        while (count > 0) {
            if (countOfTask[i] == maxCount) {
                if (currentBucket > buckets.length - 1) currentBucket = 0;
            } else {
                if (currentBucket > buckets.length - 2) currentBucket = 0;
            }

            buckets[currentBucket].push(task);
            currentBucket += 1;
            count -= 1;
        }
    }
    console.log(buckets);

    let result = [];
    //collect the result, fill the buckets with idle except the last one
    for (let i = 0; i < buckets.length; i++) {
        result.push(...buckets[i]);

        if (i < buckets[i].length < n + 1) {
            let count = n + 1 - buckets[i].length;
            while (count > 0) {
                result.push('idle')
                count -= 1;
            }
        }
    }

    return result.join('->')


};

console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 2));
//A B 0   A B 0    A B 
//AAAA BB
//A (BCDE00) A(BCDE00) A (BCE00) A(B)
console.log(leastInterval(["A", "A", "A", "B", "B", "B"], 0));
console.log(leastInterval(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2));




