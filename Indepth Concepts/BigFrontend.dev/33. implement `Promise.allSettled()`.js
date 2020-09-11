function allSettled(promises) {
    if (promises.length == 0) return Promise.resolve([]);
    const _promises = promises.map((item) => item instanceof Promise ? item : Promise.resolve(item))

    return new Promise((resolve, reject) => {
        const result = [];
        let unSettlePromiseCount = _promises.length;


        _promises.forEach((promise, index) => {
            promise.then(
                (value) => {
                    result[index] = {
                        status: "fullfilled",
                        value
                    };

                    unSettlePromiseCount -= 1;

                    if (unSettlePromiseCount == 0) {
                        resolve(result);
                    }

                }, (reason) => {
                    result[index] = {
                        status: "rejected",
                        reason
                    }
                    unSettlePromiseCount -= 1;

                    if (unSettlePromiseCount == 0) resolve(result);
                })
        })

    });
}
