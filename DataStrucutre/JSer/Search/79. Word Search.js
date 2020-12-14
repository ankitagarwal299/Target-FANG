//https://www.youtube.com/watch?v=vYYNp0Jrdv0


//Time: M*N + 4* No. of char in string
var wordSearch = function (board, word) {
  if (board == null || board.length == 0) return false;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == word.charAt(0) && dfs(board, i, j, 0, word)) {
        return true;
      }
    }
  }
  return false;
};

function dfs(board, i, j, count, word) {

  //base condition to stop DFS
  if (count == word.length) {
    return true;//Step1
  }

  //check bounds ad board[i][j] != word.charAt(0)
  if (i < 0 || i >= board.length || j < 0 || j >= board[i].length || board[i][j] != word.charAt(count)) {
    return false;//Step2
  }

  let temp = board[i][j];
  board[i][j] = "*";
  let left = dfs(board, i - 1, j, count + 1, word);
  let right = dfs(board, i + 1, j, count + 1, word);
  let top = dfs(board, i, j + 1, count + 1, word);
  let bottom = dfs(board, i, j - 1, count + 1, word);

  board[i][j] = temp;


  return (left || right || top || bottom);//Step3
}


let board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];
console.log(wordSearch(board, "ABCCED"));
console.log(wordSearch(board, "SEE"));
console.log(wordSearch(board, "ABCB"));