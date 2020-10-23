function sortByAge(arr) {
    arr.sort((a, b) => {
        if (arr[a].age < arr[b].age) return -1;

        if (arr[a].age > arr[b].age) {
            return 1;
        } else {
            return 0;
        }
    });
}



let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [pete, john, mary];

sortByAge(arr);

// now: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete