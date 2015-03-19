var CANVAS_ELEMENT;
var CANVAS;

var X_DIM;
var Y_DIM;

var GRID_LENGTH = 20;
var LINK_LENGTH = 19;
var LINK_COLOR = "#FF0000";
var GRID_COLOR = "#FFFFFF";

var INTERVAL_ID;
var FPS = 25;

var HEAD = {
  xPos:2, yPos:3, // starting at (2, 3) arbitrarily
  xDir:1, yDir:0 // moving right arbitrarily
};
var TAIL = {
  xPos:2, yPos:3,
  xDir:1, yDir:0
}

var turnQueue = [];
var linkArray = [];

var SCORE = 0;

function setLink(xPos, yPos) {
  CANVAS.fillStyle = LINK_COLOR;
  CANVAS.fillRect(xPos * GRID_LENGTH, yPos * GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
  linkArray[xPos][yPos] = 1;
}

function removeLink(xPos, yPos) {
  CANVAS.fillStyle = GRID_COLOR;
  CANVAS.fillRect(xPos * GRID_LENGTH, yPos * GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
  linkArray[xPos][yPos] = 0;
}

function getKeyInput(event) {
  var changed = true;
  if (event.keyCode == 37 && HEAD.xDir == 0) { // left was pressed
    HEAD.xDir = -1;
    HEAD.yDir = 0;
  }
  else if (event.keyCode == 39 && HEAD.xDir == 0) { // right was pressed
    HEAD.xDir = 1;
    HEAD.yDir = 0;
  }
  else if (event.keyCode == 38 && HEAD.yDir == 0) { // up was pressed
    HEAD.xDir = 0;
    HEAD.yDir = -1;
  }
  else if (event.keyCode == 40 && HEAD.yDir == 0) { // down was pressed
    HEAD.xDir = 0;
    HEAD.yDir = 1;
  }
  else changed = false;
  
  if (changed) {
    var newHead = {xPos:HEAD.xPos, yPos:HEAD.yPos, xDir:HEAD.xDir, yDir:HEAD.yDir};
    turnQueue.push(newHead);
  }
}

function initCanvas() {
  CANVAS_ELEMENT = document.getElementById("gameboard");
  CANVAS = CANVAS_ELEMENT.getContext("2d");

  CANVAS_ELEMENT.width = GRID_LENGTH * Math.floor(window.innerWidth * 0.7 / GRID_LENGTH);
  CANVAS_ELEMENT.height = GRID_LENGTH * Math.floor(window.innerHeight * 0.8 / GRID_LENGTH);
  X_DIM = CANVAS_ELEMENT.width / GRID_LENGTH;
  Y_DIM = CANVAS_ELEMENT.height / GRID_LENGTH;

  HEAD.xPos = 2; HEAD.yPos = 3;
  HEAD.xDir = 1; HEAD.yDir = 0;
  TAIL.xPos = 2; TAIL.yPos = 3;
  TAIL.xDir = 1; TAIL.yDir = 0;

  window.addEventListener("keydown", getKeyInput);

  for (var i = 0; i < X_DIM; ++i) {
    var columns = [];
    for (var j = 0; j < Y_DIM; ++j) columns[j] = 0;
    linkArray[i] = columns;
  }

  document.getElementById("playGameButton").innerHTML = "Play Game"
  document.getElementById("playGameButton").onclick = runGame;
}

function gameOver() {
  document.getElementById("playGameButton").innerHTML = "Play Again?";
  document.getElementById("playGameButton").onclick = initCanvas;
  clearInterval(INTERVAL_ID);
}

function moveSnake() {
  HEAD.xPos += HEAD.xDir;
  HEAD.yPos += HEAD.yDir;

  if (linkArray[HEAD.xPos][HEAD.yPos]) { // if has hit self, exit (game over)
    gameOver();
    return;
  }

  setLink(HEAD.xPos, HEAD.yPos);

  removeLink(TAIL.xPos, TAIL.yPos);
  TAIL.xPos += TAIL.xDir;
  TAIL.yPos += TAIL.yDir;
}

function playGame() {
  // if tail is at turning point, set to new direction
  if (turnQueue.length > 0
      && TAIL.xPos == turnQueue[0].xPos && TAIL.yPos == turnQueue[0].yPos) {
    TAIL = turnQueue.shift();
  }

  // SYDNEY TO DO:
  
  // Check bounds (if HEAD has gone out of bounds)
  // to exit (game over): call "clearInterval(INTERVAL_ID);"

  // Check if snake has eaten target, and if so:
  //     grow snake
  //     set new target
  //     increment score

  moveSnake(HEAD, TAIL);
}

function runGame() {
  INTERVAL_ID = setInterval(playGame, 1000 / FPS);
}
