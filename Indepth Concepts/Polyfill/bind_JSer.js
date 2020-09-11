/*
JSer
https://www.youtube.com/watch?v=35ilQz93oK8&list=PLvx8w9g4qv_pqqERoqYyX4HKcY8zFbqSp&index=4
 */

const foo = function (...agrs) {
    console.log(this.name, args);
}

const obj = {
    name: "bar"
};

const boundFoo = foo.bind(obj, 'hello');
console.log(boundFoo('world'));

//----------------------------------------------------

const mybind = (func, thisArg, ...args) => {
    return (...newArgs) => {
        return func.call(thisArg, ...args, ...newArgs)
    }
}


//----------------------------------------------------
const nameObj = { firstname: "ankit", lastname: "agarwal" };

const foo = function (...args) {
    console.log(this.name);
}


Function.prototype.myBind = function (thisArg, ...args) {
    return (...newArgs) => {
        return this.call(thisArg, ...args, ...newArgs);
    }
}

const bounfn = foo.bind(nameObj, "hello");
bounfn("world");
const bounfnAgain = bounfn.bind(nameObj, "hello");
bounfnAgain();

