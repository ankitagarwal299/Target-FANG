//Rules

/* 
1 - If the new keyword is used when calling the function, this inside the function is a brand new object created by the JavaScript engine.
 */
function ConstructorExample() {
  console.log(this);
  this.value = 10;
  console.log(this);
}

new ConstructorExample();

// -> ConstructorExample {}
// -> ConstructorExample { value: 10 }

/* 
2 - If apply, call, or bind are used to call a function, this inside the function is the object that is passed in as the argument. 
*/
function fn() {
  console.log(this);
}

var obj = {
  value: 5,
};

var boundFn = fn.bind(obj);

boundFn(); // -> { value: 5 }
fn.call(obj); // -> { value: 5 }
fn.apply(obj); // -> { value: 5 }





/* 
3 - If a function is called as a method — that is, if dot notation is used to invoke the function — this is the object that the function is a property of. In other words, when a dot is to the left of a function invocation, this is the object to the left of the dot. (ƒ symbolizes function in the code blocks)
 */

const obj = {
    value: 5,
    printThis: function() {
      console.log(this);
    }
};

obj.printThis(); // -> { value: 5, printThis: ƒ }



/* 
4 - If a function is invoked as a free function invocation, meaning it was invoked without any of the conditions present above, this is the global object. In a browser, it’s window.
*/


function fn() {
    console.log(this);
}

// If called in browser:
fn(); // -> Window {stop: ƒ, open: ƒ, alert: ƒ, ...}


/* 
5 - If multiple of the above rules apply, the rule that is higher wins and will set the this value.
 */

 //Example 1
 const obj = {
    value: 'hi',
    printThis: function() {
        console.log(this);
    }
};

const print = obj.printThis;
obj.printThis(); // -> {value: "hi", printThis: ƒ}
print(); // -> Window {stop: ƒ, open: ƒ, alert: ƒ, ...}




//Example 2 : f rules 2 and 3 both apply, rule 2 takes precedence.
const obj1 = {
    value: 'hi',
    print: function() {
        console.log(this);
    },
};

const obj2 = { value: 17 };

obj1.print.call(obj2); // -> { value: 17 }




//Example 3: If rules 1 and 3 both apply, rule 1 takes precendence.
const obj1 = {
    value: 'hi',
    print: function() {
        console.log(this);
    },
};

new obj1.print(); // -> print {}