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
  var headPosX = 2; var headPosY = 3; 
  var headDirX = 1; var headDirY = 0;

  var tailPosX = 2; var tailPosY = 3;
  var tailDirX = 1; var tailDirY = 0;

  setLink(headX, headY);
}
