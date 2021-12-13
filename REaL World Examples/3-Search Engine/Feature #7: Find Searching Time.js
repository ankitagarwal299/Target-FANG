
var exclusiveTime = function (n, logs) {
    // To track sums of time for each program
    let sums = new Array(n).fill(0);

    // To track calls for each function
    let fnStack = [];

    // To extract the log details from input
    const getLogDetails = (log) => {
        const details = log.split(":");
        return {
            id: parseInt(details[0]),
            startTime: parseInt(details[2]),
            childtime: 0,
        }
    }

    for (let i = 0; i < logs.length; i++) {
        const details = logs[i].split(":");

        if (details[1] == "start") {
            fnStack.push(getLogDetails(logs[i]));
        } else {

            let lastFn = fnStack.pop();

            //calculate interval
            let interval = parseInt(details[2]) - lastFn.startTime + 1;

            //calculate actual duration of this id
            let duration = interval - lastFn.childtime;

            //update the duration to total sum of id
            sums[lastFn.id] = sums[lastFn.id] + duration;

            //final update in parent if there is parent
            if (fnStack.length > 0) {
                fnStack[fnStack.length - 1].childtime = fnStack[fnStack.length - 1].childtime + interval;
            }

        }
    }
    return sums;
};

//VERy Very Good question
//https://www.youtube.com/watch?v=dsusgzffTDA
//636. Exclusive Time of Functions