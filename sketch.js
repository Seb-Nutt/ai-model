// Alzhiermers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


class BrainNode{
  constructor() {

  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  orbitControl();
}

function draw() {
  background(0);
  square(mouseX,mouseY,50);
  drawBrain();
}


function drawBrain(){
  stroke(255);
  beginShape(TRIANGLE_FAN);
  vertex(width/2,height/2,-50);
  vertex(width/2 + 50, height/2 + 50, 0);
  vertex(50, height/2 + 500, 50);
  endShape(CLOSE);
}