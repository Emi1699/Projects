function setup() {
  createCanvas(windowWidth - 20, 650);

  console.log(width);
  console.log(height);

  finalY = height / cellSize;
  finalX = width / cellSize;

   // create the cells in the maze
  for (x = 1; x<= finalX; x++) {
    for (y = 1; y<= finalY; y++) {
      id = x + (width * (y - 1))

      if (x == 1) {
        if (y == 1) {
          cells[id] = new Cell(id, directions.down, directions.right, null, null);
        } else if (y == finalY) {
          cells[id] = new Cell(id, directions.up, directions.right, null, null);
        } else {
          cells[id] = new Cell(id, directions.up, directions.right, directions.down, null);
        }
      }

      else if (x == finalX) {
        if (y == 1) {
          cells[id] = new Cell(id, directions.left, directions.down, null, null);
        } else if (y == finalY) {
          cells[id] = new Cell(id, directions.left, directions.up, null, null);
        } else {
          cells[id] = new Cell(id, directions.up, directions.left, directions.down, null);
        }
      }

      else if (y == 1) {
        if (x == 1) {
          cells[id] = new Cell(id, directions.down, directions.right, null, null);
        } else if (x == finalX) {
          cells[id] = new Cell(id, directions.left, directions.down, null, null);
        } else {
          cells[id] = new Cell(id, directions.left, directions.down, directions.right, null);
        }
      }

      else if (y == finalY) {
        if (x == 1) {
          cells[id] = new Cell(id, directions.up, directions.right, null, null);
        } else if (x == finalX) {
          cells[id] = new Cell(id, directions.up, directions.left, null, null);
        } else {
          cells[id] = new Cell(id, directions.up, directions.left, directions.right, null);
        }
      }

      else {
        cells[id] = new Cell(id, directions.up, directions.down, directions.left, directions.right);
      } 
    } // second loop (y - height)
  } // end first loop (x - width)
}

// global variables
let cell_id = 3
let cells = {}; // hold all the cells in the maze
cellSize = 25

const directions = {
  up: "UP",
  down: "DOWN",
  left: "LEFT",
  right: "RIGHT"
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
  constructor(id, d1, d2, d3, d4){
    this.id = id

    if (arguments.includes(directions.up)) {
      this.up = cells[this.id - width]
    } else {
      this.up = null
    }

    if(arguments.includes(directions.down)) {
      this.down = cells[this.id + width]
    } else {
      this.down = null
    }

    if(arguments.includes(directions.left)) {
      this.left = cells[this.id - 1]
    } else {
      this.left = null
    }

    if(arguments.includes(directions.right)) {
      this.right = cells[this.id + 1]
    } else {
      this.right = null
    }
  }
}