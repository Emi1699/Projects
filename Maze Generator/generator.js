function setup() {
  createCanvas(windowWidth - 20, 650);

  console.log(width);
  console.log(height);

   // create the cells in the maze
  for (x = 1; x<= width / cellSize; x++) {
    for (y = 1; y<= height / cellSize; y++) {
      id = x + (width * (y - 1))

      
    }
  }

}

// global variables
let cell_id = 3
let cells = {}; // hold all the cells in the maze
cellSize = 25

const neighbours = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
}

function draw() {
  background(25); // 0 = black, 255 = white

  stroke('yellow');
  strokeWeight(1.25)

  // draw vertical walls
  for (i = 0; i <= width; i+= cellSize) {
    line(i, 0, i, height)
  }

  // draw horizontal walls
  for (j = 0; j <= width; j+= cellSize) {
    line(0, j, width, j)
  }
}

class Cell{
  constructor(id, up, down, left, right){
    this.id = id

    if (arguments.includes(directions.UP)) {
      this.up = cells[this.id - width]
    } else {
      this.up = null
    }

    if(arguments.includes(directions.DOWN)) {
      this.down = cells[this.id + width]
    } else {
      this.down = null
    }

    if(arguments.includes(directions.LEFT)) {
      this.left = cells[this.id - 1]
    } else {
      this.left = null
    }

    if(arguments.includes(directions.RIGHT)) {
      this.right = cells[this.id + 1]
    } else {
      this.right = null
    }
  }
}