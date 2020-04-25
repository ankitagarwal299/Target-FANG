function wallsAndGate(rooms) {
    for (let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < rooms[i].length; j++) {
        if (rooms[i][j] == 0) {
          dfs(i, j, 0, rooms);
        }
      }
    }
  
    return rooms;
  }
  
  function dfs(i, j, count, rooms) {
    if (i < 0 || i >= rooms.length || j < 0 || j >= rooms.length || rooms[i][j] < count) return;
  
    rooms[i][j] = count;
    dfs(i, j - 1, count + 1, rooms);
    dfs(i, j + 1, count + 1, rooms);
    dfs(i - 1, j, count + 1, rooms);
    dfs(i + 1, j, count + 1, rooms);
  
  
  }
  
  var rooms = [
    [Math.pow(2, 31), -1, 0, Math.pow(2, 31)],
    [Math.pow(2, 31), Math.pow(2, 31), 0, -1],
    [Math.pow(2, 31), -1, Math.pow(2, 31), -1],
    [0, -1, Math.pow(2, 31), Math.pow(2, 31)],
  ];
  console.log(wallsAndGate(rooms));

/* Fill each empty room with the distances to the nearest gate. If it is impossible to reach 
the gate , it should be filled with INF */
