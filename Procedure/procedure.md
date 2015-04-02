## Stage 0: Create index.html, game script, and HTML5 canvas

### Explanation
* HTML5 Canvas elements
    * HTML5: newest web standard
    * Canvas elements allow for drawing on page easily using high-level (easily used) functions
* Adding JavaScript to HTML file (in header and calling function in body)
* Putting script into functions avoids running code when we don't want it to
    * Explain concept of "script" in web, as something that would run simply as a file when loaded into a page

### Implementation
* First write barebones of HTML file: `<head>`, `<body>`
    * Put `<h1>Snake!</h1>` at top of page

* Placing canvas element in body
```html
<center>
  <canvas id="gameboard" style="border:1px solid #000000;"></canvas>
</center>
```

* Load game JS file into html header
```html
<head>
  <title>Snake!</title>
  <script type="text/javascript" src="snake.js"></script>
</head>
```

* Start of `initCanvas()`: assigning variables to canvas element (and context)
```javascript
function initCanvas() {
  CANVAS_ELEMENT = document.getElementById("gameboard");
  CANVAS = CANVAS_ELEMENT.getContext("2d");
}
```

* Assigning height and width of canvas
```javascript
CANVAS_ELEMENT.width = window.innerWidth * 0.65;
CANVAS_ELEMENT.height = window.innerHeight * 0.7;
```

* Running JS function from page body
```html
<script type="text/javascript">
  initCanvas();
</script>
```

* Practice with `drawRect()`
```javascript
CANVAS.fillStyle = "#FF0000"; // red
CANVAS.drawRect(10, 15, 20, 30); // 20 by 30 rectangle at pixels (10, 15)
```

## Stage 1: Set up a "grid" on HTML5 Canvas for Gameboard
### Explanation
* Show "concept" of what snake has to look like: square "links" running in a line that moves
    * In this step, we'll show how place these links on the canvas (later, we'll make them move)
* To be able to do this, there need to be certain positions (rows and columns) along which the links can exists
    * Motivation of abstracting a "grid" overtop of the canvas
* Partitioning the canvas (which is addressed based on pixels) by "blocks" of pixels of the same size that can be used as "grid coordinates"
    * Visuals of pointing to pixels by multiples of a "grid cell length"

### Implementation
* Global variables for `GRID_LENGTH` and `LINK_LENGTH`
    * Grid length gives width/height of square "grid" cells
    * Link length gives width/height of snake elements drawn within these cells
```javascript
var GRID_LENGTH = 20;
var LINK_LENGTH = 19;
```
* `setLink()` function (probably a more structured walkthrough)
    * Define "link" color as global
    * Set style on canvas element to link color
    * x-coordinate as `xPos * GRID_LENGTH` and y-coordinate similarly
```javascript
function setLink(xPos, yPos) {
CANVAS.fillStyle = LINK_COLOR;
CANVAS.fillRect(xPos * GRID_LENGTH, yPos * GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
}
```
* `removeLink()` function similarly
```javascript
function removeLink(xPos, yPos) {
  CANVAS.fillStyle = GRID_COLOR;
  CANVAS.fillRect(xPos * GRID_LENGTH, yPos * GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
}
```
* Conclude by setting the width and height of the canvas to be exact multiples of a block (demonstration where the blocks "don't fit" across whole grid)
    * Want this to happen as soon as we load the page, so put in `initCanvas`
```javascript
CANVAS_ELEMENT.width = GRID_LENGTH * Math.floor(window.innerWidth * 0.65 / GRID_LENGTH);
CANVAS_ELEMENT.height = GRID_LENGTH * Math.floor(window.innerHeight * 0.7 / GRID_LENGTH);
```
* We'll also find it useful to know how many cells long and tall the canvas is (because different screens are different sizes, this will be different for anyone playing the game)
    * Use global `X_DIM` and `Y_DIM` variables
```javascript
var X_DIM;
var Y_DIM;
```
    * Place setters in `initCanvas`
```javascript
X_DIM = CANVAS_ELEMENT.width / GRID_LENGTH;
Y_DIM = CANVAS_ELEMENT.height / GRID_LENGTH;
```
* Demonstrations (playing around with) setting links in various positions on gameboard.
