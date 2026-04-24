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
  
}

function draw() { 
  background(0);
  drawBrain();
}


function drawBrain(){
  orbitControl();
  stroke(255);

  
  beginShape(TRIANGLE_STRIP);
  for (let direction = 1; direction >= -1; direction -= 2){
    //brain stem
    fill(200);
    vertex(40, height/4 + 75, 0);
    vertex(50, height/4, 0*direction);
    vertex(25, height/4, 25*direction);
    vertex(-40, height/8, 0*direction);
    vertex(-20, height/8, 100*direction);
    vertex(100,height/8, 0);
  }
  endShape(CLOSE);
}