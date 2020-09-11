function decode(message) {
    if (message.length === 0 || message[0].length === 0) return '';

    let rows = message.length;
    let cols = message[0].length;

    let row = 0;
    let col = 0;
    let result = '';

    while (col < cols) {
        while (row < rows - 1) {
            result += message[row][col];
            row += 1;
            col += 1;
        }

        while (row > 0 && message[row][col]) {
            result += message[row][col];
            row -= 1;
            col += 1;
        }
    }

    return result;
}

let message = [
    ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
    ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
    ['G', 'H', 'O', 'E', 'L', 'A', 'D'],
];
console.log(decode(message))
