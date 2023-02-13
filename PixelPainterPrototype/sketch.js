var count = 0;
var grid = [];
const rows = 20; // amount of rows on the canvas (20X20) 
var col = { 
    r: 0,
    g: 0,
    b: 0,
}

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < rows; i++) {
    grid[i] = [false, false, false, false, false, false, false, false, false, false]
  }
  col.r= random(0,255);
  col.g= random(0,255);  // random colors generate after the "page" is reloaded 
  col.b= random(0,255);
  background(200);
  renderBoard();
}

//which grid box the user painted
function mousePressed() {
  let spotX = floor(mouseX / (width / rows));
  let spotY = floor(mouseY / (width / rows));
  if (count < 12){
    grid[spotX][spotY] = !grid[spotX][spotY];
    count ++; 
  }
  
  renderBoard();
}
 
function renderBoard(){
   for (let x = 0; x < rows; x++) {
    for (let y = 0; y < rows; y++) {
      if(grid[x][y]){ 
       fill(col.r, col.g, col.b);
      } else {fill(255);}
     rect(x*(width / rows),y*(width / rows),width / rows,height / rows)
    }
 }
}
