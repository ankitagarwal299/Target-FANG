var surroundedRegions = function (board) {
    if (board == null || board.length == 0) return;
  
    let row = board.length;
    let column = board[0].length;
  
    //change 1st & last column fro boundary region and turn into *
    for (let i = 0; i < row; i++) {
      if (board[i][0] == "O") dfsBoundary(i, 0, board);
      if (board[i][column - 1] == "O") dfsBoundary(i, column - 1, board);
    }
  
    //console.log(board);
  
  
    //change 1st & last row of boundary region and turn into *
    for (let j = 0; j < column ; j++) {
      if (board[0][j] == "O") dfsBoundary(0, j, board);
      
      if (board[row - 1][j] == "O")  dfsBoundary(row - 1, j, board);
    }
      //console.log("Hello\n",board);
  
  
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (board[i][j] == "O") board[i][j] = 'X';
        
        if (board[i][j] == "*") board[i][j] ='O';
      }
    }
  
    return board;
  };
  
  function dfsBoundary(i, j, board) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[i].length) return;
    
    //console.log(board[i][j])
    
    if (board[i][j] == "O") {
      board[i][j] = "*";
      dfsBoundary(i - 1, j, board);
      dfsBoundary(i, j - 1, board);
      dfsBoundary(i + 1, j, board);
      dfsBoundary(i, j + 1, board);
    }
    
  }
  
  var board = [
    ["X", "X", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "X", "O", "X"],
    ["X", "O", "X", "X"],
  ];
  
  var board1 = [
    ["X", "X", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "O", "O", "X"],
    ["X", "O", "X", "X"],
  ];
  
  console.log(surroundedRegions(board));
  
  
  
  
  
  
  
  