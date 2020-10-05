//Global Variables
var  bananaImage, Monkey, monkey_running, ObstacleImage, obstacleGroup, backgr, backImage, ground, FoodGroup, groundImage, score;


function preload(){ 
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png",
                                 "Monkey_03.png","Monkey_04.png",
                                 "Monkey_05.png","Monkey_06.png",
                                 "Monkey_07.png","Monkey_08.png",
                                 "Monkey_09.png","Monkey_10.png");
  
  backImage = loadImage("jungle.jpg");
 
  BananaImage = loadImage("banana.png");
  
  ObstacleImage = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
   
  bckgr = createSprite(300,150,10,10);
  bckgr.addImage("background", backImage);
  bckgr.velocityX = -5;
    
  ground = createSprite(300,290,400,10);
  ground.visible = false;
  ground.x = ground.width /2;
  ground.velocityX = -5;
    
  monkey = createSprite(50,250,10,10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  
  Banana = createSprite(550,400,10,10);
  Banana.addImage("Banana", BananaImage);
  Banana.scale = 0.1;
  Banana.velocityX = -4;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
}


function draw(){
 background(255); 

  if(ground.x<0){ground.x=ground.width/2;
  }
  if(bckgr.x<100){
    bckgr.x=bckgr.width/2;
  }
  
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
     if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstacleGroup.isTouching(monkey)){ 
       monkey.scale=0.08;
     // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(BananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,250,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(ObstacleImage);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
  