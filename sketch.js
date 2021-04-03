var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImage,obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6, gameOverImage,restartImage,jumpSound,dieSound; 

var gameOver,restart;

var cloudsgroup, obstaclesgroup;

var score=0;
var gamestate="play";

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage=loadImage("cloud.png");
  
  obstacleImage1=loadImage("obstacle1.png");
  obstacleImage2=loadImage("obstacle2.png");
  obstacleImage3=loadImage("obstacle3.png");
  obstacleImage4=loadImage("obstacle4.png");
  obstacleImage5=loadImage("obstacle5.png");
  obstacleImage6=loadImage("obstacle6.png");
  
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
}

function setup() {
  createCanvas(displayWidth, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
 /* ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;*/
 // ground.velocityX = -2;

 
  invisibleGround = createSprite(0,190,400000,10); 
  invisibleGround.visible = false;
  
  cloudsgroup=new Group();
  obstaclesgroup=new Group();
  
  gameOver=createSprite(trex.x,100);
  gameOver.addImage("gameOver",gameOverImage);
  restart=createSprite(trex.x,150);
  restart.addImage("restart",restartImage);
  restart.scale=0.5;
}

function draw() {
  background(180);
 // console.log(trex.x);
 image(groundImage,-10000,180,displayWidth*100,10);         
   text(score,374,27);
  
 if(gamestate=="play"){
  //for moving the ground 
 // ground.velocityX=-4; 
 trex.velocityX=4;
  camera.position.x=trex.x;
  //for making infinite ground  
  //if(ground.x<0){
   //ground.x=ground.width/2;
 // }
  
   //making the trex jump
  if(keyDown("space")&&trex.y>=150){
    trex.velocityY=-20;
    jumpSound.play();     
  }
  
  //for gravity effect to trex
  trex.velocityY= trex.velocityY+1;
  
  spawnClouds(); 
  spawnObstacles();
  
   if(obstaclesgroup.isTouching(trex)){
  gamestate="end";
  dieSound.play();
     
  }
  
  gameOver.visible=false; 
  restart.visible=false;
 }
 
 else if(gamestate=="end"){
    trex.velocityX=0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    cloudsgroup.setLifetimeEach(-1);
    obstaclesgroup.setLifetimeEach(-1);
    trex.changeAnimation("collided")
    gameOver.visible=true; 
    restart.visible=true;
    gameOver.x=trex.x-50;
    restart.x=trex.x-50;
 }
 trex.setCollider("circle",0,0,40);
 
 if(mousePressedOver(restart)){
    gameOver.visible=false; 
    restart.visible=false;
    obstaclesgroup.destroyEach();
    cloudsgroup.destroyEach();
    score=0;
    trex.changeAnimation("running")
    gamestate="play"
    }
  createEdgeSprites();
  
  //making trex stand on sprite:ground 
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60==0){
     var cloud= createSprite(trex.x+700,Math.round(random(0,100)),10,10);
     cloud.velocityX=-4;
     cloud.addImage("cloud",cloudImage);
     cloud.lifetime=800/4;
     trex.depth=cloud.depth+1
     cloudsgroup.add(cloud)
  }
}
function spawnObstacles(){
if(frameCount%80==0){
  score=score+1;
  var a=Math.round(random(1,6));
  var obstacle=createSprite(trex.x+750,175);
 switch(a)
 { 
   case 1: obstacle.addImage(obstacleImage1); 
     break; 
   case 2: obstacle.addImage(obstacleImage2); 
     break; 
   case 3: obstacle.addImage(obstacleImage3); 
     break; 
   case 4:obstacle.addImage(obstacleImage4);
     break;
   case 5:obstacle.addImage(obstacleImage5);
     break;
   case 6:obstacle.addImage(obstacleImage6);
     break;
   default:obstacle.addImage(obstacleImage1);
     
 }
  obstacle.velocityX=-4;
  obstacle.scale=0.5;
  obstaclesgroup.add(obstacle);
}
}
