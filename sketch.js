var goldcoin,goldcoinImage;
var rocket,rocketImage;
var meteor,meteorImage;
var space,spaceImage;
var goldcoinGroup,meteorGroup;
var score;

var gameState = "start";

function preload(){
  goldcoinImage = loadImage("Gold Coin.png");
  rocketImage = loadImage("Rocket.png");
  spaceImage = loadImage("Space.jpg");
  meteorImage = loadImage("Meteor.png")
}

function setup() {
  
  createCanvas(displayWidth-20,displayHeight-120);
  
  space = createSprite(200,200);
  space.addImage(spaceImage);
  space.scale = 1.5;
 
  rocket = createSprite(displayWidth/2,displayHeight/2-100);
  rocket.addImage(rocketImage);
  rocket.scale = 0.50;
  rocket.setCollider("rectangle",0,0,rocket.width,170)
  
  goldcoinGroup = new Group();
  meteorGroup = new Group();
  
  score = 0;
}

function draw() {
  
  if(gameState === "start"){
    
    meteors();
    goldCoins();
    space.velocityX = -5;

    if(space.x<0){
      space.x = space.width/2;
    }  
    camera.position.x = rocket.x + 300
    
    if(keyDown("space")){
      gameState = "play";
    }
  }
  
  if(gameState === "play"){
    
    rocket.velocityX = 0;
    rocket.velocityY = 0;
    space.velocityX = -5;
    
    camera.position.x = rocket.x + 300

    
    if(keyDown("up_arrow")){
      rocket.velocityY = -5;
    }
    if(keyDown("down_arrow")){
      rocket.velocityY = 5;
    }
    
    goldCoins();
    meteors();
    meteors();
    
    if(space.x<0){
      space.x = space.width/2;
    }  
    
    if(rocket.isTouching(goldcoinGroup)){
      goldcoinGroup.destroyEach();
      score = score + 1;
    }
    if(rocket.isTouching(meteorGroup)){
      meteorGroup.destroyEach();
      score = score - 3;
    }
    
    if(score<0){
      gameState = "end";
    }   
  }
  
  if(gameState === "end"){
    space.velocityX = 0;
    rocket.velocityY = 0;
    
    meteorGroup.destroyEach();
    goldcoinGroup.destroyEach();
    camera.position.x = rocket.x + 300
      
    if(keyDown("r")){
      reset();
    }
  }
  drawSprites();
  
  if(gameState === "start"){
   
    fill("white");
    textSize(28);
    text("The Space Journey",camera.position.x-90,80);
    
    
    fill("white");
    textSize(12);
    text("- A Game By Adesh Ajith",camera.position.x+100,100);
    
    fill("white");
    textSize(12);
    text("Press Space To Start",camera.position.x-15,120);
  }
  
  if(gameState === "end"){
    fill("white");
    textSize(12);
    text("Press R To Restart",camera.position.x-12,115);
    
    fill("white");
    textSize(28);
    text("Game Over",camera.position.x-35,100)
  }

  fill("white");
  textSize(20);
  text("Score: " + score,camera.position.x,50);
  
}


function goldCoins(){
  if(frameCount%200 === 0){
    var a = Math.round(random(50,700));
    goldcoin = createSprite(camera.position.x+1000,a);
    goldcoin.addImage(goldcoinImage);
    goldcoin.velocityX = -8;
    goldcoin.scale = 0.16;
    goldcoin.lifetime = 370;
    
    goldcoinGroup.add(goldcoin);
  }
}

function meteors(){
  if(frameCount%250 === 0){
    var b = Math.round(random(100,600));
    meteor = createSprite(camera.position.x+1000,b);
    meteor.addImage(meteorImage);
    meteor.velocityX = -10;
    meteor.scale = 0.16;
    meteor.lifetime = 370;
    
    meteor.setCollider("rectangle",0,0,meteor.width,600)
    
    meteorGroup.add(meteor);
    
  }
}

function reset(){
  gameState = "start";
  score = 0;
}