
const throttle = (fn, delay) => {
    let last = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - last > delay) {
            last = now;
            return fn(...args);
        }
    }
}

const executingFn = () => {
    console.log("final executing function");
}

document.getElementById("my-id").addEventListener("click", throttle(executingFn, 5000));







//----------------------------------------------------
const logger = () => {
    console.log("throttle function execution");

}

const throttleFn = (fn, delay) => {
    let flag = true;
    return function () {
        if (flag) {
            const context = this;
            const args = arguments;
            flag = false;
            fn.apply(context, args);

            setTimeout(() => {
                flag = true;
            }, delay);
        }


    }
}

const betterLoggedFn = throttleFn(logger, 5000);

window.addEventListener("resize", betterLoggedFn, 5000);