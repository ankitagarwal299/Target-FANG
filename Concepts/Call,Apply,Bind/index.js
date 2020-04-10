function logThisAndArguments(arg1, arg2) {
    console.log(this);
    console.log(arg1);
    console.log(arg2);
}

const obj = { val: 'Hello!' };

// NORMAL FUNCTION CALL
logThisAndArguments('First arg', 'Second arg');
// -> Window {frames: Window, postMessage: ƒ, …}
// -> First arg
// -> Second arg

// USING CALL
logThisAndArguments.call(obj, 'First arg', 'Second arg');
// -> { val: 'Hello!' }
// -> First arg
// -> Second arg

// USING APPLY
logThisAndArguments.apply(obj, ['First arg', 'Second arg']);
// -> { val: 'Hello!' }
// -> First arg
// -> Second arg

// USING BIND
const fnBound = logThisAndArguments.bind(obj, 'First arg', 'Second arg');
fnBound();
// -> { val: 'Hello!' }
// -> First arg
// -> Second arg