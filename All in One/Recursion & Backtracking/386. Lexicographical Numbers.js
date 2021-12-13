//386. Lexicographical Numbers
//Trick is to print in pre order traversal
//https://www.youtube.com/watch?v=gRo86WqFYSE
var lexicalOrder = function (n) {
    if (n == null) return [];

    let result = [];

    function preorderDFS(num) {
        if (num > n) return;

        result.push(num);

        for (let i = 0; i <= 9; i++) {
            let numfamily = num * 10 + i;
            preorderDFS(numfamily);
        }

    }

    for (let i = 1; i <= 9; i++) {
        preorderDFS(i);

    }

    return result;
};