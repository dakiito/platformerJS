
var xpos, ypos, timer;
var canJump1 = true,
  canJump2 = true,
  stage1 = true,
  hasWon,
  isDead;
var speed = 2.777,
  flight = 0,
  gravity = 0;

var flag1 = true,
  flag2 = true,
  flag3 = true;
var achivementCount;

var holdLeft = false,
  holdRight = false;

function setup() {
  createCanvas(640, 480);
  frameRate(60);

  xpos = 340;
  ypos = 370;

  backGround = loadImage("forestBackground.png");
  spike = loadImage("spike.png");
  flag = loadImage("flag.png");
  wallObstacle = loadImage("wallObstacle.png");
  wallObstacleFlipped = loadImage("wallObstacleFlipped.png");
}

function draw() {
  background(backGround);

  if (canJump2 == false || canJump1 == false) { // timer on jump varializaton, check the timer tab
    fallCheck();
  }
  gravity = constrain(gravity, 0, 3.5);
  respawn(); //teleport player if won/lost
  playerMove();
  stageCheck(); //hitboxes
  obstacleCheck();
  achivements();

  drawStage(); // draw the stage tab
  playerDraw(); //draw the player and update position
  debug();
}

function playerDraw() {
  fill(0, 255, 255);
  rectMode(CENTER);
  rect(xpos, ypos, 20, 20); //player
}

function playerMove() {
  //i have commented these out as you need to address your
  //collision issues first else your character will just disappear
  ypos -= flight;
  ypos += gravity; // gravity
  flight = constrain(flight - 0.5, 0.0, 10); // make the flight value smaller every time this is ran

  ypos = constrain(ypos, 20, 370);
  xpos = constrain(xpos, 10, 620); // left and right boundaries



  if (holdLeft) {
    xpos -= speed; //move the player and whatnot
  }
  if (holdRight) {
    xpos += speed;
  }
}

function respawn() {
  if (isDead) {
    isDead = false;
    xpos = 340;
    ypos = 370;
    achivementCount = 0;
    flag1 = true;
    flag2 = true;
    flag3 = true;
  }
  if (hasWon && achivementCount == 3) {
    textSize(40);
    fill(200, 20, 20);
    text("You COMPLETED THE GAME!!!", 0, height / 2);
    text("Press R", width / 2 - 50, height - 50);
    delay(500);

    textSize(11);
  } else if (hasWon) {
    textSize(48);
    fill(255);
    text("You won!!!", width / 2 - 40, height / 2);
    text("Now go collect the flags", width / 2 - 290, height / 2 + 90);
    text("Press R", width / 2 - 50, height - 50);
    textSize(11);
  }
}

function achivements() { // the flags achivements
  if (achivementCount == 1) {
    fill('#FFFF5D');
    star(20, 30, 20, 10, 5);
  } else if (achivementCount == 2) {
    fill('#FFFF5D');
    star(20, 30, 20, 10, 5);
    star(40, 30, 20, 10, 5);
  } else if (achivementCount == 3) {
    fill('#FFFF5D');
    star(20, 30, 20, 10, 5);
    star(40, 30, 20, 10, 5);
    star(60, 30, 20, 10, 5);
  }
} // below lies the star shape function 
function star(x, y, radius1, radius2, npovars) {
  var angle = TWO_PI / npovars;
  var halfAngle = angle / 2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function setSignal(setTo) {
  if (keyCode == LEFT_ARROW) {
    holdLeft = setTo;
  }
  if (keyCode == RIGHT_ARROW) {
    holdRight = setTo;
  }
}

function keyPressed() {
  setSignal(true);
  if (canJump2) {
    if (keyCode == UP_ARROW) { //when up is pressed then increase flight value
      flight += 15;
      canJump1 = false;
    }
  }
  if (hasWon) {
    if (key == 'r' || key == 'R') {
      hasWon = false;
      xpos = 340;
      ypos = 370;
      speed = 2.777;
    }
  }
}


function keyReleased() {
  setSignal(false);
}

function drawStage() { //<>//
  fill(255);
  rectMode(CORNERS);
  imageMode(CORNERS);

  rect(480, 125, 570, 130); //mapped        //rect11 win platform   */
  rect(340, 80, 405, 83); //mapped        // rect10 the platform to win 
  image(spike, 310, 255, 320, 300); //mapped       // the spike above tent
  image(spike, 340, 200, 360, 230); //mapped       //  spike on second rock platform
  image(spike, 50, 330, 60, 380); //mapped       //leftmost spike
  image(spike, 70, 340, 80, 390); //mapped       //leftmost spike x2
  image(wallObstacle, 445, 210, 460, 250); //  under 2nd rock platform
  image(wallObstacleFlipped, 470, 130, 485, 160); // under win platform

  if (flag1) {
    image(flag, 5, 322, 22, 350);
  }
  if (flag2) {
    image(flag, 600, 350, 615, 380);
  }
  if (flag3) {
    image(flag, 180, 100, 200, 125);
  }
}

function stageCheck() {
  if (hasWon == false) {
    if (xpos >= 100 && ypos >= 370 && xpos <= 640 && ypos <= 370) { //rect1 the floor
      gravity = 0;
      canJump2 = true;
    } else if (xpos >= 0 && ypos >= 340 && xpos <= 50 && ypos <= 340) { //rect2 middle middle above tent but below tree
      gravity = 0;
      canJump2 = true;
    } else if (xpos >= 160 && ypos >= 280 && xpos <= 320 && ypos <= 290) { //rect3 middle middle above tent but below tree
      gravity = 0;
      canJump2 = true;
    } else if (xpos >= 217 && ypos >= 311 - 10 && xpos <= 281 && ypos <= 324 - 10) { //rect4 tent roof
      gravity = 0;
      canJump2 = true;
    } else if (xpos >= 310 && ypos >= 220 && xpos <= 335 && ypos <= 295) { //rect5 rock wall
      xpos = 320;
      canJump2 = true;
    } else if (xpos >= 320 && ypos >= 220 - 10 && xpos <= 352 && ypos <= 227 - 10) { //rect6  platform above rock wall
      gravity = 0;
      canJump2 = true;
    } else if (xpos >= 350 && ypos >= 190 && xpos <= 360 && ypos <= 220) { //rect7 second rock wall
      xpos = 350;
      canJump2 = true;
    } else if (xpos >= 350 && ypos >= 180 && xpos <= 450 && ypos <= 190) { //rect8
      gravity = 0;
      canJump2 = true;
    } else if (xpos >= 160 && ypos >= 125 - 10 && xpos <= 285 && ypos <= 129 - 10) { //rect9
      gravity = 0;
      canJump2 = true;
    } else if (xpos >= 340 && ypos >= 70 && xpos <= 405 && ypos <= 73) { //rect 10
      gravity = 0;
      canJump2 = true;
    } else if (xpos >= 480 && ypos >= 125 - 10 && xpos <= 570 && ypos <= 130 - 10) { //rect 11
      gravity = 0;
      hasWon = true;
      speed = 0;
      canJump2 = false;
    } else if (xpos >= 0 && ypos >= 350 - 10 && xpos <= 40 && ypos <= 360 - 10) {
      gravity = 0;
      canJump2 = true;
    } else {
      gravity += 0.4;
    }
  }
}

function obstacleCheck() {
  if (dist(xpos, ypos, 60, 380) <= 30) { // the leftmost spikes
    isDead = true;
  } else if (dist(xpos, ypos, 315, 280) <= 10) { //spike above tent
    isDead = true;
  } else if (dist(xpos, ypos, 350, 217) <= 10) { //spike above tent
    isDead = true;
  } else if (dist(xpos, ypos, 450, 230) <= 10) { //wall obstacle under second rock platform
    isDead = true;
  } else if (dist(xpos, ypos, 480, 150) <= 10) { //wall obstacle on the win platform
    isDead = true;
  } else if (dist(xpos, ypos, 10, 355) <= 20 && flag1 == true) { //leftmostflag hitbox check
    flag1 = false;
    achivementCount += 1;
  } else if (dist(xpos, ypos, 600, 365) <= 10 && flag2 == true) { //rightmost flag hitbox check 
    flag2 = false;
    achivementCount += 1;
  } else if (dist(xpos, ypos, 190, 115) <= 10 && flag3 == true) { //tree flag hitbox check
    flag3 = false;
    achivementCount += 1;
  }
}
/*
function fallCheck() {

  if (canJump1 == false) {
    timer = millis();
    canJump1 = true;
    gravity = 0;
  }
  if (millis() - 1000 > timer) {
    canJump2 = true;
  } else {
    canJump2 = false;
  }

}
*/
function debug() {
  fill(255, 0, 0);
  text("stage1=" + stage1, 50, 50);
  text(xpos + ":" + ypos + "flight:" + flight + "gravity:" + gravity, 20, 20); // debug
  text("canJump1:" + canJump1 + "canJump2:" + canJump2, 70, 70);
}
