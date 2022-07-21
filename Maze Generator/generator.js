function setup() {
  createCanvas(windowWidth - 20, 650);

  console.log(height)
  console.log(width)
}

function draw() {
  background(25);

  stroke('yellow');
  strokeWeight(1.25)


  // draw vertical walls
  for (i = 0; i <= width; i+= 25) {
    line(i, 0, i, height)
  }

  // draw horizontal walls
  for (j = 0; j <= width; j+= 25) {
    line(0, j, width, j)
  }

}

class Cell{
  constructor(width, height){
    this.width = width;
    this.height = height;
  }

  draw() {

  }
}

function grid(x1, y1, x2, y2) {
  stroke('yellow');
  strokeWeight(1)
  line(10,10, 100,100);
}