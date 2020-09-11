const throttle = (fn, wait, options = { "leading": true, "trailing": true }) => {
    let timer = null;
    let delayedCall = null;

    const timeout = () => {
        if (options.trailing != false && delayedCall) {
            fn.apply(delayedCall.context, delayedCall.args);
            delayedCall = null;
            timer = setTimeout(timeout, wait);
        } else {
            timer = null;
        }
    }

    return function (...args) {

        /* within cooling time then delay */
        if (timer != null) {
            delayedCall = {
                "context": this,
                "args": arguments
            }
            return;
        } else {
            if (options.leading != false) {
                fn.apply(this, args);
            }

            timer = setTimeout(timeout, wait);
        }
    }

}

module.export = throttle;