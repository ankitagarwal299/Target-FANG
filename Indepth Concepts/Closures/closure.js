/* 
Closures
A closure refers to the lexical context a function was declared in and the variables it has access to. 
Closures allow us to dynamically create functions, implement encapsulation, and create interfaces to interact with our code.
*/


//1. dynamically create functions
function fnGenerator(str) {
  const stringToLog = 'The string I was given is "' + str + '"';

  return function () {
    console.log(stringToLog);
  };
}

const fnReturned = fnGenerator("Bat-Man");
fnReturned(); // -> The string I was given is "Bat-Man"

/* Scope Persistence
When a function is created, it retains access to the scope that it was created in. 

If it’s created inside another function, it retains access to the scope of that outer function even after that outer function returns.
 */

/* 
 Even though fnGenerator has finished executing, its scope remains in memory and the returned function retains access to this scope. This is the concept we’ll use to solve our code repetition problem.
  */

function addFactory(storedNum) {
  return function (num2) {
    return storedNum + num2;
  };
}

const add10 = addFactory(10);
const add20 = addFactory(20);
const add30 = addFactory(30);

console.log(add10(5)); // -> 15
console.log(add20(6)); // -> 26
console.log(add30(7)); // -> 37


//A generator/factory function is a function that creates and returns functions based on what is passed in to it.




//2.Encapsulation
function counterGenerator() {
    let counter = 1;
  
    return function() {
        return counter++;
    }
}

const incrementCounter = counterGenerator();
console.log(incrementCounter()); // -> 1
console.log(incrementCounter()); // -> 2
counter = 100; // <- sets a new global variable 'counter';
               // the one inside counterGenerator is unchanged
console.log(incrementCounter()); // -> 3


/* 
2.Encapsulation

With this idea of scope persistence, we can write functions that hide data from someone who uses the function. 
This is called encapsulation. We might do this because we don’t want a user manipulating a value in a way they’re not intended to. */




//3.We might want to do this if we were creating a library. By using this concept, we can create an interface that lets the user interact with our code base without letting them break anything.