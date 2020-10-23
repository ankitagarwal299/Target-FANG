function getAverageAge(arr) {
    return arr.reduce((accumulator, currentValue, curretnIndex, arr) => {
        accumulator = accumulator + currentValue.age;
        console.log(accumulator, arr.length);

        return accumulator;
    }, 0) / arr.length;
}

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [john, pete, mary];

alert(getAverageAge(arr));