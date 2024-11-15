/*Moon lander game with a alien theme*/

//No stroke for better visuals
noStroke();

//Stars variables
let starsX = [];
let starsY = [];
let starsAlpha = [];

//Game state variables
let state = "start";

//Set up function with stars and canva size
function setup() {
  createCanvas(900, 600);
  starsGenerator(500);
}

//Alien character function
function character(x, y) {
  noStroke();

  //Green light
  fill(183, 241, 120);
  triangle(350, 400, 450, 300, 550, 400);

  //Bottom bottom part
  fill(70, 70, 70);

  ellipse(x, y + 45, 70, 40);

  //Bottom part
  fill(88, 88, 88);

  ellipse(x, y + 10, 250, 80);

  //Middle part
  fill(121, 121, 120);

  ellipse(x, y, 300, 60);

  //Upper part
  fill(90, 90, 90);

  ellipse(x, y - 20, 150, 40);

  //Plop things, from left to right
  fill(171, 175, 175);

  ellipse(x - 135, y - 10, 15, 10);
  ellipse(x - 115, y + 2, 15, 10);
  ellipse(x - 90, y + 10, 15, 10);
  ellipse(x - 60, y + 15, 15, 10);
  ellipse(x - 30, y + 17, 15, 10);
  ellipse(x, y + 17, 15, 10);
  ellipse(x + 30, y + 17, 15, 10);
  ellipse(x + 60, y + 15, 15, 10);
  ellipse(x + 90, y + 10, 15, 10);
  ellipse(x + 117, y + 3, 15, 10);
  ellipse(x + 135, y - 10, 15, 10);

  //Glass cup
  fill(210, 242, 240);
  beginShape();

  vertex(x - 50, y - 25);
  bezierVertex(x - 10, y - 110, x + 40, y - 60, x + 50, y - 25);

  endShape();
}

//Function to generate randomized stars in the background
function starsGenerator(numberOfStars) {
  for (let i = 0; i < numberOfStars; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const alpha = Math.random();

    starsX.push(x);
    starsY.push(y);
    starsAlpha.push(alpha);
  }
}

//Function for when the mouse is pressed
function mousePressed() {
  if (state === "start") {
    if (mouseX > 350 && mouseX < 550 && mouseY > 450 && mouseY < 500) {
      state = "game";
    }
  }
}

//Function for the start screen with the title, stars, and a start button
function startScreen() {
  background(13, 29, 49);

  //Randomizes stars
  //Taken help from Garrits videos
  for (let index in starsX) {
    fill(255, 255, 255, starsAlpha[index] * 255);
    ellipse(starsX[index], starsY[index], 3);
  }

  //Start button
  fill(255, 255, 255);
  rect(350, 450, 200, 80, 30);
  push();
  fill(0, 0, 0);
  textSize(30);
  textStyle(BOLD);
  text("START", 400, 500);
  pop();

  //Title
  fill(255, 255, 255);
  textSize(80);
  textStyle(BOLD);
  text("Alien Invasion", 200, 150);

  //Alien
  character(450, 250);
}

//Fucntion for the game screen
function gameScreen() {
  background(13, 29, 49);
}

//Draw function
function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  }
}
