/* function sum(num, currentSum = 0) {
    return function (args) {
        return sum(args, num + currentSum);
    }
} */

function sum(num, currentSum = 0) {
    const newCurrentSum = num + currentSum;
    const func = function (args) {
        return sum(args, newCurrentSum);
    }

    func.valueOf = () => newCurrentSum;

    return func;
}

console.log(sum(1)(2)(3) == 6);


