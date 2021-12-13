//https://www.youtube.com/watch?v=vYYNp0Jrdv0&t=288s (Kevin)
var exist = function (board, word) {
    if (word == null || word.length == 0 || board == null || board.length == 0) return false;

    function dfs(i, j, index) {
        if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) return false;

        if (word[index] != board[i][j]) return false;

        if (index == word.length - 1) return true;

        let temp = board[i][j];
        board[i][j] = '*';

        const found = dfs(i + 1, j, index + 1) || dfs(i - 1, j, index + 1) || dfs(i, j + 1, index + 1) || dfs(i, j - 1, index + 1);

        board[i][j] = temp;

        return found;
    }


    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] == word[0]) {
                if (dfs(i, j, 0) == true) return true;
            }
        }
    }
    return false;
};