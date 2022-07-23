// global variables
let cell_id = 3
let cells = {}; // hold all the cells in the maze
let cellStack = []

let currentCell = null;
let cellSize = 25

let WIDTH = 1900
let HEIGHT = 950
let HOR_CELLS = WIDTH / cellSize
let VER_CELLS = HEIGHT / cellSize

let wallColour = 'white'
let curentCellColour = 'yellow'
let backgroundColour = 25
let visitedCellColour = "magenta"

const directions = {
  up: "UP",
  down: "DOWN",
  left: "LEFT",
  right: "RIGHT"
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(144);

  console.log("HORIZONTAL CELLS -> " + HOR_CELLS);
  console.log("VERTICAL CELLS -> " + VER_CELLS);

  finalY = VER_CELLS;
  finalX = HOR_CELLS;

  createCells(); // create the array holding all the cells

  assignCellsNeighbours(); // link every cell to its neighbours

  cells[1].visited = true; 
  cellStack.push(cells[1]); // 1.Choose the initial cell, mark it as visited and push it to the stack
}

function draw() {
  background(backgroundColour); // 0 = black, 255 = white

  for (id in cells) {
    cells[id].draw()
  }

  // showCellNumber();

  // var item = items[Math.floor(Math.random()*items.length)];

    let currentCell = cellStack.pop(); // 1. Pop a cell from the stack and make it a current cell
    currentCell.current = true;

    if (currentCell.getUnvisitedNeighbours()) { // 2. If the current cell has any neighbours which have not been visited 
      let unvisitedNeighbours = currentCell.getUnvisitedNeighbours();

      cellStack.push(currentCell) // 1. Push the current cell to the stack
      let nextCell = unvisitedNeighbours[Math.floor(Math.random()*unvisitedNeighbours.length)]; // 2. Choose one of the unvisited neighbours ->>>> nextCell = chosenCell

      if (currentCell.up == nextCell) { // 3.Remove the wall between the current cell and the chosen cell
        currentCell.removeWall(directions.up)
      } else if (currentCell.down == nextCell) {
        currentCell.removeWall(directions.down)
      } else if (currentCell.left == nextCell) {
        currentCell.removeWall(directions.left)
      } else {
        currentCell.removeWall(directions.right)
      }

      nextCell.visited = true;
      cellStack.push(nextCell);
    }
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

  current = false;

  upwall = true;
  downwall = true;
  leftwall = true;
  rightwall = true;

  draw() {
    stroke(wallColour);
    strokeWeight(2)

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

    if (this.visited) {
      fill(curentCellColour)
      noStroke()
      rect(this.x, this.y, cellSize)
    }

    if (this.current) {
      fill(visitedCellColour)
      noStroke()
      rect(this.x, this.y, cellSize)
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

  getUnvisitedNeighbours() {
    let neighbours = this.getNeighbors()
    let unvisitedNeighbours = [];

    if (neighbours.includes(directions.up)) {
      if (!this.up.visited) {
        unvisitedNeighbours.push(this.up)
      }
    }

    if (neighbours.includes(directions.down)) {
      if (!this.down.visited) {
        unvisitedNeighbours.push(this.down)
      }
    }

    if (neighbours.includes(directions.left)) {
      if (!this.left.visited) {
        unvisitedNeighbours.push(this.left)
      }
    }

    if (neighbours.includes(directions.right)) {
      if (!this.right.visited) {
        unvisitedNeighbours.push(this.right)
      }
    }

    if (unvisitedNeighbours.length > 0) {
      return unvisitedNeighbours
    } else {
      return false
    }
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
