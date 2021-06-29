let queens = [[0, 1], [1, 0], [4, 0], [0, 4], [3, 3], [2, 4]];
let king = [1, 0];

console.log("----------------------------CONCEPT1----------------------")//true
/* MAPS---------CONCEPT1 */
var map = {};

for (let item of queens) {
    //map[[item[0], item[1]]] = true;
    //or
    map[item] = true;//As soon as insert into map, it is converted into string
}
console.log(map);


console.log(Object.keys(map));//[ '0,1', '1,0', '4,0', '0,4', '3,3', '2,4' ]
//console.log([...map]);//map is not iterable, declare with new Map()
console.log(king);

console.log(Object.keys(map)[1] == king);//true
console.log(Object.keys(map)[0] == [0, 1]);//true
console.log("0,1" == [0, 1])//true
//Refer 1222



console.log("----------------------------CONCEPT2----------------------")//true


/* SETS ---------CONCEPT2*/
var set = new Set();

for (let item of queens) {
    set.add(item)//As soon as insert into Set, it DOESNOT convert into string, it REMAINS ARRAY
}
console.log(set);

console.log([...set]);//[ [ 0, 1 ], [ 1, 0 ], [ 4, 0 ], [ 0, 4 ], [ 3, 3 ], [ 2, 4 ] ]
console.log(king);

console.log([...set][1] == king);//false
console.log([...set][0] == [0, 1]);//false
console.log("0,1" == [0, 1])//true

var has = set.add([0, 1]);//Will add duplicates , Sets of Arrays doesnot able to identify DUPLICATES
console.log(has)//true




console.log("----------------------------TIP----------------------")
//Fill 2D Array
let grid =
    [
        [0, 6, 0],
        [5, 8, 7],
        [0, 9, 0]
    ]
let visited = grid.map(row => row.map((cell) => cell != 0));//REMEMBER
let arr = new Array(3).fill(0).map(_ => Array(3).fill('.'));//REMEMBER

let dp = new Array(str1.length + 1).fill(0).map(row => new Array(str2.length + 1).fill(0));




console.log("----------------------------CONVERT 2D array to MAP----------------------");

let arr2D = [['axc', false], ['abc', true], ['axc', false]];
//convert to 2D array to map using regular map constructor
let myMap = new Map(arr2D);
myMap.get('axc');

console.log("----------------------------CONVERT MAP to 2D array----------------------");
//1. Use Array.from()
console.log(Array.from(myMap));

//2. spread operator
console.log([...myMap]);

//OR only keysor values
console.log(Array.from(myMap.keys()));


console.log("----------------------------MAX_SAFE NUMBER----------------------");

Number.MAX_VALUE(1.79E+308, or 2 ^ 1024)
Number.MAX_SAFE_INTEGER(2 ^ 53 - 1)




