var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup,obstaclesGroup;
var bannanaImage, rocksImage;
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameOver,gameOverImg;
var score = 0;



function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bannanaImage = loadImage("banana.png");
  rocksImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");

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
  gameOver = createSprite(150,150,400,200)
  gameOver.addImage(gameOverImg)
  gameOver.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  score = 0;

}

function draw() { 
  background(0);
  drawSprites();
  textSize(20);
  fill("blue");
  text("Score " + score, 550,50);


  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if (FoodGroup.isTouching(player)) {
  FoodGroup.destroyEach();
  player.scale += 0.05;
  score = score + 2;

  }
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnObstacles();
    spawnFood ();
    
if (obstaclesGroup.isTouching(player)) {
gameState = END;

}
else if(gameState === END) {
  backgr.velocityX = 0;
  player.visible = false;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  player.velocityX = 0;
textSize(30);
text("game Over",300,220);
gameOver.visible=true;
}
    
   

}  
}

function spawnFood () {
if (frameCount%80 === 0) {
var bannana = createSprite(600,250,40,10);
bannana.y = random(120,200);
bannana.addImage(bannanaImage);
bannana.scale = 0.05;
bannana.velocityX = -4;

bannana.lifetime = 300;
player.depth = bannana.depth +1;
FoodGroup.add(bannana);

}
}

function spawnObstacles () {
  if (frameCount%300 === 0) {
  var rocks = createSprite(600,340,40,10);
  rocks.velocityX = -(4+2*score/100);
  //rocks.x = random(240,400);
  rocks.addImage(rocksImage);
  rocks.scale = 0.25;
  
  
  rocks.lifetime = 300;
  //player.depth = rocks.depth +1;
  obstaclesGroup.add(rocks);

  }
  }
  

