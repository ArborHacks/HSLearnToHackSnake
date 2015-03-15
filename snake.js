var _GRID_LENGTH = 20;
var _LINK_LENGTH = 20;
var _LINK_COLOR = "#FF0000";

var c = document.getElementById("gameboard");
var ctx = c.getContext("2d");
c.width = window.innerWidth * 0.7;
c.height = window.innerHeight * 0.8;

ctx.fillStyle = _LINK_COLOR;
// ctx.fillRect(x_pos, y_pos, x_length, y_length)
ctx.fillRect(2*_GRID_LENGTH,3*_GRID_LENGTH,_LINK_LENGTH,_LINK_LENGTH);
