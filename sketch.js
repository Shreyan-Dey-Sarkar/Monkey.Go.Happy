var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, bananaGroup;
var ground;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
}



function setup() {
createCanvas(600,400);
monkey = createSprite(100,350,10,10);
monkey.addAnimation("moving", monkey_running);
monkey.scale = 0.1;  
  
ground = createSprite(300,385,600,10);
ground.velocityX = -4;
ground.x = ground.width /2;
  
bananaGroup = new Group();  
obstacleGroup = new Group();  
}

function spawnFood() {
if (World.frameCount % 80 === 0) {
  banana = createSprite(600,300,0,0); 
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.y = Math.round(random(200,280));
  banana.velocityX = -7;
  banana.lifeTimeEach = -100;
  bananaGroup.add(banana)
}
}

function spawnObstacle(){
if(World.frameCount % 300 === 0 ) {
obstacle = createSprite(600,370,0,0)
obstacle.addImage(obstacleImage);
obstacle.velocityX = -7;  
obstacle.scale = 0.1; 
obstacle.lifeTimeEach = -100;  
obstacleGroup.add(obstacle);  
}
}

function draw() {
background("lightblue");
console.log(monkey.y); 

if(keyDown("space")&& monkey.y >= 340) {
   monkey.velocityY = -15;
  }
  
  if(obstacleGroup.isTouching(monkey)){ 
  ground.velocityX = 0; 
  monkey.velocityY = 0; 
  obstacleGroup.setVelocityXEach(0); 
  bananaGroup.setVelocityXEach(0); 
  obstacleGroup.setLifetimeEach(-1); 
  bananaGroup.setLifetimeEach(-1); 
  }
    
monkey.velocityY = monkey.velocityY + 0.8;
  
score = score + Math.round(getFrameRate()/60);  
  
if(ground.x<400) {  ground.x=ground.width/2;}   
 monkey.collide(ground);
  
  spawnFood();
  spawnObstacle();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:  "+score,450,50)
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:  "+survivalTime,100,50)
  
 drawSprites(); 
}


  
