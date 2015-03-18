var CANVAS_ELEMENT;
var CANVAS;

var X_DIM;
var Y_DIM;

var GRID_LENGTH = 20;
var LINK_LENGTH = 19;
var LINK_COLOR = "#FF0000";
var GRID_COLOR = "#000000";

function setLink(xPos, yPos) {
  CANVAS.fillStyle = LINK_COLOR;
  CANVAS.fillRect(xPos * GRID_LENGTH, yPos * GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
}

function removeLink(xPos, yPos) {
  CANVAS.fillStyle = GRID_COLOR;
  CANVAS.fillRect(xPos * GRID_LENGTH, yPos * GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
}

function initCanvas() {
  CANVAS_ELEMENT = document.getElementById("gameboard");
  CANVAS = CANVAS_ELEMENT.getContext("2d");

  CANVAS_ELEMENT.width = GRID_LENGTH * Math.floor(window.innerWidth * 0.7 / GRID_LENGTH);
  CANVAS_ELEMENT.height = GRID_LENGTH * Math.floor(window.innerHeight * 0.8 / GRID_LENGTH);
  X_DIM = CANVAS_ELEMENT.width / GRID_LENGTH;
  Y_DIM = CANVAS_ELEMENT.height / GRID_LENGTH;
}

function playGame() {
  var head = {
    posX:2, posY:3, // starting at (2, 3) arbitrarily
    dirX:1, dirY:0 // moving right arbitrarily
  };

  var tail = {
    posX:2, posY:3,
    dirX:1, dirY:0
  };

  setLink(head.posX, head.posY);
  setLink(0,0);
  setLink(X_DIM - 1, Y_DIM - 1);
}
