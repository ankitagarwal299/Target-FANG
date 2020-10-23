function Calculator() {

    this.method = {
        "-": (a, b) => a - b,
        "+": (a, b) => a + b
    }

    this.addMethod = function (name, func) {
        this.method[name] = func;
    }
    this.calcuclate = function (str) {
        let str = str.split(' ');
        let a = +str[0];
        let op = str[1];
        let b = +str[2];

        if (isNaN(a) || isNaN(b) || !this.method[op]) {
            return NaN;
        }

        return this.method[op](a, b);
    }
}

let powerCalc = new Calculator();
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calcuclate("2 ** 3");
console.log(result);
