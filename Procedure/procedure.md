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

## Stage 2: Setting up and Moving Snake
### Explanation
* Coming up with ways to move the snake (series of links) across the screen
    * Could have an array with all the positions, and erase and set each link each frame
    * Point out that the only parts of the snake that end up moving are at the beginning and end of it (middle doesn't move)
    * So, instead keep track of the positions of the front (head) and back (tail) of the snake and only manipulate those positions.
* Introduce pseudocode for making the function to update the board each "frame"
```
function playGame() {
  If game is over (checking if crossed edge of board, hit itself)
    gameOver()
  Update snake position
  If snake hit target
    Grow snake
    Set new target
    Increase score
}
```

### Implementation
* For each of the head and tail of the snake, we need to keep track of several parameters:
    * (x,y) coordinates (each must be stored separately)
    * direction the snake is moving (to be able to correctly update the position)
* So, use global objects for `HEAD` and `TAIL`
    * Each variable declared in curly braces, initialized with value after colon
    * Using separate coordinate directions for _x_ and _y_, which will simplify updating the position later on
```javascript
var HEAD = {
  xPos:2, yPos:3, // starting at (2, 3) arbitrarily
  xDir:1, yDir:0 // moving right arbitrarily
};
var TAIL = {
  xPos:2, yPos:3,
  xDir:1, yDir:0
};
```
* Also set this on startup in `initCanvas`, in order to ensure everything is in order if we ever need to reset the canvas (playing another game, etc.)
    * When first starting the game, there's only one link, so tail and head are in the same position
```javascript
HEAD.xPos = 2;
HEAD.yPos = 3;
HEAD.xDir = 1;
HEAD.yDir = 0;
TAIL.xPos = HEAD.xPos;
TAIL.yPos = HEAD.yPos;
TAIL.xDir = HEAD.xDir;
TAIL.yDir = HEAD.yDir;
```
* To move snake, advance the `xPos` by one `xDir` and the `yPos` by one `yDir`
    * In terms of setting and removing links, important to get timing right (don't want to set where one already exists or remove one we just set)
```javascript
function moveSnake() {
  HEAD.xPos += HEAD.xDir;
  HEAD.yPos += HEAD.yDir;
  setLink(HEAD.xPos, HEAD.yPos);

  removeLink(TAIL.xPos, TAIL.yPos);
  TAIL.xPos += TAIL.xDir;
  TAIL.yPos += TAIL.yDir;
}
```
```javascript
// Update snake on each frame
function playGame() {
  moveSnake(); // Move snake each "frame"
}
```
```javascript
// Return false if given coordinates are outside of gameboard
function checkBounds(xPos, yPos) {
  if (xPos < 0 || xPos >= X_DIM) return false;
  else if (yPos < 0 || yPos >= Y_DIM) return false;
  else return true;
}
```
* We have all these new functions, but now way to call them. For now, we'll put a button in the HTML that calls the `playGame` function when it is clicked
```html
<button id="playGameButton" onclick="playGame()">Update</button>
```

## Stage 3: Running a function on an interval and Getting User Input
### Explanation
* Need to run this function every time the frame is updated
    * Javascript has built-in functions that allow us to run a set of code without stalling the whole program (return control to user between calls)
    * Called `setInterval()`, and takes as arguments the function that needs to be called and the interval over which it needs to call it, in milliseconds
    * Assign to variable to be able to clear the interval

### Implementation
* Three new functions to allow the snake to start and stop updating: `playGame`, `runGame`, and `gameOver`
    * `runGame` is only called once, and sets the interval to call `playGame` at each "frame" updating
    * `gameOver` clears the interval, so it will not be called anymore
    * Use `FPS` to determine number of frames updated each second
```javascript
var FPS = 15;
// Starts framerate
function runGame() {
  // Set interval for "frame" updating function
  INTERVAL_ID = setInterval(playGame, 1000 / FPS);
}
```
* Want our `gameOver` in a separate function in case there are multiple scenarios where we need to call a game over, and we could add in features that require action on game over
```javascript
// Stop frames from updating
function gameOver() {
  clearInterval(INTERVAL_ID);
}
```

* Both javascript-specific functions (or specific to implementation more than logic)
* FPS var
* setInterval in "run" function for moving snake (calls playGame function)
* Setting up keyboard events and changing direction
* Asynchronicty
* Game over

## Stage 4: Turning (Queues)
* How to handle the snake turning
* Concept of queue (pushing and popping)
* Implementing queue in keyboard event function and turning in playGame

## Stage 5: Target setting and checking; Growing snake
* Setting target (new var, adding to setLink function)
* Checking for target in playGame
* growSnake function (use tail delay)

## Stage 6: Snake position array
* How to make sure snake has not hit itself, settle upon knowing where all the links are
* 2-D arrays (important to get conceptual basis)
* Initializing 2-D array
* Reusing built-in functionality of moving snake to set 0s and 1s

## Stage 7: Final touches
* Reseting game with button
* Changing text in button and score
