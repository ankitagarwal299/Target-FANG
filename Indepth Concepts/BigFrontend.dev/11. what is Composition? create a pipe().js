function pipe(funcs) {
    return function (args) {
        let result = args;
        for (let func of funcs) {
            result = func.call(this, result);
        }
        return result;
    }
}

function pipe(funcs) {
    return function (args) {
        return funcs.reduce((result, func) => {
            return func.call(this, result);
        }, args);
    }
}