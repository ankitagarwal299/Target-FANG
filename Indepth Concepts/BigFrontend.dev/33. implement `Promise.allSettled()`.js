
function allSettled(promises) {
    if (promise.length == 0) return Promise.resolve([]);
    let _promises = promises.map((item) => item instanceof Promise ? item : Promise.resolve(item));

    return new Promise((resolve, reject) => {
        let promiseExecutedCount = 0;
        const result = [];

        _promises.forEach((promise, index) => {
            promise.then((response) => {
                result[index] = {
                    value: response,
                    status = 'fullfilled'
                };

                promiseExecutedCount++;
                if (promiseExecutedCount == promises.length) {
                    resolve(result);
                }
            }, reason => {

                result[index] = {
                    value: reason,
                    status: "rejected"
                }
                promiseExecutedCount++;
                if (promiseExecutedCount == promises.length) {
                    resolve(result);
                }

            })
        })
    })
}
