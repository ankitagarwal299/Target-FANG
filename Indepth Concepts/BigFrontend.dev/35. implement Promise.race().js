function race(promises) {
    return new Promise((resolve, reject) => {
        let isSettled = false;
        promises.forEach(promise => {
            promise.then(result => {
                if (!isSettled) {
                    resolve(result);
                    isSettled = true;
                }
            }, reason => {
                if (!isSettled) {
                    reject(reason);
                    isSettled = true;
                }
            })
        })
    })
}