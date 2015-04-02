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
* Concept of partitioning the canvas (which is addressed based on pixels) by "blocks" of pixels of the same size that can be used as "grid coordinates"
    * Visuals of pointing to pixels by multiples of a "grid block length"
* Adding global variables to a script

### Implementation
* `setLink()` function (probably a more structured walkthrough)
* `removeLink()` function
* Conclude by setting the width and height of the canvas to be exact multiples of a block (demonstration where the blocks "don't fit" across whole grid)
* Demonstrations (playing around with) setting links in various positions on gameboard.
