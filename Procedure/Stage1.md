## 2. Setting up a "grid" on HTML5 Canvas

### Explanation
* Concept of partitioning the canvas (which is addressed based on pixels) by "blocks" of pixels of the same size that can be used as "grid coordinates"
    * Visuals of pointing to pixels by multiples of a "grid block length"
* Adding global variables to a script

### Implementation
* `setLink()` function (probably a more structured walkthrough)
* `removeLink()` function
* Conclude by setting the width and height of the canvas to be exact multiples of a block (demonstration where the blocks "don't fit" across whole grid)
* Demonstrations (playing around with) setting links in various positions on gameboard.

### Project at end of step:

**Javascript file:**
```javascript
var CANVAS_ELEMENT;
var CANVAS;

var X_DIM;
var Y_DIM;

var GRID_LENGTH = 20;
var LINK_LENGTH = 19;
var LINK_COLOR = "#00274C"; // Blue
var GRID_COLOR = "#FFFFFF"; // White

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

  CANVAS_ELEMENT.width = GRID_LENGTH * Math.floor(window.innerWidth * 0.65 / GRID_LENGTH);
  CANVAS_ELEMENT.height = GRID_LENGTH * Math.floor(window.innerHeight * 0.7 / GRID_LENGTH);
  X_DIM = CANVAS_ELEMENT.width / GRID_LENGTH;
  Y_DIM = CANVAS_ELEMENT.height / GRID_LENGTH;
}
```

**HTML file:**
```html
<html>

<head>
  <title>Snake!</title>
  <script type="text/javascript" src="snake.js"></script>
</head>

<body>
  <center>
    <h2>Snake!</h2>
  </center>

  <center>
    <canvas id="gameboard" style="border:1px solid #000000;"></canvas>
  </center>

  <script type="text/javascript">
  initCanvas();
  </script>

</body>

</html>
```
