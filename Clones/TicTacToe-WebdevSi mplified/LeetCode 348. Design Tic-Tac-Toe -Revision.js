var TicTactoe = function (n) {
    this.count = {
        row: new Array(n).fill(0).map(_ => [0, 0]),
        col: new Array(n).fill(0).map(_ => [0, 0]),
        diagonal: [[0, 0], [0, 0]]
    }
    this.target = n;
}

TicTactoe.prototype.move = function (row, col, player) {
    const rowCount = this.count.row[row];
    rowCount[player - 1] += 1;
    if (rowCount[player - 1] == this.target) return player;


    const colCount = this.count.col[col];
    colCount[player - 1] += 1;
    if (colCount[player - 1] == this.target) return player;

    if (row == col) {
        const diagonal = this.count.diagonal[0];
        diagonal[player - 1] += 1;
        if (diagonal[player - 1] == this.target) return player;
    }

    if (row + col == n - 1) {
        const diagonal = this.count.diagonal[1];
        diagonal[player - 1] += 1;
        if (diagonal[player - 1] == this.target) return player;
    }

    return 0;
}