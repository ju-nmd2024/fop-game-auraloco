noStroke();

function setup() {
  createCanvas(900, 600);
}

function startScreen() {
  background(9, 61, 82);

  fill(255, 235, 172);
  ellipse(50, 50, 5);
  ellipse(200, 200, 10);
  ellipse(100, 100, 7);
  ellipse(300, 50, 6);
  ellipse(100, 500, 5);
  ellipse(400, 400, 7);
  ellipse(300, 300, 5);
  ellipse(600, 300, 7);
  ellipse(800, 50, 10);
  ellipse(400, 200, 5);
  ellipse(700, 500, 5);
  ellipse(800, 450, 10);
  ellipse(810, 250, 7);
  ellipse(550, 70, 5);

  fill(255, 255, 255);
  rect(350, 250, 200, 80, 30);

  push();
  fill(0, 0, 0);
  textSize(30);
  textStyle(BOLD);
  text("START", 400, 300);
  pop();

  fill(255, 255, 255);
  textSize(80);
  textStyle(BOLD);
  text("Alien Invasion", 200, 150);
}

function draw() {
  startScreen();
}
