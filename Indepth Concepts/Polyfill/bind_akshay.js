/* 
Akshay
https://www.youtube.com/watch?v=ke_y6z0xRpk 
*/

let name = {
    firstname: "ankit",
    lastname: "agarwal"
}

let printname = function (homeTown, state) {
    console.log(this.firstname, this.lastname, homeTown, state);
}

let printMyName = printname.bind(name, "Dehradun");

printMyName("Uttrakhand");

//-------------------------------

Function.prototype.mybind = function (...args) {
    let params = args.slice(1);
    return function (...args2) {
        this.apply(args[0], [...params, ...args2])
    }
}


let printMyName2 = printname.mybind(name, "Dehradun");
printMyName2("Uttrakhand");


//----------------------------------------------------

