//DFS Approach
var canVisitAllRooms = function (rooms) {
  const visitedRoom = {};

  function dfs(roomIndex) {
    if (visitedRoom[roomIndex]) return;
    visitedRoom[roomIndex] = true;

    rooms[roomIndex].forEach((key) => {
      dfs(key);
    });
  }

  dfs(0);

  return Object.keys(visited).length == rooms.length;
};

console.log(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]));






//BFS Approach
var canVisitAllRooms = function (rooms) {
    const visitedRoom = {};
    const stack = [0], visitedRooms = {'0':true};

    while(stack.length){
        const currentRoom = stack.pop();
        rooms[currentRoom].forEach(function (key){
            if ( !visitedRooms[key] ) stack.push(key);
            visitedRoom[key] = true;
        })
    }
    return Object.keys(visited).length == rooms.length;
  };
  
  console.log(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]]));



/* 
Example 1:

Input: [[1],[2],[3],[]]
Output: true
Explanation:  
We start in room 0, and pick up key 1.
We then go to room 1, and pick up key 2.
We then go to room 2, and pick up key 3.
We then go to room 3.  Since we were able to go to every room, we return true.
Example 2:

Input: [[1,3]',[3,0,1],[2],[0]]
Output: false
Explanation: We can't enter the room with number 2.
 */
