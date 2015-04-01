## Stage 0: Create index.html, game script, and HTML5 canvas

### Explanation
* HTML5 Canvas elements
* Adding JavaScript to HTML file (in header and calling function in body)
* Putting script into functions to avoid running code when we don't want it to

### Implementation
* Placing canvas element in body
* Start of `initCanvas()`:
    * Assigning variables to canvas element (and context)
    * Assigning height and width of canvas
    * Practice with `drawRect()`

## Stage 1: Set up a "grid" on HTML5 Canvas for Gameboard
### Explanation
* Concept of partitioning the canvas (which is addressed based on pixels) by "blocks" of pixels of the same size that can be used as "grid coordinates"
    * Visuals of pointing to pixels by multiples of a "grid block length"
* Adding global variables to a script

### Implementation
* `setLink()` function (probably a more structured walkthrough)
* `removeLink()` function
* Conclude by setting the width and height of the canvas to be exact multiples of a block (demonstration where the blocks "don't fit" across whole grid)
* Demonstrations (playing around with) setting links in various positions on gameboard.
