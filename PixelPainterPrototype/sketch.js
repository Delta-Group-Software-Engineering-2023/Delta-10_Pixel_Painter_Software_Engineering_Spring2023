var count = 0;
var click_limit =Infinity; //specifies the number of pixels a user can use to paint
var grid = [];
const rows = 40; // amount of rows on the canvas (20X20) 
var menu = 0;
var col = { 
    r: 0,
    g: 0,
    b: 0,
}
var used_pixels_count = 0;
var pixel_bar_count = click_limit;

function setup() {
  frameRate(10);
  let c = color('hsba(160, 100%, 50%, 0.5)');
  

  button = createButton("Pixel Painter");
  button.size(445,60);
  button.position(15,55);
  button.style('background-color', c);
  button.style("font-family", "Courier New");
  button.style("font-weight", "bold");
  button.style("color", "white"); //white
  button.style("font-size", "27px"); //27
  
  
  
  /*btnLog = createButton("Log In");
  btnLog.size(100,40);
  btnLog.position(515,2);
  btnLog.style("border-radius", "20px");
  btnLog.style("border-color", "transparent");
  */
  
  
  pixel_count();
  music_player();
  multi_player();
  settings();
  
  canvas = createCanvas(445, 445);
  canvas.position(15, 135);
  for (let i = 0; i < rows; i++) {
    grid[i] = [false, false, false, false, false, false, false, false, false, false]
  }
  col.r= random(0,255);
  col.g= random(0,255);  // random colors generate after the "page" is reloaded 
  col.b= random(0,255);
  
  nextColorDisplay();
  canvas.mouseClicked(painterInput); // Prevents pixel counter from tracking input off canvas.
  
  background(200);
  renderBoard();
}

function pixel_count(){
  let v = color('hsba(160, 100%, 30%, 0.65)');
 
  remText = createP(pixel_bar_count);
  remText.position(515,50);
  remText.style("font-size", "33px");
  remText.style("color", v);
  remText.style("font-weight", "bold");
  
  remPixels = createP("Pixel Bar");
  remPixels.style("font-size", "13px");
  remPixels.style("font-family", "Courier New"); //black
  remPixels.style("color", "black");
  remPixels.position(515, 107);
  
  usedText = createP(used_pixels_count);
  usedText.position(515,129);
  usedText.style("font-size", "33px");
  usedText.style("color", "grey");
  usedText.style("font-weight", "bold");
  
  usedPixels = createP("Used Pixels");
  usedPixels.style("font-size", "13px");
  usedPixels.style("font-family", "Courier New"); //black
  usedPixels.style("color", "black");
  usedPixels.position(515, 186); //186
}


function music_player(){
  let stringm = "Music Player";
  //ringm.style("font-family", "Courier New"); //black
  music_tab = createButton(stringm);
  music_tab.size(110,40);
  music_tab.position(515,325)
  music_tab.style("border-radius", "20px"); //110
  music_tab.style("border-color", "transparent");
}

function multi_player(){
  multiplayer_tab = createButton("Connect");
  multiplayer_tab.size(110,40);
  multiplayer_tab.position(515,383);
  multiplayer_tab.style("border-radius", "20px");
  multiplayer_tab.style("border-color", "transparent");
}

function settings(){
  set_tab = createButton("Settings");
  set_tab.size(110,40);
  set_tab.position(515,441);
  set_tab.style("border-radius", "20px");
  set_tab.style("border-color", "transparent");
  //t_tab.style("color", "white");
  //t_tab.style("background-color", "yellow"); //blue
  set_tab.mousePressed(setMenu);
}

function setMenu(){
  if (menu == 0)
    {
      menu = 1;
      background(255, 255, 255);
      textAlign(CENTER);
      textSize(40);
      fill(0);
      text('Settings', width*0.5, 35);
      set_tab.html('Back to game');
    }
  else
    {
      menu = 0;
      set_tab.html('Settings');
      renderBoard();
    }
}

function nextColorDisplay(){
  let currentColor = color(col.r, col.g, col.b);
  current_color = createButton("Current Color");
  current_color.style("font-size", "13px");
  current_color.size(100,30);
  current_color.style("border-radius", "20px");
  current_color.style("border-color", "transparent");
  current_color.position(520,500);
  current_color.style("background-color",currentColor);
  // current_color.mousePressed(None);
  
  change_color = createButton("Next Color");
  change_color.style("font-size", "13px");
  change_color.size(100,30);
  change_color.style("border-radius", "20px");
  change_color.style("border-color", "transparent");
  change_color.style("border", "20px")
  change_color.position(520,553);
  change_color.style("background-color",currentColor);
  change_color.mousePressed(changeColor);
  // colorRectangle = createButton('');
  // colorRectangle.attribute('disabled', '')
  // colorRectangle.style('background-color', currentColor);
  
  // colorRectangle.size(100, 50);
  // colorRectangle.position(520, 500);
}

function changeColor(){
  col.r= random(0,255);
  col.g= random(0,255);  // random colors generate after the "page" is reloaded 
  col.b= random(0,255);
  nextColorDisplay();

}

function painterInput(){
  if (menu == 0)
    {
      let spotX = floor(mouseX / (width / rows));
      let spotY = floor(mouseY / (width / rows));
      if (count < click_limit){
      grid[spotX][spotY] = !grid[spotX][spotY];
      count ++; 
      }
      renderBoard();
      updateCounter();
    }
  else if (menu == 1)
    {
      
    }
}

function updateCounter() {
  if (used_pixels_count < click_limit){
    used_pixels_count++;
  }
  if (pixel_bar_count > 0) {
    pixel_bar_count--;
  }
  remText.html( pixel_bar_count);
  usedText.html ( used_pixels_count);
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