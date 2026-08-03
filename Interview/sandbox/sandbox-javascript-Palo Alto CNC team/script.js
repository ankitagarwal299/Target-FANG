// var name = "global";

function show() {
    console.log(this.name);
}

const a = { name: "a" };
const b = { name: "b" };

// show();

// show.call(a);

// const bound = show.bind(a);
// bound();
// bound.call(b);

const obj = {
    name: "obj",
    show,
    arrow: () => console.log(this.name),
    makeArrow() {
        return () => console.log(this.name);
    },
    makeFunc() {
        return function () {
            console.log(this.name);
        };
    }
};

// obj.show();
// const loose = obj.show;
// loose();
console.log("-------------Arrow--------");


obj.arrow();
obj.arrow.call(a);
console.log("-------------arrowFromObj--------");

const arrowFromObj = obj.makeArrow();
arrowFromObj();
arrowFromObj.call(b);

console.log("-------------funcFromObj--------");

const funcFromObj = obj.makeFunc();
funcFromObj();
funcFromObj.call(b);

/*


In order:

show() → global
show.call(a) → a
bound() → a
bound.call(b) → a
obj.show() → obj
loose() → global
obj.arrow() → global
obj.arrow.call(a) → global
arrowFromObj() → obj
arrowFromObj.call(b) → obj
funcFromObj() → global
funcFromObj.call(b) → b
*/