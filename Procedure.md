## Building Snake: Process and Steps for Beginners

### 1. Index Page and HTML5 Canvas

* Placing canvas element in body
* Start of `initCanvas()`:
    * Assigning variables to canvas element (and context)
    * Assigning height and width of canvas
    * Practice with `drawRect()`

At end of step:

Javascript file:
```javascript
var CANVAS_ELEMENT;
var CANVAS;

function initCanvas() {
  CANVAS_ELEMENT = document.getElementById("gameboard");
  CANVAS = CANVAS_ELEMENT.getContext("2d");

  CANVAS_ELEMENT.width = window.innerWidth * 0.65;
  CANVAS_ELEMENT.height = window.innerHeight * 0.7;
}
```

HTML file:
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
