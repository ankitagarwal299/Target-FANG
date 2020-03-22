function TicTacToe() {
  const board = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);

  let turn = 0;

  this.start = function() {
    //watching all of these position for a change
    //use observer to observe changes in DOM
    const config = { childList: true };
    const observer = new MutationObserver(takeTurn);

    board.positions.forEach(function(el) {
      observer.observe(el, config);
    });

    takeTurn();
  };

  function takeTurn() {
    if (board.checkForWinner()) return;
    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }
    turn++;
  }
}

function Board() {
  this.positions = Array.from(document.querySelectorAll(".col"));

  /* 0 1 2
     3 4 5
     6 7 8
  */
  this.checkForWinner = function() {
    let winner = false;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
    ];

    const positions = this.positions;

    winningCombinations.forEach(winningCombo => {
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;

      const isWinningCombo =
        pos0InnerText != "" &&
        pos0InnerText === pos1InnerText &&
        pos1InnerText === pos2InnerText;

      if (isWinningCombo) {
        winner = true;
        winningCombo.forEach(index => {
          positions[index].className +=' winner';
        });
      }
    });

    return winner;
  };
}

function HumanPlayer(board) {
  this.takeTurn = function() {
    console.log("HUman Player");
    board.positions.forEach(function(el) {
      el.addEventListener("click", handleTurnTaken);
    });
  };

  function handleTurnTaken(event) {
    event.target.innerText = "X";
    board.positions.forEach(el =>
      el.removeEventListener("click", handleTurnTaken)
    );
  }
}
function ComputerPlayer(board) {
  this.takeTurn = function() {
    console.log("Computer Player");

    const availablePositions = board.positions.filter(function(p) {
      return p.innerText === "";
    });
    console.log(availablePositions);
    const move = Math.floor(Math.random() * availablePositions.length);
    availablePositions[move].innerText = "O";
  };
}

const ticTacToe = new TicTacToe();
ticTacToe.start();
