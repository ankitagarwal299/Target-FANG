/* Simple wala  */
const throttle = (fn, delay, options = { leading: true, trailing: true }) => {
    let timer = null;
    let delayfnCall = null;


    let timerSet = () => {
        fn.apply(delayfnCall.context, delayfnCall.args);
        delayfnCall = null;
        timer = setTimeout(timerSet, delay);
    }

    return function (...args) {
        /* if timer is set then delay */
        if (timer != null) {
            delayfnCall = {
                "context": this,
                "args": arguments
            }
            return;
        }
        else {
            fn.apply(this, arguments)
            timer = setTimeout(timerSet, delay);
        }
    }
}

window.addEventListener("resize", throttle(() => {
    console.log("throttle fn called");
}, 5000));