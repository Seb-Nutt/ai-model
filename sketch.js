// Alzhiermers and decision making
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let brainNodes = [];
let regionIDs = {
  brainStem: 0,
  cerebellum: 1,
  occipital: 2,
  parietal: 3,
  frontal: 4,
  temporal: 5
};
let regionColors = [['grey'], ['red'], ['yellow'], ['green'], ['cyan'], ['blue']];
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
    
    if (dist(this.x,this.y,this.z,otherNode.x,otherNode.y,otherNode.z) < this.NODE_CONNECTION_RANGE && (this.regionColor === otherNode.regionColor || !selectingLobe)){
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
  rotationAngle %= 2*PI;
  //rotate the brain if a lobe is not being selected
  if (selectingLobe){
    //rotate the brain back into position
    if (rotationAngle > 0){
      rotationAngle -= 0.05;
    }

    rotateY(rotationAngle);
  }
  else{
    rotationAngle += 0.002;
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
        //maybe add a way to determine the border
        fill(regionColors[region]);
        beginShape(TRIANGLE_STRIP);
        for (let node of regionNodes[region]){
          vertex(node[0],node[1],node[2]);
        }
        endShape(CLOSE);
      }
    }

  }


}

function keyPressed(){
  if (key === ' '){
    selectingLobe = !selectingLobe;
  }
}