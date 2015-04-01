## High School Learn to Hack Snake

### [Play it here!](http://aymarino.github.io/HSLearnToHackSnake/)

### Tasks
* Add comments to source code to facilitate making procedure
* Document logical steps in building game:
    * Working product at each discrete step, building on last
    * Create steps to game in current state, with each individual step up to debate for difficultly, implementation, and teaching method

### Educational Requirements:
* Must be in as few files as possible to reduce complexity and room for error.
    * Game is fully contained in a single `.js` file
* No lines that cannot be explained at a high school/beginner level.
* Attempt to instill "good practice" concepts: programming should be straightforward and ideally as compartmentalized as possible
* Opportunities for teaching more advanced concepts:
    * Stack/queue used in direction changing (introduction to data structures)
    * Algorithmic complexity in moving the snake (program is no slower even as snake grows)
    * O.O.P. in designating variables as objects

### JavaScript Implementation:
* Within each of these higher-level functions, we'll have functions that help with interacting with the "grid" itself
```
setLink(xPos, yPos) {}
removeLink(xPos, yPos) {}
```
* Globals specifying grid size, block size/color, etc.
* Local vars in `playGame()` to keep track of head/tail position and head/tail directions (for ease of moving snake, have x and y directions).
    * Data kept in objects for simplicity and cleanliness (O.O.P. concepts)
```javascript
  var head = { // keeps track of head position/direction
    posX:2, posY:3, // starting at (2, 3) arbitrarily
    dirX:1, dirY:0 // moving right arbitrarily
  };
  var tail = { // keeps track of tail position/direction
    posX:2, posY:3,
    dirX:1, dirY:0
  };
```
* Mechanics of moving forward: increment "head" in direction of motion and `setLink`, `removeLink` on tail position and increment tail in direction of motion
* Mechanics of turning: "head" direction gets updated to new input (from keyboard), 3-tuple containing x-coordinate, y-coordinate, and newDirection gets placed in queue, and at each step tail checks if top of queue is its position (and eventually updates direction accordingly)
* Mechanics of losing: obviously if head's next position is beyond edge of board, the game is lost. Additionally, the game is lost when head's next position is a position occupied by a current link.
    * Use 2-D array the size of the grid dimensions initialized to 0. Set `array[xPos][yPos]` to 1 when head visits, and back to 0 when tail visits. Game is lost if head's next position corresponds to an array element containing 1.

### JavaScript Technical Details:
* Queues
    * It appears that JS arrays have a `.push()` function to enqueue and a `.shift()` function to dequeue and return the top of the queue
    * Unfortunately, `.shift()` is not O(1), but the queue (probably) won't be large enough at any point in time for this to be an issue
* Getting keyboard input from user
    * Add an event listener to the document to register key-presses.
    * On registering key-press, set certain global vars that are used in `playGame()` to change snake direction (possibly able to set up more elegantly without global state)
    * Example from Stack Overflow:
```javascript
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        alert('Left was pressed');
    }
    else if(event.keyCode == 39) {
        alert('Right was pressed');
    }
});
```
* Setting a target requires generating a random number
    * `Math.random()` generates random decimal
    * `Math.floor((Math.random() * b) + a);` returns a random int between a and b (use this with canvas dimensions)
* Gameboard fitted to window dimensions (or fraction of window dimensions)
    * It appears that sizing relative to the window when creating the canvas object (i.e. `width = 70%`) is not supported
    * In the JS file, trying `c.width = window.innerWidth * 0.7` (and similar on the height aspect seemed to work well enough)
    * With dynamic sizing, will need to either keep set "grid" dimensions (thereby resizing the size/aspect ratio of the links/targets, which is not ideal), or set the grid dimensions based on the canvas size (in pixels) to maintain square links
