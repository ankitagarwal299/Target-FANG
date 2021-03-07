/* Wrong print 1,2,3,4,5 after 1 sec */
function x() {

    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}

x();

/* With Block Scope print 1,2,3,4,5 after 1 sec */
function x() {

    for (let i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 1000);
    }
}

x();

/* Without Block Scope print 1,2,3,4,5 after 1 sec */
function x() {
    for (var i = 1; i <= 5; i++) {
        function close(x) {
            setTimeout(function () {
                console.log(x);
            }, i * 1000);
        }
        close(i);
    }
}
x();

// A function along with reference to its outer environment, together forms a closure
//Closure is a combination of a function and its lexical scope bundled together forms a closure.

//Every function in javascript ahs access to outer lexical environment,
// so when this fn is executed in some other scope not in original scope , it still remembers outer original environments where it was originally placed.

//Example closure
function outer(b) {
    function inner() {
        console.log(a, b);
    }
    const a = 10;
    return inner;
}

const inner = outer(3);
inner();


//-------------
function outest() {
    var c = 20;
    function outer(b) {
        const a = 10;
        function inner() {
            console.log(a, b, c);
        }
        return inner;
    }

    return outer;
}
const inner = outest()(3);
//or
//const inner = (outest())(3);
inner();



//Conflicting names in closure
function outest() {
    var c = 20;
    function outer(b) {
        //const a = 10;//*
        function inner() {
            console.log(a, b, c);
        }
        return inner;
    }

    return outer;
}
let a = 100;//* find in the scope chain if not present inside outer....
const inner = outest()(3);
inner();


//Advantages of closure

/* Module pattern
Currying
Used in higer order functions like memoize and once
Data hiding and encapsulation
*/
//Example Data hiding and encapsulation

function counter() {
    var count = 0;

    function incrementCounter() {
        count += 1;
        console.log(count)
    }
    function decrementCounter() {
        count -= 1;
        console.log(count)
    }

    return { incrementCounter, decrementCounter };
}

let counter1 = counter();
counter1.incrementCounter();
counter1.incrementCounter();
counter1.incrementCounter();
counter1.incrementCounter();
counter1.decrementCounter();


let counter2 = counter();
counter2();
counter2(); counter2();
counter2();


//OR Constructor function;without return
function Counter() {
    var count = 0;

    this.incrementCounter = function () {
        count += 1;
        console.log(count)
    }
    this.decrementCounter = function () {
        count -= 1;
        console.log(count)
    }
}

let counter = new Counter();
counter.incrementCounter();


//Disadvantages of closure

//overconsumption of memeory , because those  closed over variables are not garbage collected till the program expire.
// If not handled properly can lead to memory leaks and freeze browser.

//What is Garbage collctor?
/* Garbage collecter frees the memory which are not ustilize by program, JS enginer does the gc work */

//Relation between GC, Memory leak and closure?

function a() {
    var x = 0;
    return function b() {
        console.log(x);
    }
}

var y = a();
y();

//x will not be gc collected as it is used inside the closure b. GC are not sure when it is going to be used so it remains in the memory for long time.
//This is drawback of closure and the program is very large it will full the memory.