var flattenThunk = function (thunk) {
    return function (callback) {

        const trigger = function (func) {
            func(function (error, next) {
                if (error) {
                    callback(error, null);
                } else {
                    if (typeof next === 'function') {
                        trigger(next);
                    }
                    else {
                        callback(null, next);
                    }
                }
            });
        }
        console.log("Step1")
        trigger(thunk);
    }
}


var thunk1 = function (cb) {
    setTimeout(function () {
        cb(null, thunk2);
    }, 1);
}

var thunk2 = function (cb) {
    setTimeout(function () {
        cb(null, thunk3);
    }, 1);
}

var thunk3 = function (cb) {
    setTimeout(function () {
        cb(null, 'done');
    }, 1)
}

flattenThunk(thunk1)(function (err, result) {
    console.log(result);//done 
})
