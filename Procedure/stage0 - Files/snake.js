var CANVAS_ELEMENT;
var CANVAS;

function initCanvas() {
  CANVAS_ELEMENT = document.getElementById("gameboard");
  CANVAS = CANVAS_ELEMENT.getContext("2d");

  CANVAS_ELEMENT.width = window.innerWidth * 0.65;
  CANVAS_ELEMENT.height = window.innerHeight * 0.7;
}
