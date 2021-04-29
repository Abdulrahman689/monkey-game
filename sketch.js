var backImage,backgr;
var player, player_running;
var ground,ground_img,oImg;
var FoodGroup, playerGroup, obstacleGroup;
var score=0;

var END =0;
var PLAY =1;
var gameState = PLAY;

var bImg;
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bImg = loadImage("banana.png");
oImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup= new Group();
playerGroup = new Group();
obstacleGroup = new Group();
}

function draw() { 
  background(0);
console.log(score);
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    if(FoodGroup.isTouching(player)){
score = score+1
FoodGroup.destroyEach();
player.scale = player.scale+0.01
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
if(obstacleGroup.isTouching(player)){
  gameState = END;
}
    spawnFood();
    spawnObstacles();
  }
  else if(gameState===END){
    backgr.velocityX=0
    player.visible=false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
background(0)
    textSize(30)
    fill(255)
    text("Game Over!",300,220)
    console.log("Game over, try again")
  }
  text("SCORE: "+score,300,220)
  drawSprites();
}
function spawnFood(){
if(frameCount%45===0){
  var bananna = createSprite(600,250,40,10);
  bananna.y=random(120,200);
  bananna.addImage(bImg);
  bananna.scale=0.05;
  bananna.velocityX=-5;
  bananna.lifetime=350;
  player.depth = player.depth+1;
  FoodGroup.add(bananna)
  
}
}
function spawnObstacles(){
  if(frameCount%90===0){
    var obstacle = createSprite(700,300,40,10);
obstacle.addImage(oImg);
obstacle.scale=0.1
obstacle.velocityX=-6
obstacle.lifetime=500
obstacleGroup.add(obstacle)
  }
}
