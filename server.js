var express = require("express");
var app = express();

var server = app.listen(3000);

app.use(express.static("public"));

console.log("server run");

var socket = require("socket.io");

var io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection:" + socket.id);
  socket.on("pixel", pixelMsg);

  function pixelMsg(data) {
    io.sockets.emit("pixel", data);
    //socket.broadcast.emit("pixel", data);
    console.log(data);
  }
}
