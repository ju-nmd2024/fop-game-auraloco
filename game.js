/*Moon lander game with a alien theme*/

//No stroke for better visuals
noStroke();

//Stars variables
let starsX = [];
let starsY = [];
let starsAlpha = [];

//Game state variables
let state = "start";

//Alien position
let characterX;
let characterY;

//Alien movement
let gravity = 2;
let speedX = 5;
let falling = true;

//Person position
let personX;
let personY;

//Set up function with canvas size, stars generator, alien position,
// person position
function setup() {
  createCanvas(900, 800);

  //Stars generator calling
  starsGenerator(500);

  //Alien and peron position resets
  resetAlienPos();
  resetPersonPos();
}

//Function to reset the character position every game that starts
function resetAlienPos() {
  characterX = width / 2;
  characterY = 70;
  falling = true;
}

//Function to spawn the little person in a random position every game that starts
function resetPersonPos() {
  personX = Math.floor(Math.random() * (800 - 100 + 1)) + 100;
  personY = 760;
}

//Function for the little person
function person(x, y, s) {
  fill(0, 0, 0);

  //Head
  ellipse(x, y - 150 * s, 50 * s);

  //Rest of body
  push();
  stroke(0, 0, 0);
  strokeWeight(20 * s);
  //Body
  line(x, y - 150 * s, x, y - 60 * s);
  //Legs
  line(x, y - 60 * s, x - 20 * s, y);
  line(x, y - 60 * s, x + 20 * s, y);
  //Arms
  line(x, y - 120 * s, x - 30 * s, y - 65 * s);
  line(x, y - 120 * s, x + 30 * s, y - 65 * s);
  pop();
}

//Alien function
function alien(x, y, s) {
  noStroke();

  //Green light
  fill(183, 241, 120);
  triangle(x - 100 * s, y + 150 * s, x, y + 50 * s, x + 100 * s, y + 150 * s);

  //Bottom bottom part
  fill(70, 70, 70);

  ellipse(x, y + 45 * s, 70 * s, 40 * s);

  //Bottom part
  fill(88, 88, 88);

  ellipse(x, y + 10 * s, 250 * s, 80 * s);

  //Middle part
  fill(121, 121, 120);

  ellipse(x, y, 300 * s, 60 * s);

  //Upper part
  fill(90, 90, 90);

  ellipse(x, y - 20 * s, 150 * s, 40 * s);

  //Plop things. left to right
  fill(171, 175, 175);

  ellipse(x - 135 * s, y - 10 * s, 15 * s, 10 * s);
  ellipse(x - 115 * s, y + 2 * s, 15 * s, 10 * s);
  ellipse(x - 90 * s, y + 10 * s, 15 * s, 10 * s);
  ellipse(x - 60 * s, y + 15 * s, 15 * s, 10 * s);
  ellipse(x - 30 * s, y + 17 * s, 15 * s, 10 * s);
  ellipse(x, y + 17 * s, 15 * s, 10 * s);
  ellipse(x + 30 * s, y + 17 * s, 15 * s, 10 * s);
  ellipse(x + 60 * s, y + 15 * s, 15 * s, 10 * s);
  ellipse(x + 90 * s, y + 10 * s, 15 * s, 10 * s);
  ellipse(x + 117 * s, y + 3 * s, 15 * s, 10 * s);
  ellipse(x + 135 * s, y - 10 * s, 15 * s, 10 * s);

  //Glass cup
  fill(210, 242, 240);

  beginShape();

  vertex(x - 50 * s, y - 25 * s);
  bezierVertex(
    x - 10 * s,
    y - 110 * s,
    x + 40 * s,
    y - 60 * s,
    x + 50 * s,
    y - 25 * s
  );

  endShape();
}

//Function to generate randomized stars in the background
//Taken help from Garrits videos
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

//Function to draw the stars
//Taken help from Garrits videos
function drawStars() {
  for (let index in starsX) {
    fill(255, 255, 255, starsAlpha[index] * 255);
    ellipse(starsX[index], starsY[index], 3);
  }
}

//Function for when the mouse is pressed
//If the button start is pressed, the game starts
function mousePressed() {
  if (state === "start") {
    if (mouseX > 350 && mouseX < 550 && mouseY > 650 && mouseY < 730) {
      resetAlienPos();
      state = "game";
    }
  }
}

//Function for the start screen with the title, stars, and a start button
function startScreen() {
  //Background color with the stars
  background(13, 29, 49);
  drawStars();

  //Start button
  fill(255, 255, 255);
  rect(350, 650, 200, 80, 30);
  push();
  fill(0, 0, 0);
  textSize(30);
  textStyle(BOLD);
  text("START", 400, 700);
  pop();

  //Title
  fill(255, 255, 255);
  textSize(80);
  textStyle(BOLD);
  text("Alien Invasion", 200, 200);

  //Alien
  alien(450, 400, 1.5);
}

//Function for the game screen
function gameScreen() {
  //Backgorund color with the stars
  background(13, 29, 49);
  drawStars();

  //Grass on the bottom
  fill(44, 95, 47);
  rect(0, height - 190, width, 50);

  //Alien falling
  if (falling) {
    characterY += gravity;
  }

  //If alien has landed on grass
  if (characterY + 150 * 0.8 >= height - 190) {
    falling = false;
    characterY = height - 190 - 150 * 0.8;
  }

  //Making the alien thurst up for a safe landing
  if (keyIsDown(38) && falling) {
    gravity = max(-2, gravity - 0.8);
  } else {
    gravity = min(3, gravity + 0.05);
  }

  //Alien movement left to right
  if (keyIsDown(37) && characterX > (150 * 0.8) / 2) {
    characterX -= speedX;
  }
  if (keyIsDown(39) && characterX < width - (400 * 0.8) / 2) {
    characterX += speedX;
  }

  //Alien and person drawn into random each time the game starts
  //Set scaling
  person(personX, personY, 0.5);
  alien(characterX, characterY, 0.8);
}

//Function for the end screen
function endScreen() {}

//Draw function with the different states
function draw() {
  //Starts with the start screen until button is pressed
  //If button is presed then game screen appears
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  }
  //gameScreen();
}
