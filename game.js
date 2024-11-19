/*Moon lander game with a alien theme*/

//No stroke for better visuals (in my opinion)
noStroke();

//Stars variables
let starsX = [];
let starsY = [];
let starsAlpha = [];

//Game state, timer and score variable
let state = "start";
let timer = 0;
let score = 0;

//Alien position
let characterX;
let characterY;

//Alien movement and falling variables
let gravity = 3;
let speedX = 5;
let falling = true;
let landSpeed = 0;
let minWSpeed = 1;
let maxWSpeed = 2;
let loseSpeed = 2.1;

//Person position
let personX;
let personY;

//Function to set up canvas size, stars generator, alien position,
//and person position
function setup() {
  createCanvas(900, 800);

  //Stars generator calling
  starsGenerator(500);

  //Alien and peron position resets
  resetAlienPos();
  resetPersonPos();
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
    //Filling color white and some are more transparent than others
    fill(255, 255, 255, starsAlpha[index] * 255);
    ellipse(starsX[index], starsY[index], 3);
  }
}

//Function for when the mouse is pressed
//Taken helpl from Garrits assingments
function mousePressed() {
  //If the button start in the start screen is pressed, the intro screen is shown
  if (state === "start") {
    if (mouseX > 360 && mouseX < 570 && mouseY > 640 && mouseY < 730) {
      resetAlienPos();
      state = "intro";
    }
  }

  //If the button restart in the end screens, the game restarts
  if (state === "win" || state === "lose") {
    if (mouseX > 360 && mouseX < 570 && mouseY > 640 && mouseY < 730) {
      resetAlienPos();
      state = "game";
    }
  }
}

//Function to reset the character position on every game that starts
function resetAlienPos() {
  characterX = width / 2;
  characterY = 70;
  falling = true;
  gravity = 3;
  landSpeed = 0;
}

//Function to spawn the little person in a random position every game that starts
function resetPersonPos() {
  personX = Math.floor(Math.random() * (800 - 100 + 1)) + 100;
  personY = 760;
}

//Function to check the landing speed
function checkLanding() {
  //If the speed is at a safe point it earns points on the score and the win screen is shown
  //If the speed is not safe it doesn't earn any points and the loose screen is shown
  if (landSpeed >= minWSpeed && landSpeed <= maxWSpeed) {
    if (
      characterX > personX - 50 &&
      characterX < personX + 50 &&
      characterY >= personY - 150
    ) {
      score += 50;
    } else {
      score += 10;
    }
    state = "win";
  } else if (landSpeed > maxWSpeed) {
    state = "lose";
  }
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

//Function for the start screen with the title, stars, and a start button
function startScreen() {
  //Background color with the stars
  background(13, 29, 49);
  drawStars();

  //Start button
  fill(255, 255, 255);
  rect(width / 2 - 100, height - 300, 200, 80, 30);
  push();
  fill(0, 0, 0);
  textSize(30);
  textStyle(BOLD);
  text("START", width / 2 - 50, height - 250);
  pop();

  //Title
  fill(255, 255, 255);
  textSize(80);
  textStyle(BOLD);
  text("Alien Invasion", width / 2 - 250, height / 2 - 250);

  //Alien
  alien(width / 2, height / 2 - 100, 1.5);
}

//Screen that shows how to play
function introScreen() {
  //Set background and draw stars
  background(13, 29, 49);
  drawStars();

  //Title, how to play
  fill(255, 255, 255);
  textSize(70);
  textStyle(BOLD);
  text("HOW TO PLAY", width / 2 - 230, height / 2 - 300);

  //Instructions
  textSize(30);
  textStyle(NORMAL);
  text(
    "Use the arrow keys to move the alien left and right.",
    width / 2 - 350,
    height / 2 - 100
  );
  text(
    "Press up to control the landing speed.",
    width / 2 - 350,
    height / 2 + 50
  );
  text(
    "Land safely on the grass to earn 10 points, \nland safely on the person to earn 50 points!",
    width / 2 - 350,
    height / 2 + 150
  );

  //Big red text on bottom
  fill(255, 0, 0);
  textStyle(BOLD);
  textSize(50);
  text("Avoid crashig into the ground!", width / 2 - 350, height / 2 + 300);

  //Small white rectangles
  fill(255, 255, 255);
  rect(width / 2 - 350, height / 2 - 200, 60, 60, 10);
  rect(width / 2 - 280, height / 2 - 200, 60, 60, 10);
  rect(width / 2 - 350, height / 2 - 50, 60, 60, 10);

  //Small arrows in the rectangles
  //Lines
  push();
  stroke(0, 0, 0);
  strokeWeight(5);
  line(width / 2 - 330, height / 2 - 168, width / 2 - 295, height / 2 - 168);
  line(width / 2 - 275, height / 2 - 168, width / 2 - 230, height / 2 - 168);
  line(width / 2 - 319, height / 2 - 30, width / 2 - 319, height / 2);
  pop();

  //Triangles
  fill(0, 0, 0);
  triangle(
    width / 2 - 325,
    height / 2 - 150,
    width / 2 - 345,
    height / 2 - 170,
    width / 2 - 325,
    height / 2 - 185
  );
  triangle(
    width / 2 - 245,
    height / 2 - 150,
    width / 2 - 225,
    height / 2 - 170,
    width / 2 - 245,
    height / 2 - 185
  );
  triangle(
    width / 2 - 335,
    height / 2 - 25,
    width / 2 - 320,
    height / 2 - 47,
    width / 2 - 305,
    height / 2 - 25
  );
}

//Function for the game screen
function gameScreen() {
  //Backgorund color with the stars
  background(13, 29, 49);
  drawStars();

  //Grass on the bottom
  fill(44, 95, 47);
  rect(0, height - 190, width, 100);

  //Alien falling
  if (falling) {
    characterY += gravity;
  }

  //If alien has landed on grass the falling stops
  if (characterY + 150 * 0.8 >= height - 190) {
    falling = false;
    characterY = height - 190 - 150 * 0.8;

    landSpeed = abs(gravity);
    checkLanding();
  }

  //Making the alien thrust up for a safe landing
  if (keyIsDown(38) && falling) {
    gravity = max(-2.5, gravity - 0.8);
  } else {
    gravity = min(5, gravity + 0.05);
  }

  //Alien movement left to right
  if (keyIsDown(37) && characterX > (150 * 0.8) / 2) {
    characterX -= speedX;
  }
  if (keyIsDown(39) && characterX < width - (400 * 0.8) / 2) {
    characterX += speedX;
  }

  //Alien and person drawn each time the game starts
  person(personX, personY, 0.5);
  alien(characterX, characterY, 0.8);
}

//Function for the end screen
function endScreen() {
  //Background color and stars
  background(13, 29, 49);
  drawStars();

  //Win and lose text
  fill(255, 255, 255);
  textSize(70);
  textStyle(BOLD);

  if (state === "win") {
    text("YOU WIN!", width / 2 - 150, height / 2 - 200);
  } else if (state === "lose") {
    text("YOU LOSE!", width / 2 - 180, height / 2 - 200);
  }

  //Score text
  textSize(50);
  text("SCORE: " + score, width / 2 - 110, height / 2);

  //Restart button
  fill(255, 255, 255);
  rect(width / 2 - 100, height - 300, 200, 80, 30);

  push();
  fill(0, 0, 0);
  textSize(30);
  textStyle(BOLD);
  text("RESTART", width / 2 - 65, height - 250);
  pop();
}

//Draw function with the different states
function draw() {
  //Starts with the start screen until button is pressed
  //If button is presed then intro screen appears
  //After 200 frames it switches to the game
  //If alien has landed safely it'll show Win screen
  //If alien doesn't land safely it shows lose screen
  if (state === "start") {
    startScreen();
  } else if (state === "intro") {
    introScreen();
    timer = timer + 1;
    if (timer >= 200) {
      timer = 0;
      state = "game";
    }
  } else if (state === "game") {
    gameScreen();
  } else if (state === "win" || state === "lose") {
    endScreen();
  }
}
