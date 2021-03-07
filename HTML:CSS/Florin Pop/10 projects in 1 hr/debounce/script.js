const placeOrder = document.getElementById("myBtn");

/* pure functions */
function debounce(callback, wait) {
    var context1 = this;
    console.log(",sdnfmdsnf ");

    function closure() {
        setTimeout(() => {
            console.log(context1);

            var context2 = this;
            var args = arguments;
            callback();
        }, wait);
    }

    return closure;
}

const debounced = debounce(function () {
    console.log("clicked")
}, 3000)
placeOrder.addEventListener('click', debounced);

/* const debounce = (func, wait, immediate) => {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;

        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};

var button = document.getElementById("myBtn");
button.addEventListener('click', debounce(function () {
    alert("This alert box will be displayed after 2 seconds no matter how many times you press the button.")
}, 2000));
 */
