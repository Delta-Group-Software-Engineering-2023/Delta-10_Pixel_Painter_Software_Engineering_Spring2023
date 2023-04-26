var express = require("express");
var app = express();

var server = app.listen(3000);

app.use(express.static("public"));

console.log("server run");

var socket = require("socket.io");

var io = socket(server, {
  cors: {
    origin: "http://localost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const grid = JSON.parse(fs.readFileSync('grid.json'));

io.on('connection', (socket) => {
  // Send the grid to the client
  socket.emit('grid', grid);
  
  // Listen for color changes from the client
  socket.on('color', ({ i, j, color }) => {
    grid[i][j] = color;
    
    // Send the updated grid to all clients
    io.emit('grid', grid);
  });
});
}
