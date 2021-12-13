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



//iterate and set frequency in a MAop
let nums = [1, 2, 3, 4, 5, 6, 7]
let countmap = new Map();
for (let i = 0; i < nums.length; i++) {
    countmap.set(nums[i], countmap.get(nums[i]) + 1 || 1)
}

let keys = [];
keys = Object.keys(countmap);//will not work
console.log(keys);

for (let [key, value] of countmap.entries()) {//[key, value] is mandatory
    keys.push(key);
}


//This is not correct , here key will give coomplete object at index
for (let key of countmap.entries()) {
    keys.push(key);
}


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



//---------------------MAP vs SET---------------------
let map = new Map()
map.set("a", sdf)

let set = new Set()
set.add(sdfsf)




//-----------------------MAP Iterator------------
let groups = {};
for (group in groups) {
    console.log(groups[group])
}
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
const myMap = new Map()
myMap.set(0, 'zero')
myMap.set(1, 'one')

for (const [key, value] of myMap) {
    console.log(key + ' = ' + value)
}
// 0 = zero
// 1 = one

for (const key of myMap.keys()) {
    console.log(key)
}
// 0
// 1

for (const value of myMap.values()) {
    console.log(value)
}
// zero
// one

for (const [key, value] of myMap.entries()) {
    console.log(key + ' = ' + value)
}
// 0 = zero
// 1 = one

const kvArray = [['key1', 'value1'], ['key2', 'value2']]

// Use the regular Map constructor to transform a 2D key-value Array into a map
const myMap = new Map(kvArray)

myMap.get('key1') // returns "value1"

// Use Array.from() to transform a map into a 2D key-value Array
console.log(Array.from(myMap)) // Will show you exactly the same Array as kvArray

// A succinct way to do the same, using the spread syntax
console.log([...myMap])

// Or use the keys() or values() iterators, and convert them to an array
console.log(Array.from(myMap.keys())) // ["key1", "key2"]


//-----------------------SET Iterator------------


//-------------------------Get MAX-----------------
Math.max(...[3, 6, 7, 11])

[3, 6, 7, 11].reduce(function (a, b) {
    return Math.max(a, b);
}, 0);//11


const getMax = (a, b) => Math.max(a, b);

// callback is invoked for each element in the array starting at index 0
[1, 100].reduce(getMax, 50); // 100
[50].reduce(getMax, 10); // 50

// callback is invoked once for element at index 1
[1, 100].reduce(getMax);     // 100

// callback is not invoked
[50].reduce(getMax);     // 50
[].reduce(getMax, 1);  // 1

[].reduce(getMax);     // TypeError


//-----------------------Array custom sort---------------
let alpha = ["i", "love", "leetcode", "i", "love", "coding"]
alpha.sort();//this works and sort in ascending

alpha.sort((a, b) => a - b);//this DOESNOT work in string but works for number

alpha.sort((a, b) => {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1
    } else {
        return 0
    }

});//this works and sort in ascending


let nums = [40, 16, 67, 345, 22, 23, 142, 63, 59, 283];
alpha.sort();//this DOESNOOT for numbers
alpha.sort((a, b) => a - b);//this DOESNOT work in numbers but works for strings
