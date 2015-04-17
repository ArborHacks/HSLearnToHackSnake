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
* Most languages execute only in the order that the instructions are given. This makes sense for most programs, but sometimes fails when user input is required, or the program must be interactive with a human.
    * If a program comes to a point in execution where it asks for user input, and must wait until one is given, it is said to _stall_, meaning it becomes unresponsive.
* So, since websites are very often interactive, JavaScript has _asynchonous_ execution, meaning that some functions execute out of order depending on when they need to be called.
    * The interval we set with `setInterval` will call a certain function repeatedly in some interval, but in between those times, the page is not frozen, and it remains interactive in case the user needs to click something else in between the calls.
* We want to change the direction every time certain keys are pressed, but not stop the program and wait until one is pressed: introducing `addEventListener`
    * This event listener will watch out for any keypresses, and call a function to deal with them.
    * Set this event listener when the canvas is initialized

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
* Event listener for keypresses (`initCanvas`):
```javascript
// Add event listener for keypresses (to get arrow key input)
window.addEventListener("keydown", getKeyInput);
```
* And direction changing, according to key pressed:
```javascript
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
```

## Stage 4: Turning (Queues)
### Explanation
* How should we handle snake turning?
    * Clearly, the head's direction must be changed, as we did when getting the keyboard input
    * Show example of longer snake, where tail direction doesn't change immediately
* One way to do it, is to push the locations of the direction changes into a _queue_.
    * A queue is a special kind of list (a type of _data structure_) in programming that always operates the same way: when adding an item, it's added to the end, and when retrieving an item, it's taken from the front
    * Like a regular line works (at a store or bus stop)
    * First in, first out
    * Push locations of turn changes, because the tail will encounter the earlier ones before the later ones. When the tail position matches the position of the first "turn" on the queue, change the tail's direction and pop that item off the queue.

### Implementation
* Global queue and input flag:
```javascript
// Arrays and flags for gameplay mechanics
var turnQueue = [];
var recieveInput = true;
```
* When the head's direction is changed (in getting keyboard input, put this change into the queue):
```javascript
// On keyboard input, change direction as required
function getKeyInput(event) {
  // Return if already changed direction this cycle and set flag
  if (!recieveInput) return;
  recieveInput = false;

  var changed = true;
  // ... Other code for getting keyboard presses
  else changed = false;
  
  // If changed direction, push position of head to turn queue
  if (changed) {
    var newHead =
      {xPos:HEAD.xPos, yPos:HEAD.yPos, xDir:HEAD.xDir, yDir:HEAD.yDir};
    turnQueue.push(newHead);
  }
}
```
* Check queue and pop in `playGame` (function that updates gameboard):
```javascript
// Update snake on each frame
function playGame() {
  // If tail is at turning point, set to new direction
  if (turnQueue.length > 0 // Prevent invalid accesses
      && TAIL.xPos == turnQueue[0].xPos && TAIL.yPos == turnQueue[0].yPos) {
    TAIL = turnQueue.shift(); // Set new tail direction and pop off queue
  }

  moveSnake(); // Move snake each "frame"
  recieveInput = true; // Reset keypress listener for new "frame"
}
```
* Clear `turnQueue` in `canvasInit` to ensure starting from reset

## Stage 5: Target setting and checking; Growing snake
### Explanation
* Want to be able to set target in random location, and when the snake eats the target, grow
    * Should be different color than links
    * Can make new function called `setTarget` that will place a new target in a random gameboard location
    * Modify `setLink` code to place target
* To get a random number, many languages have built-in `rand()` functions (or similar). In JavaScript, this is `Math.random()`
* How to grow snake?
    * Could increment head and set link (separate from `moveSnake`), but this may introduce bugs (what if direction changes simultaneously, etc.)
    * So, just delay the tail from updating (grow from back) a certain number of cycles

### Implementation
* Modify `setLink` to accomodate target coloring (global)
```javascript
var TARGET_COLOR = "#FFCB05"; // Maize
```
```javascript
// Set given grid position to snake link or target
function setLink(xPos, yPos, target) {
  if (target) CANVAS.fillStyle = TARGET_COLOR;
  else CANVAS.fillStyle = LINK_COLOR;
  CANVAS.fillRect(xPos*GRID_LENGTH, yPos*GRID_LENGTH, LINK_LENGTH, LINK_LENGTH);
}
```
* New function for `setTarget`:
```javascript
// Get random grid position and sets target at position
function setTarget() {
  TARGET.xPos = Math.floor(Math.random() * X_DIM);
  TARGET.yPos = Math.floor(Math.random() * Y_DIM);

  setLink(TARGET.xPos, TARGET.yPos, true);
}
```
* New global and function for growing snake:
```javascript
var TAIL_DELAY = 0;
```
```javascript
// On snake eating target, grow snake from tail back and increments score
function growSnake() {
  TAIL_DELAY += 1; // Prevent tail from advancing
  setTarget();
}
```
* Modify `moveSnake` to accomodate this:
```javascript
  if (TAIL_DELAY == 0) {
    // Erase tail link from canvas and link array
    removeLink(TAIL.xPos, TAIL.yPos);

    // Update tail position in direction of motion
    TAIL.xPos += TAIL.xDir;
    TAIL.yPos += TAIL.yDir;
  }
  else TAIL_DELAY--;
```
* Reset this in `initCanvas`
* Add check to `playGame` for checking if has hit target
```javascript
  // If head hits target, grow snake
  if (HEAD.xPos == TARGET.xPos && HEAD.yPos == TARGET.yPos) growSnake();
```

## Stage 6: Snake position array
### Explanation
* Demonstrate current bug with snake being able to pass through itself. How to check if it's hit itself?
    * Store the position of each link in the snake in a two-dimensional array. Say what?
* Review arrays: lists of variables. Well, can we put arrays in arrays?
    * Visuals showing an array going accross horizontally, with each element being an array extending downwards (like a grid!)
    * We can use each element in this 2-D array as a grid position, and set it to 0 if there is no link there and 1 if there is.
    * This way, it's simple to check if a given grid position has a snake link or not.
* Can index into first array (returning the array stored there) and index into second array in same line
    * Indexes `[column][row]`, or in our case `[xPos][yPos]` of grid

### Implementation
* Set this array as a global:
```javascript
var linkArray = [];
```
* Must iterate through to initialize, in `initCanvas`
    * Explain each line of code, with visuals to show what's happening
```javascript
  // Initialize 2-dimensional link array to all 0s
  for (var i = 0; i < X_DIM; ++i) {
    var columns = [];
    for (var j = 0; j < Y_DIM; ++j) columns[j] = 0;
    linkArray[i] = columns;
  }
```
* When setting a link, set `linkArray` position to 1, and when removing a link, set to 0, in `moveSnake`
    * Still get _O(1)_ execution time for all snake movement
```javascript
  // ...

  setLink(HEAD.xPos, HEAD.yPos);
  linkArray[HEAD.xPos][HEAD.yPos] = 1;

  if (TAIL_DELAY == 0) {
    // Erase tail link from canvas and link array
    removeLink(TAIL.xPos, TAIL.yPos);
    linkArray[TAIL.xPos][TAIL.yPos] = 0;

    // Update tail position in direction of motion
    TAIL.xPos += TAIL.xDir;
    TAIL.yPos += TAIL.yDir;
  }

  // ...
```
* Insert check in `moveSnake`, at same place as checking boundaries and go to `gameOver` if that position contains a 1 already
```javascript
  // Exit if head hits edge of gameboard or hits another link (hits itself)
  if (!checkBounds(HEAD.xPos, HEAD.yPos) || linkArray[HEAD.xPos][HEAD.yPos]) {
    gameOver();
    return;
  }
```

## Stage 7: Final touches
### Explanation
* Want to have a cool, working product that isn't a hassle for people to use
    * It's _your_ job, as a maker, to ensure this. Consumers expect that something you give them is not broken (in other words, meets their expectations).
* So, we'll want to be able to play the game again by hitting the button to reset the game
    * Do this by calling functions we've already made: `initCanvas` resets the canvas to its starting point, and `runGame` restarts the game itself
* We can also change the text in the button to reflect the current state of the game:
    * Telling people that the game is over when `gameOver` is called and prompting them to "Play Again?"

### Implementation
```javascript
// Reset canvas to initial conditions and starts game
function restartGame() {
  initCanvas();
  runGame();
}
```
```javascript
// Stop frames from updating
function gameOver() {
  document.getElementById("playGameButton").innerHTML = "Play Again?";
  document.getElementById("playGameButton").onclick = restartGame;
  clearInterval(INTERVAL_ID);
}
```
