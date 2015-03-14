## High School Learn to Hack Snake
### General Structure:
* In HTML, after setting HTML5 canvas, call `playGame()`

```
playGame() {
  while(!gameOver()) {
    getInput()
    if (directionChanged()) updateDirectionHead()
    updateDirectionTail()

    if (hasEatenBlock()) {
      growSnake()
      incrementScore()
    }
    else if (hasReachedEdge() || hasHitSelf()) gameOver()
    else moveSnake()

    sleep(sleepTime)
  }
}
```

* Within each of these higher-level functions, we'll have functions that help with interacting with the "grid" itself

```
setBlock() {}
eraseBlock() {}
```

* As we design we'll note potential opportunities for teaching new concepts
    * Stack/queue in direction changing
    * Algorithmic complexity in moving the snake

### JavaScript Technical Challenges:
* Queues
* Getting keyboard input from user
