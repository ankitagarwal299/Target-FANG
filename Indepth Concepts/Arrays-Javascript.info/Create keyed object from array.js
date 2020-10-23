let users = [
    { id: 'john', name: "John Smith", age: 20 },
    { id: 'ann', name: "Ann Smith", age: 24 },
    { id: 'pete', name: "Pete Peterson", age: 31 },
];


function groupById(arr) {
    return users.reduce((result, currentValue, currentIndex, users) => {
        result[currentValue.id] = currentValue;
        return result;
    }, {})

}


groupById(arr);