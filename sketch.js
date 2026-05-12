// Alzhiermers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let brainNodes = [];
let regionColors;
let regionNodes = [[],[],[],[],[],[]];
let nodePositions;
let rotationAngle = 0;
let selectingLobe = false;
const DEFAULT_WIDTH = 1912;
const DEFAULT_HEIGHT = 948;

class BrainNode{
  constructor(x,y,z,region) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.regionColor = regionColors[region];
    this.NODE_CONNECTION_RANGE = 200;
  }

  connect(otherNode){
    //use a scale
    
    if (dist(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z) < this.NODE_CONNECTION_RANGE && (this.regionColor === otherNode.regionColor || !selectingLobe) && (this.z >= 0 && otherNode.z >= 0 || !selectingLobe)){
      line(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z);
    }
  }
}

function preload() {
  nodePositions = loadStrings("assets/nodePositions.txt");
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  scale(width/DEFAULT_HEIGHT,height/DEFAULT_HEIGHT);

  regionColors = [color(75), color(200,0,0), color(200,200,0), color(0,200,0), color(0,200,200), color(0,0,200)];

  //changing the string posisions into numbers
  for (let node = 0; node < nodePositions.length; node++){
    nodePositions[node] = nodePositions[node].split(" ");
    for (let coordinate = 0; coordinate < nodePositions[node].length; coordinate++){
      nodePositions[node][coordinate] = float(nodePositions[node][coordinate]);
    }
  }


  for (node of nodePositions){
    //create the nodes and classify their region
    brainNodes.push(new BrainNode(node[0],node[1],node[2], node[3]));
    regionNodes[node[3]].push([node[0],node[1],node[2]]);

    //Mirror the node if it is not centered
    if (node[2] !== 0){
      brainNodes.push(new BrainNode(node[0],node[1],node[2]*-1, node[3]));
      regionNodes[node[3]].push([node[0],node[1],node[2]*-1]);
    }
  }
}

function draw() { 
  background(0);
  drawBrain();
}


function drawBrain(){
  const ROTATION_SPEED = 0.002;
  const ALIGNMENT_SPEED = 0.05;

  rotationAngle %= 2*PI;
  //rotate the brain if a lobe is not being selected
  if (selectingLobe){
    //rotate the brain back into position
    if (rotationAngle > 0){
      rotationAngle -= ALIGNMENT_SPEED;
    }

    rotateY(rotationAngle);
  }
  else{
    rotationAngle += ROTATION_SPEED;
    rotateY(rotationAngle);
  }

  for (node of brainNodes){
    for (otherNode of brainNodes){

      //if selecting a lobe then color the regions
      if (selectingLobe){
        stroke(node.regionColor);
      }
      else{
        stroke(255);
      }

      if (node !== otherNode){
        node.connect(otherNode);
      }
    }

    if (selectingLobe){
      
      for (let region = 0; region < regionNodes.length; region++){
        fill(regionColors[region]);
        beginShape(TRIANGLE_FAN);
        for (let node of regionNodes[region]){
          vertex(node.x,node.y,node.z);
        }
        endShape(CLOSE);
      }
    }

  }

  ellipse(mouseX-width/2, mouseY-height/2, 3, 3);
  
  // draw the x and y coordinate of your mouse in the middle of the canvas
  // width and height are also p5.js system varibles. 
  // width is the width of the canvas that you set in createCanvas
  // height is the height of the canvas that you set in createCanvas
}

function keyPressed(){
  if (key === ' '){
    selectingLobe = !selectingLobe;
  }
}

function mouseClicked(){
  console.log(mouseX-width/2,mouseY-height/2);
}