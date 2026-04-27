// Alzhiermers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let brainNodes = [];


class BrainNode{
  constructor(x,y,z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  connect(otherNode){
    if (dist(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z) < 100){
      fill(255);
      line(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z)
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let nodePositions = [];

  nodePositions.push([0, height/4 + 75, 0]);
  for (let direction = 1; direction >= -1; direction -= 2){
    nodePositions.push([-40, height/4, 25*direction]);
  }


  for (node of nodePositions){
    brainNodes.push(new BrainNode(node[0],node[1],node[2]));
  }
}

function draw() { 
  background(0);
  drawBrain();
}


function drawBrain(){
  orbitControl();
  stroke(255);



  for (node of brainNodes){
    for (otherNode of brainNodes){
      if (node !== otherNode){
        node.connect(otherNode);
      }
    }
  }
  
  
  // for (let direction = 1; direction >= -1; direction -= 2){
  //   //brain stem
  //   fill(200);
  //   stroke('white');
  //   line(0, height/4 + 75, 0, -40, height/4, 25*direction);
  //   line(0, height/4 + 75, 0, 10, height/4, 0);
  //   line(-40, height/4, 25*direction, 10, height/4, 0);
  //   line(-40, height/4, 25, -40, height/4, -25);
    // vertex(25, height/4, 25*direction);
    // vertex(-40, height/8, 0*direction);
    // vertex(-20, height/8, 100*direction);
    // vertex(100,height/8, 0);
  // }
}