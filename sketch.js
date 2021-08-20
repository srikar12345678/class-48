var mario;
var score=0;
var points=0;
var gameState="play";
function preload(){
  ground1=loadImage("ground 2.png");
  background1=loadImage("background.png");
  mario1=loadAnimation("mario1.png","mario2.png","mario3.png","mario4.png","mario5.png");
  obstacle1=loadImage("obstacle.png");
  coin1=loadImage("coin.png");
  obstacleImg=loadImage("sonic obstacle.png");
  marioStop=loadAnimation("mario1.png","mario2.png","mario3.png","mario4.png","mario5.png");
  gameOverImage=loadImage("gameover.png");
  retryImage=loadImage("reload.png");
}

function setup() {
  createCanvas(1200,500);
  mario=createSprite(50, 460, 50, 50);
mario.shapeColor="blue";
mario.addAnimation("running",mario1);
mario.addAnimation("marioStop",marioStop);
mario.scale=0.65;
gameOver = createSprite(600,150,10,10);
gameOver.addImage(gameOverImage);
gameOver.visible = false;
gameOver.scale=0.5;
retry = createSprite(600,260,10,10);
retry.addImage(retryImage);
retry.scale = 0.1;
retry.visible = false;
  ground=createSprite(680,490,60,20);
  // ground.x=340;
  ground.velocityX=-5;
  ground.addImage(ground1);
  obstacleGroup=new Group();
  coinGroup=new Group();
  obstacle2Group=new Group();
  
  

}


function draw() {
  background(background1);  
  if (gameState==="play"){
  if(ground.x<550){
ground.x=ground.width/2;
  }
  if(keyDown("SPACE")&& mario.y>100){
    mario.velocityY=-13;

   
  }
  mario.velocityY+=0.8;
  score = score + Math.round(getFrameRate()/40);
  if(mario.isTouching (coinGroup)){
    coinGroup.destroyEach();
    points=points+5;
  }
  if(mario.isTouching (obstacleGroup)){
    obstacleGroup.destroyEach();
    points=points-2;
    gameState="end";
  }
  if(mario.isTouching (obstacle2Group)){
    obstacle2Group.destroyEach();
    points=pointS-3;
    gameState="end"
  }
  textSize(25)
  fill("red");
  text("SCORE: "+score,2,50,);
  textSize(25)
    fill("blue");
    text("POINTS: "+points,500,50,)
  
  mario.collide(ground);
  obstacles();
  coins();
  
  }
  drawSprites();
  if(gameState==="end"){
    gameOver.visible = true;
   retry.visible = true;
    mario.velocityY=0;    
    ground.velocityX=0;
  

    textSize(25)
    fill("red");
    text("SCORE: "+score,2,50,);
    textSize(25)
    fill("blue");
    text("POINTS: "+points,500,50,);
      


  
    obstacleGroup.setLifetimeEach(-1);
    obstacle2Group.setLifetimeEach(-1);
   coinGroup.setLifetimeEach(-1);   
mario.changeAnimation("marioStop",marioStop);
 obstacleGroup.setVelocityXEach(0);
 obstacle2Group.setVelocityXEach(0);
   coinGroup.setVelocityXEach(0);
  }
  
  if(mousePressedOver(retry)){
    restart();
  }
  
  
 

}
function obstacles(){
  if(frameCount%150===0){
   obstacle=createSprite(1000,370,40,50);
  obstacle.addImage(obstacle1);
  obstacle.velocityX=-4;
  obstacleGroup.add(obstacle);
  }
  if(frameCount%230===0){
    obstacle2=createSprite(1000,430,40,50);
    obstacle2.scale=0.5;
   obstacle2.addImage(obstacleImg);
   obstacle2.velocityX=-4;
   obstacle2Group.add(obstacle2);
  }
}
  function restart(){
    gameState = "play";
    retry.visible = false;
    gameOver.visible = false;
    obstacleGroup.destroyEach();
    obstacle2Group.destroyEach();
    coinGroup.destroyEach();
   mario.changeAnimation("marioStop",marioStop);
    mario.scale=1.0;
    score = 0;
    points = 0;
  }




function coins(){
  if(frameCount%100===0){
   coin=createSprite(500,Math.round(random(10,450)),40,50);
   coin.scale=0.04;
  coin.addImage(coin1);
  coin.velocityX=-4;
  coinGroup.add(coin);
  }


}

