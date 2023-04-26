var count = 0;
var click_limit = 100; //specifies the number of pixels a user can use to paint
var grid = [];
var prev_grid = [];
var rows; // amount of rows on the canvas (20X20)
var col = {
  r: 0,
  g: 0,
  b: 0,
};
var used_pixels_count = 0;
var pixel_bar_count = click_limit;

var socket;

//var song;

function preload() {
  grid = loadJSON('grid.json');
}

function setup() {
  frameRate(10);
  let c = color("hsba(160, 100%, 50%, 0.5)");

  /*musicPlayer = createButton("play");
  musicPlayer.mousePressed(toggelPlaying);
  musicPlayer.size(110, 40);
  musicPlayer.position(515, 250);
  musicPlayer.style("border-radius", "20px");
  musicPlayer.style("border-color", "transparent");*/

  button = createButton("Pixel Painter");
  button.size(445, 60);
  button.position(15, 55);
  button.style("background-color", c);
  button.style("font-family", "Courier New");
  button.style("font-weight", "bold");
  button.style("color", "white"); //white
  button.style("font-size", "27px"); //27

  // btnLog = createButton("Log In");
  // btnLog.size(100,40);
  // btnLog.position(515,2);
  // btnLog.style("border-radius", "20px");
  // btnLog.style("border-color", "transparent");

  pixel_count();
  multi_player();
  settings();
  exportDisplay();
  changeCavas();
  rows = 20;
  canvas = createCanvas(445, 445);
  strokeWeight(0.15);
  canvas.position(15, 135);
  grid_val();

  col.r = random(0, 255);
  col.g = random(0, 255); // random colors generate after the "page" is reloaded
  col.b = random(0, 255);
  nextColorDisplay();
  canvas.mouseClicked(painterInput); // Prevents pixel counter from tracking input off canvas.
  background(200);
  renderBoard();

  //connect to the node server
  socket = io.connect("deltathengame.com:8080", updateCanvas);
  //if data called pixel is transmitted, call updateCanvas()
  socket.on("pixel", updateCanvas);
  saveJSON(grid, 'grid.json');
  socket.on('grid', (data)=> {
    grid= data;
  });
}

/*function toggelPlaying() {
  if (!song.isPlaying()) {
    song.play();
    musicPlayer.html("Pause");
  } else {
    song.pause();
    musicPlayer.html("Play");
  }
}*/

/*function loaded() {
  console.log("loaded");
}*/

function pixel_count() {
  let v = color("hsba(160, 100%, 30%, 0.65)");
  remText = createP(pixel_bar_count);
  remText.position(515, 50);
  remText.style("font-size", "33px");
  remText.style("color", v);
  remText.style("font-weight", "bold");
  remPixels = createP("Pixel Bar");
  remPixels.style("font-size", "13px");
  remPixels.style("font-family", "Courier New"); //black
  remPixels.style("color", "black");
  remPixels.position(515, 107);
  usedText = createP(used_pixels_count);
  usedText.position(515, 129);
  usedText.style("font-size", "33px");
  usedText.style("color", "grey");
  usedText.style("font-weight", "bold");
  usedPixels = createP("Used Pixels");
  usedPixels.style("font-size", "13px");
  usedPixels.style("font-family", "Courier New"); //black
  usedPixels.style("color", "black");
  usedPixels.position(515, 186); //186
}

function multi_player() {
  multiplayer_tab = createButton("Connect");
  multiplayer_tab.size(110, 40);
  multiplayer_tab.position(515, 310);
  multiplayer_tab.style("border-radius", "20px");
  multiplayer_tab.style("border-color", "transparent");
}

function settings() {
  set_tab = createButton("Settings");
  set_tab.size(110, 40);
  set_tab.position(515, 370);
  set_tab.style("border-radius", "20px");
  set_tab.style("border-color", "transparent");
  //t_tab.style("color", "white");
  //t_tab.style("background-color", "yellow"); //blue
  set_tab.mousePressed(setMenu);
}

function setMenu() {
  if (menu == 0) {
    menu = 1;
    background(255, 255, 255);
    textAlign(CENTER);
    textSize(40);
    fill(0);
    text("Settings", width * 0.5, 35);
    set_tab.html("Back to game");

    //render setting items
    button = createButton("Settings");
    button.size(110, 40);
    button.position(width * 0.5 - 40, 200);
  } else {
    menu = 0;
    set_tab.html("Settings");
    renderBoard();
    button.hide();
  }
}

function exportDisplay() {
  export_tab = createButton("Export as JPG");
  export_tab.size(110, 40);
  export_tab.position(10, 590);
  export_tab.style("border-radius", "20px");
  export_tab.style("border-color", "transparent");
  export_tab.mousePressed(exportPixelPainting);
}

function exportPixelPainting() {
  saveCanvas(canvas, "PixelPainting", "jpg");
}

function nextColorDisplay() {
  let currentColor = color(col.r, col.g, col.b);
  change_color = createButton("Next Color");
  change_color.mousePressed(changeColor);
  change_color.size(110, 40);
  change_color.position(515, 550);
  change_color.style("border-radius", "20px"); //110
  change_color.style("border-color", "transparent");
  colorRectangle = createButton("");
  colorRectangle.attribute("disabled", "");
  colorRectangle.style("background-color", currentColor);
  colorRectangle.size(50, 40);
  colorRectangle.position(545, 500);
  colorRectangle.style("border-radius", "20px");
}

function changeColor() {
  col.r = random(0, 255);
  col.g = random(0, 255); // random colors generate after the "page" is reloaded
  col.b = random(0, 255);
  nextColorDisplay();
}

function changeCavas() {
  canvasSize_tab = createSelect();
  canvasSize_tab.option("Small canvas");
  canvasSize_tab.option("Medium canvas");
  canvasSize_tab.option("Large canvas");
  canvasSize_tab.changed(changeCanvas_size);
  canvasSize_tab.size(110, 40);
  canvasSize_tab.position(515, 450);
  canvasSize_tab.style("background-color", "rgb(240,240,240)");
  canvasSize_tab.style("border-radius", "20px");
  canvasSize_tab.style("border-color", "transparent");
}

function changeCanvas_size() {
  let val = canvasSize_tab.value();
  if (val == "Small canvas") {
    rows = 20;
    grid_val();
  } else if (val == "Medium canvas") {
    rows = 30;
    grid_val();
  } else if (val == "Large canvas") {
    rows = 45;
    grid_val();
  }
  usedText.html((count = 0));
  renderBoard();
  resetClickLimit();
  remText.html(pixel_bar_count);
  usedText.html(count);
}

function resetClickLimit() {
  pixel_bar_count = click_limit;
}

function updateCounter() {
  let spotX = floor(mouseX / (width / rows));
  let spotY = floor(mouseY / (width / rows));
  if (grid[spotX][spotY]) {
    used_pixels_count++;
    pixel_bar_count--;
  } else {
    used_pixels_count--;
  }
  remText.html(pixel_bar_count);
  usedText.html(count);
}

function renderBoard() {
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < rows; y++) {
      // if(grid[x][y]){
      //  fill(col.r, col.g, col.b);
      // } else {fill(255);}
      fill(grid[x][y]);
      rect(x * (width / rows), y * (width / rows), width / rows, height / rows);
    }
  }
}

function painterInput() {
  let spotX = floor(mouseX / (width / rows));
  let spotY = floor(mouseY / (width / rows));
  //  if (count < click_limit){
  //    grid[spotX][spotY] = !grid[spotX][spotY];
  //    count ++;
  //  }
  if (count < click_limit) {
    if (
      grid[spotX][spotY][0] === 255 &&
      grid[spotX][spotY][1] === 255 &&
      grid[spotX][spotY][2] === 255
    ) {
      grid[spotX][spotY] = [col.r, col.g, col.b];
      count++;
      renderBoard();
      updateCounter();
      //console.log(grid[spotX][spotY]);
    } else {
      grid[spotX][spotY] = [255, 255, 255];
      count++;
      renderBoard();
      updateCounter();
      //console.log(grid[spotX][spotY]);
    }
  }
  //create a variable to store grid information
 
  //send the grid information
  socket.emit("pixel", { spotX, spotY, col});
}

//following function redraws the canvas after getting data from other players
function updateCanvas(data) {
  let spotX = data.x;
  let spotY = data.y;
  grid[spotX][spotY] = [data.r, data.g, data.b];
  renderBoard();
}

function grid_val() {
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = [255, 255, 255];
    }
  }
  for (let i = 0; i < rows; i++) {
    prev_grid[i] = [];
    for (let j = 0; j < rows; j++) {
      prev_grid[i][j] = [null, null, null];
    }
  }
  //console.log(grid);
}
