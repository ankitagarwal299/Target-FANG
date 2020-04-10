/* 
The Question
A common interview question is the following.

What will this code print out?
*/

for (var i = 0; i < 5; i++) {
  // We are explicitly using `var` for a reason
  const time = i * 1000;
  setTimeout(function () {
    console.log(i);
  }, time);
} // -> ?

/* 
This happens because by the time i is printed, the loop has finished and its value is 5. i is present in the global scope and not limited to the loop. It’s this global i that the setTimeout call is using. Since we make it wait, i has already become 5 by the time they each run.
*/


/* How can we fix it, so that it logs 0, 1, 2, 3, 4? */

for (var i = 0; i < 5; i++) {
    (function(num) {
        const time = num * 1000;
        setTimeout(function() {console.log(num);}, time);
    })(i);
}
// -> 0
// -> 1
// -> 2
// -> 3
// -> 4




///The answer is an IIFE. By creating a closure inside an IIFE, we can permanently set i inside the function to the value we need.
