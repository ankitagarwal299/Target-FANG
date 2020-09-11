
/* 
6 - If the function is an ES2015 arrow function, it ignores all the rules above and receives the this value of its surrounding scope at the time it’s created.
 */

const obj = {
    value: 'abc',
    createArrowFn: function() {
        return () => console.log(this);
    }
};

const arrowFn = obj.createArrowFn();
arrowFn(); // -> { value: 'abc', createArrowFn: ƒ }

//HINT :To determine what this is, go one line above the arrow function’s creation and see what the value of this is there. It will be the same in the arrow function.




//Why It’s Useful


/* 
The function returned to us is invoked as a free-function invocation. There’s no dot and nothing bound. Therefore, this becomes window and there’s no printVal available on window, so it prints undefined.
 */

const obj = {
    printVal: "Print value",
    generatePrintFn: function() {
        return function() {
            console.log(this.printVal);
        }
    },
};

const print = obj.generatePrintFn();
print(); // -> undefined




//We could solve this problem using apply/call/bind which allow us to set the this value ourselves.
const obj = {
    printVal: "Print value",
    generatePrintFn: function() {
        console.log(this.printVal);
    },
};

const print = obj.generatePrintFn.bind(obj);
print(); // -> Print value


//Another solution would be to use the var self = this; hack.
const obj = {
    printVal: "Print value",
    generatePrintFn: function() {
        var self = this;
      
        return function print() {
            console.log(self.printVal);
        }
    },
};

const print = obj.generatePrintFn();
print(); // -> Print value

//Here, we’re taking advantage of a closure to store the correct this value in another variable and use it later.