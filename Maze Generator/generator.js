function setup() {
  createCanvas(windowWidth - 20, 650);

  console.log(height)
  console.log(width)

  console.log("QWerqwer")
}

let verr = 3

function draw() {
  background(25); // 0 = black, 255 = white

  // global variables
  cellWidth = 25
  stroke('yellow');
  strokeWeight(1.25)

  // draw vertical walls
  for (i = 0; i <= width; i+= cellWidth) {
    line(i, 0, i, height)
  }

  // draw horizontal walls

  for (j = 0; j <= width; j+= cellWidth) {
    line(0, j, width, j)
  }

}

cells = []

class Cell{
  constructor(width, height){
    this.width = width;
    this.height = height;
  }

  draw() {

  }
}