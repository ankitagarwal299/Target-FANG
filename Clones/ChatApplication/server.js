/* https://www.youtube.com/watch?v=jD7FnbI76Hg&t=169s */
//Realtime Chat With Users & Rooms - Socket.io, Node & Express

const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Run when client connecrts
io.on("connection", socket => {
  //Welcome new user
  socket.emit("message", "Welcome to Chat Chord!");

  //Broadcast when user connects, to all clients except who joined
  socket.broadcast.emit("message", "A user has joined the chat");

  // Runs when client disconnect To all clients
  socket.on("disconnect", function() {
    io.emit("message", "A user has left the chat");
  });

  //Listen for chat message
  socket.on('chatMessage',(msg)=>{
    console.log(msg);
    io.emit('message',msg);
    
  })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
