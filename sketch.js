var sword,swordImage;
var enemy, enemyImage,enemyGroup;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup;
var gameover,gameoverImage;
var score;
var PLAY=1;
var END=0;
var gameState=1;
var gameoversound;
var knifesound;

function preload(){
  
  swordImage = loadImage("sword.png");
  
  enemyImage = loadAnimation("alien1.png","alien2.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameoverImage = loadImage("gameover.png");
   
  gameoversound = loadSound("gameover.mp3")
  
  knifesound = loadSound("knifeSwoosh.mp3")
  
}


function setup() {
  createCanvas(600, 600);
  
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
   sword.setCollider("rectangle",0,0,40,40);

  score=0;
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
if(gameState===PLAY){
    
    fruits();
    monster();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    knifesound.play();
    score=score+2;
    }
    else
    {
  if(enemyGroup.isTouching(sword)){
    gameState=END;
    gameoversound.play();
          
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
        
    sword.addImage(gameoverImage);
    sword.x=200;
    sword.y=200;
                         
      }
    }
  }
    text("Score : "+ score,300,30);
  
  drawSprites();
  
}

function monster(){
  if(World.frameCount%200===0){
     enemy=createSprite(400,200,20,20);
     enemy.addAnimation("moving",  enemyImage);
    
     enemy.y=Math.round(random(100,300));
    
     enemy.velocityX=-(8+(score/10));
     enemy.setLifetime=50;
    
     enemyGroup.add( enemy);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
    
    if(position===1)
    {
    
    fruit.x=400;
    fruit.velocityX=7;
    console.log(fruit.velocity)
    }

    fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}