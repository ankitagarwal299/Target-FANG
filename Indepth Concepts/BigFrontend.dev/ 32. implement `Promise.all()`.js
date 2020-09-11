function all(promises) {
    const _promises = promises.map((item) => item instanceof Promise ? item : Promise.resolve(item));

    //resolve if empty
    if (_promises.length == 0) return Promise.resolve([]);

    return new Promise((resolve, reject) => {
        const result = [];
        let fullfilledCount = 0;
        let isErrored = false;

        for (let i = 0; i < _promises.length; i++) {
            _promises[i].then(
                (value) => {
                    if (isErrored) return;
                    result[i] = value;

                    fullfilledCount += 1;
                    if (fullfilledCount === _promises.length) {
                        resolve(result);
                    }
                },
                (error) => {
                    if (isErrored) return;
                    isErrored = true;
                    reject(error);
                })
        }


    })
}