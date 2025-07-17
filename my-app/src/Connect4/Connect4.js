import React, { useState } from "react";

const ROWS = 6;
const COLS = 7;
const EMPTY_BOARD = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const getStyles = () => ({
  connect4: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  board: {
    display: "grid",
    gridTemplateRows: `repeat(${ROWS}, 60px)`,
    gridGap: "5px",
    backgroundColor: "#0074cc",
    padding: "10px",
    borderRadius: "10px",
    width: "max-content",
    margin: "auto",
  },
  row: {
    display: "flex",
  },
  cell: {
    width: "60px",
    height: "60px",
    backgroundColor: "white",
    borderRadius: "50%",
    border: "2px solid #0074cc",
    transition: "background 0.3s ease",
    cursor: "pointer",
  },
  red: {
    backgroundColor: "red",
  },
  yellow: {
    backgroundColor: "yellow",
  },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#0074cc",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#005fa3",
  },
});

const Cell = ({ value, onClick }) => {
  const styles = getStyles();
  return <div style={{ ...styles.cell, ...(value === "red" ? styles.red : value === "yellow" ? styles.yellow : {}) }} onClick={onClick}></div>;
};

const Board = ({ board, onDrop }) => {
  const styles = getStyles();
  return (
    <div style={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} value={cell} onClick={() => onDrop(colIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
};

const checkDirection = (board, row, col, player, rowDir, colDir) => {
  let count = 1;
  count += countConsecutive(board, row, col, player, rowDir, colDir);
  count += countConsecutive(board, row, col, player, -rowDir, -colDir);
  return count >= 4;
};

const countConsecutive = (board, row, col, player, rowDir, colDir) => {
  let count = 0;
  let r = row + rowDir, c = col + colDir;
  while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
    count++;
    r += rowDir;
    c += colDir;
  }
  return count;
};

const Connect4 = () => {
  const styles = getStyles();
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [winner, setWinner] = useState(null);

  const dropDisc = (col) => {
    if (winner) return;
    const newBoard = board.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        checkWinner(newBoard, row, col, currentPlayer);
        setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
        return;
      }
    }
  };

  const checkWinner = (board, row, col, player) => {
    if (
      checkDirection(board, row, col, player, 1, 0) ||
      checkDirection(board, row, col, player, 0, 1) ||
      checkDirection(board, row, col, player, 1, 1) ||
      checkDirection(board, row, col, player, 1, -1)
    ) {
      setWinner(player);
    }
  };

  const resetGame = () => {
    setBoard(EMPTY_BOARD);
    setCurrentPlayer("red");
    setWinner(null);
  };

  return (
    <div style={styles.connect4}>
      <h1>Connect 4</h1>
      {winner ? <h2>Winner: {winner.toUpperCase()}!</h2> : <h2>Turn: {currentPlayer.toUpperCase()}</h2>}
      <Board board={board} onDrop={dropDisc} />
      <button style={styles.button} onClick={resetGame} onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}>Reset Game</button>
    </div>
  );
};

export default Connect4;
