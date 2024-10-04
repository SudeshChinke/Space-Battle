var backImg,startImg,restartImg,spaceshipImg,miniImg,fireballImg,stoneImg;

var backG;

var spaceS,fireball,mini,stone,start,restart;

var inv1,inv2;

var gamestate="play",gamestate="stop";

var fireballGroup,miniGroup,stoneGroup;

var score;

function preload(){
  backImg=loadImage("space.png");
  
  startImg=loadImage("start.png");
  restartImg=loadImage("restart.png");
  
  spaceshipImg=loadImage("spaceship.png");
  
  miniImg=loadImage("missile.png");
  stoneImg=loadImage("stone.png");
  
  fireballImg=loadImage("fireball.png");
}

function setup() {
 createCanvas(600,800); 
  
 backG = createSprite(300,400,10,10);
 backG.addImage("BG",backImg);
 backG.scale=1.5;
  
 spaceS = createSprite(300,710,10,10);
 spaceS.addImage("SS",spaceshipImg);
 spaceS.scale=0.15;

  
 start = createSprite(300,400,10,10);
 start.addImage("S",startImg);
 start.scale=0.5;
 start.visible=true; 
  
 restart = createSprite(300,400,10,10);
 restart.addImage("R",restartImg);
 restart.scale=0.7;
 restart.visible=false; 
  
 inv1 = createSprite(0,400,10,800);
 inv1.visible=false; 
 inv2 = createSprite(600,400,10,800);  
 inv2.visible=false; 
  
 score=0; 
  
 fireballGroup = new Group();
 miniGroup = new Group();
 stoneGroup = new Group();
}


function draw() {
  background("white");
  drawSprites();
  
if(gamestate==="stop"){
  if(mousePressedOver(start)){
    gamestate="play";
    start.visible=false;   
    backG.velocityY=4;
  }   
}
  
if(gamestate==="play"){ 
  
  SpawnMini();
  SpawnStone();
  spaceS.x=mouseX;
   
  if(keyWentDown("space")) {
    FireBall();
  } 
  
  spaceS.collide(inv1);
  spaceS.collide(inv2);
    
  if(backG.y>550){
      backG.y=250;
    }
  
  if(fireballGroup.isTouching(miniGroup)){
    miniGroup.destroyEach();
    score=score+2; 
  }
  
  if(fireballGroup.isTouching(stoneGroup)){
    stoneGroup.destroyEach(); 
    score=score+2; 
  }
  
if(miniGroup.isTouching(spaceS) || stoneGroup.isTouching(spaceS)){
    miniGroup.destroyEach();
    stoneGroup.destroyEach(); 
    fireballGroup.destroyEach(); 
    gamestate="end";
  }
}
  
 if(gamestate==="end"){
  backG.velocityY=0;
  miniGroup.setVelocityYEach(0);  
  stoneGroup.setVelocityYEach(0);  
  restart.visible=true;
  fill("red");
  textSize(30);
  stroke(4);
  text("Score  "+score,250,300);
   
   if(mousePressedOver(restart)){
     
     restart.visible=false;
     gamestate="stop";
     backG.y=400;
     miniGroup.destroyEach();  
     stoneGroup.destroyEach(); 
     score=0;
   }
 }
  
  fill("white");
  textSize(20);
  stroke(4);
  text("Score  "+score,20,30);
}

function FireBall() {
  fireball = createSprite(300,720,10,10);
  fireball.addImage("FB",fireballImg);
  fireball.x = spaceS.x;
  fireball.scale = 0.13;
  fireball.lifetime = 800;
  fireball.velocityY = -7;
  fireballGroup.add(fireball);
  fireball.setCollider("circle",-1,0,70);
  fireball.debug = false;
}


function SpawnMini() {
 if(frameCount%100===0){ 
  mini = createSprite(Math.round(random(20,580)),-10,1,1);
  mini.addImage("M",miniImg);
  mini.scale = 0.35;
  mini.lifetime = 800;
  mini.velocityY = (5+3*score/10);
  miniGroup.add(mini);
  miniGroup.visible=true;
 }  
}

function SpawnStone() {
 if(frameCount%200===0){ 
  stone = createSprite(Math.round(random(20,580)),-10,1,1);
  stone.addImage("M",stoneImg);
  stone.scale = 0.35;
  stone.lifetime = 800;
  stone.velocityY = (4+3*score/10);
  stoneGroup.add(stone);
  stoneGroup.visible=true;  
 }  
} 
