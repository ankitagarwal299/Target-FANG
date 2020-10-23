function any(promises) {
    return new Promise((resolve, reject) => {
        let isFullFilled = false;
        const errors = [];

        promises.forEach((promise, index) => {
            promise.then((response) => {
                if (!isFullFilled) {
                    resolve(response);
                    isFullFilled = true;
                }
            }, (error) => {

                errors[index] = error;
                if (errors.length == promises.length) {
                    reject(new AggregateError('No Promise in Promise.any was resolved', error));
                }

            })
        })
    })
}