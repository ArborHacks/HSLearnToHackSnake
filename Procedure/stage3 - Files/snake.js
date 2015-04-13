// Canvas element variables
var CANVAS_ELEMENT;
var CANVAS;

// Aspects of virtual "grid" over canvas
var X_DIM;
var Y_DIM;
var GRID_LENGTH = 20;
var LINK_LENGTH = 19;
var LINK_COLOR = "#00274C"; // Blue
var GRID_COLOR = "#FFFFFF"; // White

// Speed of gameplay variables
var INTERVAL_ID;
var FPS = 15;

// HEAD and TAIL objects have (x,y) position and (x,y) direction
var HEAD = {
  xPos:2, yPos:3, // starting at (2, 3) arbitrarily
  xDir:1, yDir:0 // moving right arbitrarily
};
var TAIL = {
  xPos:2, yPos:3,
  xDir:1, yDir:0
};

// Set given grid position to snake link or target
function setLink(xPos, yPos) {
  CANVAS.fillStyle = LINK_COLOR;
  CANVAS.fillRect(xPos * GRID_LENGTH, yPos * GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
}

// Erase given grid position
function removeLink(xPos, yPos) {
  CANVAS.fillStyle = GRID_COLOR;
  CANVAS.fillRect(xPos * GRID_LENGTH, yPos * GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
}

// On keyboard input, change direction as required
function getKeyInput(event) {
  // Only change direction if not travelling along specified axis
  if ((event.keyCode == 37 || event.keyCode == 65) && HEAD.xDir == 0) { // Left/A was pressed
    HEAD.xDir = -1;
    HEAD.yDir = 0;
  }
  else if ((event.keyCode == 39 || event.keyCode == 68) && HEAD.xDir == 0) { // Right/D was pressed
    HEAD.xDir = 1;
    HEAD.yDir = 0;
  }
  else if ((event.keyCode == 38 || event.keyCode == 87) && HEAD.yDir == 0) { // Up/W was pressed
    HEAD.xDir = 0;
    HEAD.yDir = -1;
  }
  else if ((event.keyCode == 40 || event.keyCode == 83) && HEAD.yDir == 0) { // Down/S was pressed
    HEAD.xDir = 0;
    HEAD.yDir = 1;
  }
}

// Set initial gameboard conditions (canvas and game variables)
function initCanvas() {
  // Get canvas element from DOM
  CANVAS_ELEMENT = document.getElementById("gameboard");
  CANVAS = CANVAS_ELEMENT.getContext("2d");

  // Set dimensions of canvas and gameboard (on virtual "grid")
  CANVAS_ELEMENT.width = GRID_LENGTH * Math.floor(window.innerWidth * 0.65 / GRID_LENGTH);
  CANVAS_ELEMENT.height = GRID_LENGTH * Math.floor(window.innerHeight * 0.7 / GRID_LENGTH);
  X_DIM = CANVAS_ELEMENT.width / GRID_LENGTH;
  Y_DIM = CANVAS_ELEMENT.height / GRID_LENGTH;

  // Set initial position of snake (head and tail variables)
  HEAD.xPos = 2;
  HEAD.yPos = 3;
  HEAD.xDir = 1;
  HEAD.yDir = 0;
  TAIL.xPos = HEAD.xPos;
  TAIL.yPos = HEAD.yPos;
  TAIL.xDir = HEAD.xDir;
  TAIL.yDir = HEAD.yDir;

  // Add event listener for keypresses (to get arrow key input)
  window.addEventListener("keydown", getKeyInput);
}

// Reset canvas to initial conditions and starts game
function restartGame() {
  initCanvas();
  runGame();
}

// Stop frames from updating
function gameOver() {
  document.getElementById("playGameButton").onclick = restartGame;
  clearInterval(INTERVAL_ID);
}

// Return false if given coordinates are outside of gameboard
function checkBounds(xPos, yPos) {
  if (xPos < 0 || xPos >= X_DIM) return false;
  else if (yPos < 0 || yPos >= Y_DIM) return false;
  else return true;
}

// Update position of head and tail of snake
function moveSnake() {
  // Update head position in direction of motion
  HEAD.xPos += HEAD.xDir;
  HEAD.yPos += HEAD.yDir;

  // Exit if head hits edge of gameboard or hits another link (hits itself)
  if (!checkBounds(HEAD.xPos, HEAD.yPos)) {
    gameOver();
    return;
  }

  setLink(HEAD.xPos, HEAD.yPos);

  removeLink(TAIL.xPos, TAIL.yPos);
  TAIL.xPos += TAIL.xDir;
  TAIL.yPos += TAIL.yDir;
}

// Update snake on each frame
function playGame() {
  moveSnake(); // Move snake each "frame"
}

// Starts framerate
function runGame() {
  // Set interval for "frame" updating function
  INTERVAL_ID = setInterval(playGame, 1000 / FPS);
}
