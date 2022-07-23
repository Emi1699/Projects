// global variables
let cell_id = 3
let cells = {}; // hold all the cells in the maze
let cellStack = []

let currentCell = null;
let cellSize = 25

let WIDTH = 1900
let HEIGHT = 650
let HOR_CELLS = WIDTH / cellSize
let VER_CELLS = HEIGHT / cellSize

let wallColour = 170
let curentCellColour = 'yellow'
let backgroundColour = 25

const directions = {
  up: "UP",
  down: "DOWN",
  left: "LEFT",
  right: "RIGHT"
}

function setup() {
  createCanvas(WIDTH, HEIGHT);

  console.log("HORIZONTAL CELLS -> " + HOR_CELLS);
  console.log("VERTICAL CELLS -> " + VER_CELLS);

  finalY = VER_CELLS;
  finalX = HOR_CELLS;

  createCells(); // create the array holding all the cells

  assignCellsNeighbours(); // link every cell to its neighbours
}

function draw() {
  background(backgroundColour); // 0 = black, 255 = white

  for (id in cells) {
    cells[id].draw()
  }

  showCellNumber();

  cells[1936].removeWall(directions.up);
}

showCellNumber = function() {
  for (x = 1; x<= finalX; x++) {
    for (y = 1; y<= finalY; y++) {
      id = x + (finalX * (y - 1))

      noStroke();
      fill("white");
      textAlign(CENTER, CENTER);
      textSize(10);
      strokeWeight(2);
      text(id, x * cellSize - cellSize / 2, y * cellSize - cellSize / 2);
    }
  }
}

createCells = function() {
  // create the cells in the maze
  for (x = 1; x<= finalX; x++) {
    for (y = 1; y<= finalY; y++) {
      id = x + (finalX * (y - 1))

      cells[id] = new Cell(id);
      if (id % HOR_CELLS == 0) {
        cells[id].setX(HOR_CELLS * cellSize - cellSize);
      } else {
        cells[id].setX((id % HOR_CELLS) * cellSize - cellSize);
      }
      cells[id].setY((((this.id - x) / HOR_CELLS) + 1) * cellSize - cellSize);
    } 
  } 
}

assignCellsNeighbours = function() {
  // assign each cell's neighbours
  for (x = 1; x<= finalX; x++) {
    for (y = 1; y<= finalY; y++) {
      id = x + (finalX * (y - 1))

      if (x == 1) {
        if (y == 1) {
          cells[id].setNeighbours(directions.down, directions.right, null, null);
        } else if (y == finalY) {
          cells[id].setNeighbours(directions.up, directions.right, null, null);
        } else {
          cells[id].setNeighbours(directions.up, directions.right, directions.down, null);
        }
      }

      else if (x == finalX) {
        if (y == 1) {
          cells[id].setNeighbours(directions.left, directions.down, null, null);
        } else if (y == finalY) {
          cells[id].setNeighbours(directions.left, directions.up, null, null);
        } else {
          cells[id].setNeighbours(directions.up, directions.left, directions.down, null);
        }
      }

      else if (y == 1) {
        if (x == 1) {
          cells[id].setNeighbours(directions.down, directions.right, null, null);
        } else if (x == finalX) {
          cells[id].setNeighbours(directions.left, directions.down, null, null);
        } else {
          cells[id].setNeighbours(directions.left, directions.down, directions.right, null);
        }
      }

      else if (y == finalY) {
        if (x == 1) {
          cells[id].setNeighbours(directions.up, directions.right, null, null);
        } else if (x == finalX) {
          cells[id].setNeighbours(directions.up, directions.left, null, null);
        } else {
          cells[id].setNeighbours(directions.up, directions.left, directions.right, null);
        }
      }

      else {
        cells[id].setNeighbours(directions.up, directions.down, directions.left, directions.right);
      } 
    } // second loop (y - height)
  } // end first loop (x - width)
}

class Cell{
  constructor(id){
    this.id = id
  }

  neighbours = [];
  visited = false;
  x = (this.id % HOR_CELLS) * cellSize;
  y = (((this.id - x) / HOR_CELLS) + 1) * cellSize;
  upwall = true;
  downwall = true;
  leftwall = true;
  rightwall = true;

  draw() {
    stroke(wallColour);
    strokeWeight(1)

    if (this.upwall) {
      line(this.x, this.y, this.x + cellSize, this.y)
    }

    if (this.downwall) {
      line(this.x, this.y +cellSize, this.x + cellSize, this.y + cellSize)
    }

    if (this.leftwall) {
      line(this.x, this.y, this.x, this.y + cellSize)
    }

    if (this.rightwall) {
      line(this.x + cellSize, this.y, this.x + cellSize, this.y + cellSize)
    }
  }

  setNeighbours(d1, d2, d3, d4) {
    var argumentsArray = Array.prototype.slice.call(arguments);

    if (argumentsArray.includes(directions.up)) {
      this.up = cells[this.id - HOR_CELLS]
      this.neighbours.push(directions.up)
    } else {
      this.up = null
    }

    if(argumentsArray.includes(directions.down)) {
      this.down = cells[this.id + HOR_CELLS]
      this.neighbours.push(directions.down)
    } else {
      this.down = null
    }

    if(argumentsArray.includes(directions.left)) {
      this.left = cells[this.id - 1]
      this.neighbours.push(directions.left)
    } else {
      this.left = null
    }

    if(argumentsArray.includes(directions.right)) {
      this.right = cells[this.id + 1]
      this.neighbours.push(directions.right)
    } else {
      this.right = null
    }
  }

  getNeighbors() {
    return this.neighbours
  }

  getCoords() {
    return [this.x, this.y]
  }

  getId() {
    return this.id
  }
  
  setX(x) {
    this.x = x
  }

  setY(y) {
    this.y = y
  }

  removeWall(direction) {
    // noStroke();
    stroke(backgroundColour);
    strokeWeight(1)

    if (direction == directions.up) {
      this.upwall = false;

      if (this.up) {
        this.up.downwall = false
      }
    } else if (direction == directions.down) {
      this.downwall = false

      if (this.down) {
        this.down.upwall = false;
      }
    } else if (direction == directions.left) {
      this.leftwall = false

      if (this.left) {
        this.left.rightwall = false;
      }
    } else {
      this.rightwall = false

      if (this.right) {
        this.right.leftwall = false;
      }
    }
  }
}
