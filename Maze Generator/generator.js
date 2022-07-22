// global variables
let cell_id = 3
let cells = {}; // hold all the cells in the maze
cellSize = 25
wallColour = 170
let cellStack = []
currentCell = null;
curentCellColour = "yellow"

const directions = {
  up: "UP",
  down: "DOWN",
  left: "LEFT",
  right: "RIGHT"
}

function setup() {
  createCanvas(windowWidth - 20, 650);

  console.log("WIDTH -> " + width);
  console.log("HEIGHT -> " + height);

  console.log()

  console.log("HORIZONTAL CELLS -> " + width / cellSize);
  console.log("VERTICAL CELLS -> " + height / cellSize);

  finalY = height / cellSize;
  finalX = width / cellSize;

  createCells();

  assignCellsNeighbours();
  console.log(cells[1].getNeighbors());
}

function draw() {
  background(25); // 0 = black, 255 = white

  stroke(wallColour);
  strokeWeight(1.25)

  // draw vertical walls
  for (i = 0; i <= width; i+= cellSize) {
    line(i, 0, i, height)
  }

  // draw horizontal walls
  for (j = 0; j <= width; j+= cellSize) {
    line(0, j, width, j)
  }

  // showCellNumber();
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

  setNeighbours(d1, d2, d3, d4) {
    var argumentsArray = Array.prototype.slice.call(arguments);

    if (argumentsArray.includes(directions.up)) {
      this.up = cells[this.id - width]
      this.neighbours.push(directions.up)
    } else {
      this.up = null
    }

    if(argumentsArray.includes(directions.down)) {
      this.down = cells[this.id + width]
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
}