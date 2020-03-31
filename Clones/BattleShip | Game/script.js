var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,

  ships: [
    { locations: [0, 0, 0], hits: ["0", "0", "0"] },
    { locations: [0, 0, 0], hits: ["0", "0", "0"] },
    { locations: [0, 0, 0], hits: ["0", "0", "0"] }
  ],

  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      let ship = this.ships[i];
      let index = ship.locations.indexOf(guess);

      if (ship.hits[index] == "hit") {
        view.displayMessage("You ahve already hit this locations!");
        return true;
      } else if (index >= 0) {
        ship.hits[index] = "HIT";
        view.displayHit(guess);
        view.displayMessage("You ahve already hit this locations!");

        if (this.isSunk()) {
          view.displayMessage("Ypi sunk my battle ship");
          this.shipSunk++;
        }
        return true;
      }
    }
    view.displayMessage("You Missed");
    view.displayMiss(guess);
    return false;
  },
  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] != "hit") {
        return false;
      }
    }
    return true;
  },
  generateShipLocations: function() {
    var locations;

    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));

      this.ship[i].locations = locations;
    }
    console.log("Ships array: ", this.ships);
  },
  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction == 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * this.boardSize - this.shipLength + 1);
    } else {
      col = Math.floor(Math.random() * this.boardSize);
      row = Math.floor(Math.random() * this.boardSize - this.shipLength + 1);
    }

    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction == 1) {
        newShipLocations.push(row + "" + col + 1);
      } else {
        newShipLocations.push(row + 1 + "" + col);
      }
    }
    return newShipLocations;
  },
  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      let ship = this.ship[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }
};

var view = {
  displayHit: function(location) {
    document.getElementById(location).innerHTML = "H";
    //document.getElementById(location).setAttribute("class","hit");
  },
  displayMessage: function(msg) {
    document.getElementById("messageArea").innerHTML = msg;
  },
  displayMiss: function(location) {
    document.getElementById(location).innerHTML = "M";
    //document.getElementById(location).setAttribute("class","miss");
  }
};

var controller = {
  guesses: 0,

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);

      if (hit && model.shipSunk == model.numShips) {
        view.displayMessage(`Game Won in ${this.guesses} guessess`);
      }
    }
  }
};

function parseGuess(guess) {
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

  if (guess == null && guess.length != 2) {
    alert("Enter valid number");
  } else {
    var firstChar = guess.charAt(0);
    var row = alphabet.indexOf(firstChar);
    var col = guess.charAt(1);

    if (isNaN(row) || isNaN(col)) {
      alert("not a valid input");
    } else if ( row < 0 || row >= model.boardSize || col < 0 || col >= model.boardSize ) {
      alert("location not on the board");
    } else {
      return row + col;
    }
  }
  return null;
}

function handleFireButton() {
  var guess = document.getElementById("guessInput").value.toUpperCase();

  controller.processGuess(guess);
  guess.value = "";
}

//on enter
/* function handleKeyPress(e) {
  document
    .getElementById("fireButton")
    .addEventListener("click", function() {});
} */

function init() {
  document
    .getElementById("fireButton")
    .addEventListener("click", handleFireButton);
}

window.onload = init();
