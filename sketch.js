//
var backImg, startImg, restartImg, spaceshipImg, miniImg, fireballImg, stoneImg;
var backG, spaceS, fireball, mini, stone, start, restart;
var inv1, inv2;
var gamestate = "stop";  // Remove duplicate definition
var fireballGroup, miniGroup, stoneGroup;
var score;

function preload() {
  backImg = loadImage("space.png");
  startImg = loadImage("start.png");
  restartImg = loadImage("restart.png");
  spaceshipImg = loadImage("spaceship.png");
  miniImg = loadImage("missile.png");
  stoneImg = loadImage("stone.png");
  fireballImg = loadImage("fireball.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // Use full screen on mobile

  backG = createSprite(width / 2, height / 2, 10, 10);
  backG.addImage("BG", backImg);
  backG.scale = 1.5;

  spaceS = createSprite(width / 2, height - 100, 10, 10);
  spaceS.addImage("SS", spaceshipImg);
  spaceS.scale = 0.15;

  start = createSprite(width / 2, height / 2, 10, 10);
  start.addImage("S", startImg);
  start.scale = 0.5;
  start.visible = true;

  restart = createSprite(width / 2, height / 2, 10, 10);
  restart.addImage("R", restartImg);
  restart.scale = 0.7;
  restart.visible = false;

  inv1 = createSprite(0, height / 2, 10, height);
  inv1.visible = false;
  inv2 = createSprite(width, height / 2, 10, height);
  inv2.visible = false;

  score = 0;

  fireballGroup = new Group();
  miniGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  background("white");
  drawSprites();

  if (gamestate === "stop") {
    if (touches.length > 0 || mousePressedOver(start)) {  // Use touch input for mobile
      gamestate = "play";
      start.visible = false;
      backG.velocityY = 4;
      touches = [];  // Clear touches after use
    }
  }

  if (gamestate === "play") {
    SpawnMini();
    SpawnStone();
    spaceS.x = mouseX || touches[0]?.x || spaceS.x;  // Handle both mouse and touch input

    if (touches.length > 0 || keyWentDown("space")) {  // Fireball with touch
      FireBall();
      touches = [];
    }

    spaceS.collide(inv1);
    spaceS.collide(inv2);

    if (backG.y > height - 250) {
      backG.y = height / 2;
    }

    if (fireballGroup.isTouching(miniGroup)) {
      miniGroup.destroyEach();
      score += 2;
    }

    if (fireballGroup.isTouching(stoneGroup)) {
      stoneGroup.destroyEach();
      score += 2;
    }

    if (miniGroup.isTouching(spaceS) || stoneGroup.isTouching(spaceS)) {
      miniGroup.destroyEach();
      stoneGroup.destroyEach();
      fireballGroup.destroyEach();
      gamestate = "end";
    }
  }

  if (gamestate === "end") {
    backG.velocityY = 0;
    miniGroup.setVelocityYEach(0);
    stoneGroup.setVelocityYEach(0);
    restart.visible = true;
    fill("red");
    textSize(30);
    stroke(4);
    text("Score  " + score, width / 2 - 50, height / 2 - 100);

    if (touches.length > 0 || mousePressedOver(restart)) {  // Restart with touch
      restart.visible = false;
      gamestate = "stop";
      backG.y = height / 2;
      miniGroup.destroyEach();
      stoneGroup.destroyEach();
      score = 0;
      touches = [];
    }
  }

  fill("white");
  textSize(20);
  stroke(4);
  text("Score  " + score, 20, 30);
}

function FireBall() {
  fireball = createSprite(spaceS.x, spaceS.y - 20, 10, 10);
  fireball.addImage("FB", fireballImg);
  fireball.scale = 0.13;
  fireball.lifetime = 800;
  fireball.velocityY = -7;
  fireballGroup.add(fireball);
  fireball.setCollider("circle", -1, 0, 70);
  fireball.debug = false;
}

function SpawnMini() {
  if (frameCount % 100 === 0) {
    mini = createSprite(random(20, width - 20), -10, 1, 1);
    mini.addImage("M", miniImg);
    mini.scale = 0.35;
    mini.lifetime = 800;
    mini.velocityY = (5 + 3 * score / 10);
    miniGroup.add(mini);
  }
}

function SpawnStone() {
  if (frameCount % 200 === 0) {
    stone = createSprite(random(20, width - 20), -10, 1, 1);
    stone.addImage("M", stoneImg);
    stone.scale = 0.35;
    stone.lifetime = 800;
    stone.velocityY = (4 + 3 * score / 10);
    stoneGroup.add(stone);
  }
}
