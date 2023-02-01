const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Initializing socket
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

// We print out the chat message event.
io.on('connection', (socket) => {
    socket.on('chat_message', (msg) => {
      console.log('message: ' + msg);
    });
  });

// This will emit the event to all connected sockets
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

// To send a message to everyone except for a certain emitting socket.
io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });
// Sending the message to everyone including the sender.
io.on('connection', (socket) => {
    socket.on('chat_message', (msg) => {
      io.emit('chat_message', msg);
    });
  });

// // Sends message to everyone except the sender.  
// socket.on("chat_message", (data) => {
//     console.log("message: ", data);
//     // io.emit("chat_message", data);
//     socket.broadcast.emit("chat_message", data);
//   });

server.listen(3000, () => {
  console.log('My server is listening on port 3000.......');
});